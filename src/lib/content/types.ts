export type PodcastEpisode = {
  id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  season: number;
  durationMinutes: number;
  platforms: {
    name: string;
    url: string;
  }[];
};

export type Experience = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  audience: 'particuliers' | 'entreprises';
  duration: string;
  price?: string;
  category: 'atelier' | 'tour' | 'immersion' | 'team-building';
  isFeatured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
};

export type AboutContent = {
  intro: string;
  mission: string;
  values: string[];
};
