import { issueSignedToken, presignUrl } from '@vercel/blob'

function isPrivateBlobUrl(value) {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.hostname.endsWith('.blob.vercel-storage.com')
  } catch {
    return false
  }
}

function pathnameFromUrl(value) {
  const url = new URL(value)
  return decodeURIComponent(url.pathname.replace(/^\//, ''))
}

async function createReadToken() {
  if (!process.env.BLOB_STORE_ID) {
    throw new Error('BLOB_STORE_ID não configurado na Vercel.')
  }
  return issueSignedToken({
    pathname: '*',
    operations: ['get'],
    validUntil: Date.now() + 60 * 60 * 1000,
    storeId: process.env.BLOB_STORE_ID,
    oidcToken: process.env.VERCEL_OIDC_TOKEN,
  })
}

async function signedUrl(token, value) {
  if (!isPrivateBlobUrl(value)) return value || null
  const { presignedUrl } = await presignUrl(token, {
    pathname: pathnameFromUrl(value),
    operation: 'get',
    validUntil: Date.now() + 60 * 60 * 1000,
  })
  return presignedUrl
}

export async function withSignedDisplayUrls(items = []) {
  const needsToken = items.some((item) => isPrivateBlobUrl(item.image_url))
  if (!needsToken) {
    return items.map((item) => ({ ...item, display_url: item.image_url || null }))
  }
  const token = await createReadToken()
  return Promise.all(items.map(async (item) => ({
    ...item,
    display_url: await signedUrl(token, item.image_url),
  })))
}

export async function withSignedPublicUrls(items = []) {
  const needsToken = items.some((item) => isPrivateBlobUrl(item.image_url))
  if (!needsToken) return items
  const token = await createReadToken()
  return Promise.all(items.map(async (item) => ({
    ...item,
    image_url: await signedUrl(token, item.image_url),
  })))
}
