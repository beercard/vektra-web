import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Clients } from "@/components/sections/clients"
import { PortfolioPreview } from "@/components/sections/portfolio-preview"
import { FAQ } from "@/components/sections/faq"
import { Testimonials } from "@/components/sections/testimonials"
import { Trayectoria } from "@/components/sections/trayectoria"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { dictionaries } from '@/lib/dictionaries'
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://vektra.digital/#website",
  "name": "Vektra - Agencia Digital Argentina",
  "url": "https://vektra.digital",
  "description": "Agencia de desarrollo web, tiendas online, apps móviles, marketing digital y agentes de IA en Argentina y Paraguay.",
  "publisher": {
    "@id": "https://vektra.digital/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vektra.digital/trabajos?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["es-AR", "es-PY", "en"]
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://vektra.digital/#localbusiness",
  "name": "Vektra Digital",
  "image": "https://vektra.digital/logo/logo-vektra-digital.png",
  "email": "info@vektra.digital",
  "url": "https://vektra.digital",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Resistencia",
    "addressRegion": "Chaco",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.4512,
    "longitude": -58.9867
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "areaServed": [
    { "@type": "Country", "name": "Argentina" },
    { "@type": "Country", "name": "Paraguay" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "45",
    "bestRating": "5"
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://vektra.digital"
    }
  ]
}

export default async function Home() {
  const dict = dictionaries.es
  const { projects, testimonials: allTestimonials } = await readStorage()
  // Filter only Spanish testimonials and take the first 6 most relevant ones
  const testimonials = allTestimonials
    .filter((t) => t.language === "es")
    .slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Hero dict={dict} />
      <Services dict={dict.services} />
      <Process dict={dict.process} />
      <PortfolioPreview dict={dict.portfolio} initialProjects={projects} />
      <Clients dict={dict.clients} />
      <FAQ dict={dict.faq} />
      <Testimonials dict={dict.testimonials} items={testimonials} />
      <Trayectoria dict={dict.trayectoria} />
      <ContactFormSection dict={dict.contactForm} />
    </>
  )
}
