import type { ReactNode } from 'react';
import { ButtonLink } from './Button';
import { TONES, type Tone } from './tones';

type Props = {
  tone: Tone;
  title: string;
  text: string;
  badge?: string;
  media?: ReactNode;
  href?: string;
  cta?: string;
  footer?: ReactNode;
  className?: string;
};

export function UniverseCard({
  tone,
  title,
  text,
  badge,
  media,
  href,
  cta,
  footer,
  className = '',
}: Props) {
  const t = TONES[tone];
  const hasActions = Boolean((href && cta) || footer);
  return (
    <article
      className={`rounded-card flex h-full flex-col overflow-hidden ${t.shell} ${className}`}
    >
      <div className="p-3 pb-0">
        <div
          className={`relative h-48 overflow-hidden rounded-2xl sm:h-56 ${t.media}`}
        >
          {media}
          {badge ? (
            <span className="bg-cream text-ink absolute top-3 left-3 grid min-h-12 min-w-12 place-items-center rounded-full px-3 text-sm font-extrabold">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      <div className="relative mt-5 flex flex-1 flex-col">
        <span
          aria-hidden
          className={`absolute -top-5 left-0 h-6 w-36 rounded-t-2xl ${t.tab}`}
        />
        <div
          className={`rounded-tr-card flex flex-1 flex-col gap-3 p-6 text-white ${t.panel}`}
        >
          <h3 className="font-title text-2xl font-extrabold">{title}</h3>
          <p className="text-base leading-relaxed text-white/90">{text}</p>
          {hasActions ? (
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
              {href && cta ? (
                <ButtonLink href={href} variant="light">
                  {cta}
                </ButtonLink>
              ) : null}
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
