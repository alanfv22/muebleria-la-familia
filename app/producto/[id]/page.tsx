import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ProductGallery } from "@/components/product-gallery"
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { FeaturedProducts } from "@/components/featured-products"
import { Button } from "@/components/ui/button"
import { getProductById, getProducts } from "@/lib/data"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: "Producto no encontrado | Mueblería La Familia",
    }
  }

  return {
    title: `${product.nombre} | Mueblería La Familia`,
    description: product.descripcion || `${product.nombre} - Muebles de pino de calidad`,
    openGraph: {
      title: product.nombre,
      description: product.descripcion || undefined,
      images: product.imagenes?.[0] ? [product.imagenes[0]] : undefined,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  // Get related products from same category
  const relatedProducts = await getProducts({
    categoria: product.categoria_id,
    limit: 4,
  })

  // Filter out current product
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id)

  // Build images array
  const images = (product.imagenes || []).filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <Link href="/catalogo">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Volver al catálogo
              </Link>
            </Button>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <ProductGallery images={images} productName={product.nombre} />

            {/* Info */}
            <ProductVariantSelector product={product} />
          </div>

          {/* Related Products */}
          {filteredRelated.length > 0 && (
            <div className="mt-16">
              <FeaturedProducts
                products={filteredRelated}
                title="Productos relacionados"
                subtitle="Otros muebles que podrían interesarte"
                showViewAll={false}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
