import { NextStudio } from 'next-sanity/studio';

export default async function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 text-[#1f1a17]">
        <section>
          <h1 className="text-3xl font-bold">Studio Sanity non configuré</h1>
          <p className="mt-4">
            Crée le projet Sanity puis renseigne NEXT_PUBLIC_SANITY_PROJECT_ID
            dans l’environnement local pour activer le Studio.
          </p>
        </section>
      </main>
    );
  }

  const { default: config } = await import('../../../sanity/config');
  return <NextStudio config={config} />;
}
