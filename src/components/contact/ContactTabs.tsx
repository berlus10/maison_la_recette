'use client';

import { useState } from 'react';
import content from '@/content/contact.json';
import { ContactForm } from './ContactForm';
import { QuoteForm } from './QuoteForm';

type Tab = 'quote' | 'contact';
const TABS: Tab[] = ['quote', 'contact'];

type Props = { defaultOffer?: string; periodOptions: string[] };

export function ContactTabs({ defaultOffer, periodOptions }: Props) {
  const [tab, setTab] = useState<Tab>('quote');

  return (
    <div>
      <div role="tablist" className="mb-6 flex flex-wrap gap-3">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            onClick={() => setTab(t)}
            className={`focus-visible:outline-studio-500 rounded-full px-5 py-2 text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-2 ${
              tab === t ? 'bg-ink text-cream' : 'bg-ink/10 text-ink'
            }`}
          >
            {content.tabs[t]}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'quote' ? (
          <QuoteForm
            defaultOffer={defaultOffer}
            periodOptions={periodOptions}
          />
        ) : (
          <ContactForm />
        )}
      </div>
    </div>
  );
}
