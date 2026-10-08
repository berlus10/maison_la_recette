const DEFAULT_FROM = 'Maison La Recette <onboarding@resend.dev>';

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

/**
 * Lit la configuration d'envoi depuis les variables d'environnement.
 * Lève une erreur claire si une variable obligatoire manque.
 */
export function getEmailConfig(): EmailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not defined');
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    throw new Error('CONTACT_TO_EMAIL is not defined');
  }

  return {
    apiKey,
    to,
    from: process.env.EMAIL_FROM ?? DEFAULT_FROM,
  };
}
