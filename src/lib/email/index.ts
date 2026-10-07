import { Resend } from 'resend';
import {
  GROUP_SIZE_LABELS,
  OFFER_LABELS,
  type DevisInput,
} from '../validation/devis';

type QuoteNotification = DevisInput;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

export async function sendQuoteNotification(data: QuoteNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not defined');
  }
  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL ?? 'julie@maisonlarecette.fr';
  const fullName = escapeHtml(data.fullName);
  const organization = escapeHtml(data.organization);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone ?? 'Non renseigné');
  const groupSize = GROUP_SIZE_LABELS[data.groupSize];
  const period = escapeHtml(data.period);
  const location = escapeHtml(data.location ?? 'Non précisé');
  const offer = data.offer ? OFFER_LABELS[data.offer] : 'Non précisée';
  const message = escapeHtml(data.message ?? 'Aucun message');

  await resend.emails.send({
    from: 'Maison La Recette <noreply@maisonlarecette.fr>',
    to,
    subject: `Nouvelle demande de devis — ${data.organization}`,
    html: `
      <h2>Demande de devis</h2>
      <p><strong>Entreprise :</strong> ${organization}</p>
      <p><strong>Contact :</strong> ${fullName}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Offre :</strong> ${offer}</p>
      <p><strong>Taille du groupe :</strong> ${groupSize}</p>
      <p><strong>Période :</strong> ${period}</p>
      <p><strong>Lieu :</strong> ${location}</p>
      <p><strong>Message :</strong> ${message}</p>
    `,
  });

  await resend.emails.send({
    from: 'Maison La Recette <noreply@maisonlarecette.fr>',
    to: data.email,
    subject: 'Votre demande a bien été reçue',
    html: `
      <p>Bonjour ${fullName},</p>
      <p>Merci pour votre message.</p>
      <p>Nous reviendrons vers vous sous 48h.</p>
    `,
  });
}
