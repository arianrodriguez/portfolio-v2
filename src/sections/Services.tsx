import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { IconArrowUpRight } from '@/components/ui/icons';
import { services } from '@/data/services';
import type { Service } from '@/types';
import { cn } from '@/lib/cn';

/** A single editorial service row (widget). */
function ServiceRow({ service, last }: { service: Service; last: boolean }) {
  return (
    <div
      className={cn(
        'group grid grid-cols-[50px_1fr] gap-[22px] rounded-2xl border-t border-line py-[34px] pl-2 pr-[26px] transition-[background,padding] duration-[350ms] ease-smooth hover:bg-bg-2 hover:pl-6 hover:pr-[30px]',
        last && 'border-b',
      )}
    >
      <span className="pt-[7px] font-mono text-[14px] text-ink-3 transition-colors group-hover:text-accent">
        {service.number}
      </span>
      <div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[clamp(21px,2.1vw,27px)] tracking-[-.02em]">{service.title}</h3>
          <span className="flex-none translate-x-[-6px] translate-y-[6px] text-ink-3 opacity-0 transition-[opacity,transform,color] duration-300 ease-smooth group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100">
            <IconArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <p className="mt-3 max-w-[520px] text-[16px] leading-[1.6] text-ink-2">
          {service.description}
        </p>
        <div className="mt-[18px] flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Services: sticky intro column + numbered editorial list. */
export function Services() {
  return (
    <section id="servicios" className="block-pad relative">
      <Container className="grid grid-cols-[.82fr_1.18fr] items-start gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-9">
        <Reveal className="sticky top-[108px] self-start max-[980px]:static">
          <Eyebrow>Servicios</Eyebrow>
          <h2 className="mt-[18px] text-[clamp(30px,3.4vw,44px)] tracking-[-.025em]">
            Lo que puedo construir para ti
          </h2>
          <p className="mt-[18px] max-w-[340px] text-[17px] text-ink-2">
            De un agente inteligente a una plataforma completa: diseño, desarrollo y despliego
            software listo para escalar.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.number}>
              <ServiceRow service={service} last={i === services.length - 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
