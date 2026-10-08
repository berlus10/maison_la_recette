export type PodcastPlatform = {
  id: string;
  label: string;
  href: string;
  color: string;
  glyph: string;
  icon?: string;
};

// Liens officiels du podcast, relevés sur la page Ausha « S'abonner ».
const showPlatforms: PodcastPlatform[] = [
  {
    id: 'spotify',
    label: 'Spotify',
    href: 'https://open.spotify.com/show/78p9jKRzpoGWQ2sTCfBOof',
    color: '#1DB954',
    glyph: 'S',
    icon: '/podcast/plateformes/logos_spotify-icon.svg',
  },
  {
    id: 'apple',
    label: 'Apple Podcasts',
    href: 'https://podcasts.apple.com/fr/podcast/la-recette/id1673916177',
    color: '#9B4FD4',
    glyph: 'A',
    icon: '/podcast/plateformes/selfhst_apple-podcasts.svg',
  },
  {
    id: 'deezer',
    label: 'Deezer',
    href: 'https://www.deezer.com/show/5771417',
    color: '#A238FF',
    glyph: 'D',
    icon: '/podcast/plateformes/selfhst_deezer.svg',
  },
  {
    id: 'amazon',
    label: 'Amazon Music',
    href: 'https://music.amazon.com/podcasts/2decf450-2bce-406e-8b1b-efe50b0ce969',
    color: '#25D1DA',
    glyph: 'a',
    icon: '/podcast/plateformes/selfhst_amazon-music.svg',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@Larecettepodcast',
    color: '#FF0000',
    glyph: 'Y',
    icon: '/podcast/plateformes/logos_youtube-icon.svg',
  },
  {
    id: 'castbox',
    label: 'Castbox',
    href: 'https://castbox.fm/channel/id5329922',
    color: '#F65E3B',
    glyph: 'C',
    icon: '/podcast/plateformes/thesvg-color_castbox.svg',
  },
  {
    id: 'podcastaddict',
    label: 'Podcast Addict',
    href: 'https://podcastaddict.com/podcast/4295072',
    color: '#F4842D',
    glyph: 'P',
    icon: '/podcast/plateformes/thesvg-color_podcast-addict.svg',
  },
  {
    id: 'overcast',
    label: 'Overcast',
    href: 'https://overcast.fm/itunes1673916177',
    color: '#FC7E0F',
    glyph: 'O',
    icon: '/podcast/plateformes/thesvg-color_overcast.svg',
  },
  {
    id: 'rss',
    label: 'Flux RSS',
    href: 'https://feed.ausha.co/Zg75JI109Rlm',
    color: '#F26522',
    glyph: 'R',
    icon: '/podcast/plateformes/selfhst_rss-com.svg',
  },
];

export function getEpisodePlatforms(episodeLink: string): PodcastPlatform[] {
  return [
    {
      id: 'ausha',
      label: 'Ausha',
      href: episodeLink,
      color: '#2B2119',
      glyph: 'au',
    },
    ...showPlatforms,
  ].filter((platform) => platform.href.startsWith('https://'));
}

export const showAllPlatforms: PodcastPlatform[] = [
  {
    id: 'ausha',
    label: 'Ausha',
    href: 'https://podcast.ausha.co/la-recette',
    color: '#2B2119',
    glyph: 'au',
  },
  ...showPlatforms,
];
