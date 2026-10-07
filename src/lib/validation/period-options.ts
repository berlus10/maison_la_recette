const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

export function buildPeriodOptions(
  from: Date = new Date(),
  months = 9,
): string[] {
  const options: string[] = [];
  for (let i = 1; i <= months; i++) {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1);
    options.push(`${MONTHS[d.getMonth()]} ${d.getFullYear()}`);
  }
  options.push('Période flexible');
  return options;
}
