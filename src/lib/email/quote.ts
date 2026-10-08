import {
  GROUP_SIZE_LABELS,
  OFFER_LABELS,
  type DevisInput,
} from '../validation/devis';
import { getEmailConfig } from './config';
import { escapeHtml, oneLine, row } from './format';
import { sendWithAcknowledgement, type OutgoingEmail } from './send';

export function buildQuoteNotification(
  data: DevisInput,
  to: string,
): OutgoingEmail {
  return {
    to,
    replyTo: data.email,
    subject: `Nouvelle demande de devis - ${oneLine(data.organization)}`,
    html: `
      <h2>Demande de devis</h2>
      ${row('Entreprise', data.organization)}
      ${row('Contact', data.fullName)}
      ${row('E-mail', data.email)}
      ${row('Téléphone', data.phone ?? 'Non renseigné')}
      ${row('Offre', data.offer ? OFFER_LABELS[data.offer] : 'Non précisée')}
      ${row('Taille du groupe', GROUP_SIZE_LABELS[data.groupSize])}
      ${row('Période', data.period)}
      ${row('Lieu', data.location ?? 'Non précisé')}
      ${row('Message', data.message ?? 'Aucun message')}
    `,
  };
}

export function buildQuoteAcknowledgement(data: DevisInput): OutgoingEmail {
  return {
    to: data.email,
    subject: 'Votre demande a bien été reçue',
    html: `
      <p>Bonjour ${escapeHtml(data.fullName)},</p>
      <p>Merci pour votre demande. Nous revenons vers vous sous 48 h pour en parler par téléphone.</p>
      <p>L'équipe Maison La Recette</p>
    `,
  };
}

export async function sendQuoteRequest(data: DevisInput): Promise<void> {
  await sendWithAcknowledgement(
    buildQuoteNotification(data, getEmailConfig().to),
    buildQuoteAcknowledgement(data),
  );
}
