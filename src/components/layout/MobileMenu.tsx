'use client';

import Link from 'next/link';
import { useState } from 'react';
import { buttonClasses } from '@/components/ui/Button';
import type { NavLink } from '@/lib/navigation';

export function MobileMenu({
  links,
  secondary,
  primary,
}: {
  links: NavLink[];
  secondary: NavLink;
  primary: NavLink;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
        className={buttonClasses('secondary')}
      >
        {open ? 'Fermer' : 'Menu'}
      </button>
      {open ? (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="bg-cream absolute inset-x-0 top-full px-5 pt-2 pb-6 shadow-lg"
        >
          <ul className="flex flex-col">
            {[...links, secondary].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-3 text-lg font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={primary.href}
            onClick={close}
            className={buttonClasses('primary', 'mt-4 w-full')}
          >
            {primary.label}
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
