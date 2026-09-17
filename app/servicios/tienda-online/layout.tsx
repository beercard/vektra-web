import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tiendas Online | WooCommerce, Shopify y Tiendanube",
  description: "E-commerce profesional para empresas de todo el mundo con WooCommerce, Shopify y Tiendanube. Pagos con MercadoPago, envíos integrados y SEO para vender 24/7.",
  keywords: [
    "tienda online",
    "ecommerce",
    "woocommerce",
    "shopify",
    "tiendanube",
    "mercadopago",
    "pasarelas de pago",
    "envíos ecommerce",
  ],
  openGraph: {
    title: "Tiendas Online | Vektra",
    description: "Tiendas online profesionales con WooCommerce, Shopify y Tiendanube para vender en todo el mundo.",
  },
}

export default function TiendaOnlineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-commerce Development",
    "provider": {
      "@type": "Organization",
      "name": "Vektra"
    },
    "areaServed": "Worldwide",
    "description": "Desarrollo de tiendas online con WooCommerce, Shopify y Tiendanube.",
    "url": "https://vektra.digital/servicios/tienda-online"
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
        "name": "¿Ofreces mantenimiento para tiendas online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, incluimos soporte técnico durante el primer mes. Luego ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, copias de seguridad, monitoreo y soporte continuo."
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
