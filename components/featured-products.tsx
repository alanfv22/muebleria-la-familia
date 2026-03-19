"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { ProductoConVariantes } from "@/lib/types"

interface FeaturedProductsProps {
  products: ProductoConVariantes[]
  isLoading?: boolean
  title?: string
  subtitle?: string
  showViewAll?: boolean
  viewAllLink?: string
}

export function FeaturedProducts({
  products,
  isLoading,
  title = "Productos Destacados",
  subtitle = "Descubrí nuestros muebles más populares",
  showViewAll = true,
  viewAllLink = "/catalogo",
}: FeaturedProductsProps) {
  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <div className="h-10 w-64 bg-muted animate-pulse rounded mb-4" />
              <div className="h-6 w-96 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">{subtitle}</p>
          </div>
          {showViewAll && (
            <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
              <Link href={viewAllLink}>
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
