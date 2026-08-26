export function getObjectPositionCssValue(position) {
  if (typeof position === 'number') return `center ${position}%`
  if (typeof position === 'string') return position
  return 'center'
}
