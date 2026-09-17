import type { Metadata } from "next"
import SEOPageClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "SEO y Posicionamiento Web en Argentina y Paraguay | Agencia SEO | Vektra",
  description: "Agencia SEO profesional en Argentina y Paraguay. Posicionamiento web en Google, SEO local, SEO para e-commerce y optimización para buscadores de IA como ChatGPT y Perplexity.",
  keywords: [
    // Keywords principales
    "seo argentina",
    "seo paraguay",
    "posicionamiento web argentina",
    "agencia seo argentina",
    // Long tail keywords
    "cuánto cuesta el seo en argentina",
    "agencia seo profesional buenos aires",
    "posicionamiento google mi negocio",
    "seo para tiendas online",
    "seo local para negocios",
    "consultoría seo argentina",
    "auditoría seo gratuita",
    "seo para chatgpt y perplexity",
    "posicionamiento en buscadores ia",
    "linkbuilding argentina",
    "seo on page y off page",
    "optimización velocidad web",
    // Ciudades
    "seo buenos aires",
    "seo córdoba",
    "seo rosario",
    "seo mendoza",
    "seo resistencia",
    "seo asunción",
    "seo ciudad del este",
  ],
  openGraph: {
    title: "SEO y Posicionamiento Web | Agencia SEO Argentina y Paraguay | Vektra",
    description: "Posicionamos tu negocio en Google y buscadores de IA. SEO local, SEO e-commerce y estrategias a medida.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia SEO en Argentina y Paraguay | Vektra",
    description: "Posicionamiento web profesional y SEO para buscadores de IA.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/seo",
    languages: {
      es: "https://vektra.digital/servicios/seo",
      en: "https://vektra.digital/en/services/seo",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO y Posicionamiento Web",
  "description": "Servicio profesional de SEO y posicionamiento web que incluye auditoría SEO, optimización on-page, link building, SEO local, SEO para e-commerce y optimización para buscadores de IA como ChatGPT, Perplexity y Gemini.",
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
  "serviceType": "SEO & Web Positioning",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios SEO",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auditoría SEO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO On-Page" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Off-Page y Link Building" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Local" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO para E-commerce" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO para IA (ChatGPT, Perplexity)" } }
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda en verse resultados del SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El SEO es una estrategia a mediano-largo plazo. Generalmente se empiezan a ver mejoras entre 3-6 meses, aunque depende de la competencia del sector, el estado actual del sitio y las palabras clave objetivo. Las mejoras técnicas pueden tener impacto más rápido, mientras que el posicionamiento de keywords competitivas toma más tiempo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el SEO para Inteligencia Artificial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es la optimización de contenido para aparecer en las respuestas de buscadores IA como ChatGPT, Perplexity, Gemini y Copilot. Estos sistemas buscan información en la web para generar respuestas, y con las técnicas adecuadas podemos hacer que tu negocio sea citado como fuente. Es el futuro del posicionamiento web."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta el servicio de SEO en Argentina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El costo del SEO en Argentina varía según el tamaño del sitio, la competencia del sector y los objetivos. Ofrecemos planes desde servicios básicos hasta estrategias completas. Contactanos para una cotización personalizada basada en tus necesidades específicas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Hacen SEO para tiendas online y e-commerce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, tenemos amplia experiencia en SEO para e-commerce en Argentina y Paraguay. Optimizamos tiendas en WooCommerce, Shopify y Tiendanube. Trabajamos categorías, productos, fichas técnicas, y estrategias específicas para aumentar las ventas orgánicas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia hay entre SEO y Google Ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads son anuncios pagos que aparecen inmediatamente pero dejan de mostrarse cuando dejas de pagar. El SEO es posicionamiento orgánico: toma más tiempo pero los resultados son duraderos y no pagas por cada clic. Lo ideal es combinar ambas estrategias."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con empresas de Paraguay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, brindamos servicios de SEO tanto en Argentina como en Paraguay. Tenemos clientes en Asunción, Ciudad del Este, Encarnación y otras ciudades. Trabajamos de forma 100% remota con reuniones por videollamada."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye la auditoría SEO gratuita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La auditoría inicial incluye análisis de la situación actual de tu web, revisión de errores técnicos básicos, análisis de palabras clave principales, revisión de competencia y recomendaciones iniciales. Es sin compromiso y te ayuda a entender dónde estás parado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Garantizan el primer puesto en Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ninguna agencia seria puede garantizar el primer puesto ya que Google actualiza constantemente su algoritmo. Lo que sí garantizamos es trabajo profesional, estrategias probadas, transparencia total y mejoras medibles en tu posicionamiento. Nuestros resultados hablan por sí solos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo miden los resultados del SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Utilizamos herramientas profesionales como Google Analytics, Google Search Console, SEMrush y Ahrefs. Medimos posiciones de keywords, tráfico orgánico, impresiones, clics, conversiones y ROI. Entregamos informes mensuales detallados y fáciles de entender."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el SEO local y por qué es importante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El SEO local optimiza tu presencia para búsquedas geográficas como 'restaurante en resistencia' o 'abogado cerca de mí'. Incluye Google My Business, reseñas, citaciones locales y contenido geolocalizado. Es fundamental para negocios con ubicación física o que atienden áreas específicas."
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
    { "@type": "ListItem", "position": 3, "name": "Posicionamiento SEO", "item": "https://vektra.digital/servicios/seo" },
  ],
}

export default async function SEOPage() {
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
      <SEOPageClient testimonials={testimonials} />
    </>
  )
}
