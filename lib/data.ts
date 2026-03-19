import { createClient } from "@/lib/supabase/server"
import { Categoria, ProductoConVariantes, Producto, Variante, Color } from "@/lib/types"

export async function getCategories(): Promise<Categoria[]> { //
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre")

  if (error) {
    console.error("[v0] Error fetching categories:", error)
    return []
  }

  return data || []
}

export async function getProducts(options?: {
  categoria?: string
  es_oferta?: boolean
  solo_stock?: boolean
  limit?: number
}): Promise<ProductoConVariantes[]> {
  const supabase = await createClient()

  let query = supabase
    .from("productos")
    .select(`
      *,
      categorias (*),
      variantes (
        *,
        colores (*)
      )
    `)

  if (options?.categoria) {
    query = query.eq("categoria_id", options.categoria)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query.order("nombre")

  if (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }

  // Transform and filter products
  let products = (data || []).map((product: Producto & { variantes: (Variante & { colores: Color })[] }) => {
    const variantes = product.variantes || []
    const precio_minimo = variantes.length > 0
      ? Math.min(...variantes.map((v) => v.precio_oferta))
      : 0
    const tiene_stock = variantes.some((v) => v.stock_cantidad > 0)
    const tiene_oferta = variantes.some((v) => v.es_oferta)

    return {
      ...product,
      precio_minimo,
      tiene_stock,
      tiene_oferta,
    } as ProductoConVariantes
  })

  // Filter by offer if requested (check variantes.es_oferta)
  if (options?.es_oferta) {
    products = products.filter((p) => p.tiene_oferta)
  }

  // Filter by stock if requested
  if (options?.solo_stock) {
    products = products.filter((p) => p.tiene_stock)
  }

  return products
}

export async function getProductById(id: string): Promise<ProductoConVariantes | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("productos")
    .select(`
      *,
      categorias (*),
      variantes (
        *,
        colores (*)
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }

  if (!data) return null

  const variantes = data.variantes || []
  const precio_minimo = variantes.length > 0
    ? Math.min(...variantes.map((v: Variante) => v.precio_oferta))
    : 0
  const tiene_stock = variantes.some((v: Variante) => v.stock_cantidad > 0)
  const tiene_oferta = variantes.some((v: Variante) => v.es_oferta)

  return {
    ...data,
    precio_minimo,
    tiene_stock,
    tiene_oferta,
  } as ProductoConVariantes
}

export async function getColors(): Promise<Color[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("colores")
    .select("*")
    .order("nombre")

  if (error) {
    console.error("[v0] Error fetching colors:", error)
    return []
  }

  return data || []
}
