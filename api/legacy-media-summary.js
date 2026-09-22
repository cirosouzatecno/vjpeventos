import { db } from './_lib/db.js'
import { json, methodNotAllowed } from './_lib/http.js'
import { ensureDatabase } from './_lib/setup.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  try {
    await ensureDatabase()
    const sql = db()
    const total = await sql`select count(*)::int as total from media_items where source_key like 'legacy:%'`
    const grouped = await sql`
      select c.slug, count(*)::int as total
      from media_items m
      left join categories c on c.id = m.category_id
      where m.source_key like 'legacy:%'
      group by c.slug
      order by c.slug
    `
    return json(res, 200, { total: total[0]?.total || 0, grouped })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao conferir migração.' })
  }
}
