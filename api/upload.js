import { handleUpload } from '@vercel/blob/client'
import { requireAdmin } from './_lib/auth.js'
import { json, methodNotAllowed } from './_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST'])

  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const admin = await requireAdmin(req, res)
        if (!admin) throw new Error('Não autorizado.')
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'],
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ adminId: admin.id, pathname }),
        }
      },
      onUploadCompleted: async () => {},
    })
    return json(res, 200, result)
  } catch (error) {
    if (!res.writableEnded) return json(res, 400, { error: error.message || 'Falha no upload.' })
  }
}
