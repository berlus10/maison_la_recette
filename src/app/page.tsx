import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <nav className="mb-16 flex items-center justify-between">
          <div className="text-2xl font-bold">Maison La Recette</div>
          <div className="flex gap-6 text-sm">
            <Link href="/podcast">Podcast</Link>
            <Link href="/experiences">Expériences</Link>
            <Link href="/a-propos">À propos</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-brand)]">
              Podcast • studio • événements
            </p>
            <h1 className="text-5xl font-bold leading-tight">
              Une cuisine engagée, des rencontres inspirantes.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
              Maison La Recette regroupe le podcast de Julie, les ateliers et les
              expériences autour de l’alimentation durable, pour les entreprises comme
              pour les particuliers.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/podcast" className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-white">
                Écouter le podcast
              </Link>
              <Link href="/contact" className="rounded-full border border-[var(--color-brand)] px-6 py-3 text-[var(--color-brand)]">
                Demander un devis
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="text-xl font-semibold">Ce que tu trouveras</h2>
            <ul className="mt-6 space-y-4 text-[var(--color-muted)]">
              <li>• Épisodes de podcast classés par saison</li>
              <li>• Expériences à la ferme et ateliers</li>
              <li>• Formulaire de devis pour les entreprises</li>
              <li>• À propos de Julie et sa mission</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
