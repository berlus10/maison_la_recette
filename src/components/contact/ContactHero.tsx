import { ButtonLink } from '@/components/ui/Button';
import content from '@/content/contact.json';
import { HeroCarousel } from './HeroCarousel';
import { SocialLinks } from './SocialLinks';

export function ContactHero() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,904fr)_minmax(0,525fr)] lg:items-center lg:gap-[clamp(2rem,5.73vw,6.1875rem)]">
      <div className="flex min-w-0 flex-col items-start gap-6">
        <h1 className="font-title text-ink text-5xl leading-[1.12] font-medium tracking-tight sm:text-6xl lg:text-[5rem] lg:leading-[1.3]">
          {content.title}
        </h1>
        <div className="text-ink max-w-[904px] space-y-3 text-base leading-[1.5] sm:text-lg lg:text-xl lg:leading-[1.3]">
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ButtonLink
          href={content.cta.href}
          className="min-h-[53px] px-5 text-lg sm:text-xl"
        >
          {content.cta.label} <span aria-hidden="true">→</span>
        </ButtonLink>
        <SocialLinks />
      </div>
      <HeroCarousel />
    </div>
  );
}
