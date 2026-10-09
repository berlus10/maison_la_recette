import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactTabs } from '@/components/contact/ContactTabs';
import { LearnMoreBanner } from '@/components/sections/LearnMoreBanner';
import { TestimonialGrid } from '@/components/sections/TestimonialGrid';
import { Container } from '@/components/ui/Container';
import { getTestimonials } from '@/lib/content/testimonials';
import { OFFER_VALUES, type OfferValue } from '@/lib/validation/devis';
import { buildPeriodOptions } from '@/lib/validation/period-options';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Demandez un devis ou posez une question à Julie.',
};

type Props = { searchParams: Promise<{ offre?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const [{ offre }, testimonials] = await Promise.all([
    searchParams,
    getTestimonials(),
  ]);
  const defaultOffer = OFFER_VALUES.includes(offre as OfferValue)
    ? offre
    : undefined;

  return (
    <>
      <section className="py-8 sm:py-12 lg:py-16">
        <Container className="max-w-[1528px]">
          <ContactHero />
        </Container>
      </section>

      <section aria-label="Formulaires de contact" className="pb-12 sm:pb-16">
        <Container className="max-w-[1528px]">
          <div className="max-w-3xl">
            <ContactTabs
              defaultOffer={defaultOffer}
              periodOptions={buildPeriodOptions()}
            />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-[1528px]">
          <div className="mx-auto mb-10 max-w-[850px] text-center">
            <h2 className="font-title text-4xl leading-tight font-medium text-black sm:text-5xl lg:text-[80px] lg:leading-[1.3]">
              Les avis de mes clients
            </h2>
          </div>
          <TestimonialGrid testimonials={testimonials} tone="podcast" />
        </Container>
      </section>

      <LearnMoreBanner />
    </>
  );
}
