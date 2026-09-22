import { randomUUID } from 'node:crypto'
import { del } from '@vercel/blob'
import { db } from './_lib/db.js'
import { requireAdmin } from './_lib/auth.js'
import { body, json, methodNotAllowed } from './_lib/http.js'
import { ensureDatabase } from './_lib/setup.js'
import { withSignedDisplayUrls } from './_lib/blob.js'

export default async function handler(req, res) {
  try {
    await ensureDatabase()
    const admin = await requireAdmin(req, res)
    if (!admin) return
    const sql = db()
    if (req.method === 'GET') {
      const media = await sql`select * from media_items order by sort_order asc, created_at desc`
      return json(res, 200, { media: await withSignedDisplayUrls(media) })
    }

    if (req.method === 'POST') {
      const input = body(req)
      const id = randomUUID()
      await sql`
        insert into media_items (
          id, category_id, title, caption, alt_text, media_type, image_url,
          youtube_id, featured, published, sort_order
        ) values (
          ${id}, ${input.category_id || null}, ${String(input.title || '').trim()},
          ${input.caption || null}, ${input.alt_text || null}, ${input.media_type || 'image'},
          ${input.image_url || null}, ${input.youtube_id || null}, ${Boolean(input.featured)},
          ${input.published !== false}, ${Number(input.sort_order) || 0}
        )
      `
      return json(res, 201, { id })
    }

    if (req.method === 'PATCH') {
      const input = body(req)
      if (!input.id) return json(res, 400, { error: 'ID obrigatório.' })
      const before = await sql`select image_url from media_items where id = ${input.id} limit 1`
      await sql`
        update media_items
        set category_id = ${input.category_id || null}, title = ${String(input.title || '').trim()},
            caption = ${input.caption || null}, alt_text = ${input.alt_text || null},
            media_type = ${input.media_type || 'image'}, image_url = ${input.image_url || null},
            youtube_id = ${input.youtube_id || null}, featured = ${Boolean(input.featured)},
            published = ${input.published !== false}, sort_order = ${Number(input.sort_order) || 0},
            updated_at = now()
        where id = ${input.id}
      `
      const oldUrl = before[0]?.image_url
      const newUrl = input.image_url || null
      if (oldUrl && oldUrl !== newUrl && oldUrl.includes('.blob.vercel-storage.com')) {
        try { await del(oldUrl) } catch {}
      }
      return json(res, 200, { ok: true })
    }

    if (req.method === 'DELETE') {
      const id = String(req.query?.id || '')
      if (!id) return json(res, 400, { error: 'ID obrigatório.' })
      const rows = await sql`delete from media_items where id = ${id} returning image_url`
      const url = rows[0]?.image_url
      if (url && url.includes('.blob.vercel-storage.com')) {
        try { await del(url) } catch {}
      }
      return json(res, 200, { ok: true })
    }

    return methodNotAllowed(res, ['GET', 'POST', 'PATCH', 'DELETE'])
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao salvar mídia.' })
  }
}
