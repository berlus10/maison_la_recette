import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  email: z.email(),
  subject: z.enum(['question', 'particulier', 'devis', 'autre']),
  message: z.string().trim().min(10).max(1500),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
