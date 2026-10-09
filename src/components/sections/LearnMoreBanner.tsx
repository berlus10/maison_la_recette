import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

/** Bloc « En apprendre un peu + », identique à celui de la page expériences. */
export function LearnMoreBanner() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container className="max-w-[1528px] 2xl:px-0">
        <div className="grid items-center gap-8 rounded-[1.25rem] bg-[#FFDCD6] p-5 sm:p-8 lg:grid-cols-[minmax(0,503fr)_minmax(0,904fr)] lg:gap-[clamp(2rem,6.5vw,100px)] lg:p-10">
          <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem]">
            <Image
              src="/experiences/bar.jpg"
              alt="Rencontre et découverte autour de l’alimentation dans un bar"
              fill
              sizes="(min-width: 1024px) 33vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-5">
            <h2 className="font-title text-ink text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[clamp(3.5rem,4.5vw,5rem)]">
              En apprendre un peu +
            </h2>
            <p className="text-ink text-base leading-relaxed sm:text-lg lg:text-xl lg:leading-[1.3]">
              Maison La Recette explore l’alimentation de demain à travers des
              rencontres, des expériences et des histoires. Podcast, événements,
              ateliers et studio : découvrez celles et ceux qui font évoluer
              notre façon de produire, cuisiner et consommer. Ici, on parle
              d’alimentation durable, mais surtout, on la vit.
            </p>
            <ButtonLink
              href="/"
              className="min-h-[53px] px-5 py-[10px] text-lg leading-tight sm:text-xl lg:text-[25px] lg:leading-[33px]"
            >
              En découvrir plus <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
