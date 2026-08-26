export function buildWhatsAppUrl(number, message, isEnabled) {
  if (!number) return null
  if (isEnabled === false) return null
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${query}`
}
