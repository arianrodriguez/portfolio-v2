import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * POST /api/contact — receives a contact-form submission and emails it to the
 * site owner via Resend. Runs as a Vercel Serverless Function (Node.js runtime)
 * so secrets stay server-side (never shipped to the browser).
 *
 * Defense layers: honeypot, field validation + length caps, Content-Type and
 * Origin checks, and Cloudflare Turnstile verification.
 *
 * Required env var:  RESEND_API_KEY
 * Optional env vars: CONTACT_TO_EMAIL      (default: arianmrv12@gmail.com)
 *                    CONTACT_FROM_EMAIL    (default: Portafolio <onboarding@resend.dev>)
 *                    TURNSTILE_SECRET_KEY  (if set, the token is verified)
 *                    ALLOWED_ORIGINS       (comma-separated extra hosts/origins)
 */

type VercelRequest = IncomingMessage & { body?: unknown };
interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
}

interface ContactPayload {
  nombre?: string;
  email?: string;
  detalles?: string;
  tipos?: string[];
  turnstileToken?: string;
  /** Honeypot — must stay empty for real humans. */
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { nombre: 100, email: 150, detalles: 5000, tipos: 12, tipoLen: 50 };

function getHeader(req: VercelRequest, name: string): string | undefined {
  const v = req.headers[name];
  return Array.isArray(v) ? v[0] : v;
}

function hostOf(value?: string): string | null {
  if (!value) return null;
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

/** Block cross-site browser submissions. Absent Origin/Referer is allowed (CLI
 *  tools omit them) since Turnstile + honeypot are the real gate. */
function isAllowedOrigin(req: VercelRequest): boolean {
  const originHost = hostOf(getHeader(req, 'origin')) ?? hostOf(getHeader(req, 'referer'));
  if (!originHost) return true;

  const allowed = new Set<string>();
  const reqHost = getHeader(req, 'host');
  if (reqHost) allowed.add(reqHost);
  for (const entry of (process.env.ALLOWED_ORIGINS ?? '').split(',')) {
    const h = entry.trim();
    if (h) allowed.add(hostOf(h) ?? h);
  }

  return allowed.has(originHost) || originHost.endsWith('.vercel.app');
}

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → skip verification
  if (!token) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const data = (await r.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeParse(raw: string): ContactPayload {
  try {
    return JSON.parse(raw) as ContactPayload;
  } catch {
    return {};
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!(getHeader(req, 'content-type') ?? '').includes('application/json')) {
    return res.status(415).json({ ok: false, error: 'Content-Type debe ser application/json.' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'Origen no permitido.' });
  }

  const raw = req.body;
  const body: ContactPayload =
    typeof raw === 'string' ? safeParse(raw) : ((raw as ContactPayload | undefined) ?? {});

  // Honeypot tripped → pretend success so bots don't learn anything.
  if (body.company && body.company.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const nombre = (body.nombre ?? '').trim();
  const email = (body.email ?? '').trim();
  const detalles = (body.detalles ?? '').trim();
  const tipos = (Array.isArray(body.tipos) ? body.tipos : [])
    .filter((t): t is string => typeof t === 'string' && t.length <= MAX.tipoLen)
    .slice(0, MAX.tipos);

  if (!nombre || !detalles || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Datos incompletos o email inválido.' });
  }
  if (nombre.length > MAX.nombre || email.length > MAX.email || detalles.length > MAX.detalles) {
    return res.status(400).json({ ok: false, error: 'Algún campo excede el tamaño permitido.' });
  }

  const ip = getHeader(req, 'x-forwarded-for')?.split(',')[0]?.trim();
  if (!(await verifyTurnstile(body.turnstileToken ?? '', ip))) {
    return res.status(403).json({ ok: false, error: 'Verificación anti-bot fallida.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'Servidor sin configurar.' });
  }

  const to = process.env.CONTACT_TO_EMAIL || 'arianmrv12@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Portafolio <onboarding@resend.dev>';

  const tiposHtml = tipos.length
    ? tipos.map((t) => escapeHtml(t)).join(', ')
    : '<em>No especificado</em>';

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0e0e12">
      <h2 style="margin:0 0 4px">Nueva solicitud desde el portafolio</h2>
      <p style="margin:0 0 20px;color:#56575e">Te contactó <strong>${escapeHtml(nombre)}</strong>.</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:8px 0;color:#8a8b92;width:120px">Nombre</td><td style="padding:8px 0">${escapeHtml(nombre)}</td></tr>
        <tr><td style="padding:8px 0;color:#8a8b92">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#8a8b92">Tipo</td><td style="padding:8px 0">${tiposHtml}</td></tr>
        <tr><td style="padding:8px 0;color:#8a8b92;vertical-align:top">Detalles</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(detalles)}</td></tr>
      </table>
    </div>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nuevo contacto — ${nombre}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error('Resend error:', resendRes.status, detail);
      return res.status(502).json({ ok: false, error: 'No se pudo enviar el correo.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler crashed:', err);
    return res.status(500).json({ ok: false, error: 'Error inesperado.' });
  }
}
