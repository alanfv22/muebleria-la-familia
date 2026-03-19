"use client"

import { MessageCircle, Ruler, Palette, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildCustomWhatsAppUrl } from "@/lib/types"

export function CustomFurnitureCTA() {
  const whatsappUrl = buildCustomWhatsAppUrl(
    "Hola, me interesa consultar por un mueble a medida. Me gustaría contarles mi idea."
  )

  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
            ¿Querés un mueble a medida?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Fabricamos muebles personalizados según tu espacio. Contanos tu idea y te asesoramos sin compromiso.
          </p>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
                <Ruler className="h-7 w-7 text-[#C89B6D]" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-poppins)] font-semibold text-primary-foreground">
                Medidas exactas
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Adaptamos cada mueble a tu espacio
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
                <Palette className="h-7 w-7 text-[#C89B6D]" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-poppins)] font-semibold text-primary-foreground">
                Colores a elección
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Elegí el acabado que más te guste
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
                <Truck className="h-7 w-7 text-[#C89B6D]" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-poppins)] font-semibold text-primary-foreground">
                Entrega a domicilio
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Te lo llevamos armado a tu casa
              </p>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="mt-12 bg-[#C89B6D] hover:bg-[#B8895D] text-[#2B2B2B] font-semibold text-base px-8"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Enviar idea por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
