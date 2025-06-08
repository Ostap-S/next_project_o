import { NextResponse } from 'next/server';

export async function GET() {
  // Перевірка змінної середовища
  const postgresUrl = process.env.POSTGRES_URL;

  if (!postgresUrl) {
    return NextResponse.json({ error: 'POSTGRES_URL not set' }, { status: 500 });
  }

  // Якщо змінна середовища є, повертаємо її значення
  return NextResponse.json({ POSTGRES_URL: postgresUrl });
}
