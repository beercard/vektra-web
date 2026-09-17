import type { Metadata } from "next"
import TrabajosPageClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Portfolio de Trabajos | Casos de Éxito en Desarrollo Web y Marketing",
  description: "Descubrí nuestro portfolio de desarrollo web, tiendas online, apps móviles y marketing digital. Casos de éxito reales de empresas de todo el mundo.",
  keywords: [
    "portfolio desarrollo web",
    "casos de éxito marketing digital",
    "ejemplos tiendas online woocommerce",
    "portfolio apps móviles",
    "trabajos diseño web profesional",
    "proyectos ecommerce",
    "ejemplos webs corporativas",
    "portfolio agencia digital",
    "casos éxito seo",
    "trabajos chatbots whatsapp"
  ],
  openGraph: {
    title: "Portfolio de Trabajos | Vektra - Agencia Digital",
    description: "Conocé nuestros casos de éxito en desarrollo web, e-commerce y marketing digital.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Vektra",
    description: "Casos de éxito reales de empresas de todo el mundo.",
  },
  alternates: {
    canonical: "https://vektra.digital/trabajos",
    languages: {
      en: "https://vektra.digital/en/portfolio",
    },
  },
}

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Portfolio de Trabajos - Vektra",
  "description": "Colección de proyectos de desarrollo web, tiendas online, apps y marketing digital realizados por Vektra.",
  "url": "https://vektra.digital/trabajos",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://vektra.digital/#website"
  },
  "about": {
    "@type": "Thing",
    "name": "Proyectos de Desarrollo Web y Marketing Digital"
  }
}

export default async function TrabajosPage() {
  const { projects } = await readStorage()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <TrabajosPageClient initialProjects={projects} />
    </>
  )
}
