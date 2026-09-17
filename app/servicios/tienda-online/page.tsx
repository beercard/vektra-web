import type { Metadata } from "next"
import TiendaOnlineClient from "./page-client"
import { readStorage } from "@/lib/storage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Diseño de Tiendas Online | E-commerce Profesional | Vektra",
  description: "Desarrollo de tiendas online y e-commerce profesional para empresas de todo el mundo. WooCommerce, Shopify y Tiendanube. Pasarelas de pago MercadoPago, gestión de envíos y venta 24/7.",
  keywords: [
    // Keywords principales
    "tienda online",
    "ecommerce",
    // Long tail keywords
    "cuánto cuesta crear una tienda online",
    "crear tienda online woocommerce precio",
    "desarrollo ecommerce profesional",
    "tienda online con mercadopago",
    "hacer tienda online shopify",
    "tiendanube desarrollo personalizado",
    "tienda online para vender ropa",
    "ecommerce para pymes",
    "tienda online con carrito de compras",
    "diseño tienda online responsive",
    "tienda online con pasarela de pagos",
    "desarrollo woocommerce",
  ],
  openGraph: {
    title: "Tiendas Online Profesionales | Vektra",
    description: "Vende tus productos 24/7 con una tienda online profesional. WooCommerce, Shopify y Tiendanube con MercadoPago integrado.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiendas Online | Vektra",
    description: "Desarrollo de e-commerce profesional para empresas de todo el mundo.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/tienda-online",
    languages: {
      es: "https://vektra.digital/servicios/tienda-online",
      en: "https://vektra.digital/en/services/online-store",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Desarrollo de Tiendas Online y E-commerce",
  "description": "Servicio de desarrollo de tiendas online profesionales con WooCommerce, Shopify y Tiendanube. Incluye catálogo de productos, pasarelas de pago (MercadoPago, PayPal, Stripe), gestión de envíos, carrito optimizado y panel de administración.",
  "provider": {
    "@type": "Organization",
    "name": "Vektra Digital",
    "url": "https://vektra.digital",
    "logo": "https://vektra.digital/logo/logo-vektra-digital.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@vektra.digital",
      "contactType": "sales",
      "availableLanguage": ["Spanish"]
    }
  },
  "areaServed": "Worldwide",
  "serviceType": "E-commerce Development",
  "offers": {
    "@type": "Offer",
    "price": "450000",
    "priceCurrency": "ARS",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "450000",
      "priceCurrency": "ARS",
      "valueAddedTaxIncluded": true
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Funcionalidades incluidas",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Catálogo de productos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pasarelas de pago MercadoPago" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gestión de envíos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carrito de compras optimizado" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Panel de administración" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cupones y descuentos" } }
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta crear una tienda online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los precios varían según la complejidad. Una tienda online básica con hasta 50 productos comienza desde $450.000 ARS. Tiendas más grandes con funcionalidades avanzadas tienen presupuestos personalizados. Contáctanos para una cotización sin compromiso."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué plataforma usan para crear tiendas online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabajamos con WooCommerce (WordPress) por su flexibilidad, Shopify para soluciones rápidas y escalables, y Tiendanube que es la plataforma líder en Latinoamérica. Te asesoramos sobre la mejor opción según tu negocio, presupuesto y objetivos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda en estar lista mi tienda online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una tienda online básica puede estar lista en 3-4 semanas. Proyectos más complejos con muchos productos, integraciones especiales o diseño personalizado pueden tardar entre 6-10 semanas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué pasarelas de pago puedo integrar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Integramos MercadoPago (la más usada en Argentina), PayPal, Stripe, transferencia bancaria y pago contra entrega. Puedes ofrecer múltiples opciones de pago a tus clientes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo funciona la gestión de envíos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Configuramos zonas de envío con tarifas por peso o precio. Integramos con Correo Argentino, Andreani, OCA y opción de retiro en local. Tus clientes ven el costo de envío antes de pagar."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo gestionar mi tienda sin conocimientos técnicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, te entregamos la tienda con un panel de administración muy intuitivo. Te brindamos capacitación completa para que puedas agregar productos, gestionar pedidos, aplicar descuentos y más."
      }
    },
    {
      "@type": "Question",
      "name": "¿La tienda funciona en celulares?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todas las tiendas son 100% responsive. El proceso de compra está optimizado para celulares, que es donde se realizan la mayoría de las compras online actualmente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen mantenimiento para tiendas online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, incluimos soporte técnico durante el primer mes. Luego ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, copias de seguridad, monitoreo y soporte continuo."
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
    { "@type": "ListItem", "position": 3, "name": "Tienda Online E-commerce", "item": "https://vektra.digital/servicios/tienda-online" },
  ],
}

export default async function TiendaOnlinePage() {
  const { testimonials } = await readStorage()

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
      <TiendaOnlineClient testimonials={testimonials} />
    </>
  )
}
