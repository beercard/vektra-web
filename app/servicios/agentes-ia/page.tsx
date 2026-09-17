import type { Metadata } from "next"
import AgentesIAPageClient from "./page-client";
import { readStorage } from "@/lib/storage";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Agentes de IA y Chatbots para WhatsApp | Vektra",
  description: "Desarrollo de agentes de inteligencia artificial y chatbots para WhatsApp Business. Automatiza atención al cliente 24/7, toma pedidos y agenda citas con IA para empresas de todo el mundo.",
  keywords: [
    // Keywords principales
    "agentes de ia",
    "chatbots whatsapp",
    "bots ia",
    "asistentes virtuales empresas",
    // Long tail keywords
    "chatbot para whatsapp business precio",
    "bot de atención al cliente automático",
    "agente ia para responder mensajes",
    "chatbot con chatgpt para empresas",
    "automatizar whatsapp con inteligencia artificial",
    "bot para tomar pedidos whatsapp",
    "chatbot para agendar citas",
    "asistente virtual para pymes",
    "desarrollo chatbot personalizado",
    "bot ia para atención 24 horas",
    "chatbot con base de conocimiento",
    "integración chatbot crm",
  ],
  openGraph: {
    title: "Agentes de IA y Chatbots WhatsApp | Vektra",
    description: "Automatiza la atención al cliente con chatbots inteligentes para WhatsApp. Respuestas 24/7 con IA.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatbots e IA para Empresas | Vektra",
    description: "Desarrollo de agentes de IA y chatbots para WhatsApp para empresas de todo el mundo.",
  },
  alternates: {
    canonical: "https://vektra.digital/servicios/agentes-ia",
    languages: {
      es: "https://vektra.digital/servicios/agentes-ia",
      en: "https://vektra.digital/en/services/ai-agents",
    },
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Desarrollo de Agentes de IA y Chatbots",
  "description": "Servicio de desarrollo de agentes de inteligencia artificial y chatbots para WhatsApp Business. Atención al cliente 24/7, toma de pedidos, agendamiento de citas, respuestas automáticas con ChatGPT e integración con CRM y sistemas empresariales.",
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
  "serviceType": "AI Chatbot Development",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tipos de chatbots",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chatbot para WhatsApp Business" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agente de IA con ChatGPT" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bot para toma de pedidos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Asistente virtual para citas" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Integración con CRM" } }
    ]
  }
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://vektra.digital" },
    { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://vektra.digital/servicios" },
    { "@type": "ListItem", "position": 3, "name": "Chatbots y Agentes IA", "item": "https://vektra.digital/servicios/agentes-ia" },
  ],
}

export default async function AgentesIAPage() {
  const { projects: allProjects, testimonials } = await readStorage()
  const projects = allProjects.filter(p => p.category === 'agentes-ia').slice(0, 4)

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
      <AgentesIAPageClient projects={projects} testimonials={testimonials} />
    </>
  )
}
