import type { Metadata } from "next"
import SobreNosotrosClient from "./page-client"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Agencia de Desarrollo Web y Marketing Digital",
  description: "Conocé al equipo de Vektra: expertos en desarrollo web, marketing digital, apps móviles y agentes IA para empresas de todo el mundo. Más de 8 años de experiencia y +150 proyectos completados.",
  keywords: [
    "agencia digital",
    "agencia desarrollo web",
    "equipo vektra",
    "agencia marketing digital",
    "desarrolladores web",
    "expertos google ads",
    "agencia chatbots ia",
    "agencia digital global",
  ],
  openGraph: {
    title: "Sobre Nosotros | Vektra - Agencia Digital",
    description: "Somos Vektra: expertos en desarrollo web, marketing digital y agentes IA para empresas de todo el mundo.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | Vektra",
    description: "Equipo de expertos en desarrollo web, marketing digital e IA para empresas de todo el mundo.",
  },
  alternates: {
    canonical: "https://vektra.digital/sobre-nosotros",
    languages: {
      es: "https://vektra.digital/sobre-nosotros",
      en: "https://vektra.digital/en/about",
    },
  },
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Sobre Nosotros - Vektra Digital",
  "description": "Agencia digital especializada en desarrollo web, marketing digital, apps móviles y agentes IA para empresas de todo el mundo.",
  "url": "https://vektra.digital/sobre-nosotros",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://vektra.digital/#organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital",
    "foundingDate": "2018",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 2,
      "maxValue": 10,
    },
    "member": [
      {
        "@type": "Person",
        "name": "Martin Garcia",
        "jobTitle": "Licenciado en Marketing Digital",
        "knowsAbout": ["Google Ads", "Meta Ads", "TikTok Ads", "SEO", "WordPress", "WooCommerce", "Shopify"],
        "sameAs": ["https://www.linkedin.com/in/martinlgarcia/"],
        "worksFor": { "@type": "Organization", "name": "Vektra Digital" },
      },
      {
        "@type": "Person",
        "name": "Matias Garcia",
        "jobTitle": "Analista en Sistemas",
        "knowsAbout": ["Next.js", "React", "Node.js", "Agentes IA", "Chatbots", "React Native", "Flutter"],
        "sameAs": ["https://www.linkedin.com/in/matias-luciano-garcia/", "https://github.com/matiaslgarcia"],
        "worksFor": { "@type": "Organization", "name": "Vektra Digital" },
      },
    ],
    "areaServed": "Worldwide",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://vektra.digital",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Sobre Nosotros",
      "item": "https://vektra.digital/sobre-nosotros",
    },
  ],
}

export default function SobreNosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SobreNosotrosClient />
    </>
  )
}
