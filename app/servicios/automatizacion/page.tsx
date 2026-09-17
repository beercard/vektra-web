import type { Metadata } from "next"
import AutomatizacionClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Automatización de Procesos Empresariales | Vektra",
  description: "Servicios de automatización de procesos empresariales para empresas de todo el mundo. Workflows automatizados, integración de sistemas, bots y asistentes con Make, Zapier y desarrollo a medida.",
  keywords: [
    // Keywords principales
    "automatización procesos",
    "automatización empresas",
    "automatización workflows",
    "integración de sistemas",
    // Long tail keywords
    "automatización de tareas repetitivas",
    "integración crm email marketing",
    "automatización zapier make",
    "automatización procesos empresariales",
    "bots para empresas",
    "automatización facturación",
    "integración apis sistemas",
    "automatización sin código",
    "rpa",
    "automatización pymes",
    "workflows automatizados n8n",
    "transformación digital empresas",
  ],
  openGraph: {
    title: "Automatización de Procesos | Vektra Digital",
    description: "Automatizá tu negocio y multiplicá tu tiempo. Eliminamos tareas repetitivas con workflows inteligentes.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatización de Procesos | Vektra",
    description: "Workflows automatizados e integración de sistemas para tu empresa.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/automatizacion",
    languages: {
      es: "https://vektra.digital/servicios/automatizacion",
      en: "https://vektra.digital/en/services/automation",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Automatización de Procesos Empresariales",
  "description": "Servicio de automatización de procesos que incluye diseño de workflows, integración de sistemas, bots y asistentes, automatización sin código con Make y Zapier, procesos programados y optimización continua.",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital"
  },
  "areaServed": "Worldwide",
  "serviceType": "Business Process Automation",
  "offers": [
    {
      "@type": "Offer",
      "name": "Automatización Simple",
      "price": "80000",
      "priceCurrency": "ARS"
    },
    {
      "@type": "Offer",
      "name": "Automatización Avanzada",
      "price": "200000",
      "priceCurrency": "ARS"
    }
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué tipo de procesos se pueden automatizar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casi cualquier tarea repetitiva: envío de emails, generación de reportes, sincronización de datos, notificaciones, facturación, gestión de inventario, publicación en redes, y mucho más."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué herramientas utilizan para automatizar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Principalmente Make (Integromat), Zapier y n8n para automatizaciones sin código. Para proyectos más complejos, desarrollamos soluciones custom con Python, Node.js y APIs."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo toma implementar una automatización?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las automatizaciones simples se implementan en 1-2 semanas. Proyectos más complejos pueden tomar 4-8 semanas dependiendo de la cantidad de sistemas a integrar."
      }
    },
    {
      "@type": "Question",
      "name": "¿Hay costos adicionales por las herramientas de automatización?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las plataformas de automatización tienen sus propios planes. Te asesoramos sobre la mejor opción según tu volumen. Muchos clientes empiezan con planes gratuitos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué pasa si algo falla en la automatización?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Configuramos alertas y monitoreo para detectar problemas. Tenemos planes de contingencia y soporte para resolver incidencias rápidamente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo modificar las automatizaciones después?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, las automatizaciones son flexibles. Te capacitamos para hacer cambios simples, y estamos disponibles para modificaciones más complejas."
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
    { "@type": "ListItem", "position": 3, "name": "Automatización de Procesos", "item": "https://vektra.digital/servicios/automatizacion" },
  ],
}

export default async function AutomatizacionPage() {
  const { projects: allProjects, testimonials } = await readStorage()
  const projects = allProjects.filter(p => p.category === 'automatizacion').slice(0, 4)

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
      <AutomatizacionClient projects={projects} testimonials={testimonials} />
    </>
  )
}
