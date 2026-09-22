import { randomUUID } from 'node:crypto'
import { del, issueSignedToken, presignUrl } from '@vercel/blob'
import { json, methodNotAllowed } from './_lib/http.js'

function rawBlobUrl(pathname) {
  const storeId = String(process.env.BLOB_STORE_ID || '').replace(/^store_/, '')
  const encoded = pathname.split('/').map(encodeURIComponent).join('/')
  return `https://${storeId}.private.blob.vercel-storage.com/${encoded}`
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  const pathname = `health/${randomUUID()}.txt`
  const blobUrl = rawBlobUrl(pathname)
  let step = 'issue-put'
  try {
    const putUntil = Date.now() + 5 * 60 * 1000
    const putToken = await issueSignedToken({
      pathname,
      operations: ['put'],
      validUntil: putUntil,
      allowedContentTypes: ['text/plain'],
      maximumSizeInBytes: 1024,
      storeId: process.env.BLOB_STORE_ID,
    })
    step = 'presign-put'
    const { presignedUrl: uploadUrl } = await presignUrl(putToken, {
      pathname,
      operation: 'put',
      access: 'private',
      validUntil: putUntil,
      allowedContentTypes: ['text/plain'],
      maximumSizeInBytes: 1024,
    })
    step = 'put'
    const putResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'content-type': 'text/plain' },
      body: 'ok',
    })
    if (!putResponse.ok) throw new Error(`PUT retornou ${putResponse.status}`)

    step = 'issue-get'
    const getUntil = Date.now() + 5 * 60 * 1000
    const getToken = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil: getUntil,
      storeId: process.env.BLOB_STORE_ID,
    })
    step = 'presign-get'
    const { presignedUrl: readUrl } = await presignUrl(getToken, {
      pathname,
      operation: 'get',
      access: 'private',
      validUntil: Date.now() + 60 * 1000,
    })
    step = 'get'
    const readResponse = await fetch(readUrl)
    const text = await readResponse.text()
    if (!readResponse.ok || text !== 'ok') throw new Error(`GET retornou ${readResponse.status}`)

    step = 'delete'
    await del(blobUrl)
    return json(res, 200, {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      blobStoreIdPresent: Boolean(process.env.BLOB_STORE_ID),
      signedPutOk: true,
      signedGetOk: true,
      deleteOk: true,
    })
  } catch (error) {
    try { await del(blobUrl) } catch {}
    return json(res, 500, {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      blobStoreIdPresent: Boolean(process.env.BLOB_STORE_ID),
      failedStep: step,
      causeCode: error?.cause?.code || null,
      error: error.message || 'Falha no teste do Blob.',
    })
  }
}
