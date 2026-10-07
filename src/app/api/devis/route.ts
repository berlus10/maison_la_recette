import { NextResponse } from 'next/server';
import { devisSchema } from '../../../lib/validation/devis';
import { sendQuoteNotification } from '../../../lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.honeypot) {
      return NextResponse.json(
        { ok: false, message: 'Invalid payload' },
        { status: 400 },
      );
    }

    const parsed = devisSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await sendQuoteNotification(parsed.data);

    return NextResponse.json({ ok: true, data: parsed.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
