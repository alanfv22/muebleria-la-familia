"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "María García",
    text: "Excelente calidad y precio. El mueble llegó perfecto y la atención fue muy buena.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    text: "Muy conformes con la mesa y las sillas. Se nota que es madera de calidad.",
    rating: 5,
  },
  {
    id: 3,
    name: "Laura Fernández",
    text: "Compramos un placard a medida y quedó espectacular. Súper recomendable.",
    rating: 5,
  },
  {
    id: 4,
    name: "Diego Martínez",
    text: "Rápidos en responder y entregar. El mueble es muy resistente y bonito.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-border/50 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#C89B6D] text-[#C89B6D]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/90 italic leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <p className="mt-4 font-[family-name:var(--font-poppins)] font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
