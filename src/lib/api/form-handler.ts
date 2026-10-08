import { NextResponse } from 'next/server';
import { z } from 'zod';

type FormHandlerOptions<T> = {
  /** Nom utilisé dans les journaux d'erreur, par exemple « api/devis ». */
  label: string;
  schema: z.ZodType<T>;
  /** Champ piège : un humain le laisse vide, un robot le remplit. */
  honeypotField: string;
  send: (data: T) => Promise<void>;
};

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function isFilled(body: unknown, field: string): boolean {
  if (typeof body !== 'object' || body === null) return false;
  const value = (body as Record<string, unknown>)[field];
  return typeof value === 'string' && value.length > 0;
}

function failure(message: string, status: number, extra?: object) {
  return NextResponse.json({ ok: false, message, ...extra }, { status });
}

/**
 * Fabrique le gestionnaire POST d'un formulaire :
 * lecture du JSON, champ piège, validation Zod, envoi, réponse.
 */
export function createFormHandler<T>({
  label,
  schema,
  honeypotField,
  send,
}: FormHandlerOptions<T>) {
  return async function POST(request: Request) {
    const body = await readJson(request);
    if (body === null) {
      return failure('Requête invalide', 400);
    }

    // Robot détecté : on répond « ok » sans rien envoyer, pour ne pas l'informer.
    if (isFilled(body, honeypotField)) {
      return NextResponse.json({ ok: true });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return failure('Formulaire invalide', 400, {
        errors: z.flattenError(parsed.error),
      });
    }

    try {
      await send(parsed.data);
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error(`[${label}] envoi impossible`, error);
      return failure("L'envoi a échoué. Réessayez dans un instant.", 502);
    }
  };
}
