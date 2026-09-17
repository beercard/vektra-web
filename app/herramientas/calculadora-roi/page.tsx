import { Metadata } from "next"
import CalculadoraROIClient from "./page-client"

export const metadata: Metadata = {
  title: "Calculadora de ROI Marketing y Publicidad | Fórmula Rentabilidad 2026",
  description: "Calcula el Retorno de Inversión (ROI) de tus campañas de marketing y publicidad. Herramienta gratuita para medir la rentabilidad de tu negocio en cualquier parte del mundo.",
  keywords: [
    "calculadora roi marketing",
    "formula roi",
    "retorno de inversion",
    "calcular rentabilidad publicidad",
    "kpis marketing",
    "calculadora roas",
    "roi vs roas",
    "como calcular roi marketing digital",
    "formula retorno de inversion publicidad",
    "roi campañas google ads",
    "roi facebook ads instagram",
    "rentabilidad marketing digital argentina",
    "medir resultados campañas publicitarias",
    "calculadora roi gratis",
    "roi ecommerce argentina",
  ],
  openGraph: {
    title: "Calculadora de ROI Marketing | Herramienta Gratuita | Vektra",
    description: "Mide el retorno de inversión de tus campañas de marketing digital. Calculadora gratuita con fórmula ROI y ROAS.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora ROI Marketing | Vektra",
    description: "Calcula gratis el retorno de inversión de tu publicidad digital.",
  },
  alternates: {
    canonical: "https://vektra.digital/herramientas/calculadora-roi",
    languages: {
      "en": "https://vektra.digital/en/tools/roi-calculator",
    },
  },
}

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Calculadora de ROI Marketing",
  "description": "Herramienta gratuita para calcular el Retorno de Inversión (ROI) de campañas de marketing digital y publicidad.",
  "url": "https://vektra.digital/herramientas/calculadora-roi",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital"
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el ROI en marketing digital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El ROI (Return on Investment) es una métrica que mide la rentabilidad de una inversión. En marketing digital, indica cuánto ganaste por cada peso invertido en publicidad. La fórmula es: ROI = ((Ingresos - Inversión) / Inversión) x 100."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre ROI y ROAS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El ROI mide la ganancia neta sobre la inversión total (incluyendo todos los costos). El ROAS (Return on Ad Spend) mide solo el ingreso generado por cada peso gastado en publicidad, sin descontar costos. Un ROAS de 4x significa que por cada $1 invertido, generaste $4 en ventas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ROI es considerado bueno en marketing digital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un ROI positivo significa que tu campaña es rentable. En general, un ROI del 100% o más (duplicar la inversión) se considera bueno. Sin embargo, esto varía según la industria, márgenes de ganancia y objetivos del negocio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo mejorar el ROI de mis campañas de publicidad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Puedes mejorar el ROI optimizando la segmentación de audiencias, mejorando los anuncios y creatividades, optimizando landing pages para conversión, utilizando remarketing, y analizando constantemente los datos para eliminar lo que no funciona."
      }
    }
  ]
}

export default function CalculadoraROIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CalculadoraROIClient />
    </>
  )
}
