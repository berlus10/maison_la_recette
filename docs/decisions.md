# Décisions techniques

- Next.js App Router
- TypeScript strict
- Tailwind
- pnpm
- Zod pour validation
- Données JSON en source de démonstration, remplacées par Sanity ensuite
- Les pages utilisent `src/lib/content` via `ContentSource`; la source JSON valide ses fixtures avec Zod
- Flux RSS Ausha avec cache et fallback
- Email Resend pour les devis et contact
- noindex sur la démonstration
