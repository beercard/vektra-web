import type { Metadata } from "next"
import BlogPageClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Blog | Artículos sobre Desarrollo Web, Marketing Digital e IA",
  description: "Explora nuestros artículos y guías sobre desarrollo web, e-commerce, estrategias de marketing digital y la revolución de la inteligencia artificial en los negocios.",
  keywords: [
    "blog desarrollo web",
    "blog marketing digital",
    "noticias inteligencia artificial",
    "guias ecommerce",
    "seo",
    "tendencias digitales",
    "vektra blog",
    "articulos diseño web",
    "tutoriales marketing digital",
    "guias chatgpt negocios",
    "tendencias ecommerce 2026",
    "consejos seo posicionamiento",
    "blog agencia digital",
    "noticias tecnologia web",
    "tips tienda online",
  ],
  openGraph: {
    title: "Blog | Vektra - Agencia Digital",
    description: "Artículos, guías y tutoriales sobre desarrollo web, marketing digital, SEO e inteligencia artificial.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Vektra Digital",
    description: "Explora contenido sobre desarrollo web, marketing digital e IA.",
  },
  alternates: {
    canonical: "https://vektra.digital/blog",
    languages: {
      "en": "https://vektra.digital/en/blog",
    },
  },
}

const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog de Vektra Digital",
  "description": "Artículos y guías sobre desarrollo web, marketing digital, e-commerce e inteligencia artificial para empresas de todo el mundo.",
  "url": "https://vektra.digital/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vektra.digital/logo/logo-vektra-digital.png"
    }
  },
  "inLanguage": "es-AR"
}

export default async function BlogPage() {
  const { blogPosts } = await readStorage()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
      />
      <BlogPageClient initialPosts={blogPosts} />
    </>
  )
}