# Règles de contribution

- Jamais de commit direct sur `main`.
- Branches courtes : `feature/…`, `fix/…`, `chore/…`, `docs/…`
- Commits : `feat: …`, `fix: …`, `chore: …`, `docs: …`
- Une pull request = une fonctionnalité, relue et approuvée par l'autre dev, puis « Squash and merge ».
- Avant de pousser : `pnpm lint && pnpm typecheck && pnpm build`
- Jamais de secret (clé API, mot de passe) dans le dépôt.
- Jamais d'image ni de photo dans le dépôt (usage limité à l'exercice).
