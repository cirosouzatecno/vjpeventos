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
    const rows = await sql`
      update admin_users
      set password_hash = ${passwordHash}, updated_at = now()
      where lower(email) = ${email}
      returning id, email
    `
    if (!rows[0]) return json(res, 404, { error: 'Administrador não encontrado.' })
    await sql`delete from admin_sessions where user_id = ${rows[0].id}`
    return json(res, 200, { ok: true, email: rows[0].email })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao redefinir credenciais.' })
  }
}
