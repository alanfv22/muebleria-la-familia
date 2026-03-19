import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CategoriesGrid } from "@/components/categories-grid"
import { getCategories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Categorías | Mueblería La Familia",
  description:
    "Explorá todas las categorías de muebles de pino. Mesas, sillas, placares, camas, escritorios y más.",
}

export default async function CategoriasPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl">
              Categorías
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explorá nuestra variedad de muebles de pino para cada espacio de tu hogar
            </p>
          </div>
        </div>

        <CategoriesGrid categories={categories} />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
