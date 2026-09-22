export function json(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(data))
}

export function methodNotAllowed(res, allowed = []) {
  res.setHeader('Allow', allowed.join(', '))
  return json(res, 405, { error: 'Método não permitido.' })
}

export function body(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body) } catch { return {} }
  }
  return req.body
}
