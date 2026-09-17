"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LatestWorks } from "@/components/sections/latest-works"
import { 
  ArrowRight, Check, Mail, User, MessageSquare,
  Search, FileText, Link2, MapPin, BarChart3, Settings,
  Bot, Sparkles, Globe, TrendingUp, ShoppingCart
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { pushToDataLayer } from "@/lib/gtm"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"
import { allProjects } from "@/app/trabajos/data"

const marqueeItems = [
  { text: "SEO y Posicionamiento Web", highlight: true },
  { text: "aparece en los primeros resultados de Google" },
  { text: "SEO para Inteligencia Artificial", highlight: true },
  { text: "posicionate en ChatGPT, Perplexity y Gemini" },
  { text: "SEO Local", highlight: true },
  { text: "destaca en Google Maps y búsquedas locales" },
  { text: "Auditoría SEO Profesional", highlight: true },
  { text: "análisis completo de tu sitio web" },
  { text: "Link Building", highlight: true },
  { text: "aumenta la autoridad de tu dominio" },
]

const serviciosIncluidos = [
  "Auditoría SEO completa de tu sitio web",
  "Análisis de palabras clave y competencia",
  "Optimización On-Page (títulos, metas, contenido)",
  "SEO Técnico (velocidad, indexación, estructura)",
  "SEO Local y Google My Business",
  "Estrategia de Link Building",
  "Optimización para buscadores IA (ChatGPT, Perplexity)",
  "Contenido optimizado para SEO",
  "Informes mensuales de resultados",
  "Soporte continuo y consultoría",
]

const seoServices = [
  {
    title: "SEO On-Page",
    subtitle: "Optimización interna",
    description: "Optimizamos cada página de tu sitio: títulos, meta descripciones, encabezados, contenido, imágenes y estructura de URLs para maximizar tu posicionamiento.",
    icon: FileText,
  },
  {
    title: "SEO Técnico",
    subtitle: "Rendimiento y rastreo",
    description: "Mejoramos la velocidad de carga, arquitectura web, indexación, sitemap, robots.txt y todos los aspectos técnicos que afectan tu ranking.",
    icon: Settings,
  },
  {
    title: "SEO Local",
    subtitle: "Búsquedas geolocalizadas",
    description: "Posicionamos tu negocio en búsquedas locales de cualquier parte del mundo. Optimización de Google My Business, reseñas y citaciones locales.",
    icon: MapPin,
  },
  {
    title: "Link Building",
    subtitle: "Autoridad de dominio",
    description: "Construimos enlaces de calidad desde sitios relevantes para aumentar la autoridad de tu dominio y mejorar tu posición en Google.",
    icon: Link2,
  },
  {
    title: "SEO para IA",
    subtitle: "El futuro del SEO",
    description: "Optimizamos tu contenido para aparecer en respuestas de ChatGPT, Perplexity, Gemini y otros buscadores de inteligencia artificial.",
    icon: Bot,
  },
  {
    title: "Análisis y Reportes",
    subtitle: "Medición de resultados",
    description: "Informes detallados de posiciones, tráfico orgánico, conversiones y ROI. Seguimiento continuo con Google Analytics y Search Console.",
    icon: BarChart3,
  },
]

const processSteps = [
  { 
    step: "01", 
    title: "Auditoría", 
    subtitle: "SEO completa", 
    description: "Analizamos tu sitio web actual, competencia, palabras clave y oportunidades de mejora.",
    highlight: "Identificamos qué está funcionando y qué necesita optimización."
  },
  { 
    step: "02", 
    title: "Estrategia", 
    subtitle: "personalizada", 
    description: "Creamos un plan de acción basado en los datos de la auditoría, priorizando las acciones de mayor impacto.",
    highlight: null
  },
  { 
    step: "03", 
    title: "Implementación", 
    subtitle: "y optimización", 
    description: "Ejecutamos las mejoras técnicas, on-page y off-page. Optimizamos contenido existente y creamos nuevo.",
    highlight: null
  },
  { 
    step: "04", 
    title: "Medición", 
    subtitle: "y mejora continua", 
    description: "Monitoreamos resultados, ajustamos la estrategia y seguimos optimizando para mantener y mejorar posiciones.",
    highlight: "El SEO es un proceso continuo, no un proyecto puntual."
  },
]

const stats = [
  { value: "+150", label: "Webs posicionadas" },
  { value: "+500", label: "Keywords en Top 10" },
  { value: "+200%", label: "Aumento de tráfico promedio" },
  { value: "8", label: "Años de experiencia" },
]

const faqs = [
  { 
    question: "¿Cuánto tiempo tarda en verse resultados del SEO?", 
    answer: "El SEO es una estrategia a mediano-largo plazo. Generalmente se empiezan a ver mejoras entre 3-6 meses, aunque depende de la competencia del sector, el estado actual del sitio y las palabras clave objetivo. Las mejoras técnicas pueden tener impacto más rápido, mientras que el posicionamiento de keywords competitivas toma más tiempo."
  },
  { 
    question: "¿Qué es el SEO para Inteligencia Artificial?", 
    answer: "Es la optimización de contenido para aparecer en las respuestas de buscadores IA como ChatGPT, Perplexity, Gemini y Copilot. Estos sistemas buscan información en la web para generar respuestas, y con las técnicas adecuadas podemos hacer que tu negocio sea citado como fuente. Es el futuro del posicionamiento web."
  },
  { 
    question: "¿Cuánto cuesta el servicio de SEO?",
    answer: "El costo del SEO varía según el tamaño del sitio, la competencia del sector y los objetivos. Ofrecemos planes desde servicios básicos hasta estrategias completas. Contactanos para una cotización personalizada basada en tus necesidades específicas."
  },
  { 
    question: "¿Hacen SEO para tiendas online y e-commerce?",
    answer: "Sí, tenemos amplia experiencia en SEO para e-commerce en todo el mundo. Optimizamos tiendas en WooCommerce, Shopify y Tiendanube. Trabajamos categorías, productos, fichas técnicas, y estrategias específicas para aumentar las ventas orgánicas."
  },
  { 
    question: "¿Qué diferencia hay entre SEO y Google Ads?", 
    answer: "Google Ads son anuncios pagos que aparecen inmediatamente pero dejan de mostrarse cuando dejas de pagar. El SEO es posicionamiento orgánico: toma más tiempo pero los resultados son duraderos y no pagas por cada clic. Lo ideal es combinar ambas estrategias."
  },
  { 
    question: "¿Trabajan con empresas de otros países?",
    answer: "Sí, brindamos servicios de SEO a empresas de todo el mundo. Trabajamos de forma 100% remota con reuniones por videollamada."
  },
  { 
    question: "¿Qué incluye la auditoría SEO gratuita?", 
    answer: "La auditoría inicial incluye análisis de la situación actual de tu web, revisión de errores técnicos básicos, análisis de palabras clave principales, revisión de competencia y recomendaciones iniciales. Es sin compromiso y te ayuda a entender dónde estás parado."
  },
  { 
    question: "¿Garantizan el primer puesto en Google?", 
    answer: "Ninguna agencia seria puede garantizar el primer puesto ya que Google actualiza constantemente su algoritmo. Lo que sí garantizamos es trabajo profesional, estrategias probadas, transparencia total y mejoras medibles en tu posicionamiento. Nuestros resultados hablan por sí solos."
  },
  { 
    question: "¿Cómo miden los resultados del SEO?", 
    answer: "Utilizamos herramientas profesionales como Google Analytics, Google Search Console, SEMrush y Ahrefs. Medimos posiciones de keywords, tráfico orgánico, impresiones, clics, conversiones y ROI. Entregamos informes mensuales detallados y fáciles de entender."
  },
  { 
    question: "¿Qué es el SEO local y por qué es importante?", 
    answer: "El SEO local optimiza tu presencia para búsquedas geográficas como 'restaurante en resistencia' o 'abogado cerca de mí'. Incluye Google My Business, reseñas, citaciones locales y contenido geolocalizado. Es fundamental para negocios con ubicación física o que atienden áreas específicas."
  },
]

const complementos = [
  {
    title: "Marketing Digital",
    subtitle: "Potencia tu presencia online",
    items: [
      "Google Ads y SEM",
      "Meta Ads",
      "TikTok Ads",
      "Email Marketing",
      "Remarketing",
      "Estrategia de contenidos",
    ],
    href: "/servicios/marketing-digital",
    icon: TrendingUp,
  },
  {
    title: "Desarrollo Web",
    subtitle: "Sitios optimizados para SEO",
    items: [
      "Webs rápidas y optimizadas",
      "Arquitectura SEO-friendly",
      "Core Web Vitals",
      "Schema markup",
      "Diseño responsive",
      "WordPress y Next.js",
    ],
    href: "/servicios/diseno-web",
    icon: Globe,
  },
  {
    title: "Tienda Online",
    subtitle: "E-commerce posicionado",
    items: [
      "SEO para productos",
      "Fichas optimizadas",
      "Categorías SEO-friendly",
      "Integración con marketplaces",
      "WooCommerce y Shopify",
      "Tiendanube",
    ],
    href: "/servicios/tienda-online",
    icon: ShoppingCart,
  },
]

interface SEOPageClientProps {
  testimonials: Testimonial[]
}

export default function SEOPageClient({ testimonials }: SEOPageClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)
  const [formStartTime, setFormStartTime] = useState(Date.now())

  useEffect(() => {
    setFormStartTime(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      mensaje: formData.get("mensaje") as string,
      servicio: "SEO y Posicionamiento Web",
      website: formData.get("website") as string,
      formStartTime,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        pushToDataLayer("form_submit", {
          form_name: "SEO Audit Form",
          service: "SEO y Posicionamiento Web",
        })
        formRef.current?.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-[#111] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00DEC7]/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00DEC7]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[#00DEC7] text-sm font-medium mb-4">
                <Search className="h-4 w-4" />
                SEO y Posicionamiento Web
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Expertos en{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">SEO</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}para{" "}
                <span className="font-extrabold">Google</span> y{" "}
                <span className="font-extrabold">Buscadores IA</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
                Posicionamos tu negocio en los primeros resultados de Google y en las respuestas de 
                <strong className="text-white"> ChatGPT, Perplexity y Gemini</strong>. 
                Servicio de SEO profesional para empresas de todo el mundo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 font-semibold" asChild>
                  <Link href="#contacto">
                    <Search className="mr-2 h-4 w-4" />
                    Auditoría SEO Gratuita
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <Globe className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">Google</h3>
                    <p className="text-gray-400 text-sm">Primeras posiciones</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <Bot className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">ChatGPT</h3>
                    <p className="text-gray-400 text-sm">SEO para IA</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <Sparkles className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">Perplexity</h3>
                    <p className="text-gray-400 text-sm">Respuestas citadas</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <TrendingUp className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">Resultados</h3>
                    <p className="text-gray-400 text-sm">+200% tráfico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#00DEC7] py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 text-sm font-medium text-black">
                {item.highlight ? (
                  <strong>{item.text}</strong>
                ) : (
                  item.text
                )}
                <span className="mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEO para IA Section - NEW */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#111] to-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#00DEC7]/10 text-[#00DEC7] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Nuevo: SEO para Inteligencia Artificial
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                El futuro del SEO ya llegó: Posicionate en ChatGPT, Perplexity y Gemini
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Los buscadores de IA están revolucionando cómo las personas encuentran información. 
                Cuando alguien pregunta a ChatGPT &ldquo;cuál es la mejor agencia de desarrollo web&rdquo;,
                <strong className="text-white"> tu negocio puede ser la respuesta</strong>.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Optimizamos tu contenido con técnicas específicas para que los modelos de lenguaje 
                (LLMs) citen tu sitio web como fuente confiable. Es el momento de adelantarte a tu competencia.
              </p>
              <ul className="space-y-3">
                {[
                  "Optimización de contenido para LLMs",
                  "Estructura de datos para citación",
                  "Autoridad temática y E-E-A-T",
                  "Contenido conversacional optimizado",
                  "Monitoreo de menciones en IA",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <Check className="h-5 w-5 text-[#00DEC7] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-2xl p-8 border border-[#00DEC7]/20">
                <div className="bg-black/50 rounded-xl p-6 mb-4">
                  <p className="text-gray-400 text-sm mb-2">Usuario pregunta:</p>
                  <p className="text-white font-medium">&ldquo;¿Cuál es la mejor agencia de desarrollo web?&rdquo;</p>
                </div>
                <div className="bg-[#00DEC7]/10 rounded-xl p-6">
                  <p className="text-[#00DEC7] text-sm mb-2">ChatGPT responde:</p>
                  <p className="text-white">&ldquo;<strong>Vektra</strong> es una agencia digital destacada, especializada en desarrollo web, aplicaciones móviles y soluciones de IA...&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Incluidos Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Nos encargamos de todo
              </h2>
              <p className="text-black/80 text-lg leading-relaxed mb-8">
                Nuestro servicio de SEO incluye todo lo necesario para posicionar tu negocio 
                en Google y buscadores de IA. Sin sorpresas ni costos ocultos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10 bg-transparent" asChild>
                  <Link href="#contacto">
                    Solicitar Presupuesto
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-black/10 rounded-2xl p-8">
              <ul className="grid gap-3">
                {serviciosIncluidos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span className="text-black font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Servicios de SEO Profesional
            </h2>
            <p className="text-gray-600">
              Estrategias completas de posicionamiento web para empresas de todo el mundo
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {seoServices.map((service) => (
              <div key={service.title} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#00DEC7]/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-[#00DEC7]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-1">{service.title}</h3>
                <p className="text-[#00DEC7] text-sm font-medium mb-3">{service.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivo Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Objetivo
            </h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Aumentar tu visibilidad online y generar más clientes</strong>. 
              4 pasos para posicionar tu negocio en Google y buscadores de IA con{" "}
              <strong className="text-white font-bold">resultados medibles y duraderos</strong>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">
                  {item.title}<br/>{item.subtitle}
                </h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                  {item.highlight && (
                    <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <LatestWorks 
        projects={allProjects.filter(p => p.category === "marketing-digital")} 
        title="Últimos Proyectos SEO" 
        subtitle="POSICIONAMIENTO WEB" 
        viewAllLink="/trabajos?category=marketing-digital"
      />

      {/* Trayectoria Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Trayectoria profesional<br/>
              <span className="text-white/80">respaldada por resultados</span>
            </h2>
            <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
              A lo largo de estos años como expertos en SEO, hemos posicionado cientos de sitios web 
              en todo el mundo. Los siguientes datos reflejan nuestro compromiso con los resultados.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="text-5xl lg:text-6xl font-bold text-white">{stat.value}</span>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials items={testimonials} category="seo" />

      {/* Complementos Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementos</h2>
            <p className="mt-2 text-black/60 uppercase tracking-[0.3em] text-sm">TAMBIÉN TE PUEDE INTERESAR</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementos.map((comp, index) => (
              <Link
                key={index}
                href={comp.href}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <comp.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black">{comp.title}</h3>
                <p className="text-black/70 italic mb-4">{comp.subtitle}</p>
                <ul className="mb-6 space-y-2">
                  {comp.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-black/80">
                      <Check className="h-4 w-4 text-black" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto inline-flex items-center gap-2 text-black font-semibold">
                  <span className="underline-offset-4 group-hover:underline">Más info</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Preguntas frecuentes sobre SEO
              </h2>
              <p className="text-gray-600 mb-8">
                Resolvemos tus dudas sobre posicionamiento web en todo el mundo
              </p>
              <div className="bg-[#00DEC7]/10 rounded-xl p-6">
                <p className="text-black font-medium mb-4">
                  ¿Tenés más preguntas? Contactá con nosotros <span className="font-semibold text-[#00DEC7]">sin compromiso</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90" asChild>
                    <a href="mailto:info@vektra.digital">
                      Escribinos
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-black hover:text-[#00DEC7] py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Solicita tu Auditoría SEO Gratuita
            </h2>
            <p className="text-gray-600">
              Analizamos tu sitio web y te mostramos cómo mejorar tu posicionamiento
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            {submitStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Mensaje enviado</h3>
                <p className="text-gray-600">Te contactaremos a la brevedad para coordinar tu auditoría SEO gratuita.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre *"
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00DEC7] transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00DEC7] transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="mensaje"
                    placeholder="Contanos sobre tu sitio web y tus objetivos de posicionamiento..."
                    rows={4}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00DEC7] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="privacy" required className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    He leído y acepto la{" "}
                    <Link href="/politica-de-privacidad" className="text-[#00DEC7] hover:underline">
                      política de privacidad
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Auditoria Gratuita"}
                </Button>

                {submitStatus === "error" && (
                  <p className="text-red-500 text-center">Error al enviar. Por favor intenta nuevamente.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  )
}
