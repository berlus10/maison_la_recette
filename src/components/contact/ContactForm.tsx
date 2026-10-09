'use client';

import { buttonClasses } from '@/components/ui/Button';
import content from '@/content/contact.json';
import { inputClass } from '@/lib/contact/styles';
import { ConsentField } from './ConsentField';
import { Field } from './Field';
import { FormStatus } from './FormStatus';
import { Honeypot } from './Honeypot';
import { useFormSubmit } from './useFormSubmit';

export function ContactForm() {
  const { status, pending, onSubmit } = useFormSubmit('/api/contact');

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Field id="firstName" label="Prénom">
        <input
          id="firstName"
          name="firstName"
          required
          minLength={2}
          autoComplete="given-name"
          className={inputClass}
        />
      </Field>
      <Field id="contactEmail" label="E-mail">
        <input
          id="contactEmail"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field id="subject" label="Sujet">
          <select
            id="subject"
            name="subject"
            defaultValue="question"
            className={inputClass}
          >
            {content.subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="contactMessage" label="Votre message">
          <textarea
            id="contactMessage"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={1500}
            className={inputClass}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <ConsentField text={content.messages.consent} />
      </div>
      <Honeypot name="honeypot" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={buttonClasses('primary', 'disabled:opacity-60')}
        >
          {pending ? 'Envoi en cours' : 'Envoyer mon message'}
        </button>
        <FormStatus status={status} />
      </div>
    </form>
  );
}
