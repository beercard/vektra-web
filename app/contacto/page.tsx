import { Metadata } from "next"
import ContactoClient from "./page-client"

export const metadata: Metadata = {
  title: "Contacto | Solicita Presupuesto Gratis para tu Proyecto Web",
  description: "Contacta con Vektra para tu próximo proyecto digital. Presupuesto sin compromiso para diseño web, tiendas online, apps, marketing digital y agentes IA para empresas de todo el mundo.",
  keywords: [
    "contacto vektra",
    "presupuesto diseño web",
    "cotización tienda online",
    "presupuesto marketing digital",
    "contactar agencia web argentina",
    "presupuesto app móvil",
    "consulta desarrollo web",
    "contacto agencia digital paraguay",
    "pedir presupuesto seo",
    "consultoría marketing digital gratis"
  ],
  openGraph: {
    title: "Contacto | Presupuesto Gratis | Vektra",
    description: "Solicita un presupuesto sin compromiso para tu proyecto digital.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Vektra",
    description: "Contactanos para tu próximo proyecto de desarrollo web o marketing digital.",
  },
  alternates: {
    canonical: "https://vektra.digital/contacto",
    languages: {
      en: "https://vektra.digital/en/contact",
    },
  },
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto - Vektra",
  "description": "Página de contacto de Vektra Digital para solicitar presupuestos de desarrollo web, marketing digital y más.",
  "url": "https://vektra.digital/contacto",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://vektra.digital/#organization",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "info@vektra.digital",
      "availableLanguage": ["Spanish", "English"],
      "areaServed": "Worldwide"
    }
  }
}

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactoClient />
    </>
  )
}
