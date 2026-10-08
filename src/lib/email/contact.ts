import type { ContactInput } from '../validation/contact';
import { getEmailConfig } from './config';
import { escapeHtml, row } from './format';
import { sendWithAcknowledgement, type OutgoingEmail } from './send';

const SUBJECT_LABELS: Record<ContactInput['subject'], string> = {
  question: 'Question',
  particulier: 'Demande de particulier',
  devis: 'Devis entreprise',
  autre: 'Autre',
};

export function buildContactNotification(
  data: ContactInput,
  to: string,
): OutgoingEmail {
  const subject = SUBJECT_LABELS[data.subject];

  return {
    to,
    replyTo: data.email,
    subject: `Nouveau message - ${subject}`,
    html: `
      <h2>Message reçu depuis le site</h2>
      ${row('Prénom', data.firstName)}
      ${row('E-mail', data.email)}
      ${row('Sujet', subject)}
      ${row('Message', data.message)}
    `,
  };
}

export function buildContactAcknowledgement(data: ContactInput): OutgoingEmail {
  return {
    to: data.email,
    subject: 'Votre message a bien été reçu',
    html: `
      <p>Bonjour ${escapeHtml(data.firstName)},</p>
      <p>Merci pour votre message. Nous vous répondons dès que possible.</p>
      <p>L'équipe Maison La Recette</p>
    `,
  };
}

export async function sendContactMessage(data: ContactInput): Promise<void> {
  await sendWithAcknowledgement(
    buildContactNotification(data, getEmailConfig().to),
    buildContactAcknowledgement(data),
  );
}
