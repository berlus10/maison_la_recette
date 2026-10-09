import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { ButtonLink } from './Button';
import { TONES, type Tone } from './tones';

type CardImage = {
  src: string;
  alt: string;
};

type Props = {
  tone: Tone;
  title: string;
  text: string;
  layout?: 'default' | 'split' | 'wide';
  images?: CardImage[];
  badge?: string;
  pinSrc?: string;
  media?: ReactNode;
  href?: string;
  linkLabel?: string;
  cta?: string;
  footer?: ReactNode;
  className?: string;
};

export function UniverseCard({
  tone,
  title,
  text,
  layout = 'default',
  images = [],
  badge,
  pinSrc,
  media,
  href,
  linkLabel,
  cta,
  footer,
  className = '',
}: Props) {
  const t = TONES[tone];
  const hasActions = Boolean((href && cta) || footer);
  const layoutClass =
    layout === 'default'
      ? 'aspect-[0.95] min-h-[300px] max-w-[467.85px] sm:aspect-[1.05] xl:aspect-[1.169625]'
      : layout === 'wide'
        ? 'aspect-[4/3] min-h-[320px] max-w-none md:min-h-[360px] md:aspect-[998/400]'
        : 'aspect-[4/3] min-h-[320px] max-w-none md:min-h-[360px] md:aspect-[467.85/400]';
  const panelPaddingClass =
    layout === 'wide' ? 'pt-[11%] sm:pt-[11%]' : 'pt-[18%] sm:pt-[18%]';
  const titleClass =
    layout === 'default'
      ? 'text-3xl leading-[1.3] sm:text-[40px] sm:leading-[52px]'
      : layout === 'wide'
        ? 'text-2xl leading-tight sm:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[52px]'
        : 'text-2xl leading-tight sm:text-3xl xl:text-3xl 2xl:text-[32px] 2xl:leading-[42px]';
  const textClass =
    layout === 'default'
      ? 'text-base leading-relaxed sm:text-[20px] sm:leading-[26px]'
      : 'text-sm leading-5 sm:text-base sm:leading-6 xl:text-lg xl:leading-[1.3] 2xl:text-[20px] 2xl:leading-[26px]';
  const cardLinkLabel = linkLabel ?? `Découvrir ${title}`;
  const hoverOffsets = [
    'group-hover:-translate-y-2',
    'group-hover:-translate-y-5 group-hover:rotate-4',
    'group-hover:-translate-y-6 group-hover:-rotate-4',
    'group-hover:-translate-y-12 group-hover:rotate-5',
  ];

  return (
    <article
      className={`group relative isolate ${layoutClass} w-full min-w-0 overflow-visible rounded-[20px] transition-[z-index] duration-300 ease-out focus-within:z-30 hover:z-30 ${t.shell} ${className}`}
    >
      <div className="absolute inset-x-[5.92%] top-[8%] bottom-[5.81%] z-0">
        <div className={`absolute inset-0 rounded-2xl ${t.media}`} />
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute inset-0 transition-transform duration-500 ease-out ${index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'} motion-reduce:transition-none ${hoverOffsets[Math.min(index, hoverOffsets.length - 1)]}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                layout === 'wide'
                  ? '(min-width: 1600px) 998px, (min-width: 768px) 62vw, 90vw'
                  : '(min-width: 1600px) 468px, (min-width: 768px) 30vw, 90vw'
              }
              className="rounded-2xl object-cover"
            />
          </div>
        ))}
        {media}
        {badge ? (
          <span className="bg-cream text-ink absolute top-3 left-3 z-10 grid min-h-12 min-w-12 place-items-center rounded-full px-3 text-sm font-extrabold">
            {badge}
          </span>
        ) : null}
      </div>
      <div
        className={`absolute inset-x-0 top-[38%] bottom-0 z-10 rounded-[20px] p-5 ${panelPaddingClass} text-white sm:p-7 ${panelPaddingClass} ${t.panel}`}
      >
        <span
          aria-hidden
          className={`absolute -top-8 left-0 h-8 w-[55%] rounded-t-[20px] ${t.panel}`}
        />
        <div className="relative flex h-full flex-col gap-[10px]">
          <h3 className={`font-title font-medium ${titleClass}`}>{title}</h3>
          <p className={`text-white/95 ${textClass}`}>{text}</p>
          {hasActions ? (
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
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
      {pinSrc ? (
        <Image
          src={pinSrc}
          alt=""
          aria-hidden="true"
          width={68}
          height={68}
          sizes="(min-width: 468px) 68px, 15vw"
          className="absolute top-[12%] left-[9%] z-40 aspect-square w-[15%] max-w-[68px] min-w-10 object-contain"
        />
      ) : null}
      {href && !cta ? (
        href.startsWith('mailto:') ? (
          <a
            href={href}
            aria-label={cardLinkLabel}
            className="focus-visible:outline-ink absolute inset-0 z-20 rounded-[20px] focus-visible:outline-4 focus-visible:outline-offset-4"
          />
        ) : (
          <Link
            href={href}
            aria-label={cardLinkLabel}
            className="focus-visible:outline-ink absolute inset-0 z-20 rounded-[20px] focus-visible:outline-4 focus-visible:outline-offset-4"
          />
        )
      ) : null}
    </article>
  );
}
