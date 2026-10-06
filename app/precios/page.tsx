import type { Metadata } from "next"
import PreciosPageClient from "./page-client"
import { faqsPrecios } from "./preguntas"
import { PLANES_ERP, URL_ERP, URL_ERP_REGISTRO } from "@/lib/productos-vektra"

export const metadata: Metadata = {
  title: "Precios de Vektra ERP, CRM y Alquileres | Planes en pesos",
  description:
    "Precios de Vektra ERP: plan Gratis y planes Inicial, Pyme y Empresa en pesos, por mes más IVA, con pago anual de 10 meses. Vektra CRM y Vektra Alquileres con precio de lanzamiento para la lista de espera y 20 % de descuento al combinar productos.",
  keywords: [
    // Keywords principales
    "precio erp pymes",
    "precios vektra",
    "cuánto cuesta un sistema de gestión",
    // Long tail keywords
    "precio sistema de facturación electrónica",
    "erp en pesos argentinos",
    "plan gratis facturación arca",
    "precio crm con whatsapp",
    "precio sistema para alquileres temporarios",
    "erp con pago anual",
  ],
  openGraph: {
    title: "Precios de Vektra ERP, CRM y Alquileres",
    description: "Plan Gratis y planes en pesos para Vektra ERP. CRM y Alquileres con precio de lanzamiento para la lista de espera.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precios | Vektra",
    description: "Planes de Vektra ERP en pesos y lista de espera de Vektra CRM y Vektra Alquileres.",
  },
  alternates: {
    canonical: "https://vektra.digital/precios",
    languages: {
      es: "https://vektra.digital/precios",
    },
  },
}

/** Solo el ERP lleva ofertas: CRM y Alquileres no tienen precio publicado y no se declaran como productos con oferta. */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Vektra ERP",
  "description":
    "Sistema de gestión en la nube para pymes argentinas: facturación electrónica ARCA, ventas, stock, compras, tesorería, impuestos y contabilidad.",
  "url": URL_ERP,
  "category": "Software de gestión (ERP)",
  "brand": { "@type": "Brand", "name": "Vektra" },
  "offers": PLANES_ERP.map((plan) => ({
    "@type": "Offer",
    "name": `Plan ${plan.nombre}`,
    "description": plan.lema,
    "price": plan.precioMensual,
    "priceCurrency": "ARS",
    "url": URL_ERP_REGISTRO,
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": plan.precioMensual,
      "priceCurrency": "ARS",
      "valueAddedTaxIncluded": false,
      "billingDuration": "P1M",
      "unitText": "mes",
    },
    "seller": { "@type": "Organization", "name": "Vektra Digital", "url": "https://vektra.digital" },
  })),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsPrecios.map((faq) => ({
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
    { "@type": "ListItem", "position": 2, "name": "Precios", "item": "https://vektra.digital/precios" },
  ],
}

export default function PreciosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PreciosPageClient />
    </>
  )
}
