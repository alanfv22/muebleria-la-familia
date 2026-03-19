'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2, Search, Filter, Package, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ProductoConVariantes, Categoria } from '@/lib/types'
import { formatPrice } from '@/lib/types'

export default function AdminProductos() {
  const [productos, setProductos] = useState<ProductoConVariantes[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [filteredProductos, setFilteredProductos] = useState<ProductoConVariantes[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      
      try {
        // Obtener productos con sus relaciones
        const { data: productosData, error: productosError } = await supabase
          .from('productos')
          .select(`
            *,
            categorias (*),
            variantes (
              *,
              colores (*)
            )
          `)
          .order('nombre')

        if (productosError) throw productosError

        // Obtener categorías
        const { data: categoriasData, error: categoriasError } = await supabase
          .from('categorias')
          .select('*')
          .order('nombre')

        if (categoriasError) throw categoriasError

        // Transformar productos
        const productosTransformados = (productosData || []).map((product: any) => {
          const variantes = product.variantes || []
          const precio_minimo = variantes.length > 0
            ? Math.min(...variantes.map((v: any) => v.precio_oferta))
            : 0
          const tiene_stock = variantes.some((v: any) => v.stock_cantidad > 0)
          const tiene_oferta = variantes.some((v: any) => v.es_oferta)

          return {
            ...product,
            precio_minimo,
            tiene_stock,
            tiene_oferta,
          } as ProductoConVariantes
        })

        setProductos(productosTransformados)
        setCategorias(categoriasData || [])
        setFilteredProductos(productosTransformados)
      } catch (error) {
        console.error('Error fetching productos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = productos

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtrar por categoría
    if (categoriaFilter !== 'all') {
      filtered = filtered.filter(producto => producto.categoria_id === categoriaFilter)
    }

    // Filtrar por stock
    if (stockFilter === 'in_stock') {
      filtered = filtered.filter(producto => producto.tiene_stock)
    } else if (stockFilter === 'out_of_stock') {
      filtered = filtered.filter(producto => !producto.tiene_stock)
    }

    setFilteredProductos(filtered)
  }, [productos, searchTerm, categoriaFilter, stockFilter])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
      return
    }

    const supabase = createClient()
    
    try {
      // Primero eliminar variantes
      await supabase.from('variantes').delete().eq('producto_id', id)
      
      // Luego eliminar el producto
      const { error } = await supabase.from('productos').delete().eq('id', id)
      
      if (error) throw error
      
      // Actualizar estado
      setProductos(productos.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting producto:', error)
      alert('Error al eliminar el producto')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Productos</h1>
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona tu catálogo de productos ({filteredProductos.length} productos)
          </p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los productos</SelectItem>
                <SelectItem value="in_stock">Con stock</SelectItem>
                <SelectItem value="out_of_stock">Sin stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de productos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Lista de Productos
          </CardTitle>
          <CardDescription>
            Administra tus productos y sus variantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Variantes</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProductos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {producto.imagenes && producto.imagenes.length > 0 && (
                        <img
                          src={producto.imagenes[0]}
                          alt={producto.nombre}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium">{producto.nombre}</div>
                        {producto.descripcion && (
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {producto.descripcion}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {producto.categorias?.nombre || 'Sin categoría'}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {formatPrice(producto.precio_minimo)}
                      </div>
                      {producto.tiene_oferta && (
                        <Badge variant="destructive" className="text-xs">
                          En oferta
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {producto.variantes?.length || 0} variantes
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {producto.tiene_stock ? (
                        <Badge variant="default" className="bg-green-600">
                          Con stock
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Sin stock
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {producto.tiene_stock && (
                        <Badge variant="outline" className="text-xs">
                          Activo
                        </Badge>
                      )}
                      {producto.tiene_oferta && (
                        <Badge variant="destructive" className="text-xs">
                          Oferta
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/productos/${producto.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/producto/${producto.id}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(producto.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProductos.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-foreground">No se encontraron productos</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm || categoriaFilter !== 'all' || stockFilter !== 'all'
                  ? 'Intenta ajustar los filtros'
                  : 'Comienza agregando un nuevo producto'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
