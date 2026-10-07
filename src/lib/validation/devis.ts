import { z } from 'zod';

export const devisSchema = z.object({
  company: z.string().trim().min(2).max(120),
  contactName: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().min(8).max(30),
  eventType: z.enum(['team-building', 'seminaire', 'atelier', 'autre']),
  peopleCount: z.coerce.number().min(5).max(500),
  message: z.string().trim().min(20).max(1500),
  callbackWindow: z.string().trim().max(120).optional(),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export type DevisInput = z.infer<typeof devisSchema>;
