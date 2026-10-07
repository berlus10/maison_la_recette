import Link from 'next/link';
import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'ghost';

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-studio-500';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-cream hover:bg-podcast-900',
  secondary: 'border-2 border-ink text-ink hover:bg-ink hover:text-cream',
  light: 'bg-cream text-ink hover:bg-white',
  ghost: 'text-ink underline-offset-4 hover:underline',
};

// À utiliser aussi sur un <button> : <button className={buttonClasses('primary')}>
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className = '',
) {
  return `${base} ${variants[variant]} ${className}`.trim();
}

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}
