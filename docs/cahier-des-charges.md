# Cahier des charges - Maison La Recette

## 1. Contexte et objectifs

Maison La Recette porte 3 activités : le Podcast, le Studio de production et les expériences (ateliers, food tours, immersions). Elles sont peu visibles et confondues entre elles. Le site doit :

1. Faire écouter le podcast directement, avec renvoi vers les plateformes d'écoute.
2. Présenter clairement les offres et générer des demandes de devis B2B (priorité n°1) ainsi que des réservations B2C.
3. Réunir le tout sous la marque chapeau « Maison La Recette ».
4. Être modifiable par la cliente seule, sans développeur, et reprenable facilement par d'autres développeurs.

Le critère de choix de chaque technologie est donc simple : facile à maintenir, peu coûteuse, largement connue.

## 2. Décisions de la cliente et impact technique

| Sujet                         | Réponse de la cliente                                                  | Conséquence technique                                             |
| ----------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Hébergement du podcast        | Ausha                                                                  | Flux RSS Ausha = source unique des épisodes                       |
| Écoute                        | Sur le site et vers les plateformes                                    | Lecteur sur le site + liens (smartlink Ausha)                     |
| Classement des épisodes       | 3 saisons ; résumé par épisode souhaité                                | Regroupement par saison, résumé tiré du flux                      |
| Autonomie                     | Veut tout modifier seule                                               | CMS obligatoire, interface en français                            |
| Blog                          | Oui, pour le référencement                                             | Modèle « Article » avec champs SEO                                |
| Langue                        | Français uniquement                                                    | Pas d'internationalisation (YAGNI)                                |
| Réservation                   | Aujourd'hui : e-mail + Luma                                            | Phase 1 : lien vers Luma ; Phase 2 : Stripe                       |
| Paiement                      | « Oui » à Stripe                                                       | Spécifié, intégré en phase 2                                      |
| Devis entreprises             | Rendez-vous téléphonique d'abord, réponse sous 48h                     | Formulaire de qualification + e-mail, pas de prise de rendez-vous |
| Compte utilisateurs           | Non, formulaire suffit                                                 | Aucun système d'authentification public                           |
| Newsletter                    | N'existe pas encore                                                    | Hors périmètre, prévoir l'espace                                  |
| Logos clients                 | Ne pas les exposer                                                     | Pas de mur de logos, avis mis en avant                            |
| Partenaires chefs et artisans | À valider avec eux, pas avant la fin de la semaine                     | Modèle prêt, contenu masqué par défaut                            |
| Identité                      | Carte blanche palette, pas de noir, chaleureux et épuré, moins « pro » | Design tokens centralisés, contrastes soignés                     |
| Domaine / Hébergeur           | Proposez-moi                                                           | Recommandation chiffrée section 4                                 |
| Photos                        | Fournies, usage limité à l'exercice                                    | Dépôts privés, site de démo non indexé                            |
| Public                        | Urbain, majoritairement féminin, environ 50 ans                        | Lisibilité, grands contrastes, navigation simple                  |

## 3. Périmètre

### MVP (démo vendredi)

- Socle déployé, navigation, design tokens, composants.
- Podcast : liste par saison, lecteur, page détail avec résumé, lecture automatique du flux Ausha.
- CMS configuré avec les modèles de contenu et du contenu de démonstration.
- Pages : accueil, offre podcast, concept expériences, une page par expérience, à propos, contact, blog.
- Formulaire de devis B2B et formulaire de contact avec e-mails.
- Réservation B2C par lien Luma.
- SEO de base, mentions légales, version mobile.

### Phase 2

- Réservation et paiement natif via Stripe Checkout.
- Newsletter (outil à choisir) et import consenti de la base de contacts.
- Enregistrement des demandes de devis dans une base (suivi).
- Affichage des partenaires chefs et artisans une fois validés.
- Statistiques d'audience.

### Hors périmètre

Compte utilisateur, version anglaise, compte à rebours d'épisode, tri des sponsors, tunnel d'appel téléphonique en ligne.

## 4. Architecture et choix techniques

| Besoin                  | Choix                                                      | Pourquoi                                                                                                                    | Alternative écartée                                                                                                  |
| ----------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Framework               | Next.js (App Router) + TypeScript strict                   | Très répandu, SEO, rendu statique avec mise à jour automatique, API intégrée pour les formulaires, Stripe complet plus tard | Astro : excellent pour le contenu mais moins naturel pour le paiement ensuite                                        |
| Style                   | Tailwind CSS, variables CSS de thème                       | Rebrand en modifiant un seul fichier de tokens                                                                              | CSS maison : plus de dette                                                                                           |
| CMS                     | Sanity : studio en français, schéma dans le code           | Interface claire pour un non technique, images optimisées par CDN, offre gratuite généreuse, schémas versionnés sur Git     | Contentful : équivalent fonctionnel, à retenir si l'équipe le maîtrise nettement mieux. Strapi : serveur à maintenir |
| Podcast                 | Flux RSS Ausha lu côté serveur, revalidé chaque heure      | Un nouvel épisode apparaît seul : zéro maintenance                                                                          | Saisie manuelle des épisodes                                                                                         |
| Lecteur audio           | Lecteur maison (balise audio accessible)                   | Aucun cookie tiers, design maîtrisé                                                                                         | Embed Ausha : cookies tiers, design imposé                                                                           |
| Validation              | Zod (partagé front et API)                                 | Une seule définition des règles                                                                                             | Validation manuelle                                                                                                  |
| E-mails                 | Resend                                                     | Simple, offre gratuite suffisante                                                                                           | SMTP à gérer soi-même                                                                                                |
| Anti-spam               | Cloudflare Turnstile + champ piège + limitation de débit   | Gratuit, peu intrusif, respecte la vie privée                                                                               | reCAPTCHA                                                                                                            |
| Paiement (phase 2)      | Stripe Checkout + webhook                                  | Aucune donnée de carte chez nous                                                                                            | Intégration de cartes maison                                                                                         |
| Mesure d'audience       | Outils sans cookies (Cloudflare Web Analytics)             | Évite le bandeau cookies                                                                                                    | Google Analytics                                                                                                     |
| Dépôt et CI             | Git privé, GitHub Actions : lint, types, build à chaque PR | Aucune régression silencieuse                                                                                               | Aucun contrôle                                                                                                       |
| Gestionnaire de paquets | pnpm, version de Node fixée                                |
