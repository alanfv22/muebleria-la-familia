"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Categoria, Color, getColorHex } from "@/lib/types"

interface CatalogFiltersProps {
  categories: Categoria[]
  colors: Color[]
}

export function CatalogFilters({ categories, colors }: CatalogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get("categoria")
  const selectedColor = searchParams.get("color")
  const soloStock = searchParams.get("stock") === "true"

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })

      return newParams.toString()
    },
    [searchParams]
  )

  const updateFilter = (key: string, value: string | null) => {
    const queryString = createQueryString({ [key]: value })
    router.push(`/catalogo${queryString ? `?${queryString}` : ""}`)
  }

  const clearFilters = () => {
    router.push("/catalogo")
  }

  const hasActiveFilters = selectedCategory || selectedColor || soloStock

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}

      <Accordion type="multiple" defaultValue={["categoria", "color", "stock"]} className="w-full">
        {/* Category Filter */}
        <AccordionItem value="categoria">
          <AccordionTrigger className="font-[family-name:var(--font-poppins)] font-semibold">
            Categoría
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${category.id}`}
                    checked={selectedCategory === category.id}
                    onCheckedChange={(checked) => {
                      updateFilter("categoria", checked ? category.id : null)
                    }}
                  />
                  <Label
                    htmlFor={`cat-${category.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.nombre}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color">
          <AccordionTrigger className="font-[family-name:var(--font-poppins)] font-semibold">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`color-${color.id}`}
                    checked={selectedColor === color.id}
                    onCheckedChange={(checked) => {
                      updateFilter("color", checked ? color.id : null)
                    }}
                  />
                  <div
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: getColorHex(color.nombre) }}
                  />
                  <Label
                    htmlFor={`color-${color.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {color.nombre}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Stock Filter */}
        <AccordionItem value="stock">
          <AccordionTrigger className="font-[family-name:var(--font-poppins)] font-semibold">
            Disponibilidad
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="solo-stock"
                checked={soloStock}
                onCheckedChange={(checked) => {
                  updateFilter("stock", checked ? "true" : null)
                }}
              />
              <Label htmlFor="solo-stock" className="text-sm cursor-pointer">
                Solo entrega inmediata
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-md border border-border/50">
          <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-6">
            Filtros
          </h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle className="font-[family-name:var(--font-poppins)]">
                Filtros
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
