import type { Metadata } from "next"
import MarketingDigitalClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Agencia de Marketing Digital en Argentina y Paraguay | Google Ads y Meta Ads | Vektra",
  description: "Agencia de marketing digital experta en Google Ads, Meta Ads, TikTok Ads y SEO. Estrategias de performance y ventas para empresas en Argentina y Paraguay. ROI garantizado.",
  keywords: [
    // Keywords principales
    "agencia de marketing digital argentina",
    "marketing digital paraguay",
    "google ads argentina",
    "meta ads argentina",
    // Long tail keywords
    "agencia google ads certificada argentina",
    "publicidad en facebook e instagram precio",
    "campañas google ads para pymes",
    "agencia de performance marketing",
    "cuanto cuesta publicidad en google argentina",
    "marketing digital para empresas",
    "publicidad digital redes sociales",
    "agencia sem argentina",
    "campañas de remarketing",
    "email marketing automatizado",
    "gestión de google business profile",
    "publicidad tiktok argentina",
    // Ciudades
    "agencia de marketing buenos aires",
    "agencia de marketing córdoba",
    "agencia de marketing rosario",
    "agencia de marketing asunción",
    "marketing digital resistencia",
  ],
  openGraph: {
    title: "Agencia de Marketing Digital | Google Ads y Meta Ads | Vektra",
    description: "Maximizamos tus ventas con estrategias de marketing digital enfocadas en resultados. Google Ads, Meta Ads y más.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Digital en Argentina y Paraguay | Vektra",
    description: "Agencia de marketing digital con foco en performance y ROI.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/marketing-digital",
    languages: {
      es: "https://vektra.digital/servicios/marketing-digital",
      en: "https://vektra.digital/en/services/digital-marketing",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Marketing Digital y Publicidad Online",
  "description": "Servicio de marketing digital que incluye gestión de campañas en Google Ads, Meta Ads (Facebook e Instagram), TikTok Ads, SEO, email marketing y Google Business Profile. Estrategias enfocadas en resultados y ROI medible.",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital",
    "logo": "https://vektra.digital/logo/logo-vektra-digital.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@vektra.digital",
      "contactType": "sales",
      "availableLanguage": ["Spanish"]
    }
  },
  "areaServed": [
    { "@type": "Country", "name": "Argentina" },
    { "@type": "Country", "name": "Paraguay" }
  ],
  "serviceType": "Digital Marketing",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de marketing digital",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meta Ads (Facebook e Instagram)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TikTok Ads" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Business Profile" } }
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el marketing digital y por qué lo necesito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El marketing digital reúne estrategias de promoción en buscadores, plataformas de anuncios y email. Es esencial porque tu público está online. En Argentina y Paraguay, más del 80% de las personas buscan productos y servicios en internet antes de comprar."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta una campaña de Google Ads en Argentina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El presupuesto de Google Ads es flexible y lo defines tú. Recomendamos empezar con un mínimo de $50.000 ARS mensuales para ver resultados. A esto se suma nuestra gestión que incluye creación de anuncios, seguimiento y optimización constante."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia hay entre Google Ads y Meta Ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads capta intención de compra en el momento exacto de búsqueda. Meta Ads trabaja con segmentación por intereses, comportamientos y audiencias para generar demanda. La combinación suele potenciar resultados."
      }
    },
    {
      "@type": "Question",
      "name": "¿Sirve TikTok Ads para mi negocio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TikTok es ideal si tu público objetivo tiene entre 16-35 años. Es la plataforma de mayor crecimiento y ofrece costos por clic muy competitivos. Funciona muy bien para moda, gastronomía, entretenimiento y marcas que quieran una imagen fresca y moderna."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda el SEO en dar resultados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El SEO es una estrategia a mediano-largo plazo. Generalmente se empiezan a ver resultados entre 3-6 meses, dependiendo de la competencia del sector. Sin embargo, los resultados son duraderos y el tráfico orgánico no tiene costo por clic."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es Google Business Profile y por qué es importante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Business Profile es la ficha de tu negocio que aparece en Google y Google Maps. Es gratuito y fundamental para negocios locales en Argentina y Paraguay. Permite que tus clientes te encuentren, vean tus horarios, fotos, reseñas y te contacten directamente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo miden los resultados de las campañas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Utilizamos Google Analytics, Meta Business Suite y las herramientas nativas de cada plataforma. Te enviamos reportes mensuales con métricas clave: impresiones, clics, conversiones, costo por resultado y ROI. Todo transparente y medible."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con empresas de Paraguay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, trabajamos con clientes en toda Argentina y Paraguay. Las reuniones se realizan por videollamada y la comunicación es fluida. Tenemos experiencia en campañas para ambos países con segmentación geográfica específica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué plataformas de email marketing utilizan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabajamos principalmente con Mailchimp y Omnisend, que son las más populares y efectivas. Configuramos automatizaciones, secuencias de bienvenida, carritos abandonados y campañas promocionales para maximizar tus conversiones."
      }
    }
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://vektra.digital" },
    { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://vektra.digital/servicios" },
    { "@type": "ListItem", "position": 3, "name": "Marketing Digital", "item": "https://vektra.digital/servicios/marketing-digital" },
  ],
}

export default async function MarketingDigitalPage() {
  const { testimonials } = await readStorage()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MarketingDigitalClient testimonials={testimonials} />
    </>
  )
}
