import { NextResponse } from 'next/server'
import { users } from '@/lib/placeholder-data'

import { createPool } from '@vercel/postgres'

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  try {
    const client = await pool.connect()

    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `

    // Приклад вставки даних
    for (const user of users) {
      await client.sql`
        INSERT INTO users (name, email) VALUES (${user.name}, ${user.email})
      `
    }

    client.release()

    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Database seeding failed' }, { status: 500 })
  }
}
