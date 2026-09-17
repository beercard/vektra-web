import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Diseño y Desarrollo Web | Next.js, React y WordPress",
  description: "Agencia de diseño web profesional para empresas de todo el mundo. Sitios rápidos con Next.js, React y WordPress.",
  keywords: [
    "diseño web",
    "desarrollo web",
    "agencia diseño web",
    "pagina web profesional",
    "landing page",
    "sitio web corporativo",
    "next.js",
    "react",
    "wordpress",
  ],
  openGraph: {
    title: "Diseño y Desarrollo Web | Vektra",
    description: "Sitios web profesionales con Next.js, React y WordPress para empresas de todo el mundo.",
  },
}

export default function DisenoWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Design and Development",
    "provider": {
      "@type": "Organization",
      "name": "Vektra"
    },
    "areaServed": "Worldwide",
    "description": "Diseño y desarrollo de sitios web profesionales con Next.js, React y WordPress.",
    "url": "https://vektra.digital/servicios/diseno-web"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué incluye el servicio de desarrollo web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El servicio incluye diseño personalizado, desarrollo con Next.js/React/WordPress, hosting, dominio, correo corporativo, optimización SEO, integración de WhatsApp, Google Analytics, capacitación y soporte técnico por un mes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el precio para crear una página web profesional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los precios varían según la complejidad del proyecto. Una web básica comienza desde $350.000 ARS, mientras que proyectos más complejos con funcionalidades avanzadas tienen presupuestos personalizados. Contáctanos para una cotización sin compromiso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda en estar lista mi página web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El tiempo de entrega depende del tipo de proyecto. Una web básica puede estar lista en 2-3 semanas, mientras que proyectos más complejos pueden tardar entre 4-8 semanas. Siempre te damos un tiempo estimado antes de comenzar."
        }
      },
      {
        "@type": "Question",
        "name": "¿La web incluye diseño responsive para móviles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todas las webs que desarrollamos son 100% responsive y están optimizadas para verse perfectamente en móviles, tablets y computadoras de escritorio."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo editar y gestionar mi web una vez terminada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, te entregamos la web con un panel de administración intuitivo y te brindamos capacitación para que puedas actualizar contenido, imágenes y textos de forma autónoma."
        }
      },
      {
        "@type": "Question",
        "name": "¿Incluyes optimización SEO para Google?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todas las webs incluyen SEO On Page básico: títulos, descripciones, estructura de encabezados H1-H3, optimización de imágenes y envío del sitemap a Google para indexación."
        }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen mantenimiento web después de la entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, incluimos soporte técnico durante el primer mes. Luego ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, copias de seguridad, control de seguridad y soporte continuo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Trabajan con clientes de otros países?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, trabajamos con clientes de todo el mundo. Las reuniones se realizan por videollamada y la comunicación es fluida gracias a herramientas digitales como Zoom y email."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
