import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mueblería La Familia | Muebles de Pino de Calidad',
  description: 'Muebles de pino de calidad para tu hogar. Diseños funcionales, resistentes y a precios accesibles directos de fábrica. Atención personalizada por WhatsApp.',
  keywords: ['muebles', 'pino', 'mueblería', 'Buenos Aires', 'muebles de madera', 'fábrica de muebles'],
  authors: [{ name: 'Mueblería La Familia' }],
  openGraph: {
    title: 'Mueblería La Familia | Muebles de Pino de Calidad',
    description: 'Muebles de pino de calidad para tu hogar. Diseños funcionales, resistentes y a precios accesibles directos de fábrica.',
    type: 'website',
    locale: 'es_AR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6B4F3B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
