-- Mueblería La Familia Database Schema
-- Matches user's existing structure: categorias, colores, productos, variantes

-- Categories table
CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL
);

-- Colors table
CREATE TABLE IF NOT EXISTS public.colores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS public.productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  imagenes TEXT[] DEFAULT '{}',
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}'
);

-- Product variants table (size/color combinations with pricing)
CREATE TABLE IF NOT EXISTS public.variantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id UUID NOT NULL REFERENCES public.productos(id) ON DELETE CASCADE,
  medida TEXT,
  color_id UUID REFERENCES public.colores(id) ON DELETE SET NULL,
  precio_lista DECIMAL(10,2) NOT NULL,
  precio_oferta DECIMAL(10,2) NOT NULL,
  es_oferta BOOLEAN DEFAULT false,
  stock_cantidad INT DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variantes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for reading catalog)
DROP POLICY IF EXISTS "Allow public read access on categorias" ON public.categorias;
CREATE POLICY "Allow public read access on categorias" ON public.categorias
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on colores" ON public.colores;
CREATE POLICY "Allow public read access on colores" ON public.colores
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on productos" ON public.productos;
CREATE POLICY "Allow public read access on productos" ON public.productos
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on variantes" ON public.variantes;
CREATE POLICY "Allow public read access on variantes" ON public.variantes
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON public.productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_variantes_producto ON public.variantes(producto_id);
CREATE INDEX IF NOT EXISTS idx_variantes_es_oferta ON public.variantes(es_oferta);
