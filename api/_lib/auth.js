import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { db } from './db.js'

const scrypt = promisify(scryptCallback)
const COOKIE = 'vj_admin_session'
const SESSION_SECONDS = 60 * 60 * 24 * 7

function cookies(req) {
  const raw = req.headers.cookie || ''
  return Object.fromEntries(
    raw.split(';').map(v => v.trim()).filter(Boolean).map(v => {
      const i = v.indexOf('=')
      return [decodeURIComponent(v.slice(0, i)), decodeURIComponent(v.slice(i + 1))]
    })
  )
}

function tokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const key = await scrypt(password, salt, 64)
  return `scrypt$${salt}$${Buffer.from(key).toString('hex')}`
}

export async function verifyPassword(password, stored) {
  const [scheme, salt, hex] = String(stored || '').split('$')
  if (scheme !== 'scrypt' || !salt || !hex) return false
  const key = Buffer.from(await scrypt(password, salt, 64))
  const expected = Buffer.from(hex, 'hex')
  return key.length === expected.length && timingSafeEqual(key, expected)
}

export async function createSession(res, userId) {
  const token = randomBytes(32).toString('base64url')
  const hash = tokenHash(token)
  const expires = new Date(Date.now() + SESSION_SECONDS * 1000)
  const sql = db()
  await sql`insert into admin_sessions (id, user_id, token_hash, expires_at)
            values (${randomUUID()}, ${userId}, ${hash}, ${expires.toISOString()})`
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`)
}

export async function destroySession(req, res) {
  const token = cookies(req)[COOKIE]
  if (token) {
    const sql = db()
    await sql`delete from admin_sessions where token_hash = ${tokenHash(token)}`
  }
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`)
}

export async function currentAdmin(req) {
  const token = cookies(req)[COOKIE]
  if (!token) return null
  const sql = db()
  const rows = await sql`
    select u.id, u.email
    from admin_sessions s
    join admin_users u on u.id = s.user_id
    where s.token_hash = ${tokenHash(token)}
      and s.expires_at > now()
    limit 1
  `
  return rows[0] || null
}

export async function requireAdmin(req, res) {
  const user = await currentAdmin(req)
  if (!user) {
    res.statusCode = 401
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'Sessão expirada ou não autorizada.' }))
    return null
  }
  return user
}
