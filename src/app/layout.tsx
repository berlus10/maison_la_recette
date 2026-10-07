import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

// Police de substitution. Quand la DA fournit Neulis (licence vérifiée), c'est ici qu'on change.
const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-src',
  display: 'swap',
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
    <html lang="fr" className={font.variable}>
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
