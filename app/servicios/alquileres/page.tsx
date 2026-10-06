import type { Metadata } from "next"
import AlquileresPageClient from "./page-client"
import { faqsAlquileres } from "./preguntas"

export const metadata: Metadata = {
  title: "Vektra Alquileres | Sistema para alquileres temporarios en Argentina y Paraguay",
  description:
    "Estamos preparando Vektra Alquileres: calendario unificado con sincronización iCal con Airbnb, Booking y otras plataformas y con Google Calendar, reservas directas, limpiezas, mensajes a huéspedes, liquidación a propietarios, cobros y facturación ARCA con Vektra ERP. Sumate a la lista de espera.",
  keywords: [
    // Keywords principales
    "sistema para alquileres temporarios",
    "software para alquiler temporario",
    "gestión de alquileres temporarios",
    // Long tail keywords
    "calendario unificado airbnb y booking",
    "sincronización de calendarios ical",
    "alquileres temporarios con google calendar",
    "sistema para administradoras de alquileres",
    "liquidación a propietarios",
    "limpieza entre estadías",
    "alquileres temporarios paraguay",
    "facturación de alquileres temporarios arca",
  ],
  openGraph: {
    title: "Vektra Alquileres | Todos tus alquileres temporarios en un solo calendario",
    description:
      "Reservas de todas las plataformas, limpiezas, huéspedes y propietarios, en Argentina y Paraguay. Próximamente: sumate a la lista de espera.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vektra Alquileres | Lista de espera",
    description: "Sistema para administrar alquileres temporarios en Argentina y Paraguay.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/alquileres",
    languages: {
      es: "https://vektra.digital/servicios/alquileres",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vektra Alquileres",
  "description":
    "Sistema en preparación para administrar alquileres temporarios (departamentos, casas y cabañas) en Argentina y Paraguay: calendario unificado con sincronización de calendarios por iCal con las plataformas y con Google Calendar, reservas directas, mensajes a huéspedes, limpieza entre estadías, liquidación a propietarios, cobros y facturación electrónica ARCA a través de Vektra ERP en Argentina. Lista de espera abierta.",
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
  "areaServed": [
    { "@type": "Country", "name": "Argentina" },
    { "@type": "Country", "name": "Paraguay" },
  ],
  "serviceType": "Software de gestión de alquileres temporarios",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsAlquileres.map((faq) => ({
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
    { "@type": "ListItem", "position": 3, "name": "Vektra Alquileres", "item": "https://vektra.digital/servicios/alquileres" },
  ],
}

export default function AlquileresPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AlquileresPageClient />
    </>
  )
}
