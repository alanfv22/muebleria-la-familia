"use client"

import Link from "next/link"
import { Categoria } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoriesGridProps {
  categories: Categoria[]
  isLoading?: boolean
}

// Mapeo de categorías a términos de búsqueda de Unsplash
const categoryImages: Record<string, string> = {
  "cocina": "/images/cocina.png",
  "combos": "/images/combos.jpg",
  "exterior": "/images/exterior.jpg",
  "dormitorio": "/images/dormitorio.png",
  "living": "/images/living.png",
}


function CategorySkeleton() {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl">
      <Skeleton className="absolute inset-0" />
    </div>
  )
}

export function CategoriesGrid({ categories, isLoading }: CategoriesGridProps) {
  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Nuestras Categorías
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explorá nuestra variedad de muebles de pino para cada espacio de tu hogar
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => {
            const imageUrl = categoryImages[category.nombre.toLowerCase()] || 
                           "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=entropy&auto=format"
            
            return (
              <Link
                key={category.id}
                href={`/catalogo?categoria=${category.id}`}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 lg:p-6">
                  <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-white lg:text-xl text-center group-hover:scale-105 transition-transform">
                    {category.nombre}
                  </h3>
                  <span className="mt-2 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver productos
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
