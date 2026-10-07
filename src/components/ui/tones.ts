export type Tone = 'podcast' | 'event' | 'studio';

export const TONES: Record<
  Tone,
  { shell: string; tab: string; panel: string; media: string; avatar: string }
> = {
  podcast: {
    shell: 'bg-podcast-900',
    tab: 'bg-podcast-700',
    panel: 'bg-[linear-gradient(to_bottom,var(--color-podcast-700),var(--color-podcast-900))]',
    media: 'bg-[linear-gradient(135deg,var(--color-podcast-400),var(--color-podcast-600))]',
    avatar: 'bg-podcast-700 text-white',
  },
  event: {
    shell: 'bg-event-900',
    tab: 'bg-event-700',
    panel: 'bg-[linear-gradient(to_bottom,var(--color-event-700),var(--color-event-900))]',
    media: 'bg-[linear-gradient(135deg,var(--color-event-400),var(--color-event-600))]',
    avatar: 'bg-event-700 text-white',
  },
  studio: {
    shell: 'bg-studio-900',
    tab: 'bg-studio-700',
    panel: 'bg-[linear-gradient(to_bottom,var(--color-studio-700),var(--color-studio-900))]',
    media: 'bg-[linear-gradient(135deg,var(--color-studio-400),var(--color-studio-600))]',
    avatar: 'bg-studio-700 text-white',
  },
};