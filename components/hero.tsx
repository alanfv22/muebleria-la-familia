"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildCustomWhatsAppUrl } from "@/lib/types"

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function Hero() {
  const whatsappUrl = buildCustomWhatsAppUrl("Hola, quisiera más información sobre sus muebles")

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-furniture.jpg"
          alt="Muebles de pino de alta calidad"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/90 via-[#2B2B2B]/70 to-[#2B2B2B]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
            Muebles de pino de calidad para tu hogar
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl text-pretty">
            Diseños funcionales, resistentes y a precios accesibles directos de fábrica.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#C89B6D] hover:bg-[#B8895D] text-[#2B2B2B] font-semibold text-base px-8"
            >
              <Link href="/catalogo">
                Ver catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold text-base px-8"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#C89B6D] sm:text-4xl">
                <CountUp end={500} suffix="+" />
              </div>
              <p className="mt-2 text-sm text-white/80">Muebles vendidos</p>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#C89B6D] sm:text-4xl">
                <CountUp end={100} suffix="%" />
              </div>
              <p className="mt-2 text-sm text-white/80">Clientes satisfechos</p>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#C89B6D] sm:text-4xl">
                24/7
              </div>
              <p className="mt-2 text-sm text-white/80">Atención personalizada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
    </section>
  )
}
