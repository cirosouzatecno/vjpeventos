import { json, methodNotAllowed } from './_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])
  return json(res, 200, {
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  })
}
