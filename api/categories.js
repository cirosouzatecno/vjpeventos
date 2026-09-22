import { randomUUID } from 'node:crypto'
import { db } from './_lib/db.js'
import { requireAdmin } from './_lib/auth.js'
import { body, json, methodNotAllowed } from './_lib/http.js'
import { ensureDatabase } from './_lib/setup.js'

function slugify(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default async function handler(req, res) {
  await ensureDatabase()
  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const sql = db()
    if (req.method === 'GET') {
      const categories = await sql`select * from categories order by sort_order asc, name asc`
      return json(res, 200, { categories })
    }

    if (req.method === 'POST') {
      const input = body(req)
      const id = randomUUID()
      const name = String(input.name || '').trim()
      const slug = slugify(input.slug || name)
      if (!name || !slug) return json(res, 400, { error: 'Nome e slug são obrigatórios.' })
      await sql`
        insert into categories (id, name, slug, route_path, sort_order, is_active)
        values (${id}, ${name}, ${slug}, ${input.route_path || null}, ${Number(input.sort_order) || 0}, ${input.is_active !== false})
      `
      return json(res, 201, { id })
    }

    if (req.method === 'PATCH') {
      const input = body(req)
      if (!input.id) return json(res, 400, { error: 'ID obrigatório.' })
      const name = String(input.name || '').trim()
      const slug = slugify(input.slug || name)
      await sql`
        update categories
        set name = ${name}, slug = ${slug}, route_path = ${input.route_path || null},
            sort_order = ${Number(input.sort_order) || 0}, is_active = ${input.is_active !== false}, updated_at = now()
        where id = ${input.id}
      `
      return json(res, 200, { ok: true })
    }

    if (req.method === 'DELETE') {
      const id = String(req.query?.id || '')
      if (!id) return json(res, 400, { error: 'ID obrigatório.' })
      const used = await sql`select count(*)::int as total from media_items where category_id = ${id}`
      if ((used[0]?.total || 0) > 0) return json(res, 409, { error: 'Mova ou exclua as mídias desta categoria antes de removê-la.' })
      await sql`delete from categories where id = ${id}`
      return json(res, 200, { ok: true })
    }

    return methodNotAllowed(res, ['GET', 'POST', 'PATCH', 'DELETE'])
  } catch (error) {
    const message = error.code === '23505' ? 'Já existe uma categoria com esse slug.' : (error.message || 'Falha ao salvar categoria.')
    return json(res, 500, { error: message })
  }
}
