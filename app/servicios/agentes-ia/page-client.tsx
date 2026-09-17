"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, Bot, MessageSquare, Zap, Brain, Cpu, Workflow, Monitor, TrendingUp, ArrowRight } from "lucide-react"

import { pushToDataLayer } from "@/lib/gtm"
import { LatestWorks } from "@/components/sections/latest-works"
import { Project } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

// Marquee items for scrolling text
const marqueeItems = [
  { text: "Agentes de IA personalizados", highlight: true },
  { text: "automatiza tareas repetitivas y ahorra tiempo" },
  { text: "Chatbots para WhatsApp", highlight: true },
  { text: "atención al cliente 24/7 sin intervención humana" },
  { text: "Integración con ChatGPT", highlight: true },
  { text: "respuestas inteligentes basadas en tu negocio" },
  { text: "Automatización de procesos", highlight: true },
  { text: "conecta tus herramientas y optimiza flujos de trabajo" },
  { text: "Asistentes virtuales", highlight: true },
  { text: "que aprenden y mejoran con cada interacción" },
  { text: "APIs e integraciones", highlight: true },
  { text: "conectamos tu bot con cualquier plataforma" },
]

// Services included in AI development
const servicesIncluded = [
  {
    title: "Chatbots para WhatsApp Business",
    description: "Desarrollo de chatbots inteligentes para WhatsApp que responden consultas, toman pedidos, agendan citas y brindan soporte 24/7. Integración con la API oficial de WhatsApp Business.",
  },
  {
    title: "Agentes con ChatGPT/OpenAI",
    description: "Creación de agentes de IA personalizados usando GPT-4 y otros modelos de lenguaje. Entrenados con la información de tu negocio para dar respuestas precisas y contextuales.",
  },
  {
    title: "Chatbots para sitios web",
    description: "Asistentes virtuales embebidos en tu página web que guían a los visitantes, responden preguntas frecuentes y capturan leads automáticamente.",
  },
  {
    title: "Automatización de procesos",
    description: "Conexión de tus herramientas y sistemas mediante APIs. Automatizamos tareas repetitivas como envío de emails, actualización de bases de datos y generación de reportes.",
  },
  {
    title: "Integración con CRM y herramientas",
    description: "Conectamos tu bot con HubSpot, Salesforce, Google Sheets, Notion, Trello, Slack y más. Toda la información sincronizada automáticamente.",
  },
  {
    title: "Entrenamiento personalizado",
    description: "Entrenamos al agente con tu base de conocimiento, FAQs, catálogos de productos y procedimientos internos para que responda como un equipo experto en tu negocio.",
  },
  {
    title: "Panel de administración",
    description: "Dashboard para monitorear conversaciones, analizar métricas, ver estadísticas de uso y ajustar respuestas del bot sin necesidad de conocimientos técnicos.",
  },
  {
    title: "Multilenguaje",
    description: "Bots que pueden comunicarse en español, inglés, portugués y otros idiomas. Ideal para negocios con clientes en distintos países.",
  },
  {
    title: "Escalamiento humano",
    description: "Configuración de derivación automática a agentes humanos cuando el bot detecta consultas complejas o el cliente lo solicita.",
  },
  {
    title: "Soporte y mantenimiento",
    description: "Soporte técnico continuo, actualizaciones del modelo de IA, mejoras basadas en feedback y monitoreo del rendimiento del bot.",
  },
]

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Análisis",
    subtitle: "de necesidades",
    description: "Evaluamos tu negocio, identificamos procesos automatizables y definimos los objetivos del agente de IA.",
    highlight: "Mapeamos flujos de conversación y casos de uso.",
  },
  {
    step: "02",
    title: "Diseño y",
    subtitle: "entrenamiento",
    description: "Diseñamos la personalidad del bot, creamos los flujos de conversación y entrenamos el modelo con tu información.",
    highlight: null,
  },
  {
    step: "03",
    title: "Desarrollo e",
    subtitle: "integración",
    description: "Programamos el agente, lo conectamos con tus sistemas (WhatsApp, web, CRM) y realizamos pruebas exhaustivas.",
    highlight: null,
  },
  {
    step: "04",
    title: "Lanzamiento",
    subtitle: "y optimización",
    description: "Publicamos el bot en producción y monitoreamos su rendimiento.",
    highlight: "Optimizamos continuamente basados en datos reales.",
  },
]



// Stats for trajectory section
const stats = [
  { value: 50, prefix: "+", suffix: "", label: "Bots desarrollados" },
  { value: 1, prefix: "", suffix: "M+", label: "Mensajes procesados" },
  { value: 98, prefix: "", suffix: "%", label: "Tasa de resolución" },
  { value: 24, prefix: "", suffix: "/7", label: "Disponibilidad" },
]

// Testimonials specific to AI/Bots
const testimonials = [
  {
    name: "Patagonia Construcciones",
    company: "Patagonia Construcciones",
    text: "El chatbot de WhatsApp nos cambió el negocio. Antes perdíamos muchas consultas fuera de horario, ahora el bot responde al instante y hasta toma pedidos. Las ventas aumentaron un 40%.",
    rating: 5,
    logo: "/logos-clients/logo constructora.png"
  },
  {
    name: "Spa Clinic FSC",
    company: "Spa Clinic FSC",
    text: "El bot de turnos es increíble. Los pacientes pueden agendar citas a cualquier hora y nosotros recibimos todo organizado. Ahorramos horas de trabajo administrativo cada semana.",
    rating: 5,
    logo: "/logos-clients/logo vitality.png"
  },
  {
    name: "Uniplaza",
    company: "Uniplaza Shopping",
    text: "El agente de IA conoce todas nuestras propiedades y responde consultas como si fuera nuestro mejor vendedor. Filtra los leads y solo nos pasa los interesados reales.",
    rating: 5,
  },
  {
    name: "Aura Image",
    company: "Aura Image",
    text: "Implementamos el bot en nuestra tienda y el soporte al cliente mejoró muchísimo. Responde sobre talles, envíos, cambios... todo automático. Nuestros clientes están muy contentos.",
    rating: 5,
    logo: "/logos-clients/logo auraimage.png"
  },
  {
    name: "Agua Viva",
    company: "Agua Viva",
    text: "El asistente virtual nos ayuda a filtrar consultas y derivar cada caso al abogado especialista. Ahorramos tiempo y los clientes reciben respuestas inmediatas.",
    rating: 5,
    logo: "/logos-clients/agua viva logo.png"
  },
]

// FAQs for AI/Bots service
const faqs = [
  { question: "¿Qué es un agente de IA y cómo puede ayudar a mi negocio?", answer: "Un agente de IA es un programa inteligente que puede mantener conversaciones, responder preguntas y ejecutar tareas de forma autónoma. Puede atender clientes 24/7, tomar pedidos, agendar citas, resolver dudas frecuentes y más, liberando tiempo de tu equipo para tareas más importantes." },
  { question: "¿Cuál es la diferencia entre un chatbot tradicional y uno con IA?", answer: "Un chatbot tradicional funciona con reglas fijas y solo responde a palabras clave específicas. Un chatbot con IA (como los que usamos con ChatGPT) entiende el contexto, interpreta diferentes formas de preguntar lo mismo y da respuestas naturales y personalizadas, como si fuera una persona." },
  { question: "¿Pueden hacer un bot para WhatsApp Business?", answer: "Sí, desarrollamos chatbots para WhatsApp Business usando la API oficial de Meta. El bot puede responder mensajes automáticamente, enviar catálogos, procesar pedidos, agendar citas y más. Funciona en cualquier país." },
  { question: "¿Cuánto tiempo tarda en estar listo un chatbot?", answer: "Depende de la complejidad. Un bot básico para WhatsApp con respuestas a preguntas frecuentes puede estar listo en 1-2 semanas. Un agente de IA completo con integraciones a CRM, base de datos de productos y flujos complejos puede tardar 3-4 semanas." },
  { question: "¿Puedo entrenar al bot con información de mi negocio?", answer: "Absolutamente. Entrenamos al agente con tu base de conocimiento: productos, servicios, precios, políticas, FAQs, procedimientos internos. El bot responderá como un equipo experto en tu negocio, con la información que vos le proporciones." },
  { question: "¿El bot puede integrarse con mis sistemas actuales?", answer: "Sí, integramos con la mayoría de herramientas: Google Sheets, HubSpot, Salesforce, Notion, Trello, Slack, sistemas de facturación, ERPs y más. Si tu sistema tiene API, podemos conectarlo." },
  { question: "¿Qué pasa si el bot no puede resolver una consulta?", answer: "Configuramos escalamiento automático a agentes humanos. El bot detecta cuando una consulta es muy compleja o cuando el cliente lo solicita, y deriva la conversación a tu equipo con todo el contexto de lo hablado." },
  { question: "¿Cuánto cuesta mantener un bot funcionando?", answer: "El costo depende del volumen de mensajes y las integraciones. Usamos modelos de precios transparentes: un costo inicial de desarrollo y luego un mantenimiento mensual que incluye hosting, actualizaciones y soporte. Te damos un presupuesto personalizado." },
  { question: "¿El bot funciona en varios idiomas?", answer: "Sí, nuestros bots pueden comunicarse en español, inglés, portugués y otros idiomas. Es ideal si tenés clientes en distintos países." },
  { question: "¿Trabajan con empresas de otros países?", answer: "Sí, trabajamos con empresas de todo el mundo. Nos adaptamos a los medios de pago, las plataformas de envío y las particularidades de cada mercado." },
]

// Complementary services
const complementaryServices = [
  {
    title: "Automatización de procesos",
    subtitle: "Optimiza tu operación",
    features: [
      "Conexión de aplicaciones",
      "Flujos de trabajo automáticos",
      "Integración con APIs",
      "Sincronización de datos",
      "Reportes automáticos",
      "Notificaciones inteligentes",
    ],
    href: "/servicios/automatizacion",
    icon: Workflow
  },
  {
    title: "Desarrollo web",
    subtitle: "Tu presencia digital",
    features: [
      "Landing pages",
      "Sitios web corporativos",
      "Dashboards personalizados",
      "Integración con bots",
      "Panel de administración",
      "Diseño responsive",
    ],
    href: "/servicios/diseno-web",
    icon: Monitor
  },
  {
    title: "Marketing digital",
    subtitle: "Llega a más clientes",
    features: [
      "Google Ads",
      "Meta Ads",
      "SEO y posicionamiento",
      "Email marketing",
      "Campañas de WhatsApp",
      "Remarketing",
    ],
    href: "/servicios/marketing-digital",
    icon: TrendingUp
  },
]

interface AgentesIAPageClientProps {
  projects: Project[]
  testimonials: Testimonial[]
}

export default function AgentesIAPageClient({ projects, testimonials }: AgentesIAPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)

    return () => observer.disconnect()
  }, [isVisible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., call API)
    pushToDataLayer("form_submit", {
      form_name: "AI Agents Service Form",
      service: "agentes-ia"
    })
    alert("Gracias por tu consulta. Te responderemos pronto.")
  }

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.value
        const duration = 2000
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            start = end
            clearInterval(timer)
          }
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(start)
            return newCounts
          })
        }, 16)
      })
    }
  }, [isVisible])

  // Auto-advance testimonials removed

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
                <Bot className="h-6 w-6" />
                Inteligencia Artificial para tu negocio
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Desarrollo de{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Agentes de IA</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}y{" "}
                <span className="font-extrabold">Chatbots</span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">
                  para todo el mundo
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                Creamos <strong className="text-white">agentes de inteligencia artificial</strong> y{" "}
                <strong className="text-white">chatbots para WhatsApp</strong> que atienden a tus clientes 24/7,{" "}
                responden consultas, toman pedidos y automatizan procesos.{" "}
                <strong className="text-white">Potenciados por ChatGPT y modelos de IA avanzados</strong>.
              </p>

              <p className="mt-4 text-gray-300">
                <span className="text-[#00DEC7] font-semibold">Objetivo:</span>{" "}
                <span className="text-[#00DEC7]">automatizar tu atención al cliente, aumentar ventas y reducir costos operativos</span>{" "}
                con inteligencia artificial personalizada para tu negocio.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8"
                >
                  <Link href="/contacto">Quiero un bot para mi negocio</Link>
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg className="h-8 w-8" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <div>
                      <span className="font-bold text-white">5.0</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">+45 reseñas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-[#00DEC7]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl p-8 border border-[#00DEC7]/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Bot className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Chatbots</p>
                      <p className="text-gray-400 text-sm">WhatsApp & Web</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Brain className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">ChatGPT</p>
                      <p className="text-gray-400 text-sm">IA Avanzada</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Workflow className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Automatización</p>
                      <p className="text-gray-400 text-sm">Procesos & APIs</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Zap className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">24/7</p>
                      <p className="text-gray-400 text-sm">Siempre activo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 border-t border-[#00DEC7]">
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={index} className="mx-4 text-sm">
                  {item.highlight ? (
                    <strong className="text-[#00DEC7]">{item.text}</strong>
                  ) : (
                    <span className="text-gray-400">{item.text}</span>
                  )}
                  <span className="mx-4 text-gray-600">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Included Section - Cyan Background */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Tu negocio automatizado,<br />
              tus clientes siempre atendidos
            </h2>
            <p className="mt-6 text-black/80 text-lg">
              Tendras un <strong className="text-black">agente de IA personalizado</strong> que conoce tu negocio,{" "}
              <strong className="text-black">atiende clientes las 24 horas</strong> y{" "}
              <strong className="text-black">automatiza tareas repetitivas</strong>. Vos te enfocas en hacer crecer tu negocio.
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
            {servicesIncluded.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black">
                    <Check className="h-4 w-4 text-black" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black text-lg">{service.title}</h4>
                  <p className="mt-1 text-black/70 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platforms */}
          <div className="mt-16 pt-16 border-t border-black/20">
            <p className="text-center text-black/60 uppercase tracking-widest text-sm mb-8">Tecnologias que utilizamos</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                  </svg>
                </div>
                <span className="text-black text-sm font-medium">ChatGPT</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#25D366] rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <Cpu className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Claude AI</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-xl flex items-center justify-center">
                  <Workflow className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Make/Zapier</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#0066FF] rounded-xl flex items-center justify-center">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Botpress</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black">
              Consúltanos <span className="font-normal">sin compromiso</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              Si querés <strong className="text-black">automatizar tu atención al cliente</strong> o crear un bot para tu negocio, contactanos y te asesoramos sobre la mejor solución.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                <Link href="/contacto" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                  Presupuesto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo Section - Black Background */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />

        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Objetivo</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Automatizar y escalar tu negocio</strong>. 4 pasos para crear un agente de IA que{" "}
              <strong className="text-white font-bold">atienda clientes, cierre ventas y reduzca costos</strong>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">
                  {item.title}<br />{item.subtitle}
                </h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                  {item.highlight && <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <LatestWorks 
        projects={projects} 
        title="Últimos Proyectos"
        subtitle="Agentes de IA y Chatbots"
        viewAllText="Ver todos los proyectos"
        viewAllLink="/trabajos?category=agentes-ia"
      />

      {/* Trayectoria Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Experiencia en<br />inteligencia artificial
            </h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">
              Desarrollamos <span className="text-white">agentes de IA y chatbots</span> para empresas de{" "}
              <span className="text-white">todo el mundo</span>. Los números reflejan la confianza de nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {stat.prefix}{counts[index]}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials items={testimonials} category="agentes-ia" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">Agentes de IA y Chatbots</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white text-sm font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              ¿Tenés alguna otra duda?
            </h3>
            <p className="mt-2 text-gray-400">
              Contactá con nosotros <span className="text-white font-semibold">sin compromiso</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent">
                <Link href="/contacto" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                  Escribinos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-gray-100 rounded-full w-80 h-80 mx-auto flex items-center justify-center">
                  <div className="relative">
                    <Bot className="h-32 w-32 text-[#00DEC7]" />
                    <div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2">
                      <MessageSquare className="h-6 w-6 text-black" />
                    </div>
                    <div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-black text-center">
                  ¿Listo para automatizar tu negocio?
                </h3>
              </div>

              <p className="text-center text-gray-600 mb-2">
                Consúltanos <span className="font-semibold text-black">sin compromiso</span>
              </p>
              <p className="text-center text-gray-600 text-sm mb-8">
                Escribinos a{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                o envíanos el siguiente formulario y{" "}
                <span className="font-semibold">te responderemos en menos de 24 horas</span>.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Nombre *"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                </div>

                <div className="relative">
                  <textarea
                    placeholder="Contame sobre tu proyecto... *"
                    rows={4}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent resize-none"
                  />
                  <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy" className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    He leído y acepto la{" "}
                    <Link href="/politica-de-privacidad" className="underline hover:text-[#00DEC7]">
                      política de privacidad
                    </Link>
                  </label>
                </div>

                <div className="text-center pt-4">
                  <Button type="submit" size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-12">
                    Enviar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Services Section - Cyan Background */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementos</h2>
            <p className="mt-2 text-black/60 uppercase tracking-widest text-sm">También te puede interesar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {complementaryServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mb-4">{service.subtitle}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-black/80">
                      <Check className="h-4 w-4 text-black" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-auto inline-flex items-center gap-2 text-black font-semibold"
                >
                  <span className="underline-offset-4 group-hover:underline">Más info</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
