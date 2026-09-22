import { randomUUID } from 'node:crypto'
import { del, issueSignedToken, presignUrl, put } from '@vercel/blob'
import { json, methodNotAllowed } from './_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  const pathname = `health/${randomUUID()}.txt`
  let blob = null
  let presignedUrl = ''
  let step = 'put'
  try {
    blob = await put(pathname, 'ok', { access: 'private' })
    step = 'issue-token'
    const token = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil: Date.now() + 5 * 60 * 1000,
      storeId: process.env.BLOB_STORE_ID,
    })
    step = 'presign'
    const signed = await presignUrl(token, {
      pathname,
      operation: 'get',
      validUntil: Date.now() + 60 * 1000,
    })
    presignedUrl = signed.presignedUrl
    step = 'read'
    const read = await fetch(presignedUrl)
    const body = await read.text()
    step = 'delete'
    await del(blob.url)
    return json(res, 200, {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      blobWriteOk: true,
      blobSignedReadOk: read.ok && body === 'ok',
      blobStoreIdPresent: Boolean(process.env.BLOB_STORE_ID),
      signedHost: new URL(presignedUrl).hostname,
    })
  } catch (error) {
    if (blob?.url) {
      try { await del(blob.url) } catch {}
    }
    return json(res, 500, {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      blobStoreIdPresent: Boolean(process.env.BLOB_STORE_ID),
      failedStep: step,
      signedHost: presignedUrl ? new URL(presignedUrl).hostname : null,
      causeCode: error?.cause?.code || null,
      causeMessage: error?.cause?.message || null,
      error: error.message || 'Falha no teste do Blob.',
    })
  }
}
