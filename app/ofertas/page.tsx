import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { getProducts } from "@/lib/data"

export const metadata: Metadata = {
  title: "Ofertas | Mueblería La Familia",
  description:
    "Aprovechá las mejores ofertas en muebles de pino. Descuentos exclusivos directo de fábrica.",
}

export default async function OfertasPage() {
  const products = await getProducts({ es_oferta: true })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl">
              Ofertas Especiales
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprovechá nuestros mejores precios en muebles de pino de calidad. Ofertas por tiempo limitado.
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No hay ofertas disponibles en este momento.
              </p>
              <p className="mt-2 text-muted-foreground">
                ¡Volvé pronto para ver nuestras nuevas promociones!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
