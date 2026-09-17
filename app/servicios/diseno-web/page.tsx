import type { Metadata } from "next"
import DisenoWebClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Diseño Web Profesional en Argentina y Paraguay | Vektra",
  description: "Diseño de páginas web modernas y responsivas en Argentina y Paraguay. Desarrollo web a medida con Next.js, React y WordPress. Sitios rápidos, optimizados para SEO y con soporte técnico incluido.",
  keywords: [
    // Keywords principales
    "diseño web argentina",
    "diseño web paraguay",
    "desarrollo web a medida",
    "páginas web profesionales",
    // Long tail keywords
    "cuánto cuesta una página web en argentina",
    "empresa de diseño web en buenos aires",
    "diseño web para pymes argentina",
    "crear página web profesional precio",
    "agencia de diseño web en asunción",
    "desarrollo web next.js argentina",
    "diseño web wordpress argentina",
    "diseño web react profesional",
    "páginas web para empresas argentina",
    "diseño web responsive móvil",
    "diseño web seo optimizado",
    "diseñador web freelance argentina",
    // Ciudades Argentina
    "diseño web buenos aires",
    "diseño web córdoba",
    "diseño web rosario",
    "diseño web mendoza",
    "diseño web resistencia",
    "diseño web corrientes",
    // Ciudades Paraguay
    "diseño web asunción",
    "diseño web ciudad del este",
    "diseño web encarnación",
  ],
  openGraph: {
    title: "Diseño Web Profesional en Argentina y Paraguay | Vektra",
    description: "Creamos páginas web modernas, rápidas y optimizadas para SEO. Desarrollo con Next.js, React y WordPress.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño Web Profesional | Vektra",
    description: "Diseño y desarrollo web a medida en Argentina y Paraguay.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/diseno-web",
    languages: {
      es: "https://vektra.digital/servicios/diseno-web",
      en: "https://vektra.digital/en/services/web-design",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Diseño Web Profesional",
  "description": "Servicio de diseño y desarrollo de páginas web profesionales con Next.js, React y WordPress. Incluye hosting, dominio, correo corporativo, optimización SEO, integración de WhatsApp, Google Analytics y soporte técnico.",
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
  "serviceType": "Web Design and Development",
  "offers": {
    "@type": "Offer",
    "price": "350000",
    "priceCurrency": "ARS",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "350000",
      "priceCurrency": "ARS",
      "valueAddedTaxIncluded": true
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios incluidos",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hosting + Dominio" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Correo corporativo" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Desarrollo web profesional" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguridad web" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Optimización SEO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Analytics" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Soporte técnico" } }
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué incluye el servicio de desarrollo web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El servicio incluye diseño personalizado, desarrollo con Next.js/React/WordPress, hosting, dominio, correo corporativo, optimización SEO, integración de WhatsApp, Google Analytics, capacitación y soporte técnico por un mes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el precio para crear una página web profesional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los precios varían según la complejidad del proyecto. Una web básica comienza desde $350.000 ARS, mientras que proyectos más complejos con funcionalidades avanzadas tienen presupuestos personalizados. Contáctanos para una cotización sin compromiso."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda en estar lista mi página web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El tiempo de entrega depende del tipo de proyecto. Una web básica puede estar lista en 2-3 semanas, mientras que proyectos más complejos pueden tardar entre 4-8 semanas. Siempre te damos un tiempo estimado antes de comenzar."
      }
    },
    {
      "@type": "Question",
      "name": "¿La web incluye diseño responsive para móviles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todas las webs que desarrollamos son 100% responsive y están optimizadas para verse perfectamente en móviles, tablets y computadoras de escritorio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo editar y gestionar mi web una vez terminada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, te entregamos la web con un panel de administración intuitivo y te brindamos capacitación para que puedas actualizar contenido, imágenes y textos de forma autónoma."
      }
    },
    {
      "@type": "Question",
      "name": "¿Incluyen optimización SEO para Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todas las webs incluyen SEO On Page básico: títulos, descripciones, estructura de encabezados H1-H3, optimización de imágenes y envío del sitemap a Google para indexación."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen mantenimiento web después de la entrega?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, incluimos soporte técnico durante el primer mes. Luego ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, copias de seguridad, control de seguridad y soporte continuo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con clientes de Argentina y Paraguay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, trabajamos con clientes de toda Argentina y Paraguay. Las reuniones se realizan por videollamada y la comunicación es fluida gracias a herramientas digitales como Zoom y email."
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
    { "@type": "ListItem", "position": 3, "name": "Diseño Web Profesional", "item": "https://vektra.digital/servicios/diseno-web" },
  ],
}

export default async function DisenoWebPage() {
  const { projects: allProjects, testimonials } = await readStorage()
  const projects = allProjects.filter(p => p.category === "diseno-web").slice(0, 4)

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
      <DisenoWebClient projects={projects} testimonials={testimonials} />
    </>
  )
}
