import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { IconArrowUpRight } from '@/components/ui/icons';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { cn } from '@/lib/cn';

/** One alternating project block (media + narrative). */
function ProjectCard({ project, first }: { project: Project; first: boolean }) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 items-center gap-[54px] border-t border-line py-16 max-[980px]:grid-cols-1 max-[980px]:gap-[30px] max-[980px]:py-12',
        first && 'border-t-0',
      )}
    >
      {/* Media */}
      <div className={cn('relative', project.reversed && 'order-2 max-[980px]:order-none')}>
        <span className="absolute left-4 top-4 z-[3] inline-flex items-center gap-2 rounded-[9px] bg-[rgba(10,11,14,.82)] px-3 py-[7px] font-mono text-[11px] tracking-[.04em] text-white backdrop-blur-[8px]">
          <span className="h-[7px] w-[7px] rounded-full bg-accent-2" />
          {project.badge}
        </span>
        <ImageSlot
          aspect="4 / 3"
          radius={18}
          placeholder={project.imagePlaceholder}
          src={project.imageSrc}
          alt={project.title}
          className="border border-line shadow-[0_30px_60px_-36px_rgba(14,14,18,.4)]"
        />
      </div>

      {/* Narrative */}
      <div>
        <span className="font-mono text-[13px] tracking-[.08em] text-ink-3">{project.number}</span>
        <h3 className="mt-4 text-[clamp(26px,2.6vw,34px)] tracking-[-.02em]">{project.title}</h3>
        <div className="mt-2.5 font-mono text-[13px] text-accent">{project.role}</div>
        <p className="mt-[18px] text-[16.5px] leading-[1.62] text-ink-2">{project.description}</p>

        <div className="mt-[22px] flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} variant="strong">
              {tag}
            </Tag>
          ))}
        </div>

        <div className="mt-[26px] flex gap-[34px]">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <b className="block font-display text-[26px] font-semibold tracking-[-.02em]">
                {stat.value}
              </b>
              <span className="text-[13px] text-ink-3">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-[26px] flex gap-3.5">
          <a
            href={project.caseHref}
            className="inline-flex items-center gap-[7px] border-b-[1.5px] border-accent pb-0.5 text-[14.5px] font-semibold text-ink transition-[gap] hover:gap-[11px]"
          >
            Ver caso
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Selected work: section heading + zig-zag project list. */
export function Projects() {
  return (
    <section id="proyectos" className="relative pt-10 pb-[104px] max-[560px]:pb-[76px]">
      <Container>
        <Reveal className="mb-[54px] max-w-[680px]">
          <Eyebrow>Proyectos destacados</Eyebrow>
          <h2 className="mt-[18px] text-[clamp(30px,3.6vw,46px)] tracking-[-.025em]">
            Trabajo seleccionado
          </h2>
          <p className="mt-[18px] max-w-[560px] text-[18px] text-ink-2">
            Productos donde la ingeniería y la IA resuelven un problema concreto — de la genética
            médica al comercio digital.
          </p>
        </Reveal>

        {projects.map((project, i) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} first={i === 0} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
