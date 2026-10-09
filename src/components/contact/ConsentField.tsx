import { labelClass } from '@/lib/contact/styles';

export function ConsentField({ text }: { text: string }) {
  return (
    <label className={`${labelClass} flex items-start gap-3 font-normal`}>
      <input
        type="checkbox"
        name="consent"
        value="true"
        required
        className="mt-1 h-5 w-5"
      />
      <span>{text}</span>
    </label>
  );
}
