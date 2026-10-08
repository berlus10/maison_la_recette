import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

const neulisNeue = localFont({
  src: [
    { path: './fonts/neulis-neue-thin.otf', weight: '100' },
    { path: './fonts/neulis-neue-extralight.otf', weight: '200' },
    { path: './fonts/neulis-neue-light.otf', weight: '300' },
    { path: './fonts/neulis-neue.otf', weight: '400' },
    { path: './fonts/neulis-neue-medium.otf', weight: '500' },
    { path: './fonts/neulis-neue-bold.otf', weight: '700' },
    { path: './fonts/neulis-neue-black.otf', weight: '900' },
  ],
  variable: '--font-neulis-neue',
  display: 'swap',
  preload: false,
});

const neulisSans = localFont({
  src: [
    { path: './fonts/neulis-sans-hairline.otf', weight: '100' },
    { path: './fonts/neulis-sans-extralight.otf', weight: '200' },
    { path: './fonts/neulis-sans-light.otf', weight: '300' },
    { path: './fonts/neulis-sans.otf', weight: '400' },
    { path: './fonts/neulis-sans-medium.otf', weight: '500' },
    { path: './fonts/neulis-sans-semibold.otf', weight: '600' },
    { path: './fonts/neulis-sans-bold.otf', weight: '700' },
    { path: './fonts/neulis-sans-extrabold.otf', weight: '800' },
    { path: './fonts/neulis-sans-black.otf', weight: '900' },
  ],
  variable: '--font-neulis-sans',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: { default: 'Maison La Recette', template: '%s | Maison La Recette' },
  description:
    'Podcast, studio et expériences autour de l’alimentation durable.',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${neulisNeue.variable} ${neulisSans.variable}`}>
      <body className="bg-cream font-text text-ink antialiased">
        <a
          href="#contenu"
          className="focus:bg-ink focus:text-cream sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
