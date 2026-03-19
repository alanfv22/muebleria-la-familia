import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CategoriesGrid } from "@/components/categories-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { CustomFurnitureCTA } from "@/components/custom-furniture-cta"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getCategories, getProducts } from "@/lib/data"

export default async function HomePage() {
  const [categories, products, offers] = await Promise.all([
    getCategories(),
    getProducts({ limit: 8 }),
    getProducts({ es_oferta: true, limit: 4 }),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        
        <CategoriesGrid categories={categories} />
        
        <FeaturedProducts
          products={products}
          title="Productos Destacados"
          subtitle="Descubrí nuestros muebles más populares"
        />

        {offers.length > 0 && (
          <FeaturedProducts
            products={offers}
            title="Ofertas Especiales"
            subtitle="Aprovechá nuestros mejores precios"
            viewAllLink="/ofertas"
          />
        )}
        
        <CustomFurnitureCTA />
        
        <Testimonials />
      </main>

      <Footer />
      
      <WhatsAppFloat />
    </div>
  )
}
