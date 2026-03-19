/**
 * Utilidades para optimización de imágenes antes de subirlas a Supabase
 */

interface ImageOptions {
  maxWidth?: number
  maxSize?: number // in KB
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
}

/**
 * Optimiza una imagen antes de subirla
 * @param file - Archivo de imagen original
 * @param options - Opciones de optimización
 * @returns Promise<File> - Archivo optimizado
 */
export async function optimizeImage(
  file: File, 
  options: ImageOptions = {}
): Promise<File> {
  const {
    maxWidth = 1200,
    maxSize = 300, // 300KB
    quality = 0.85,
    format = 'webp'
  } = options

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      try {
        // Calcular nuevas dimensiones manteniendo aspect ratio
        let { width, height } = calculateDimensions(img.width, img.height, maxWidth)
        
        canvas.width = width
        canvas.height = height

        // Dibujar imagen redimensionada
        ctx?.drawImage(img, 0, 0, width, height)

        // Convertir al formato deseado
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error('Error al procesar la imagen'))
              return
            }

            // Si el blob es muy grande, reducir calidad
            let optimizedBlob = blob
            let currentQuality = quality

            while (optimizedBlob.size > maxSize * 1024 && currentQuality > 0.1) {
              currentQuality -= 0.1
              
              const newBlob = await new Promise<Blob>((resolve) => {
                canvas.toBlob(
                  (result) => resolve(result!),
                  `image/${format}`,
                  currentQuality
                )
              })
              
              optimizedBlob = newBlob
            }

            // Crear nuevo File con el blob optimizado
            const optimizedFile = new File(
              [optimizedBlob],
              `${file.name.split('.')[0]}.${format}`,
              { type: `image/${format}` }
            )

            resolve(optimizedFile)
          },
          `image/${format}`,
          quality
        )
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => reject(new Error('Error al cargar la imagen'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Calcula las dimensiones manteniendo el aspect ratio
 */
function calculateDimensions(
  originalWidth: number, 
  originalHeight: number, 
  maxWidth: number
): { width: number; height: number } {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight }
  }

  const aspectRatio = originalHeight / originalWidth
  const newWidth = maxWidth
  const newHeight = Math.round(newWidth * aspectRatio)

  return { width: newWidth, height: newHeight }
}

/**
 * Verifica si el navegador soporta WebP
 */
export function supportsWebP(): boolean {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

/**
 * Obtiene el mejor formato soportado
 */
export function getBestFormat(): 'webp' | 'jpeg' {
  return supportsWebP() ? 'webp' : 'jpeg'
}

/**
 * Optimiza múltiples imágenes en paralelo
 */
export async function optimizeImages(
  files: File[], 
  options?: ImageOptions
): Promise<File[]> {
  const optimizedFiles = await Promise.all(
    files.map(file => optimizeImage(file, options))
  )
  return optimizedFiles
}
