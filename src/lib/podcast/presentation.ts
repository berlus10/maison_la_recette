export function splitPodcastTitle(title: string) {
  const match = title.match(/^\s*\[([^\]]*extrait[^\]]*)\]\s*[-–:|]?\s*(.+)$/i);

  return match
    ? { subtitle: match[1].trim(), title: match[2].trim() }
    : { subtitle: undefined, title: title.trim() };
}

export function podcastDescriptionToText(description: string) {
  return description
    .replace(/<\s*br\s*\/?>/gi, ' ')
    .replace(/<\/(?:p|div|li|h[1-6])\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (entity, hex, decimal) => {
      const codePoint = Number.parseInt(hex ?? decimal, hex ? 16 : 10);
      if (
        !Number.isInteger(codePoint) ||
        codePoint < 0 ||
        codePoint > 0x10ffff ||
        (codePoint >= 0xd800 && codePoint <= 0xdfff)
      ) {
        return entity;
      }

      return String.fromCodePoint(codePoint);
    })
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function podcastDescriptionSummary(description: string, limit = 190) {
  const firstParagraph =
    description
      .split(/<\/p\s*>|<br\s*\/?>/i)
      .map(podcastDescriptionToText)
      .find(Boolean) ?? '';

  if (firstParagraph.length <= limit) {
    return firstParagraph;
  }

  const shortened = firstParagraph.slice(0, limit);
  const lastSpace = shortened.lastIndexOf(' ');

  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : limit).trimEnd()}…`;
}
