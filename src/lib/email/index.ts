import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

type QuoteNotification = {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: string;
  peopleCount: number;
  message: string;
  callbackWindow?: string;
};

export async function sendQuoteNotification(data: QuoteNotification) {
  const to = process.env.CONTACT_TO_EMAIL ?? 'julie@maisonlarecette.fr';

  await resend.emails.send({
    from: 'Maison La Recette <noreply@maisonlarecette.fr>',
    to,
    subject: `Nouvelle demande de devis — ${data.company}`,
    html: `
      <h2>Demande de devis</h2>
      <p><strong>Entreprise :</strong> ${data.company}</p>
      <p><strong>Contact :</strong> ${data.contactName}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone}</p>
      <p><strong>Type :</strong> ${data.eventType}</p>
      <p><strong>Nombre de personnes :</strong> ${data.peopleCount}</p>
      <p><strong>Créneau :</strong> ${data.callbackWindow ?? 'Non spécifié'}</p>
      <p><strong>Message :</strong> ${data.message}</p>
    `,
  });

  await resend.emails.send({
    from: 'Maison La Recette <noreply@maisonlarecette.fr>',
    to: data.email,
    subject: 'Votre demande a bien été reçue',
    html: `
      <p>Bonjour ${data.contactName},</p>
      <p>Merci pour votre message.</p>
      <p>Nous reviendrons vers vous sous 48h.</p>
    `,
  });
}
