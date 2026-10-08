import Image from 'next/image';
import type { Testimonial } from '@/lib/content/types';

type TestimonialTone = 'event' | 'studio';

const backgroundClasses: Record<TestimonialTone, string> = {
  event: 'bg-[#FFDCD6]',
  studio: 'bg-[#C3E2E9]',
};

export function TestimonialGrid({
  testimonials,
  tone,
}: {
  testimonials: Testimonial[];
  tone: TestimonialTone;
}) {
  const featuredTestimonials = testimonials.filter(
    (testimonial) => testimonial.isFeatured,
  );
  const visibleTestimonials = (
    featuredTestimonials.length > 0 ? featuredTestimonials : testimonials
  ).slice(0, 3);

  if (visibleTestimonials.length === 0) {
    return null;
  }

  return (
    <ul className="grid items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleTestimonials.map((testimonial, index) => {
        const rating = testimonial.rating;

        return (
          <li
            key={testimonial.id}
            className={index === 1 ? 'xl:mt-3' : ''}
          >
            <figure
              className={`flex h-full min-h-[285px] flex-col rounded-[1.25rem] p-7 sm:p-10 ${backgroundClasses[tone]}`}
            >
              <div className="flex items-center gap-2 sm:gap-5">
                <Image
                  src="/experiences/img_avis.png"
                  alt={`Portrait de ${testimonial.name}`}
                  width={80}
                  height={80}
                  className="size-12 shrink-0 rounded-full object-cover sm:size-[4.8rem]"
                />
                <div className="min-w-0">
                  <p className="font-title text-ink text-lg leading-tight">
                    {testimonial.name}
                  </p>
                  {testimonial.role ? (
                    <p className="text-ink-soft mt-1 text-sm">
                      {testimonial.role}
                    </p>
                  ) : null}
                  {rating !== undefined ? (
                    <div className="mt-2 flex items-center gap-2 sm:gap-4">
                      <span
                        role="img"
                        aria-label={`Note : ${rating} sur 5`}
                        className="inline-flex items-center gap-0.5"
                      >
                        {Array.from({ length: rating }, (_, star) => (
                          <Image
                            key={star}
                            src="/experiences/Star.svg"
                            alt=""
                            aria-hidden="true"
                            width={42}
                            height={38}
                            className="h-[1.125rem] w-5 sm:h-[2.375rem] sm:w-[2.625rem]"
                          />
                        ))}
                      </span>
                      <span className="text-ink text-base">{rating}/5</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <blockquote className="text-ink mt-6 flex-1 text-lg leading-relaxed">
                « {testimonial.quote} »
              </blockquote>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
