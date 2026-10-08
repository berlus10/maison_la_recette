import { Resend } from 'resend';
import { getEmailConfig } from './config';

export type OutgoingEmail = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export class EmailSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailSendError';
  }
}

/**
 * Envoie un e-mail via Resend.
 * Resend ne lève pas d'exception en cas d'échec : il renvoie `{ error }`,
 * c'est pourquoi on le vérifie ici et on lève nous-mêmes l'erreur.
 */
export async function sendEmail(email: OutgoingEmail): Promise<void> {
  const { apiKey, from } = getEmailConfig();
  const { error } = await new Resend(apiKey).emails.send({ from, ...email });

  if (error) {
    throw new EmailSendError(`${error.name}: ${error.message}`);
  }
}

/**
 * Envoie la notification (obligatoire) puis l'accusé de réception.
 * Si seul l'accusé échoue, la demande a quand même été reçue : on journalise
 * l'erreur sans la remonter à l'utilisateur.
 */
export async function sendWithAcknowledgement(
  notification: OutgoingEmail,
  acknowledgement: OutgoingEmail,
): Promise<void> {
  await sendEmail(notification);

  try {
    await sendEmail(acknowledgement);
  } catch (error) {
    console.error('[email] accusé de réception non envoyé', error);
  }
}
