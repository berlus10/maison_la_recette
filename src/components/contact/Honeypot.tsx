/**
 * Champ invisible : un humain ne le remplit pas, un robot oui.
 * Le nom diffère selon le schéma : "website" (devis), "honeypot" (contact).
 */
export function Honeypot({ name }: { name: 'website' | 'honeypot' }) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
    >
      <label>
        Ne pas remplir
        <input type="text" name={name} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
