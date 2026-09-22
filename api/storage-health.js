import { randomUUID } from 'node:crypto'
import { del, issueSignedToken, presignUrl, put } from '@vercel/blob'
import { json, methodNotAllowed } from './_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  const pathname = `health/${randomUUID()}.txt`
  try {
    const blob = await put(pathname, 'ok', { access: 'private' })
    const token = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil: Date.now() + 5 * 60 * 1000,
      storeId: process.env.BLOB_STORE_ID,
    })
    const { presignedUrl } = await presignUrl(token, {
      pathname,
      operation: 'get',
      validUntil: Date.now() + 60 * 1000,
    })
    const read = await fetch(presignedUrl)
    const body = await read.text()
    await del(blob.url)
    return json(res, 200, {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      blobWriteOk: true,
      blobSignedReadOk: read.ok && body === 'ok',
      blobStoreIdPresent: Boolean(process.env.BLOB_STORE_ID),
    })
  } catch (error) {
    return json(res, 500, {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      blobWriteOk: false,
      blobStoreIdPresent: Boolean(process.env.BLOB_STORE_ID),
      error: error.message || 'Falha no teste do Blob.',
    })
  }
}
