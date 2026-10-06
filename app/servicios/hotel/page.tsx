import type { Metadata } from "next"
import HotelPageClient from "./page-client"
import { faqsHotel } from "./preguntas"

export const metadata: Metadata = {
  title: "Vektra Hotel | Sistema para alquileres temporarios (próximamente)",
  description:
    "Estamos preparando Vektra Hotel para administrar alquileres temporarios: calendario unificado de reservas de Airbnb, Booking y reservas directas, limpiezas, mensajes a huéspedes, liquidación a propietarios y facturación ARCA con Vektra ERP. Sumate a la lista de espera.",
  keywords: [
    // Keywords principales
    "sistema para alquileres temporarios",
    "software para alquiler temporario",
    "gestión de propiedades airbnb",
    // Long tail keywords
    "calendario unificado airbnb y booking",
    "sincronización de calendarios de alquiler",
    "sistema para administradoras de alquileres",
    "liquidación a propietarios",
    "limpieza entre estadías",
    "reservas directas sin comisión",
    "facturación de alquileres temporarios arca",
  ],
  openGraph: {
    title: "Vektra Hotel | Todos tus alquileres temporarios en un solo calendario",
    description:
      "Reservas de todas las plataformas, limpiezas, huéspedes y propietarios, con la facturación de Vektra ERP. Próximamente: sumate a la lista de espera.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vektra Hotel | Lista de espera",
    description: "Sistema para administrar alquileres temporarios con facturación ARCA de Vektra ERP.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/hotel",
    languages: {
      es: "https://vektra.digital/servicios/hotel",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vektra Hotel",
  "description":
    "Sistema en preparación para administrar alquileres temporarios (departamentos, casas y cabañas): calendario unificado con sincronización de calendarios de las plataformas, reservas directas, mensajes a huéspedes, limpieza entre estadías, liquidación a propietarios, cobros y facturación electrónica ARCA a través de Vektra ERP. Lista de espera abierta.",
  "url": "https://hotel.vektra.digital",
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
  "serviceType": "Software de gestión de alquileres temporarios",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsHotel.map((faq) => ({
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
    { "@type": "ListItem", "position": 3, "name": "Vektra Hotel", "item": "https://vektra.digital/servicios/hotel" },
  ],
}

export default function HotelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HotelPageClient />
    </>
  )
}
