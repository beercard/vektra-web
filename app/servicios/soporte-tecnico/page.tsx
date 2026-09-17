import type { Metadata } from "next"
import SoporteTecnicoClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Soporte Técnico Web Profesional | Vektra",
  description: "Servicio de soporte técnico web profesional. Resolución de errores, asistencia remota, respuesta rápida garantizada y equipo de expertos disponible para tu sitio web.",
  keywords: [
    // Keywords principales
    "soporte técnico web",
    "soporte wordpress",
    "ayuda web profesional",
    // Long tail keywords
    "soporte técnico sitio web urgente",
    "resolución de errores wordpress",
    "asistencia remota páginas web",
    "soporte técnico woocommerce",
    "arreglar errores en mi web",
    "mi página web no funciona ayuda",
    "soporte técnico web 24 horas",
    "reparación de sitios web hackeados",
    "soporte web para empresas",
    "servicio técnico páginas web",
    "solucionar problemas wordpress",
    "expertos en wordpress",
  ],
  openGraph: {
    title: "Soporte Técnico Web Profesional | Vektra Digital",
    description: "¿Problemas con tu web? Los resolvemos. Equipo de expertos con respuesta rápida garantizada.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soporte Técnico Web | Vektra",
    description: "Resolución de errores web, asistencia remota y soporte técnico profesional.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/soporte-tecnico",
    languages: {
      es: "https://vektra.digital/servicios/soporte-tecnico",
      en: "https://vektra.digital/en/services/technical-support",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Soporte Técnico Web Profesional",
  "description": "Servicio de soporte técnico para sitios web con resolución de errores, asistencia remota, soporte multicanal y equipo de expertos con experiencia en WordPress, WooCommerce, Next.js y más.",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital"
  },
  "areaServed": "Worldwide",
  "serviceType": "Technical Support",
  "offers": [
    {
      "@type": "Offer",
      "name": "Soporte por Incidente",
      "price": "8000",
      "priceCurrency": "ARS",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "8000",
        "priceCurrency": "ARS",
        "unitCode": "HUR"
      }
    },
    {
      "@type": "Offer",
      "name": "Pack 10 Horas",
      "price": "65000",
      "priceCurrency": "ARS"
    },
    {
      "@type": "Offer",
      "name": "Soporte Ilimitado",
      "price": "45000",
      "priceCurrency": "ARS",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "45000",
        "priceCurrency": "ARS",
        "unitCode": "MON",
        "billingDuration": "P1M"
      }
    }
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo funciona el soporte por incidente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos contactás cuando tenés un problema, evaluamos la complejidad y te damos un presupuesto estimado en horas. Una vez aprobado, trabajamos en la solución y te cobramos solo las horas utilizadas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipo de problemas pueden resolver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resolvemos errores de código, problemas de plugins, fallas de seguridad, problemas de velocidad, errores de base de datos, problemas de email, y cualquier incidencia técnica relacionada con tu web."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el tiempo de respuesta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depende del plan: 24-48 horas para incidentes puntuales, 12 horas para Pack de horas, y menos de 4 horas para Soporte Ilimitado. En emergencias críticas, respondemos en minutos."
      }
    },
    {
      "@type": "Question",
      "name": "¿El soporte incluye cambios en el diseño?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El soporte técnico cubre resolución de problemas y pequeños ajustes. Para cambios de diseño o nuevas funcionalidades, se presupuestan como desarrollo adicional."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan los fines de semana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El plan Soporte Ilimitado incluye cobertura 24/7 para emergencias. Los otros planes tienen cobertura de lunes a viernes en horario comercial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo cancelar cuando quiera?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El plan mensual se puede cancelar en cualquier momento. El Pack de horas no tiene vencimiento pero no es reembolsable una vez adquirido."
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
    { "@type": "ListItem", "position": 3, "name": "Soporte Técnico Web", "item": "https://vektra.digital/servicios/soporte-tecnico" },
  ],
}

export default async function SoporteTecnicoPage() {
  const { projects: allProjects, testimonials } = await readStorage()
  const projects = allProjects.filter(p => p.category === 'soporte-tecnico' || p.category === 'diseno-web').slice(0, 4)

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
      <SoporteTecnicoClient projects={projects} testimonials={testimonials} />
    </>
  )
}
