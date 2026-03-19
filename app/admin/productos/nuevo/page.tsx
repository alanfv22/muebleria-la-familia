'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { 
  Plus, 
  Trash2, 
  Upload, 
  X, 
  Save, 
  ArrowLeft,
  Package,
  Image as ImageIcon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { saveProductoConVariantes, uploadImage, getCategorias, getColores } from '@/lib/admin-actions'
import { Producto, Variante, Categoria, Color } from '@/lib/types'

export default function NuevoProducto() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [colores, setColores] = useState<Color[]>([])
  
  // Estado del producto
  const [producto, setProducto] = useState<Partial<Producto>>({
    nombre: '',
    descripcion: '',
    categoria_id: '',
    imagenes: [],
    tags: []
  })
  
  // Estado de las variantes
  const [variantes, setVariantes] = useState<Partial<Variante>[]>([
    {
      medida: '',
      color_id: '',
      precio_lista: 0,
      precio_oferta: 0,
      es_oferta: false,
      stock_cantidad: 0
    }
  ])
  
  // Estado de las imágenes
  const [uploadingImages, setUploadingImages] = useState(false)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasData, coloresData] = await Promise.all([
          getCategorias(),
          getColores()
        ])
        setCategorias(categoriasData)
        setColores(coloresData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true)
    const newImages: string[] = []
    
    try {
      for (const file of Array.from(files)) {
        if (file.type.startsWith('image/')) {
          const url = await uploadImage(file)
          newImages.push(url)
        }
      }
      
      setProducto(prev => ({
        ...prev,
        imagenes: [...(prev.imagenes || []), ...newImages]
      }))
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Error al subir imágenes')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setProducto(prev => ({
      ...prev,
      imagenes: prev.imagenes?.filter((_, i) => i !== index) || []
    }))
  }

  const addVariante = () => {
    setVariantes(prev => [...prev, {
      medida: '',
      color_id: '',
      precio_lista: 0,
      precio_oferta: 0,
      es_oferta: false,
      stock_cantidad: 0
    }])
  }

  const removeVariante = (index: number) => {
    setVariantes(prev => prev.filter((_, i) => i !== index))
  }

  const updateVariante = (index: number, field: keyof Variante, value: any) => {
    setVariantes(prev => prev.map((variante, i) => 
      i === index ? { ...variante, [field]: value } : variante
    ))
  }

  const addTag = () => {
    if (tagInput.trim() && !producto.tags?.includes(tagInput.trim())) {
      setProducto(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setProducto(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validaciones básicas
      if (!producto.nombre?.trim()) {
        throw new Error('El nombre del producto es requerido')
      }
      if (!producto.categoria_id) {
        throw new Error('La categoría es requerida')
      }
      if (variantes.length === 0) {
        throw new Error('Debes agregar al menos una variante')
      }

      // Validar variantes
      for (const variante of variantes) {
        if (!variante.medida?.trim() || !variante.color_id) {
          throw new Error('Todas las variantes deben tener medida y color')
        }
        if (!variante.precio_lista || variante.precio_lista <= 0) {
          throw new Error('El precio de lista es requerido y debe ser mayor a 0')
        }
      }

      await saveProductoConVariantes(
        producto as Omit<Producto, 'id'>,
        variantes as Omit<Variante, 'id' | 'producto_id'>[]
      )

      router.push('/admin/productos')
    } catch (error) {
      console.error('Error saving producto:', error)
      alert(error instanceof Error ? error.message : 'Error al guardar el producto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nuevo Producto</h1>
            <p className="text-muted-foreground">Agrega un nuevo producto al catálogo</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Guardando...' : 'Guardar Producto'}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Información Básica</TabsTrigger>
            <TabsTrigger value="images">Imágenes</TabsTrigger>
            <TabsTrigger value="variants">Variantes</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Información del Producto</CardTitle>
                <CardDescription>
                  Completa la información básica del producto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del Producto *</Label>
                    <Input
                      id="nombre"
                      value={producto.nombre || ''}
                      onChange={(e) => setProducto(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Ej: Mesa de Centro"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoría *</Label>
                    <Select 
                      value={producto.categoria_id} 
                      onValueChange={(value) => setProducto(prev => ({ ...prev, categoria_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={producto.descripcion || ''}
                    onChange={(e) => setProducto(prev => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Describe el producto, materiales, características, etc."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Agregar tag..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {producto.tags && producto.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {producto.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Imágenes del Producto</CardTitle>
                <CardDescription>
                  Sube las imágenes del producto. Se mostrarán en el catálogo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-muted-foreground">
                          {uploadingImages ? 'Subiendo imágenes...' : 'Haz clic para subir imágenes o arrastra y suelta'}
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                          disabled={uploadingImages}
                        />
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF hasta 10MB cada una
                      </p>
                    </div>
                  </div>
                </div>

                {producto.imagenes && producto.imagenes.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {producto.imagenes.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Variantes del Producto</CardTitle>
                    <CardDescription>
                      Define las diferentes medidas, colores y precios del producto
                    </CardDescription>
                  </div>
                  <Button type="button" onClick={addVariante} variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Variante
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {variantes.map((variante, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Variante {index + 1}</h4>
                        {variantes.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeVariante(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Medida *</Label>
                          <Input
                            value={variante.medida || ''}
                            onChange={(e) => updateVariante(index, 'medida', e.target.value)}
                            placeholder="Ej: 120x60x45 cm"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Color *</Label>
                          <Select 
                            value={variante.color_id} 
                            onValueChange={(value) => updateVariante(index, 'color_id', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un color" />
                            </SelectTrigger>
                            <SelectContent>
                              {colores.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                  {color.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            min="0"
                            value={variante.stock_cantidad || 0}
                            onChange={(e) => updateVariante(index, 'stock_cantidad', parseInt(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Precio de Lista *</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variante.precio_lista || 0}
                            onChange={(e) => updateVariante(index, 'precio_lista', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Precio de Oferta</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variante.precio_oferta || 0}
                            onChange={(e) => updateVariante(index, 'precio_oferta', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>¿Está en oferta?</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={variante.es_oferta || false}
                              onCheckedChange={(checked) => updateVariante(index, 'es_oferta', checked)}
                            />
                            <span className="text-sm text-muted-foreground">
                              {variante.es_oferta ? 'Sí' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
