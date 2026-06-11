import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import { IconArrowRight, IconMail } from '@/components/ui/icons';
import { site } from '@/data/site';

/** Dark, high-impact intro: headline + CTAs on the left, portrait panel right. */
export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden bg-dark pt-[112px] pb-[72px] text-white max-[980px]:pt-[104px] max-[980px]:pb-[64px]"
    >
      <div className="grid-bg" />
      <div className="hero-glow" />

      <Container className="relative grid grid-cols-[1.05fr_.95fr] items-center gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-12">
        {/* Copy */}
        <Reveal immediate>

          <h1 className="font-display text-[clamp(40px,5.4vw,68px)] font-semibold leading-[1.05] tracking-[-.03em]">
            Construyo sistemas
            <br />
            de software con
            <br />
            <span className="grad-text">Inteligencia Artificial.</span>
          </h1>

          <p className="mt-[26px] max-w-[480px] text-[19px] leading-[1.6] text-white/[.66]">
            Estudiante de Ingeniería de Software especializado en agentes de IA, modelos de visión entrenados a
            medida y arquitecturas cloud escalables. Convierto problemas complejos en productos
            reales.
          </p>

          <div className="mt-[38px] flex flex-wrap gap-3.5">
            <Button href="#proyectos" variant="primary">
              Ver proyectos
              <IconArrowRight />
            </Button>
            <Button href="#contacto" variant="ghost">
              Contactarme
              <IconMail />
            </Button>
          </div>
        </Reveal>

        {/* Portrait */}
        <Reveal immediate className="relative max-[980px]:max-w-[440px]">
          <div className="hp-glow" />
          <div className="hp-frame">
            <ImageSlot
              tone="dark"
              aspect="4 / 5"
              radius={22}
              placeholder="Foto de perfil"
              src={site.heroPhoto}
              alt={site.name}
            />
            <span className="hp-chip">
              <span className="h-[7px] w-[7px] rounded-full bg-[#36d399] shadow-[0_0_0_4px_rgba(54,211,153,.18)]" />
              Abierto a proyectos
            </span>
            <div className="hp-overlay">
              <div className="font-display text-[23px] font-semibold tracking-[-.01em] text-white">
                {site.name}
              </div>
              <div className="mt-[5px] font-mono text-[11.5px] tracking-[.05em] text-accent-2">
                {site.role}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </header>
  );
}
