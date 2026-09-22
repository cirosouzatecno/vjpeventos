import { issueSignedToken, presignUrl } from '@vercel/blob'
import { currentAdmin } from './_lib/auth.js'
import { body, json, methodNotAllowed } from './_lib/http.js'
import { ensureDatabase } from './_lib/setup.js'

const MAX_SIZE = 50 * 1024 * 1024
const ALLOWED = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/webm', 'video/quicktime',
])

function cleanPathname(value) {
  const pathname = String(value || '').replace(/^\/+/, '')
  if (!pathname || pathname.length > 950 || pathname.includes('..') || pathname.includes('//')) {
    throw new Error('Caminho de arquivo inválido.')
  }
  return pathname
}

function blobUrl(pathname) {
  const storeId = String(process.env.BLOB_STORE_ID || '').replace(/^store_/, '')
  if (!storeId) throw new Error('BLOB_STORE_ID não configurado.')
  const encoded = pathname.split('/').map(encodeURIComponent).join('/')
  return `https://${storeId}.private.blob.vercel-storage.com/${encoded}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST'])

  try {
    await ensureDatabase()
    const admin = await currentAdmin(req)
    if (!admin) return json(res, 401, { error: 'Não autorizado.' })

    const input = body(req)
    const pathname = cleanPathname(input.pathname)
    const contentType = String(input.contentType || 'application/octet-stream').toLowerCase()
    const size = Number(input.size) || 0

    if (!ALLOWED.has(contentType)) return json(res, 400, { error: 'Tipo de arquivo não permitido.' })
    if (size <= 0 || size > MAX_SIZE) return json(res, 400, { error: 'Arquivo excede o limite de 50 MB ou está vazio.' })

    const validUntil = Date.now() + 15 * 60 * 1000
    const token = await issueSignedToken({
      pathname,
      operations: ['put'],
      validUntil,
      allowedContentTypes: [contentType],
      maximumSizeInBytes: MAX_SIZE,
      storeId: process.env.BLOB_STORE_ID,
    })

    const { presignedUrl } = await presignUrl(token, {
      pathname,
      operation: 'put',
      access: 'private',
      validUntil,
      allowedContentTypes: [contentType],
      maximumSizeInBytes: MAX_SIZE,
      addRandomSuffix: false,
    })

    return json(res, 200, {
      uploadUrl: presignedUrl,
      blobUrl: blobUrl(pathname),
    })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Falha ao autorizar upload.' })
  }
}
