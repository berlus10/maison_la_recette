'use client';

import dynamic from 'next/dynamic';
import config from '../../sanity/config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((studio) => studio.NextStudio),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-screen items-center justify-center">
        <p>Chargement du Studio…</p>
      </main>
    ),
  },
);

export default function SanityStudioClient() {
  return <NextStudio config={config} />;
}
