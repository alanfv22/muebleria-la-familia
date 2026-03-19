"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductoConVariantes, formatPrice, buildWhatsAppUrl } from "@/lib/types"

interface ProductCardProps {
  product: ProductoConVariantes
}

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.variantes.map((v) => v.precio_oferta))
  const hasMultipleVariants = product.variantes.length > 1
  const hasStock = product.variantes.some((v) => v.stock_cantidad > 0)
  const isOffer = product.tiene_oferta
  const maxListPrice = Math.max(...product.variantes.map((v) => v.precio_lista))
  const mainImage = product.imagenes?.[0] || null

  const whatsappUrl = buildWhatsAppUrl(product.nombre, undefined, undefined, minPrice)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full">
      {/* Image Container */}
      <Link href={`/producto/${product.id}`} className="relative aspect-[4/5] overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
            <span className="text-muted-foreground">Sin imagen</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {isOffer && (
            <Badge className="bg-[#DC2626] hover:bg-[#DC2626] text-white font-semibold text-xs px-2 py-1">
              OFERTA
            </Badge>
          )}
          {hasStock ? (
            <Badge className="bg-[#16A34A] hover:bg-[#16A34A] text-white font-medium text-xs px-2 py-1">
              Entrega inmediata
            </Badge>
          ) : (
            <Badge className="bg-[#EA580C] hover:bg-[#EA580C] text-white font-medium text-xs px-2 py-1">
              A pedido
            </Badge>
          )}
        </div>

        {/* Blur to clear effect placeholder */}
        <div className="absolute inset-0 bg-card/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-foreground line-clamp-2 text-sm sm:text-base group-hover:text-primary transition-colors leading-tight">
            {product.nombre}
          </h3>
        </Link>

        {product.descripcion && (
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.descripcion}
          </p>
        )}

        {/* Price */}
        <div className="mt-2 sm:mt-3 flex items-baseline gap-2 flex-wrap">
          {isOffer && maxListPrice > minPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatPrice(maxListPrice)}
            </span>
          )}
          <span className="text-sm sm:text-base lg:text-lg font-bold text-[#C89B6D]">
            {hasMultipleVariants ? `Desde ${formatPrice(minPrice)}` : formatPrice(minPrice)}
          </span>
        </div>

        {/* WhatsApp Button */}
        <Button
          asChild
          className="mt-3 sm:mt-4 w-full bg-[#C89B6D] hover:bg-[#B8895D] text-[#2B2B2B] font-medium active:scale-95 transition-transform min-h-[44px] text-sm sm:text-base"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Consultar
          </a>
        </Button>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-md">
      <Skeleton className="aspect-[4/5]" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
