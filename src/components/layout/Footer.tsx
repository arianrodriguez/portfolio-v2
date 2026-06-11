import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { IconGitHub, IconLinkedIn, IconMail } from '@/components/ui/icons';
import { site } from '@/data/site';

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} aria-label={label} className="social">
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="pt-[46px] pb-[60px]">
      <Container className="flex flex-wrap items-center justify-between gap-5 text-[14px] text-ink-3">
        <div>© 2026 {site.name} · Ingeniería de software con IA</div>
        <div className="flex gap-2.5">
          <SocialLink href={site.social.linkedin} label="LinkedIn">
            <IconLinkedIn className="h-[18px] w-[18px]" />
          </SocialLink>
          <SocialLink href={site.social.github} label="GitHub">
            <IconGitHub className="h-[18px] w-[18px]" />
          </SocialLink>
          <SocialLink href={`mailto:${site.email}`} label="Email">
            <IconMail className="h-[18px] w-[18px]" />
          </SocialLink>
        </div>
      </Container>
    </footer>
  );
}
