import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { TONES, type Tone } from '@/components/ui/tones';

export function FeatureRow({
  eyebrow,
  title,
  text,
  cta,
  href,
  tone = 'podcast',
  image,
}: {
  eyebrow?: string;
  title: string;
  text: string | string[];
  cta: string;
  href: string;
  tone?: Tone;
  image?: {
    src: string;
    alt: string;
  };
}) {
  return (
    <article
      className={`grid gap-5 rounded-[20px] p-5 text-white md:min-h-[385px] md:grid-cols-[minmax(0,412.46px)_minmax(0,1fr)] ${TONES[tone].feature}`}
    >
      <div className="relative h-56 overflow-hidden rounded-[20px] bg-white/10 md:h-[344.77px]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1600px) 412px, (min-width: 768px) 30vw, 90vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col gap-3 py-1">
        {eyebrow ? (
          <p className="text-sm font-bold tracking-wide text-white/90 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="font-title text-2xl font-medium sm:text-3xl lg:text-[40px] lg:leading-[52px]">
          {title}
        </h3>
        <div className="space-y-3 text-base leading-relaxed text-white sm:text-[20px] sm:leading-[26px]">
          {Array.isArray(text) ? (
            text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <p>{text}</p>
          )}
        </div>
        <div className="mt-auto flex sm:justify-end">
          <ButtonLink href={href} variant="light">
            {cta} →
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
