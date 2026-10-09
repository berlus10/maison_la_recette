'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDES = [
  {
    src: '/contact/hero-1.jpg',
    alt: 'Une main ajoute des légumes dans un saladier pendant un atelier Maison La Recette',
  },
  {
    src: '/contact/hero-2.jpg',
    alt: 'Julie échange en souriant avec une participante lors d\u2019un événement',
  },
];
const INTERVAL_MS = 5000;

/** Image du hero : défilement automatique, flèches pour passer à la suivante. */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (paused || reduceMotion) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <figure
      className="relative isolate mx-auto aspect-[4/5] w-full max-w-[33rem] overflow-hidden rounded-[1.25rem] lg:mx-0 lg:aspect-[525/673] lg:max-h-[42rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={i === index ? slide.alt : ''}
          aria-hidden={i !== index}
          fill
          preload={i === 0}
          sizes="(min-width: 1024px) 525px, 100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
        aria-label={`Image suivante (${index + 1} sur ${SLIDES.length})`}
        className="absolute right-3 bottom-3 grid size-12 place-items-center text-white drop-shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          viewBox="0 0 40 40"
          className="size-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 8l12 8 12-8" opacity="0.4" />
          <path d="M8 16l12 8 12-8" opacity="0.7" />
          <path d="M8 24l12 8 12-8" />
        </svg>
      </button>
    </figure>
  );
}
