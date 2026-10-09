import content from '@/content/contact.json';
import type { SubmitResult } from '@/lib/contact/submit';

export function FormStatus({ status }: { status: SubmitResult | 'idle' }) {
  if (status === 'idle') return null;
  return (
    <p
      role={status === 'success' ? 'status' : 'alert'}
      className="text-base font-medium text-[#2a1f1a]"
    >
      {content.messages[status]}
    </p>
  );
}
