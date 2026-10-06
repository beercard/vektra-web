import type { Metadata } from "next"
import ErpPageClient from "./page-client"
import { faqsErp } from "./preguntas"

export const metadata: Metadata = {
  title: "Vektra ERP | Sistema de gestión en la nube para pymes argentinas",
  description:
    "Vektra ERP: facturación electrónica ARCA (A, B, C y FCE MiPyME), ventas, stock, compras con lectura de facturas por IA, cobros online, tesorería, impuestos y contabilidad en la nube. Probalo gratis 15 días.",
  keywords: [
    // Keywords principales
    "erp para pymes",
    "sistema de gestión para pymes",
    "facturación electrónica arca",
    // Long tail keywords
    "erp en la nube argentina",
    "software de facturación electrónica",
    "factura de crédito electrónica mipyme",
    "sistema de stock y facturación",
    "libro iva digital",
    "sistema de gestión con mercado pago",
    "software para servicio técnico",
    "erp con tienda online y mercado libre",
    "cheques y echeq",
    "retenciones de ganancias e iibb",
    "contabilidad con asientos automáticos",
  ],
  openGraph: {
    title: "Vektra ERP | Sistema de gestión en la nube para pymes",
    description:
      "Facturás con ARCA, controlás el stock, cobrás y pagás, y los impuestos y la contabilidad salen solos. Probalo gratis 15 días.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vektra ERP | Gestión en la nube para pymes",
    description: "Facturación electrónica ARCA, stock, compras, tesorería, impuestos y contabilidad en un solo sistema.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/erp",
    languages: {
      es: "https://vektra.digital/servicios/erp",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vektra ERP",
  "description":
    "Sistema de gestión (ERP) en la nube para pymes argentinas: facturación electrónica con ARCA, ventas, presupuestos, pedidos y remitos, cobros online, stock, compras, tesorería, impuestos y contabilidad, con aplicaciones adicionales de servicio técnico, contratos, tiendas online y asistente con IA.",
  "url": "https://erp.vektra.digital",
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
  "serviceType": "Software de gestión (ERP) en la nube",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Módulos de Vektra ERP",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facturación electrónica ARCA" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ventas, presupuestos, pedidos y remitos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cobros online y débito directo" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stock por depósito" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Compras y pagos con retenciones" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tesorería, cheques y ECHEQ" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Impuestos y Libro IVA Digital" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contabilidad con asientos automáticos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Servicio técnico (adicional)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tiendas online (adicional)" } },
    ],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsErp.map((faq) => ({
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
    { "@type": "ListItem", "position": 3, "name": "Vektra ERP", "item": "https://vektra.digital/servicios/erp" },
  ],
}

export default function ErpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ErpPageClient />
    </>
  )
}
