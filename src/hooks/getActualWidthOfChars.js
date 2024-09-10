export function getActualWidthOfChars(text, options = {}) {
  const { size = 14, family = 'Honeywell Sans Web, Verdana, sans-serif' } = options

  let canvas = document.createElement('canvas')

  const ctx = canvas.getContext('2d')

  ctx.font = `${size}px ${family}`

  const metrics = ctx.measureText(text)

  const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight)

  canvas = null

  return Math.max(metrics.width, actual)
}

export function getmaxvalueLength(Array = [], Array2 = []) {
  let max = ''
  for (let i = 0; i < Array.length; i++) {
    Array[i].value.toString().length > max.toString().length && (max = Array[i].value)
  }
  for (let i = 0; i < Array2.length; i++) {
    Array2[i].value.toString().length > max.toString().length && (max = Array2[i].value)
  }
  console.log('max的值为', max, Array)
  if (max == '0.00') {
    max = '0.00000'
  }
  return max
}
