'use client';

import { useEffect, useRef, useState } from 'react';
import type { PodcastPlatform } from '@/lib/podcast/platforms';

export function PodcastPlatformMenu({
  platforms,
  label = 'Écouter sur…',
  triggerClassName = 'border-2 border-white text-white hover:bg-white/15 focus-visible:outline-white',
  opensDown = false,
}: {
  platforms: PodcastPlatform[];
  label?: string;
  triggerClassName?: string;
  opensDown?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function close(event: Event) {
      if (
        event instanceof KeyboardEvent
          ? event.key === 'Escape'
          : !containerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((value) => !value)}
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base ${triggerClassName}`}
      >
        {label}
        <span aria-hidden="true">{isOpen ? '↑' : '↓'}</span>
      </button>
      {isOpen ? (
        <div
          className={`absolute z-10 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-[#2B2119]/10 bg-[#FBF8F2] p-4 text-[#2B2119] shadow-lg ${opensDown ? 'top-full left-0 mt-2' : 'right-0 bottom-full mb-2'}`}
        >
          <p className="mb-3 text-sm font-semibold text-[#2B2119]">
            Choisir une plateforme
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {platforms.map((platform) => (
              <li key={platform.id}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col items-center gap-2 rounded-xl p-2 text-center text-xs font-medium text-[#2B2119] transition-colors hover:bg-[#D7EAE1] focus-visible:outline-2 focus-visible:outline-[#2B2119]"
                >
                  {platform.icon ? (
                    <span
                      aria-hidden="true"
                      className="grid size-11 place-items-center rounded-xl bg-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={platform.icon} alt="" className="size-8" />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: platform.color }}
                      className="grid size-11 place-items-center rounded-xl text-lg font-bold text-white"
                    >
                      {platform.glyph}
                    </span>
                  )}
                  {platform.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
