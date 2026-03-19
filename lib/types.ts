// Supabase database types for Mueblería La Familia
// Matches existing database schema

export interface Categoria {
  id: string
  nombre: string
}

export interface Color {
  id: string
  nombre: string
}

export interface Producto {
  id: string
  nombre: string
  descripcion: string | null
  imagenes: string[] | null
  categoria_id: string
  tags: string[] | null
  categorias?: Categoria
  variantes?: Variante[]
}

export interface Variante {
  id: string
  producto_id: string
  medida: string
  color_id: string
  precio_lista: number
  precio_oferta: number
  es_oferta: boolean
  stock_cantidad: number
  colores?: Color
}

export interface ProductoConVariantes extends Producto {
  variantes: (Variante & { colores: Color })[]
  precio_minimo: number
  tiene_stock: boolean
  tiene_oferta: boolean
}

// WhatsApp message builder
export function buildWhatsAppUrl(
  producto: string,
  medida?: string,
  color?: string,
  precio?: number
): string {
  const phone = "5491171243414"
  let mensaje = `Hola, te consulto por este mueble: ${producto}`
  
  if (medida) mensaje += ` - Medida: ${medida}`
  if (color) mensaje += ` - Color: ${color}`
  if (precio) mensaje += ` - Precio: $${precio.toLocaleString('es-AR')}`
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
}

export function buildCustomWhatsAppUrl(mensaje: string): string {
  const phone = "5491171243414"
  return `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
}

// Price formatting
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Color mapping (since DB doesn't have hex codes)
export const colorHexMap: Record<string, string> = {
  "natural": "#D4A574",
  "miel": "#C8A25D",
  "roble": "#8B6914",
  "nogal": "#5C4033",
  "caoba": "#4D2F28",
  "wengue": "#3C2415",
  "blanco": "#FFFFFF",
  "negro": "#1A1A1A",
  "gris": "#808080",
  "cerezo": "#8B0000",
}

export function getColorHex(colorName: string): string {
  const normalizedName = colorName.toLowerCase().trim()
  return colorHexMap[normalizedName] || "#D4A574"
}
