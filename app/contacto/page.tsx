import { Metadata } from "next"
import { MessageCircle, Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { buildCustomWhatsAppUrl } from "@/lib/types"

export const metadata: Metadata = {
  title: "Contacto | Mueblería La Familia",
  description:
    "Contactanos por WhatsApp, Instagram o Facebook. Mueblería La Familia - Buenos Aires, Argentina.",
}

const contactMethods = [
  {
    name: "WhatsApp",
    description: "Respondemos al instante",
    value: "+54 9 11 7124-3414",
    href: buildCustomWhatsAppUrl("Hola, quisiera hacer una consulta"),
    icon: MessageCircle,
    color: "bg-[#25D366]",
  },
  {
    name: "Instagram",
    description: "@muebleria.lafamilia1",
    value: "Seguinos para ver novedades",
    href: "https://instagram.com/muebleria.lafamilia1",
    icon: Instagram,
    color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  {
    name: "Facebook",
    description: "Mueblería La Familia",
    value: "Visitá nuestra página",
    href: "https://www.facebook.com/people/Muebleria-La-Familia/100064337400499/",
    icon: Facebook,
    color: "bg-[#1877F2]",
  },
]

export default function ContactoPage() {
  const whatsappUrl = buildCustomWhatsAppUrl("Hola, quisiera hacer una consulta")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground sm:text-4xl">
              Contactanos
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos para ayudarte. Escribinos por WhatsApp y te respondemos al instante.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
            {contactMethods.map((method) => (
              <a
                key={method.name}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${method.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <method.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-lg text-foreground">
                      {method.name}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{method.description}</p>
                    <p className="mt-2 text-sm text-primary">{method.value}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Location & Hours */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210155.28956867951!2d-58.598610149999995!3d-34.61566389999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1647012345678!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Mueblería La Familia"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <Card className="border-border/50 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-foreground">
                        Ubicación
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        Buenos Aires, Argentina
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Consultá la dirección exacta por WhatsApp
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-foreground">
                        Horarios de atención
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        Lunes a Viernes: 9:00 - 18:00
                      </p>
                      <p className="text-muted-foreground">
                        Sábados: 9:00 - 13:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-foreground">
                        WhatsApp
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        +54 9 11 7124-3414
                      </p>
                      <Button
                        asChild
                        className="mt-3 bg-[#C89B6D] hover:bg-[#B8895D] text-[#2B2B2B]"
                      >
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Escribinos ahora
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
