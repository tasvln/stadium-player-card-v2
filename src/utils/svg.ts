export const CARD_WIDTH = 344 * 3
export const CARD_HEIGHT = 476 * 3

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  setTimeout(() => URL.revokeObjectURL(url), 5000)
}

export const downloadCanvas = (canvas: HTMLCanvasElement, fileName: string) => {
  const canvasUrl = canvas.toDataURL('image/png')

  // Creates a link to download the PNG
  const anchor = document.createElement('a')
  anchor.href = canvasUrl
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  setTimeout(() => URL.revokeObjectURL(canvasUrl), 5000)
  // canvas.toBlob((blob) => {
  //   downloadBlob(blob, fileName)
  // })
}

// const loadImage = async (url: string) => {
//   const img = document.createElement('img')
//   img.src = url
//   return new Promise((resolve, reject) => {
//     img.onload = () => resolve(img)
//     img.onerror = reject
//   })
// }

export const loadImage = (path: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
    img.src = path

    img.width = CARD_WIDTH
    img.height = CARD_HEIGHT

    img.onload = () => {
      resolve(img)
    }
    img.onerror = (e) => {
      // eslint-disable-next-line no-console
      console.log('image error', e)
      reject(e)
    }
  })
}
