import { randomUUID } from 'node:crypto'
import { db } from './_lib/db.js'
import { json, methodNotAllowed } from './_lib/http.js'
import { ensureDatabase } from './_lib/setup.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  try {
    await ensureDatabase()
    const email = String(req.query?.email || '').trim().toLowerCase()
    const passwordHash = String(req.query?.hash || '')
    if (!email || !passwordHash.startsWith('scrypt$')) {
      return json(res, 400, { error: 'Parâmetros inválidos.' })
    }

    const sql = db()
    const existing = await sql`
      select id, email
      from admin_users
      where lower(email) = ${email}
      limit 1
    `

    let user
    if (existing[0]) {
      const rows = await sql`
        update admin_users
        set password_hash = ${passwordHash}, updated_at = now()
        where id = ${existing[0].id}
        returning id, email
      `
      user = rows[0]
    } else {
      const rows = await sql`
        insert into admin_users (id, email, password_hash)
        values (${randomUUID()}, ${email}, ${passwordHash})
        returning id, email
      `
      user = rows[0]
    }

    await sql`delete from admin_sessions where user_id = ${user.id}`
    return json(res, 200, { ok: true, email: user.email })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao redefinir credenciais.' })
  }
}
