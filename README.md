# Maison La Recette

Site vitrine de Julie : podcast « La Recette », studio et expériences.
Projet du workshop My Digital School, octobre 2026.

## Démarrer

1. Installer Node (version dans `.nvmrc`) et pnpm
2. `pnpm install`
3. Copier `.env.example` vers `.env.local` et remplir les valeurs
4. `pnpm dev`, puis ouvrir http://localhost:3000

## Commandes

`pnpm lint` · `pnpm typecheck` · `pnpm format` · `pnpm build`

## Structure

- `src/app` : routes et pages
- `src/components` : composants (ui, layout, podcast, experiences, forms)
- `src/lib` : logique (flux podcast, accès aux contenus, e-mails, validation)
- `src/content` : données de démonstration
- `src/styles` : design tokens

## Documentation

`CONTRIBUTING.md` · `docs/decisions.md` · [Cahier des charges](docs/cahier-des-charges.md)
