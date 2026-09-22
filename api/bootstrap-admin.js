import { randomUUID } from 'node:crypto'
import { db } from './_lib/db.js'
import { hashPassword } from './_lib/auth.js'
import { ensureDatabase } from './_lib/setup.js'
import { body, json, methodNotAllowed } from './_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST'])
  try {
    await ensureDatabase()
    const input = body(req)
    const email = String(input.email || '').trim().toLowerCase()
    const password = String(input.password || '')
    if (!email || password.length < 8) {
      return json(res, 400, { error: 'Informe um e-mail válido e senha com pelo menos 8 caracteres.' })
    }

    const sql = db()
    const users = await sql`select id, email from admin_users limit 1`
    if (users[0]) {
      return json(res, 409, { error: 'Administrador já configurado.', email: users[0].email })
    }

    const passwordHash = await hashPassword(password)
    await sql`
      insert into admin_users (id, email, password_hash)
      values (${randomUUID()}, ${email}, ${passwordHash})
    `
    return json(res, 201, { ok: true, email })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao criar administrador.' })
  }
}
