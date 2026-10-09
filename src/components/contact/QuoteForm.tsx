'use client';

import { buttonClasses } from '@/components/ui/Button';
import content from '@/content/contact.json';
import { inputClass } from '@/lib/contact/styles';
import {
  GROUP_SIZE_LABELS,
  GROUP_SIZE_VALUES,
  OFFER_LABELS,
  OFFER_VALUES,
} from '@/lib/validation/devis';
import { ConsentField } from './ConsentField';
import { Field } from './Field';
import { FormStatus } from './FormStatus';
import { Honeypot } from './Honeypot';
import { useFormSubmit } from './useFormSubmit';

type Props = { defaultOffer?: string; periodOptions: string[] };

export function QuoteForm({ defaultOffer, periodOptions }: Props) {
  const { status, pending, onSubmit } = useFormSubmit('/api/devis');

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Field id="fullName" label="Prénom et nom">
        <input
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          className={inputClass}
        />
      </Field>
      <Field id="email" label="E-mail professionnel">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>
      <Field id="organization" label="Entreprise ou organisation">
        <input
          id="organization"
          name="organization"
          required
          autoComplete="organization"
          className={inputClass}
        />
      </Field>
      <Field id="phone" label="Téléphone (facultatif)">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </Field>
      <Field id="offer" label="Type d'offre">
        <select
          id="offer"
          name="offer"
          defaultValue={defaultOffer ?? ''}
          className={inputClass}
        >
          <option value="">Je ne sais pas encore</option>
          {OFFER_VALUES.map((value) => (
            <option key={value} value={value}>
              {OFFER_LABELS[value]}
            </option>
          ))}
        </select>
      </Field>
      <Field id="groupSize" label="Nombre de participants">
        <select
          id="groupSize"
          name="groupSize"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Choisir
          </option>
          {GROUP_SIZE_VALUES.map((value) => (
            <option key={value} value={value}>
              {GROUP_SIZE_LABELS[value]}
            </option>
          ))}
        </select>
      </Field>
      <Field id="period" label="Période souhaitée">
        <select
          id="period"
          name="period"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Choisir
          </option>
          {periodOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field id="location" label="Lieu (facultatif)">
        <input
          id="location"
          name="location"
          placeholder="Vos locaux ou un quartier"
          className={inputClass}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field id="message" label="Votre projet">
          <textarea
            id="message"
            name="message"
            rows={4}
            className={inputClass}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <ConsentField text={content.messages.consent} />
      </div>
      <Honeypot name="website" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={buttonClasses('primary', 'disabled:opacity-60')}
        >
          {pending ? 'Envoi en cours' : 'Envoyer ma demande de devis'}
        </button>
        <FormStatus status={status} />
      </div>
    </form>
  );
}
