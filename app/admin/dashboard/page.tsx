'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, TrendingUp, Users, ShoppingCart, AlertCircle } from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  totalColors: number
  totalVariants: number
  productsWithStock: number
  productsOnSale: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalColors: 0,
    totalVariants: 0,
    productsWithStock: 0,
    productsOnSale: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Importar dinámicamente para evitar errores de SSR
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        
        // Obtener estadísticas
        const [{ count: totalProducts }, { count: totalCategories }, { count: totalColors }] = await Promise.all([
          supabase.from('categorias').select('*', { count: 'exact', head: true }),
          supabase.from('colores').select('*', { count: 'exact', head: true }),
          supabase.from('productos').select('*', { count: 'exact', head: true }),
        ])

        // Obtener variantes
        const { data: variantes } = await supabase.from('variantes').select('*')
        const totalVariants = variantes?.length || 0

        // Obtener productos con stock y en oferta
        const { data: productos } = await supabase
          .from('productos')
          .select(`
            *,
            variantes (
              stock_cantidad,
              es_oferta
            )
          `)

        const productsWithStock = productos?.filter(p => 
          p.variantes?.some((v: any) => v.stock_cantidad > 0)
        ).length || 0

        const productsOnSale = productos?.filter(p => 
          p.variantes?.some((v: any) => v.es_oferta)
        ).length || 0

        setStats({
          totalProducts: totalProducts || 0,
          totalCategories: totalCategories || 0,
          totalColors: totalColors || 0,
          totalVariants,
          productsWithStock,
          productsOnSale,
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        setError('No se pudieron cargar las estadísticas. Verifica tu conexión a Supabase.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      description: 'Productos en el catálogo',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Variantes',
      value: stats.totalVariants,
      description: 'Combinaciones de productos',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Con Stock',
      value: stats.productsWithStock,
      description: 'Productos disponibles',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'En Oferta',
      value: stats.productsOnSale,
      description: 'Productos con descuento',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel administrativo de Mueblería La Familia
        </p>
      </div>

      {error && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.bgColor} p-2 rounded-full`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-12 bg-muted rounded animate-pulse"></div>
                ) : (
                  card.value
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Resumen del Catálogo</CardTitle>
            <CardDescription>
              Estado actual de tu inventario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Categorías</span>
                <span className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  ) : (
                    stats.totalCategories
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Colores disponibles</span>
                <span className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  ) : (
                    stats.totalColors
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Productos con stock</span>
                <span className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  ) : (
                    stats.totalProducts > 0 ? Math.round((stats.productsWithStock / stats.totalProducts) * 100) : 0
                  )}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Productos en oferta</span>
                <span className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  ) : (
                    stats.totalProducts > 0 ? Math.round((stats.productsOnSale / stats.totalProducts) * 100) : 0
                  )}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Gestiona tu catálogo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/productos/nuevo" className="block">
              <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                + Agregar Producto
              </button>
            </a>
            <a href="/admin/productos" className="block">
              <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                📦 Ver Todos los Productos
              </button>
            </a>
            <a href="/admin/categorias" className="block">
              <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                🏷️ Gestionar Categorías
              </button>
            </a>
            <a href="/admin/colores" className="block">
              <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                🎨 Gestionar Colores
              </button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
