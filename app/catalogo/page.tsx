import { Suspense } from "react"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CatalogFilters } from "@/components/catalog-filters"
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { getCategories, getProducts, getColors } from "@/lib/data"

export const metadata: Metadata = {
  title: "Catálogo | Mueblería La Familia",
  description:
    "Explorá nuestro catálogo completo de muebles de pino. Mesas, sillas, placares, camas y más. Calidad y precio directo de fábrica.",
}

interface CatalogoPageProps {
  searchParams: Promise<{
    categoria?: string
    color?: string
    stock?: string
    oferta?: string
  }>
}

async function ProductGrid({
  categoria,
  color,
  soloStock,
  soloOferta,
}: {
  categoria?: string
  color?: string
  soloStock?: boolean
  soloOferta?: boolean
}) {
  let products = await getProducts({
    categoria,
    solo_stock: soloStock,
  })

  // Filter by color on client side (since color is in variants)
  if (color) {
    products = products.filter((product) =>
      product.variantes.some((v) => v.color_id === color)
    )
  }

  // Filter by offer on client side (since es_oferta is in variants)
  if (soloOferta) {
    products = products.filter((product) =>
      product.variantes.some((v) => v.es_oferta === true)
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-muted-foreground">
          No se encontraron productos con los filtros seleccionados.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {[...Array(9)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams
  const [categories, colors] = await Promise.all([
    getCategories(),
    getColors(),
  ])

  const selectedCategory = categories.find((c) => c.id === params.categoria)
  const isFilteringOffers = params.oferta === "true"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl">
              {isFilteringOffers ? "Ofertas" : selectedCategory ? selectedCategory.nombre : "Catálogo"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isFilteringOffers 
                ? "Aprovecha nuestras mejores promociones en muebles de pino"
                : selectedCategory
                  ? `Todos los productos de ${selectedCategory.nombre}`
                  : "Explorá todos nuestros muebles de pino"
              }
            </p>
          </div>

          {/* Filters + Grid */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <CatalogFilters categories={categories} colors={colors} />
            </div>

            <div className="flex-1">
              {/* Mobile filter button */}
              <div className="mb-6 lg:hidden">
                <CatalogFilters categories={categories} colors={colors} />
              </div>

              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid
                  categoria={params.categoria}
                  color={params.color}
                  soloStock={params.stock === "true"}
                  soloOferta={params.oferta === "true"}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
