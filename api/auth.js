import { randomUUID } from 'node:crypto'
import { db } from './_lib/db.js'
import { body, json, methodNotAllowed } from './_lib/http.js'
import { createSession, currentAdmin, destroySession, verifyPassword } from './_lib/auth.js'
import { ensureDatabase } from './_lib/setup.js'

export default async function handler(req, res) {
  try {
    await ensureDatabase()
    if (req.method === 'GET') {
      const user = await currentAdmin(req)
      return json(res, 200, { authenticated: Boolean(user), user })
    }

    if (req.method === 'POST') {
      const input = body(req)
      const email = String(input.email || '').trim().toLowerCase()
      const password = String(input.password || '')
      if (!email || !password) return json(res, 400, { error: 'Informe e-mail e senha.' })

      const sql = db()
      const users = await sql`select id, email, password_hash from admin_users where lower(email) = ${email} limit 1`
      const user = users[0]
      if (!user || !(await verifyPassword(password, user.password_hash))) {
        return json(res, 401, { error: 'E-mail ou senha inválidos.' })
      }

      await sql`delete from admin_sessions where expires_at <= now()`
      await createSession(res, user.id)
      return json(res, 200, { authenticated: true, user: { id: user.id, email: user.email } })
    }

    if (req.method === 'DELETE') {
      await destroySession(req, res)
      return json(res, 200, { ok: true })
    }

    return methodNotAllowed(res, ['GET', 'POST', 'DELETE'])
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha na autenticação.' })
  }
}
