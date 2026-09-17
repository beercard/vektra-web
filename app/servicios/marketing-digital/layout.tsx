import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agencia de Marketing Digital en Argentina y Paraguay | Google Ads y Meta Ads",
  description: "Agencia de marketing digital en Argentina y Paraguay con campañas en Google Ads, Meta Ads y TikTok Ads para generar leads y ventas en Buenos Aires, Córdoba, Rosario, Asunción y Ciudad del Este.",
  keywords: [
    "agencia de marketing digital",
    "marketing digital argentina",
    "marketing digital paraguay",
    "agencia google ads",
    "expertos en google ads",
    "meta ads argentina",
    "meta ads paraguay",
    "especialistas en meta ads",
    "tiktok ads argentina",
    "tiktok ads paraguay",
    "publicidad digital argentina",
    "publicidad digital paraguay",
    "campañas google ads",
    "campañas meta ads",
    "agencia de anuncios",
    "marketing digital buenos aires",
    "marketing digital córdoba",
    "marketing digital rosario",
    "marketing digital asunción",
    "marketing digital ciudad del este",
  ],
  openGraph: {
    title: "Agencia de Marketing Digital en Argentina y Paraguay",
    description: "Especialistas en Google Ads, Meta Ads y TikTok Ads con foco en resultados para Argentina y Paraguay.",
  },
}

export default function MarketingDigitalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Agencia de Marketing Digital Vektra",
    "image": "https://vektra.digital/images/og-marketing.jpg",
    "description": "Agencia de marketing digital en Argentina y Paraguay con campañas en Google Ads, Meta Ads y TikTok Ads.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AR"
    },
    "areaServed": ["Argentina", "Paraguay"],
    "priceRange": "$$",
    "url": "https://vektra.digital/servicios/marketing-digital"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qué es el marketing digital y por qué lo necesito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El marketing digital reúne estrategias de promoción en buscadores, plataformas de anuncios y email. Es esencial porque tu público está online. En Argentina y Paraguay, más del 80% de las personas buscan productos y servicios en internet antes de comprar."
        }
      },
      {
        "@type": "Question",
        "name": "Cuánto cuesta una campaña de Google Ads en Argentina?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El presupuesto de Google Ads es flexible y lo defines tú. Recomendamos empezar con un mínimo de $50.000 ARS mensuales para ver resultados. A esto se suma nuestra gestión que incluye creación de anuncios, seguimiento y optimización constante."
        }
      },
      {
        "@type": "Question",
        "name": "Qué diferencia hay entre Google Ads y Meta Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Ads capta intención de compra en el momento exacto de búsqueda. Meta Ads trabaja con segmentación por intereses, comportamientos y audiencias para generar demanda. La combinación suele potenciar resultados."
        }
      },
      {
        "@type": "Question",
        "name": "Sirve TikTok Ads para tu negocio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TikTok es ideal si tu público objetivo tiene entre 16-35 años. Es la plataforma de mayor crecimiento y ofrece costos por clic muy competitivos. Funciona muy bien para moda, gastronomía, entretenimiento y marcas que quieran una imagen fresca y moderna."
        }
      },
      {
        "@type": "Question",
        "name": "Cuánto tiempo tarda el SEO en dar resultados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El SEO es una estrategia a mediano-largo plazo. Generalmente se empiezan a ver resultados entre 3-6 meses, dependiendo de la competencia del sector. Sin embargo, los resultados son duraderos y el tráfico orgánico no tiene costo por clic."
        }
      },
      {
        "@type": "Question",
        "name": "Qué es Google Business Profile y por qué es importante?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Business Profile es la ficha de tu negocio que aparece en Google y Google Maps. Es gratuito y fundamental para negocios locales en Argentina y Paraguay. Permite que tus clientes te encuentren, vean tus horarios, fotos, reseñas y te contacten directamente."
        }
      },
      {
        "@type": "Question",
        "name": "Cómo miden los resultados de las campañas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utilizamos Google Analytics, Meta Business Suite y las herramientas nativas de cada plataforma. Te enviamos reportes mensuales con métricas clave: impresiones, clics, conversiones, costo por resultado y ROI. Todo transparente y medible."
        }
      },
      {
        "@type": "Question",
        "name": "Trabajan con empresas de Paraguay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, trabajamos con clientes en toda Argentina y Paraguay. Las reuniones se realizan por videollamada y la comunicación es fluida. Tenemos experiencia en campañas para ambos países con segmentación geográfica específica."
        }
      },
      {
        "@type": "Question",
        "name": "Qué plataformas de email marketing utilizan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabajamos principalmente con Mailchimp y Omnisend, que son las más populares y efectivas. Configuramos automatizaciones, secuencias de bienvenida, carritos abandonados y campañas promocionales para maximizar tus conversiones."
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
