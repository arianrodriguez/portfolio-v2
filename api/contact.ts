import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * POST /api/contact — receives a contact-form submission and emails it to the
 * site owner via Resend. Runs as a Vercel Serverless Function (Node.js runtime)
 * so the Resend API key stays server-side (never shipped to the browser).
 *
 * Required env var:  RESEND_API_KEY
 * Optional env vars: CONTACT_TO_EMAIL   (default: arianmrv12@gmail.com)
 *                    CONTACT_FROM_EMAIL (default: Portafolio <onboarding@resend.dev>)
 *
 * `onboarding@resend.dev` works out of the box but can only deliver to the
 * address you signed up with. Once your domain is verified in Resend, set
 * CONTACT_FROM_EMAIL to something like "Arian <contacto@tudominio.com>".
 */

// The Vercel Node runtime parses the JSON body into `req.body` and augments
// `res` with Express-like `.status()/.json()` helpers.
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
  /** Honeypot — must stay empty for real humans. */
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escape user input before interpolating into the email HTML. */
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
  const tipos = Array.isArray(body.tipos) ? body.tipos.filter(Boolean) : [];

  if (!nombre || !detalles || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Datos incompletos o email inválido.' });
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
