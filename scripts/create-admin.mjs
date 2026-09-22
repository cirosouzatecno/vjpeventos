import { randomUUID } from 'node:crypto'
import { neon } from '@neondatabase/serverless'
import { hashPassword } from '../api/_lib/auth.js'

const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = String(process.env.ADMIN_PASSWORD || '')

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não encontrada.')
  process.exit(1)
}
if (!email || !password) {
  console.error('Defina ADMIN_EMAIL e ADMIN_PASSWORD somente para executar este comando.')
  process.exit(1)
}
if (password.length < 10) {
  console.error('A senha administrativa deve ter pelo menos 10 caracteres.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const hash = await hashPassword(password)
const existing = await sql`select id from admin_users where lower(email) = ${email} limit 1`

if (existing[0]) {
  await sql`update admin_users set password_hash = ${hash}, updated_at = now() where id = ${existing[0].id}`
  console.log('Senha do administrador atualizada.')
} else {
  await sql`insert into admin_users (id, email, password_hash) values (${randomUUID()}, ${email}, ${hash})`
  console.log('Administrador criado com sucesso.')
}
