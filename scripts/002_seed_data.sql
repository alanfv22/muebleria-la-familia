-- Seed data for Mueblería La Familia

-- Insert colors
INSERT INTO public.colores (id, nombre, codigo_hex) VALUES
  ('a1b2c3d4-1111-1111-1111-111111111111', 'Natural', '#D4A574'),
  ('a1b2c3d4-2222-2222-2222-222222222222', 'Miel', '#C68E17'),
  ('a1b2c3d4-3333-3333-3333-333333333333', 'Nogal', '#5C4033'),
  ('a1b2c3d4-4444-4444-4444-444444444444', 'Blanco', '#FFFFFF'),
  ('a1b2c3d4-5555-5555-5555-555555555555', 'Wengue', '#3D2B1F')
ON CONFLICT DO NOTHING;

-- Insert categories
INSERT INTO public.categorias (id, nombre, slug, descripcion, imagen_url, orden) VALUES
  ('b1b2c3d4-1111-1111-1111-111111111111', 'Living', 'living', 'Muebles para tu sala de estar', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 1),
  ('b1b2c3d4-2222-2222-2222-222222222222', 'Dormitorio', 'dormitorio', 'Muebles para tu descanso', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', 2),
  ('b1b2c3d4-3333-3333-3333-333333333333', 'Cocina', 'cocina', 'Muebles para tu cocina', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', 3),
  ('b1b2c3d4-4444-4444-4444-444444444444', 'Oficina', 'oficina', 'Muebles para tu espacio de trabajo', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 4),
  ('b1b2c3d4-5555-5555-5555-555555555555', 'Infantil', 'infantil', 'Muebles para los más pequeños', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800', 5),
  ('b1b2c3d4-6666-6666-6666-666666666666', 'Exterior', 'exterior', 'Muebles para jardín y terraza', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800', 6)
ON CONFLICT DO NOTHING;

-- Insert products
INSERT INTO public.productos (id, nombre, slug, descripcion, descripcion_corta, categoria_id, precio_base, precio_oferta, es_oferta, es_destacado, imagen_principal, imagenes, dimensiones, material, stock_disponible) VALUES
  -- Living products
  ('c1c2c3d4-1111-1111-1111-111111111111', 
   'Mesa Ratona Colonial', 
   'mesa-ratona-colonial', 
   'Mesa ratona de pino macizo con diseño colonial. Perfecta para complementar tu living con un toque clásico y elegante. Incluye estante inferior para almacenamiento adicional.',
   'Mesa ratona clásica con estante inferior',
   'b1b2c3d4-1111-1111-1111-111111111111',
   45000, NULL, false, true,
   'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800',
   ARRAY['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800', 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800'],
   '120cm x 60cm x 45cm',
   'Pino macizo',
   5),
   
  ('c1c2c3d4-2222-2222-2222-222222222222', 
   'Biblioteca Moderna 5 Estantes', 
   'biblioteca-moderna-5-estantes', 
   'Biblioteca de pino con 5 estantes amplios. Diseño moderno y minimalista que se adapta a cualquier espacio. Ideal para libros, decoración y almacenamiento.',
   'Biblioteca minimalista con 5 estantes amplios',
   'b1b2c3d4-1111-1111-1111-111111111111',
   89000, 75000, true, true,
   'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
   ARRAY['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800'],
   '180cm x 80cm x 30cm',
   'Pino macizo',
   3),

  ('c1c2c3d4-3333-3333-3333-333333333333', 
   'Rack TV Flotante', 
   'rack-tv-flotante', 
   'Rack para TV de diseño flotante con compartimentos para equipos electrónicos. Instalación sencilla, incluye herrajes.',
   'Rack flotante para TV hasta 55"',
   'b1b2c3d4-1111-1111-1111-111111111111',
   55000, NULL, false, true,
   'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
   ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'],
   '150cm x 40cm x 35cm',
   'Pino macizo',
   8),

  -- Dormitorio products
  ('c1c2c3d4-4444-4444-4444-444444444444', 
   'Cama 2 Plazas con Respaldo', 
   'cama-2-plazas-respaldo', 
   'Cama de 2 plazas con elegante respaldo tapizado. Estructura robusta de pino macizo. Incluye laterales y piecera.',
   'Cama 2 plazas con respaldo tapizado',
   'b1b2c3d4-2222-2222-2222-222222222222',
   125000, 99000, true, true,
   'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
   ARRAY['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'],
   '200cm x 160cm x 110cm',
   'Pino macizo con tapizado',
   2),

  ('c1c2c3d4-5555-5555-5555-555555555555', 
   'Mesa de Luz Clásica', 
   'mesa-de-luz-clasica', 
   'Mesa de luz con cajón y estante. Diseño clásico que complementa cualquier dormitorio. Excelente terminación.',
   'Mesa de luz con cajón y estante',
   'b1b2c3d4-2222-2222-2222-222222222222',
   28000, NULL, false, false,
   'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800',
   ARRAY['https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800'],
   '50cm x 40cm x 55cm',
   'Pino macizo',
   12),

  ('c1c2c3d4-6666-6666-6666-666666666666', 
   'Cómoda 6 Cajones', 
   'comoda-6-cajones', 
   'Amplia cómoda con 6 cajones con guías metálicas. Perfecta para organizar tu ropa. Tiradores de metal incluidos.',
   'Cómoda espaciosa con 6 cajones',
   'b1b2c3d4-2222-2222-2222-222222222222',
   95000, NULL, false, true,
   'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800',
   ARRAY['https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800'],
   '120cm x 45cm x 80cm',
   'Pino macizo',
   4),

  -- Cocina products
  ('c1c2c3d4-7777-7777-7777-777777777777', 
   'Mesa Comedor Extensible', 
   'mesa-comedor-extensible', 
   'Mesa de comedor extensible de 140cm a 180cm. Ideal para familias que necesitan espacio extra para invitados.',
   'Mesa extensible de 140cm a 180cm',
   'b1b2c3d4-3333-3333-3333-333333333333',
   78000, 65000, true, false,
   'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800',
   ARRAY['https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800'],
   '140-180cm x 90cm x 76cm',
   'Pino macizo',
   6),

  ('c1c2c3d4-8888-8888-8888-888888888888', 
   'Sillas Comedor (Set x4)', 
   'sillas-comedor-set-4', 
   'Set de 4 sillas de comedor con asiento tapizado. Diseño ergonómico y resistente para uso diario.',
   'Set de 4 sillas con asiento tapizado',
   'b1b2c3d4-3333-3333-3333-333333333333',
   68000, NULL, false, false,
   'https://images.unsplash.com/photo-1549497538-303791108f95?w=800',
   ARRAY['https://images.unsplash.com/photo-1549497538-303791108f95?w=800'],
   '45cm x 45cm x 90cm (cada una)',
   'Pino macizo con tapizado',
   10),

  -- Oficina products
  ('c1c2c3d4-9999-9999-9999-999999999999', 
   'Escritorio Home Office', 
   'escritorio-home-office', 
   'Escritorio amplio para home office con 3 cajones laterales. Espacio para monitor, teclado y almacenamiento.',
   'Escritorio con 3 cajones laterales',
   'b1b2c3d4-4444-4444-4444-444444444444',
   72000, NULL, false, true,
   'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
   ARRAY['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'],
   '140cm x 60cm x 76cm',
   'Pino macizo',
   7),

  ('c1c2c3d4-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
   'Estantería Organizadora', 
   'estanteria-organizadora', 
   'Estantería con 4 niveles ajustables. Perfecta para organizar documentos, libros y artículos de oficina.',
   'Estantería de 4 niveles ajustables',
   'b1b2c3d4-4444-4444-4444-444444444444',
   48000, 42000, true, false,
   'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800',
   ARRAY['https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800'],
   '160cm x 80cm x 35cm',
   'Pino macizo',
   9),

  -- Infantil products
  ('c1c2c3d4-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
   'Cama Infantil con Baranda', 
   'cama-infantil-baranda', 
   'Cama infantil con barandas de seguridad removibles. Diseño seguro y divertido para los más pequeños.',
   'Cama infantil con barandas de seguridad',
   'b1b2c3d4-5555-5555-5555-555555555555',
   58000, NULL, false, false,
   'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800',
   ARRAY['https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800'],
   '160cm x 80cm x 60cm',
   'Pino macizo',
   4),

  ('c1c2c3d4-cccc-cccc-cccc-cccccccccccc', 
   'Escritorio Infantil', 
   'escritorio-infantil', 
   'Escritorio a medida para niños con altura ajustable. Incluye estante para útiles y cajonera.',
   'Escritorio infantil con altura ajustable',
   'b1b2c3d4-5555-5555-5555-555555555555',
   42000, 35000, true, false,
   'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800',
   ARRAY['https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800'],
   '100cm x 50cm x 55-75cm',
   'Pino macizo',
   6)
ON CONFLICT DO NOTHING;

-- Insert product variants
INSERT INTO public.variantes_producto (producto_id, color_id, tamanio, precio, stock, sku) VALUES
  -- Mesa Ratona variants
  ('c1c2c3d4-1111-1111-1111-111111111111', 'a1b2c3d4-1111-1111-1111-111111111111', 'Estándar', 45000, 3, 'MRC-NAT-EST'),
  ('c1c2c3d4-1111-1111-1111-111111111111', 'a1b2c3d4-2222-2222-2222-222222222222', 'Estándar', 47000, 2, 'MRC-MIE-EST'),
  ('c1c2c3d4-1111-1111-1111-111111111111', 'a1b2c3d4-3333-3333-3333-333333333333', 'Estándar', 48000, 1, 'MRC-NOG-EST'),
  
  -- Biblioteca variants
  ('c1c2c3d4-2222-2222-2222-222222222222', 'a1b2c3d4-1111-1111-1111-111111111111', 'Alta (180cm)', 75000, 2, 'BIB-NAT-ALT'),
  ('c1c2c3d4-2222-2222-2222-222222222222', 'a1b2c3d4-4444-4444-4444-444444444444', 'Alta (180cm)', 78000, 1, 'BIB-BLA-ALT'),
  ('c1c2c3d4-2222-2222-2222-222222222222', 'a1b2c3d4-1111-1111-1111-111111111111', 'Media (150cm)', 65000, 2, 'BIB-NAT-MED'),
  
  -- Cama 2 plazas variants
  ('c1c2c3d4-4444-4444-4444-444444444444', 'a1b2c3d4-1111-1111-1111-111111111111', '2 Plazas', 99000, 1, 'CAM-NAT-2PL'),
  ('c1c2c3d4-4444-4444-4444-444444444444', 'a1b2c3d4-5555-5555-5555-555555555555', '2 Plazas', 105000, 1, 'CAM-WEN-2PL'),
  ('c1c2c3d4-4444-4444-4444-444444444444', 'a1b2c3d4-1111-1111-1111-111111111111', '2 1/2 Plazas', 115000, 0, 'CAM-NAT-2.5PL'),
  
  -- Mesa de luz variants
  ('c1c2c3d4-5555-5555-5555-555555555555', 'a1b2c3d4-1111-1111-1111-111111111111', 'Estándar', 28000, 6, 'MDL-NAT-EST'),
  ('c1c2c3d4-5555-5555-5555-555555555555', 'a1b2c3d4-2222-2222-2222-222222222222', 'Estándar', 29000, 4, 'MDL-MIE-EST'),
  ('c1c2c3d4-5555-5555-5555-555555555555', 'a1b2c3d4-3333-3333-3333-333333333333', 'Estándar', 30000, 2, 'MDL-NOG-EST'),
  
  -- Escritorio variants
  ('c1c2c3d4-9999-9999-9999-999999999999', 'a1b2c3d4-1111-1111-1111-111111111111', '140cm', 72000, 4, 'ESC-NAT-140'),
  ('c1c2c3d4-9999-9999-9999-999999999999', 'a1b2c3d4-1111-1111-1111-111111111111', '160cm', 82000, 3, 'ESC-NAT-160'),
  ('c1c2c3d4-9999-9999-9999-999999999999', 'a1b2c3d4-4444-4444-4444-444444444444', '140cm', 75000, 2, 'ESC-BLA-140')
ON CONFLICT DO NOTHING;
