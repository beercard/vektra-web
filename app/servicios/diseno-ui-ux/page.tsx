import type { Metadata } from "next"
import DisenoUIUXClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Diseño UI/UX Profesional | Vektra",
  description: "Servicio de diseño de interfaces y experiencia de usuario. Creamos diseños intuitivos, atractivos y centrados en el usuario con investigación UX, prototipado y Design Systems.",
  keywords: [
    // Keywords principales
    "diseño ui",
    "diseño ux",
    "diseño interfaces",
    "experiencia de usuario",
    // Long tail keywords
    "diseño ui ux profesional",
    "diseñador de interfaces web",
    "diseño experiencia de usuario",
    "prototipado interactivo figma",
    "design system para empresas",
    "rediseño de sitio web ux",
    "user interface design",
    "investigación de usuarios ux",
    "wireframes y prototipos web",
    "diseño de aplicaciones móviles ui",
    "consultoría ux para startups",
    "mejora de conversión ux",
  ],
  openGraph: {
    title: "Diseño UI/UX Profesional | Vektra Digital",
    description: "Diseños que enamoran y convierten. Interfaces intuitivas centradas en el usuario con investigación, prototipado y Design Systems.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño UI/UX Profesional | Vektra",
    description: "Creamos experiencias digitales centradas en el usuario.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/diseno-ui-ux",
    languages: {
      es: "https://vektra.digital/servicios/diseno-ui-ux",
      en: "https://vektra.digital/en/services/ui-ux-design",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Diseño UI/UX Profesional",
  "description": "Servicio completo de diseño de interfaces y experiencia de usuario que incluye investigación UX, diseño de interacción, diseño visual UI, diseño responsive, Design Systems y prototipado interactivo.",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital"
  },
  "areaServed": "Worldwide",
  "serviceType": "UI/UX Design",
  "offers": [
    {
      "@type": "Offer",
      "name": "Landing Page Design",
      "price": "150000",
      "priceCurrency": "ARS"
    },
    {
      "@type": "Offer",
      "name": "Sitio Web Completo",
      "price": "400000",
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
      "name": "¿Qué incluye el diseño UI/UX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incluye investigación de usuarios, arquitectura de información, wireframes, diseño visual de interfaces, prototipos interactivos y documentación para desarrollo. El alcance depende del plan elegido."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué herramientas trabajan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Principalmente usamos Figma para diseño y prototipado. También trabajamos con herramientas como Maze para testing y Notion para documentación."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo toma un proyecto de diseño UI/UX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una landing page toma aproximadamente 1-2 semanas. Un sitio web completo entre 3-4 semanas. Proyectos de producto pueden tomar 2-3 meses dependiendo de la complejidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿El diseño incluye el desarrollo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, el diseño y desarrollo son servicios separados. Podemos cotizarte ambos o solo el diseño si ya tenés equipo de desarrollo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Hacen rediseños de sitios existentes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, realizamos rediseños completos o parciales. Analizamos tu sitio actual, identificamos problemas de UX y proponemos mejoras basadas en datos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo es el proceso de trabajo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comenzamos con una reunión de discovery, seguido de investigación y wireframes. Luego pasamos al diseño visual con revisiones iterativas, y finalizamos con el prototipo y handoff."
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
    { "@type": "ListItem", "position": 3, "name": "Diseño UI/UX", "item": "https://vektra.digital/servicios/diseno-ui-ux" },
  ],
}

export default async function DisenoUIUXPage() {
  const { projects: allProjects, testimonials } = await readStorage()
  const projects = allProjects.filter(p => p.category === 'diseno-ui-ux' || p.category === 'diseno-web').slice(0, 4)

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
      <DisenoUIUXClient projects={projects} testimonials={testimonials} />
    </>
  )
}
