import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { IconArrowRight, IconCheck, IconMail, IconPhone, IconPin } from '@/components/ui/icons';
import { projectTypes } from '@/data/projectTypes';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/** One row of the contact info list (label · icon · value). */
function ContactInfo({
  label,
  icon,
  href,
  children,
}: {
  label: string;
  icon: ReactNode;
  href?: string;
  children: ReactNode;
}) {
  const content = (
    <>
      <span className="w-16 font-mono text-[11px] tracking-[.06em] text-white/40">{label}</span>
      {icon}
      {children}
    </>
  );
  return href ? (
    <a className="ci" href={href}>
      {content}
    </a>
  ) : (
    <div className="ci">{content}</div>
  );
}

/** Stacked label + control wrapper. */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[.1em] text-white/50">{label}</span>
      {children}
    </div>
  );
}

/** Dark contact card: info column + project brief form. */
export function Contact() {
  const [selectedTypes, setSelectedTypes] = useState<ReadonlySet<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend wired yet — surface the success state (see README to connect).
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="block-pad relative">
      <Container>
        <Reveal className="contact-card">
          <div className="grid-bg opacity-[.35]" />
          <div className="relative grid grid-cols-[1fr_1.1fr] gap-[60px] p-[72px_60px] max-[980px]:grid-cols-1 max-[980px]:gap-11 max-[980px]:p-[52px_32px]">
            {/* Left — pitch + contact info */}
            <div>
              <Eyebrow tone="dark">Contacto</Eyebrow>
              <h2 className="mt-[18px] text-[clamp(30px,3.4vw,44px)] tracking-[-.025em] text-white">
                Hablemos de tu próximo proyecto
              </h2>
              <p className="mt-[18px] max-w-[380px] text-[17px] text-white/[.62]">
                ¿Tienes una idea, un proceso que automatizar o un producto que construir? Cuéntame y
                te respondo con un plan claro.
              </p>

              <div className="mt-10 flex flex-col gap-1">
                <ContactInfo label="EMAIL" href={`mailto:${site.email}`} icon={<IconMail className="h-[17px] w-[17px]" />}>
                  {site.email}
                </ContactInfo>
                <ContactInfo label="TEL" href={`tel:${site.phoneHref}`} icon={<IconPhone className="h-[17px] w-[17px]" />}>
                  {site.phone}
                </ContactInfo>
                <ContactInfo label="LUGAR" icon={<IconPin className="h-[17px] w-[17px]" />}>
                  {site.locationFull}
                </ContactInfo>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
                  <Field label="Nombre">
                    <input
                      type="text"
                      name="nombre"
                      required
                      placeholder="Tu nombre"
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="tu@email.com"
                      className="contact-input"
                    />
                  </Field>
                </div>

                <Field label="Tipo de proyecto">
                  <div className="flex flex-wrap gap-[9px]">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={selectedTypes.has(type)}
                        onClick={() => toggleType(type)}
                        className={cn('chip', selectedTypes.has(type) && 'chip--on')}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Detalles">
                  <textarea
                    name="detalles"
                    required
                    placeholder="Cuéntame qué quieres construir, tus objetivos y plazos..."
                    className="contact-input min-h-[120px] resize-y"
                  />
                </Field>

                <button type="submit" className="submit-btn">
                  Enviar solicitud
                  <IconArrowRight className="h-[17px] w-[17px]" />
                </button>

                {submitted && (
                  <div className="form-ok">
                    <IconCheck className="h-4 w-4" />
                    ¡Gracias! Tu mensaje fue preparado. Te responderé muy pronto.
                  </div>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
