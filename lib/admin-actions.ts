import { createClient } from './supabase/client'
import { Producto, Variante, Categoria, Color } from './types'

// Funciones CRUD para Productos
export async function createProducto(producto: Omit<Producto, 'id'>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('productos')
    .insert(producto)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProducto(id: string, producto: Partial<Producto>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('productos')
    .update(producto)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProducto(id: string) {
  const supabase = createClient()
  
  // Primero eliminar variantes
  await supabase.from('variantes').delete().eq('producto_id', id)
  
  // Luego eliminar el producto
  const { error } = await supabase.from('productos').delete().eq('id', id)
  
  if (error) throw error
}

export async function getProductoById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('productos')
    .select(`
      *,
      categorias (*),
      variantes (
        *,
        colores (*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Funciones CRUD para Variantes
export async function createVariante(variante: Omit<Variante, 'id'>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('variantes')
    .insert(variante)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateVariante(id: string, variante: Partial<Variante>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('variantes')
    .update(variante)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteVariante(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase.from('variantes').delete().eq('id', id)
  
  if (error) throw error
}

// Funciones para obtener datos de referencia
export async function getCategorias() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre')

  if (error) throw error
  return data || []
}

export async function getColores() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('colores')
    .select('*')
    .order('nombre')

  if (error) throw error
  return data || []
}

// Upload de imágenes a Supabase Storage
export async function uploadImage(file: File, bucket: string = 'fotos-muebles') {
  const supabase = createClient()
  
  // Generar nombre único para el archivo
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${fileName}`

  // Subir archivo
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deleteImage(url: string, bucket: string = 'fotos-muebles') {
  const supabase = createClient()
  
  // Extraer el path del archivo de la URL
  const urlParts = url.split('/')
  const fileName = urlParts[urlParts.length - 1]
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) throw error
}

// Función para guardar producto con variantes en una transacción
export async function saveProductoConVariantes(
  producto: Omit<Producto, 'id'>,
  variantes: Omit<Variante, 'id' | 'producto_id'>[]
) {
  const supabase = createClient()
  
  try {
    // Crear el producto
    const { data: nuevoProducto, error: productoError } = await supabase
      .from('productos')
      .insert(producto)
      .select()
      .single()

    if (productoError) throw productoError

    // Crear las variantes
    const variantesConProductoId = variantes.map(variante => ({
      ...variante,
      producto_id: nuevoProducto.id
    }))

    const { data: nuevasVariantes, error: variantesError } = await supabase
      .from('variantes')
      .insert(variantesConProductoId)
      .select()

    if (variantesError) throw variantesError

    return {
      producto: nuevoProducto,
      variantes: nuevasVariantes
    }
  } catch (error) {
    throw error
  }
}

// Función para actualizar producto con variantes
export async function updateProductoConVariantes(
  productoId: string,
  producto: Partial<Producto>,
  variantes: (Variante & { deleted?: boolean })[]
) {
  const supabase = createClient()
  
  try {
    // Actualizar el producto
    const { data: productoActualizado, error: productoError } = await supabase
      .from('productos')
      .update(producto)
      .eq('id', productoId)
      .select()
      .single()

    if (productoError) throw productoError

    // Procesar variantes
    for (const variante of variantes) {
      if (variante.deleted) {
        // Eliminar variante
        await deleteVariante(variante.id)
      } else if (variante.id) {
        // Actualizar variante existente
        const { id, deleted, ...varianteData } = variante
        await updateVariante(id, varianteData)
      } else {
        // Crear nueva variante
        const { id, deleted, ...varianteData } = variante
        await createVariante({
          ...varianteData,
          producto_id: productoId
        } as Omit<Variante, 'id'>)
      }
    }

    return productoActualizado
  } catch (error) {
    throw error
  }
}
