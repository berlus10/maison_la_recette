export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden
        className={`font-title grid h-11 w-11 place-items-center rounded-xl text-sm font-extrabold ${
          inverted ? 'bg-cream text-podcast-900' : 'bg-podcast-900 text-cream'
        }`}
      >
        LR
      </span>
      <span className="font-title text-lg leading-tight font-extrabold">
        Maison
        <span className="block">La Recette</span>
      </span>
    </span>
  );
}
