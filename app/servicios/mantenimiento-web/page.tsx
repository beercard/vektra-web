import type { Metadata } from "next"
import MantenimientoWebClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Mantenimiento Web Profesional | Vektra",
  description: "Servicio de mantenimiento web profesional. Actualizaciones de WordPress, copias de seguridad diarias, seguridad anti-malware, optimización de velocidad y soporte técnico 24/7 para tu sitio web.",
  keywords: [
    // Keywords principales
    "mantenimiento web",
    "mantenimiento wordpress",
    "mantenimiento sitio web",
    // Long tail keywords
    "servicio de mantenimiento web mensual",
    "mantenimiento de páginas web profesional",
    "actualización de plugins wordpress",
    "copias de seguridad web diarias",
    "seguridad web anti-malware",
    "optimización velocidad wordpress",
    "soporte técnico web 24/7",
    "mantenimiento woocommerce",
    "mantenimiento web pymes",
    "planes de mantenimiento web económicos",
    "backup automático sitio web",
    "protección contra hackers wordpress",
  ],
  openGraph: {
    title: "Mantenimiento Web Profesional | Vektra Digital",
    description: "Tu web siempre actualizada, segura y rápida. Planes de mantenimiento web desde $15.000/mes con copias de seguridad, seguridad y soporte incluido.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantenimiento Web Profesional | Vektra",
    description: "Servicio de mantenimiento web: actualizaciones, seguridad, backups y soporte técnico.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/mantenimiento-web",
    languages: {
      es: "https://vektra.digital/servicios/mantenimiento-web",
      en: "https://vektra.digital/en/services/web-maintenance",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mantenimiento Web Profesional",
  "description": "Servicio completo de mantenimiento web que incluye actualizaciones de WordPress, plugins y temas, copias de seguridad diarias, seguridad anti-malware, optimización de velocidad y soporte técnico.",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital"
  },
  "areaServed": "Worldwide",
  "serviceType": "Web Maintenance",
  "offers": [
    {
      "@type": "Offer",
      "name": "Plan Básico",
      "price": "15000",
      "priceCurrency": "ARS",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "15000",
        "priceCurrency": "ARS",
        "unitCode": "MON",
        "billingDuration": "P1M"
      }
    },
    {
      "@type": "Offer",
      "name": "Plan Profesional",
      "price": "30000",
      "priceCurrency": "ARS",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "30000",
        "priceCurrency": "ARS",
        "unitCode": "MON",
        "billingDuration": "P1M"
      }
    },
    {
      "@type": "Offer",
      "name": "Plan Enterprise",
      "price": "60000",
      "priceCurrency": "ARS",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "60000",
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
      "name": "¿Qué incluye el servicio de mantenimiento web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incluye actualizaciones de WordPress, plugins y temas, copias de seguridad periódicas, monitoreo de seguridad, optimización de velocidad y soporte técnico según el plan elegido."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cada cuánto se realizan las copias de seguridad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depende del plan: semanal en el plan Básico, diaria en el Profesional, y cada 6 horas en el Enterprise. Todas las copias se almacenan de forma segura en la nube."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué pasa si mi web es hackeada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si tu web sufre un ataque, restauramos la última copia de seguridad limpia, eliminamos el malware, reforzamos la seguridad y te informamos de las acciones tomadas sin costo adicional."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo cambiar de plan en cualquier momento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, puedes subir o bajar de plan cuando lo necesites. El cambio se aplica en el siguiente período de facturación."
      }
    },
    {
      "@type": "Question",
      "name": "¿El mantenimiento incluye cambios en el diseño?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los planes Profesional y Enterprise incluyen horas de cambios menores. Para rediseños completos o nuevas funcionalidades, se presupuestan por separado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan solo con WordPress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Principalmente WordPress y WooCommerce, pero también ofrecemos mantenimiento para webs desarrolladas con Next.js, React y otras tecnologías."
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
    { "@type": "ListItem", "position": 3, "name": "Mantenimiento Web", "item": "https://vektra.digital/servicios/mantenimiento-web" },
  ],
}

export default async function MantenimientoWebPage() {
  const { projects: allProjects, testimonials } = await readStorage()
  const projects = allProjects.filter(p => p.category === 'mantenimiento-web' || p.category === 'diseno-web').slice(0, 4)

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
      <MantenimientoWebClient projects={projects} testimonials={testimonials} />
    </>
  )
}
