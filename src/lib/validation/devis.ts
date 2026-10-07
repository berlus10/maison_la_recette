import { z } from 'zod';

export const devisSchema = z.object({
  company: z.string().min(2).max(120),
  contactName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(30),
  eventType: z.enum(['team-building', 'seminaire', 'atelier', 'autre']),
  peopleCount: z.coerce.number().min(5).max(500),
  message: z.string().min(20).max(1500),
  callbackWindow: z.string().optional(),
  consent: z.literal(true),
  honeypot: z.string().optional(),
});

export type DevisInput = z.infer<typeof devisSchema>;
