import type { ReactNode } from 'react';
import { labelClass } from '@/lib/contact/styles';

type Props = { id: string; label: string; children: ReactNode };

export function Field({ id, label, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
