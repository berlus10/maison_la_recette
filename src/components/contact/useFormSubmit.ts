'use client';

import { useState, type FormEvent } from 'react';
import {
  formToObject,
  submitForm,
  type SubmitResult,
} from '@/lib/contact/submit';

export function useFormSubmit(url: string) {
  const [status, setStatus] = useState<SubmitResult | 'idle'>('idle');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const consent = form.elements.namedItem('consent') as HTMLInputElement;
    setPending(true);
    const result = await submitForm(url, {
      ...formToObject(form),
      consent: consent.checked,
    });
    setPending(false);
    setStatus(result);
    if (result === 'success') form.reset();
  }

  return { status, pending, onSubmit };
}
