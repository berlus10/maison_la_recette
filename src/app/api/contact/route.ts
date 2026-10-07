import { NextResponse } from 'next/server';
import { contactSchema } from '../../../lib/validation/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.honeypot) {
      return NextResponse.json(
        { ok: false, message: 'Invalid payload' },
        { status: 400 },
      );
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, data: parsed.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
