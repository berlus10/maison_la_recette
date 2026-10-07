export function SectionHeading({
  title,
  intro,
  level = 2,
  align = 'center',
}: {
  title: string;
  intro?: string;
  level?: 1 | 2;
  align?: 'center' | 'left';
}) {
  const Tag = level === 1 ? 'h1' : 'h2';
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      <Tag className="font-title text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</Tag>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p> : null}
    </div>
  );
}