import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agentes IA y Chatbots | Vektra",
  description: "Automatiza tu atención al cliente con Agentes IA y Chatbots para WhatsApp. Soluciones de inteligencia artificial para empresas de todo el mundo.",
  keywords: [
    "agentes ia",
    "chatbots",
    "whatsapp business api",
    "inteligencia artificial",
    "automatización",
    "chatgpt empresas",
    "bot whatsapp",
    "atención al cliente automatizada"
  ],
  openGraph: {
    title: "Agentes IA y Chatbots | Vektra",
    description: "Soluciones de inteligencia artificial y chatbots para automatizar tu negocio en todo el mundo.",
  },
}

export default function AgentesIALayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Agents & Chatbots Development",
    "provider": {
      "@type": "Organization",
      "name": "Vektra"
    },
    "areaServed": "Worldwide",
    "description": "Desarrollo de agentes de inteligencia artificial y chatbots para WhatsApp.",
    "url": "https://vektra.digital/servicios/agentes-ia"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es un agente de IA y cómo puede ayudar a mi negocio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un agente de IA es un programa inteligente que puede mantener conversaciones, responder preguntas y ejecutar tareas de forma autónoma. Puede atender clientes 24/7, tomar pedidos, agendar citas, resolver dudas frecuentes y más, liberando tiempo de tu equipo para tareas más importantes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la diferencia entre un chatbot tradicional y uno con IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un chatbot tradicional funciona con reglas fijas y solo responde a palabras clave específicas. Un chatbot con IA (como los que usamos con ChatGPT) entiende el contexto, interpreta diferentes formas de preguntar lo mismo y da respuestas naturales y personalizadas, como si fuera una persona."
        }
      },
      {
        "@type": "Question",
        "name": "¿Pueden hacer un bot para WhatsApp Business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, desarrollamos chatbots para WhatsApp Business usando la API oficial de Meta. El bot puede responder mensajes automáticamente, enviar catálogos, procesar pedidos, agendar citas y más. Funciona en cualquier país."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda en estar listo un chatbot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende de la complejidad. Un bot básico para WhatsApp con respuestas a preguntas frecuentes puede estar listo en 1-2 semanas. Un agente de IA completo con integraciones a CRM, base de datos de productos y flujos complejos puede tardar 3-4 semanas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo entrenar al bot con información de mi negocio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutamente. Entrenamos al agente con tu base de conocimiento: productos, servicios, precios, políticas, FAQs, procedimientos internos. El bot responderá como un equipo experto en tu negocio, con la información que vos le proporciones."
        }
      },
      {
        "@type": "Question",
        "name": "¿El bot puede integrarse con mis sistemas actuales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, integramos con la mayoría de herramientas: Google Sheets, HubSpot, Salesforce, Notion, Trello, Slack, sistemas de facturación, ERPs y más. Si tu sistema tiene API, podemos conectarlo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si el bot no puede resolver una consulta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Configuramos escalamiento automático a agentes humanos. El bot detecta cuando una consulta es muy compleja o cuando el cliente lo solicita, y deriva la conversación a tu equipo con todo el contexto de lo hablado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta mantener un bot funcionando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El costo depende del volumen de mensajes y las integraciones. Usamos modelos de precios transparentes: un costo inicial de desarrollo y luego un mantenimiento mensual que incluye hosting, actualizaciones y soporte. Te damos un presupuesto personalizado."
        }
      },
      {
        "@type": "Question",
        "name": "¿El bot funciona en varios idiomas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, nuestros bots pueden comunicarse en español, inglés, portugués y otros idiomas. Es ideal si tenés clientes en distintos países."
        }
      },
      {
        "@type": "Question",
        "name": "¿Trabajan con empresas de otros países?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, trabajamos con empresas de todo el mundo. Nos adaptamos a los medios de pago, las plataformas de envío y las particularidades de cada mercado."
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
