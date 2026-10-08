const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Neutralise le HTML saisi par l'utilisateur avant de l'insérer dans un e-mail. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

/** Ramène un texte sur une seule ligne (pour les objets d'e-mail). */
export function oneLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Une ligne « Libellé : valeur » en HTML, valeur échappée, retours à la ligne conservés. */
export function row(label: string, value: string): string {
  const safeValue = escapeHtml(value).replace(/\r?\n/g, '<br>');
  return `<p><strong>${escapeHtml(label)} :</strong> ${safeValue}</p>`;
}
