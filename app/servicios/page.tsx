import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Monitor, ShoppingCart, TrendingUp, Search, Check, Smartphone, Bot, Wrench, Palette, Workflow, Headset } from "lucide-react"

export const metadata: Metadata = {
  title: "Servicios Digitales | Desarrollo Web, SEO, Apps y Marketing",
  description: "Agencia digital para empresas de todo el mundo. Servicios de diseño web profesional, tiendas online, apps móviles, posicionamiento SEO, marketing digital con Google Ads, chatbots IA, automatización y soporte técnico para empresas y pymes.",
  keywords: [
    "servicios digitales",
    "agencia desarrollo web",
    "servicios marketing digital",
    "desarrollo tiendas online",
    "servicios seo profesional",
    "desarrollo apps móviles",
    "servicios automatización",
    "diseño ui ux",
    "soporte técnico web",
    "agencia google ads",
    "servicios chatbots ia"
  ],
  openGraph: {
    title: "Servicios Digitales | Vektra - Agencia Digital",
    description: "Desarrollo web, tiendas online, apps, SEO, marketing digital y más para empresas de todo el mundo.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Digitales | Vektra",
    description: "Soluciones digitales completas para tu negocio.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios",
    languages: {
      en: "https://vektra.digital/en/services",
    },
  },
}

const services = [
  {
    title: "Diseño Web Profesional",
    description: "Páginas web a medida con Next.js, React y WordPress. Diseño responsive, rápido y optimizado para SEO en todo el mundo.",
    icon: Monitor,
    href: "/servicios/diseno-web",
    features: [
      "Diseño personalizado y único",
      "100% Responsive y adaptable",
      "Optimizado para SEO",
      "Velocidad de carga optimizada",
      "Integración de formularios",
      "Panel de administración fácil",
    ],
    price: "Desde 1.500",
  },
  {
    title: "Tienda Online E-commerce",
    description: "Tiendas online con WooCommerce y Shopify para vender 24/7. Sin comisiones, con MercadoPago, PayPal y Stripe integrados.",
    icon: ShoppingCart,
    href: "/servicios/tienda-online",
    features: [
      "Catálogo ilimitado de productos",
      "Pasarelas de pago seguras",
      "Gestión de inventario",
      "Sistema de envíos integrado",
      "Emails automatizados",
      "Panel de ventas y estadísticas",
    ],
    price: "Desde 2.500",
  },
  {
    title: "Marketing Digital",
    description: "Campañas en Google Ads, Meta Ads y TikTok Ads. Estrategias de publicidad online y posicionamiento para pymes de todo el mundo.",
    icon: TrendingUp,
    href: "/servicios/marketing-digital",
    features: [
      "Estrategia personalizada",
      "Campañas en Google Ads y Meta Ads",
      "Email marketing",
      "Optimización de conversiones",
      "Análisis y reportes mensuales",
      "Optimización continua",
    ],
    price: "Desde 500/mes",
  },
  {
    title: "Posicionamiento SEO",
    description: "Posicionamiento web en Google y buscadores IA. Auditoría SEO, optimización on-page, SEO local y link building para empresas.",
    icon: Search,
    href: "/servicios/seo",
    features: [
      "Auditoría SEO completa",
      "Optimización On-page",
      "SEO Local para negocios",
      "Link building estratégico",
      "SEO para IA (ChatGPT, Perplexity)",
      "Reportes mensuales",
    ],
    price: "Desde 400/mes",
  },
  {
    title: "Apps Móviles",
    description: "Desarrollo de aplicaciones nativas e híbridas para Android e iOS con React Native y Flutter. Publicación en App Store y Google Play.",
    icon: Smartphone,
    href: "/servicios/apps",
    features: [
      "Apps Android e iOS",
      "React Native y Flutter",
      "Panel de administración",
      "Notificaciones push",
      "Publicación en tiendas",
      "Mantenimiento incluido",
    ],
    price: "Desde 3.000",
  },
  {
    title: "Chatbots y Agentes IA",
    description: "Chatbots inteligentes con ChatGPT para WhatsApp y web. Atención al cliente automatizada, toma de pedidos y citas 24/7.",
    icon: Bot,
    href: "/servicios/agentes-ia",
    features: [
      "Chatbots para WhatsApp",
      "Integración con ChatGPT",
      "Atención 24/7 automática",
      "Toma de pedidos y citas",
      "Integración con CRM",
      "Escalamiento a humanos",
    ],
    price: "Desde 800",
  },
  {
    title: "Diseño UI/UX",
    description: "Diseño de interfaces y experiencia de usuario centrado en conversiones. Wireframes, prototipos interactivos y testing con usuarios reales.",
    icon: Palette,
    href: "/servicios/diseno-ui-ux",
    features: [
      "Investigación de usuarios",
      "Wireframes y prototipos",
      "Diseño visual UI",
      "Design System",
      "Testing con usuarios",
      "Handoff para desarrollo",
    ],
    price: "Desde 1.000",
  },
  {
    title: "Automatización de Procesos",
    description: "Automatiza tareas repetitivas con Zapier, Make y workflows inteligentes. Integración de sistemas, CRM y reportes automáticos.",
    icon: Workflow,
    href: "/servicios/automatizacion",
    features: [
      "Integración de sistemas",
      "Workflows automatizados",
      "Zapier y Make",
      "Bots y asistentes",
      "Sincronización de datos",
      "Reportes automáticos",
    ],
    price: "Desde 600",
  },
  {
    title: "Mantenimiento Web",
    description: "Actualizaciones de seguridad, copias de seguridad diarias, monitoreo 24/7 y optimización de velocidad para tu sitio web.",
    icon: Wrench,
    href: "/servicios/mantenimiento-web",
    features: [
      "Actualizaciones de seguridad",
      "Copias de seguridad diarias",
      "Monitoreo 24/7",
      "Optimización de velocidad",
      "Soporte técnico",
      "Informes mensuales",
    ],
    price: "Desde 100/mes",
  },
  {
    title: "Soporte Técnico Web",
    description: "Resolución de errores, asistencia remota y soporte multicanal para tu web o tienda online. Respuesta rápida garantizada.",
    icon: Headset,
    href: "/servicios/soporte-tecnico",
    features: [
      "Resolución de errores",
      "Asistencia remota",
      "Respuesta rápida",
      "Soporte multicanal",
      "Capacitación",
      "Planes flexibles",
    ],
    price: "Desde 50/hora",
  },
]

const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Servicios Digitales de Vektra",
  "description": "Lista completa de servicios digitales ofrecidos por Vektra para empresas de todo el mundo",
  "url": "https://vektra.digital/servicios",
  "numberOfItems": services.length,
  "itemListElement": services.map((service, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "url": `https://vektra.digital${service.href}`,
      "provider": {
        "@type": "Organization",
        "@id": "https://vektra.digital/#organization"
      }
    }
  }))
}

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] py-20 lg:py-28">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nuestros <span className="text-[#00DEC7]">Servicios</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Desarrollo web, tiendas online, apps móviles, marketing digital, posicionamiento SEO y agentes IA para hacer crecer tu negocio en cualquier parte del mundo. Soluciones digitales a medida para empresas y pymes.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="group hover:shadow-xl hover:border-[#00DEC7] transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-[#00DEC7]/10 flex items-center justify-center mb-4 group-hover:bg-[#00DEC7] transition-colors duration-300">
                    <service.icon className="w-7 h-7 text-[#00DEC7] group-hover:text-black transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#00DEC7]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{service.price} USD</span>
                    <Button asChild variant="ghost" className="text-[#00DEC7] hover:text-[#00DEC7]/80">
                      <Link href={service.href}>
                        Ver más <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            ¿No sabés qué servicio necesitás?
          </h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Contanos sobre tu proyecto y te asesoramos sin compromiso sobre la mejor solución para tu negocio.
          </p>
          <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8 font-semibold">
            <Link href="/contacto">
              Consultar gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
