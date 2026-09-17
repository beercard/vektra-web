import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Agencia de Desarrollo Web y Marketing Digital",
  description: "Conocé al equipo de Vektra. Más de 8 años de experiencia en desarrollo web, marketing digital y agentes de IA. Trabajamos con empresas de todo el mundo.",
  keywords: [
    "sobre vektra",
    "equipo vektra",
    "agencia digital argentina",
    "quiénes somos vektra",
    "historia vektra",
    "equipo desarrollo web",
    "agencia marketing digital resistencia",
    "desarrolladores web argentina",
    "expertos marketing digital",
    "equipo programadores argentina"
  ],
  openGraph: {
    title: "Sobre Nosotros | Vektra - Agencia Digital",
    description: "Conocé al equipo detrás de Vektra. Más de 8 años creando soluciones digitales para empresas.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | Vektra",
    description: "El equipo de Vektra: expertos en desarrollo web y marketing digital.",
  },
  alternates: {
    canonical: "https://vektra.digital/sobre-nosotros",
    languages: {
      en: "https://vektra.digital/en/about-us",
    },
  },
}

export default function SobreNosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Nosotros - Vektra",
    "description": "Página sobre el equipo y la historia de Vektra Digital",
    "url": "https://vektra.digital/sobre-nosotros",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://vektra.digital/#organization"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  )
}
