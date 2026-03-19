"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Sin imagen</span>
      </div>
    )
  }

  const currentImage = images[selectedIndex]

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted group">
        <Image
          src={currentImage}
          alt={`${productName} - Imagen ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Zoom button (desktop) */}
        <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Ver imagen ampliada</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <DialogTitle className="sr-only">{productName} - Vista ampliada</DialogTitle>
            <div className="relative aspect-square">
              <Image
                src={currentImage}
                alt={`${productName} - Vista ampliada`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Imagen anterior</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Siguiente imagen</span>
            </Button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/70 text-background text-sm px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                index === selectedIndex
                  ? "border-primary"
                  : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
