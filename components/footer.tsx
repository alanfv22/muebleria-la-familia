import Link from "next/link"
import { Facebook, Instagram, MessageCircle, MapPin } from "lucide-react"
import { buildCustomWhatsAppUrl } from "@/lib/types"

const navigation = {
  main: [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Categorías", href: "/categorias" },
    { name: "Ofertas", href: "/ofertas" },
    { name: "Contacto", href: "/contacto" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://instagram.com/muebleria.lafamilia1",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/people/Muebleria-La-Familia/100064337400499/",
      icon: Facebook,
    },
    {
      name: "WhatsApp",
      href: buildCustomWhatsAppUrl("Hola, quisiera hacer una consulta"),
      icon: MessageCircle,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white">
                Mueblería La Familia
              </span>
            </Link>
            <p className="mt-4 text-white/70 max-w-md leading-relaxed">
              Muebles de pino directo de fábrica. Calidad, diseño y precios accesibles para equipar tu hogar.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#C89B6D] hover:text-[#2B2B2B] transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-[#C89B6D] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildCustomWhatsAppUrl("Hola, quisiera hacer una consulta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-[#C89B6D] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  +54 9 11 7124-3414
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <MapPin className="h-4 w-4" />
                Buenos Aires, Argentina
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Mueblería La Familia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
