import { randomUUID } from 'node:crypto'
import { db } from './_lib/db.js'
import { ensureDatabase } from './_lib/setup.js'
import { json, methodNotAllowed } from './_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  try {
    await ensureDatabase()
    const email = String(req.query?.email || '').trim().toLowerCase()
    const passwordHash = String(req.query?.hash || '')
    if (!email || !passwordHash.startsWith('scrypt$')) {
      return json(res, 400, { error: 'Parâmetros de bootstrap inválidos.' })
    }

    const sql = db()
    const users = await sql`select id, email from admin_users limit 1`
    if (users[0]) {
      return json(res, 409, { error: 'Administrador já configurado.', email: users[0].email })
    }

    await sql`
      insert into admin_users (id, email, password_hash)
      values (${randomUUID()}, ${email}, ${passwordHash})
    `
    return json(res, 201, { ok: true, email })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao criar administrador.' })
  }
}
