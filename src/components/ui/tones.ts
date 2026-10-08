export type Tone = 'podcast' | 'event' | 'studio';

export const TONES: Record<
  Tone,
  {
    shell: string;
    tab: string;
    panel: string;
    media: string;
    feature: string;
    avatar: string;
  }
> = {
  podcast: {
    shell: 'bg-podcast-900',
    tab: 'bg-podcast-700',
    panel: 'panel-podcast',
    media:
      'bg-[linear-gradient(135deg,var(--color-podcast-400),var(--color-podcast-600))]',
    feature: 'row-podcast',
    avatar: 'bg-podcast-700 text-white',
  },
  event: {
    shell: 'bg-event-900',
    tab: 'bg-event-700',
    panel: 'panel-event',
    media:
      'bg-[linear-gradient(135deg,var(--color-event-400),var(--color-event-600))]',
    feature: 'row-event',
    avatar: 'bg-event-700 text-white',
  },
  studio: {
    shell: 'bg-studio-900',
    tab: 'bg-studio-700',
    panel: 'panel-studio',
    media:
      'bg-[linear-gradient(135deg,var(--color-studio-400),var(--color-studio-600))]',
    feature: 'row-studio',
    avatar: 'bg-studio-700 text-white',
  },
};
