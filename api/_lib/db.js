import { neon } from '@neondatabase/serverless'

let sqlClient = null

function connectionString() {
  return process.env.DATABASE_POSTGRES_URL
    || process.env.DATABASE_URL
    || process.env.DATABASE_POSTGRES_PRISMA_URL
    || process.env.DATABASE_URL_UNPOOLED
    || process.env.DATABASE_POSTGRES_URL_NON_POOLING
}

export function db() {
  const url = connectionString()
  if (!url) {
    throw new Error('Conexão do banco não configurada. Defina DATABASE_URL (ou DATABASE_POSTGRES_URL) na Vercel.')
  }
  if (!sqlClient) sqlClient = neon(url)
  return sqlClient
}
