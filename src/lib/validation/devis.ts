import { z } from 'zod';

export const OFFER_VALUES = [
  'atelier',
  'food-tour',
  'immersion',
  'podcast-sponsoring',
  'podcast-studio',
  'podcast-evenement',
  'autre',
] as const;
export type OfferValue = (typeof OFFER_VALUES)[number];

export const OFFER_LABELS: Record<OfferValue, string> = {
  atelier: 'Atelier culinaire',
  'food-tour': 'Food tour',
  immersion: 'Immersion à la ferme',
  'podcast-sponsoring': 'Sponsoring du podcast',
  'podcast-studio': 'Production de podcast (studio)',
  'podcast-evenement': 'Animation ou enregistrement d’événement',
  autre: 'Autre demande',
};

export const GROUP_SIZE_VALUES = [
  'lt-15',
  '15-30',
  '30-50',
  '50-plus',
] as const;
export type GroupSizeValue = (typeof GROUP_SIZE_VALUES)[number];

export const GROUP_SIZE_LABELS: Record<GroupSizeValue, string> = {
  'lt-15': 'Moins de 15 personnes',
  '15-30': '15 à 30 personnes',
  '30-50': '30 à 50 personnes',
  '50-plus': 'Plus de 50 personnes',
};

export const devisSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Indiquez votre prénom et votre nom')
    .max(120),
  email: z.string().trim().email('Adresse e-mail invalide').max(160),
  organization: z
    .string()
    .trim()
    .min(1, 'Indiquez le nom de votre entreprise')
    .max(120),
  groupSize: z.enum(GROUP_SIZE_VALUES),
  period: z.string().trim().min(1, 'Choisissez une période').max(60),
  phone: z.string().trim().max(30).optional(),
  location: z.string().trim().max(120).optional(),
  offer: z.enum(OFFER_VALUES).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, 'Le consentement est obligatoire'),
  website: z.string().optional(), // champ piège : doit rester vide
  turnstileToken: z.string().optional(),
});
export type DevisInput = z.infer<typeof devisSchema>;
