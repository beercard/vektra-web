import type { Metadata } from "next"
import CrmPageClient from "./page-client"
import { faqsCrm } from "./preguntas"

export const metadata: Metadata = {
  title: "Vektra CRM | CRM con WhatsApp y embudo de ventas para pymes (próximamente)",
  description:
    "Vektra CRM: conversaciones de WhatsApp, correo y formularios en una bandeja, embudo de ventas, tareas, automatizaciones y asistente con IA, conectado con Vektra ERP. Sumate a la lista de espera.",
  keywords: [
    // Keywords principales
    "crm para pymes",
    "crm con whatsapp",
    "crm argentina",
    // Long tail keywords
    "crm omnicanal",
    "embudo de ventas kanban",
    "bandeja de whatsapp business",
    "crm con api oficial de whatsapp",
    "automatización de ventas",
    "crm conectado con facturación",
    "software de seguimiento de clientes",
  ],
  openGraph: {
    title: "Vektra CRM | Cada consulta, con dueño y próximo paso",
    description:
      "Bandeja de conversaciones, embudo de ventas y automatizaciones para pymes, conectado con Vektra ERP. Lista de espera abierta.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vektra CRM | Lista de espera",
    description: "CRM con WhatsApp oficial, embudo de ventas y asistente con IA para pymes.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/crm",
    languages: {
      es: "https://vektra.digital/servicios/crm",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vektra CRM",
  "description":
    "CRM para pymes con bandeja de conversaciones (WhatsApp Business oficial, correo y formularios web; Instagram y Facebook planificados), embudos de venta, tareas, automatizaciones, asistente con IA e integración con Vektra ERP. En preparación, con lista de espera.",
  "url": "https://crm.vektra.digital",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital",
    "logo": "https://vektra.digital/logo/logo-vektra-digital.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@vektra.digital",
      "contactType": "sales",
      "availableLanguage": ["Spanish"],
    },
  },
  "areaServed": "AR",
  "serviceType": "Software CRM en la nube",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsCrm.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://vektra.digital" },
    { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://vektra.digital/servicios" },
    { "@type": "ListItem", "position": 3, "name": "Vektra CRM", "item": "https://vektra.digital/servicios/crm" },
  ],
}

export default function CrmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CrmPageClient />
    </>
  )
}
