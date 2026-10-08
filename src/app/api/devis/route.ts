import { createFormHandler } from '../../../lib/api/form-handler';
import { sendQuoteRequest } from '../../../lib/email';
import { devisSchema } from '../../../lib/validation/devis';

export const POST = createFormHandler({
  label: 'api/devis',
  schema: devisSchema,
  honeypotField: 'website',
  send: sendQuoteRequest,
});
