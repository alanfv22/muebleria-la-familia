"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductoConVariantes, Variante, Color, formatPrice, buildWhatsAppUrl, getColorHex } from "@/lib/types"

interface ProductVariantSelectorProps {
  product: ProductoConVariantes
}

export function ProductVariantSelector({ product }: ProductVariantSelectorProps) {
  // Get unique measures and colors
  const measures = [...new Set(product.variantes.map((v) => v.medida))]
  const colorMap = new Map<string, Color>()
  product.variantes.forEach((v) => {
    if (v.colores) {
      colorMap.set(v.colores.id, v.colores)
    }
  })
  const colors = Array.from(colorMap.values())

  // State for selected options
  const [selectedMeasure, setSelectedMeasure] = useState<string>(measures[0] || "")
  const [selectedColorId, setSelectedColorId] = useState<string>(colors[0]?.id || "")

  // Find matching variant
  const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)

  useEffect(() => {
    const variant = product.variantes.find(
      (v) => v.medida === selectedMeasure && v.color_id === selectedColorId
    )
    setSelectedVariant(variant || null)
  }, [selectedMeasure, selectedColorId, product.variantes])

  // Get available colors for selected measure
  const availableColorIds = product.variantes
    .filter((v) => v.medida === selectedMeasure)
    .map((v) => v.color_id)

  // Get available measures for selected color
  const availableMeasures = product.variantes
    .filter((v) => v.color_id === selectedColorId)
    .map((v) => v.medida)

  const selectedColor = colors.find((c) => c.id === selectedColorId)
  const hasStock = selectedVariant ? selectedVariant.stock_cantidad > 0 : false
  const isOffer = selectedVariant?.es_oferta || false

  const whatsappUrl = buildWhatsAppUrl(
    product.nombre,
    selectedMeasure,
    selectedColor?.nombre,
    selectedVariant?.precio_oferta
  )

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground sm:text-3xl text-balance">
          {product.nombre}
        </h1>
        {product.categorias && (
          <p className="mt-1 text-sm text-muted-foreground">
            {product.categorias.nombre}
          </p>
        )}
      </div>

      {/* Description */}
      {product.descripcion && (
        <p className="text-foreground/80 leading-relaxed">{product.descripcion}</p>
      )}

      {/* Price */}
      <div className="space-y-1">
        {isOffer && selectedVariant && selectedVariant.precio_lista > selectedVariant.precio_oferta && (
          <p className="text-lg text-muted-foreground line-through">
            {formatPrice(selectedVariant.precio_lista)}
          </p>
        )}
        <p className="text-3xl font-bold text-[#C89B6D]">
          {selectedVariant
            ? formatPrice(selectedVariant.precio_oferta)
            : `Desde ${formatPrice(product.precio_minimo)}`}
        </p>
      </div>

      {/* Measure Selector */}
      {measures.length > 1 && (
        <div className="space-y-2">
          <Label className="font-[family-name:var(--font-poppins)] font-semibold">
            Medida
          </Label>
          <Select value={selectedMeasure} onValueChange={setSelectedMeasure}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar medida" />
            </SelectTrigger>
            <SelectContent>
              {measures.map((measure) => (
                <SelectItem
                  key={measure}
                  value={measure}
                  disabled={!availableMeasures.includes(measure)}
                >
                  {measure}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Color Selector */}
      {colors.length > 1 && (
        <div className="space-y-2">
          <Label className="font-[family-name:var(--font-poppins)] font-semibold">
            Color: {selectedColor?.nombre}
          </Label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const isAvailable = availableColorIds.includes(color.id)
              const isSelected = color.id === selectedColorId
              
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  disabled={!isAvailable}
                  className={`
                    h-10 w-10 rounded-full border-2 transition-all
                    ${isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"}
                    ${!isAvailable ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}
                  `}
                  style={{ backgroundColor: getColorHex(color.nombre) }}
                  title={color.nombre}
                >
                  <span className="sr-only">{color.nombre}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {hasStock ? (
          <Badge className="bg-[#16A34A] hover:bg-[#16A34A] text-white">
            <Package className="mr-1 h-3 w-3" />
            Entrega inmediata
          </Badge>
        ) : (
          <Badge className="bg-[#EA580C] hover:bg-[#EA580C] text-white">
            <Clock className="mr-1 h-3 w-3" />
            A pedido (Consultar demora)
          </Badge>
        )}
        {isOffer && (
          <Badge className="bg-[#DC2626] hover:bg-[#DC2626] text-white">
            OFERTA
          </Badge>
        )}
      </div>

      {/* WhatsApp CTA */}
      <Button
        asChild
        size="lg"
        className="w-full bg-[#C89B6D] hover:bg-[#B8895D] text-[#2B2B2B] font-semibold text-base active:scale-95 transition-transform"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-5 w-5" />
          Consultar por WhatsApp
        </a>
      </Button>

      {/* Selected variant info */}
      {selectedVariant && (
        <p className="text-sm text-muted-foreground text-center">
          Medida: {selectedMeasure} | Color: {selectedColor?.nombre}
        </p>
      )}
    </div>
  )
}
