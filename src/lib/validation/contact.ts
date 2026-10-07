import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.enum(['question', 'particulier', 'devis', 'autre']),
  message: z.string().min(10).max(1500),
  consent: z.literal(true),
  honeypot: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
