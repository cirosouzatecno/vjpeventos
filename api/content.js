import { db } from './_lib/db.js'
import { json, methodNotAllowed } from './_lib/http.js'
import { ensureDatabase } from './_lib/setup.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  try {
    await ensureDatabase()
    const sql = db()
    const featured = String(req.query?.featured || '') === '1'
    const category = String(req.query?.category || '')

    if (featured) {
      const items = await sql`
        select m.*
        from media_items m
        where m.published = true and m.featured = true
        order by m.sort_order asc, m.created_at desc
      `
      return json(res, 200, { items })
    }

    if (!category) return json(res, 200, { items: [] })

    const categories = await sql`
      select id, name, slug
      from categories
      where slug = ${category} and is_active = true
      limit 1
    `
    const found = categories[0]
    if (!found) return json(res, 200, { category: null, items: [] })

    const items = await sql`
      select *
      from media_items
      where category_id = ${found.id} and published = true
      order by sort_order asc, created_at desc
    `
    return json(res, 200, { category: found, items })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao consultar conteúdo.' })
  }
}
