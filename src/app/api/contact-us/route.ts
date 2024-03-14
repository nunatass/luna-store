import { sendContactUsEmail } from '@/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, message } = body;

  const { data, error } = await sendContactUsEmail({ name, email, message });

  if (error) {
    return NextResponse.error();
  }

  return Response.json({ data });
}
