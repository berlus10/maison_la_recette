import { createFormHandler } from '../../../lib/api/form-handler';
import { sendContactMessage } from '../../../lib/email';
import { contactSchema } from '../../../lib/validation/contact';

export const POST = createFormHandler({
  label: 'api/contact',
  schema: contactSchema,
  honeypotField: 'honeypot',
  send: sendContactMessage,
});
