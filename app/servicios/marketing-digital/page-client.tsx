"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus, Mail, User, MessageSquare, Monitor, ShoppingCart, Bot, ArrowRight } from "lucide-react"

import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

// Marquee items for marketing digital
const marqueeItems = [
  { text: "Agencia de Marketing Digital", highlight: true },
  { text: "Argentina: estrategia y segmentación local" },
  { text: "Agencia de Marketing Digital", highlight: true },
  { text: "Paraguay: campañas por ciudad y región" },
  { text: "Google Ads", highlight: true },
  { text: "expertos en búsqueda y performance" },
  { text: "Meta Ads", highlight: true },
  { text: "anuncios para ventas y leads" },
  { text: "TikTok Ads", highlight: true },
  { text: "creativos en video con alto alcance" },
  { text: "Google Business Profile", highlight: true },
  { text: "visibilidad local en Maps" },
  { text: "Email Marketing", highlight: true },
  { text: "automatizaciones que convierten" },
  { text: "Analytics y Tag Manager", highlight: true },
  { text: "medición precisa y optimización" },
]

// Services included in marketing digital
const servicesIncluded = [
  {
    title: "Google Ads",
    description: "Consigue más visitas a tu tienda o negocio, recibe más llamadas y aumenta las visitas a tu página web. Muestra tus anuncios en los primeros puestos de las búsquedas en Google. Necesario para dar a conocer tu negocio en Argentina y Paraguay.",
  },
  {
    title: "Meta Ads",
    description: "Campañas en la plataforma de Meta con segmentación avanzada, audiencias similares y foco en conversiones. Ideal para ventas, leads y reconocimiento de marca.",
  },
  {
    title: "TikTok Ads",
    description: "Llega a la generación Z y millennials con anuncios creativos en video. TikTok es la plataforma de mayor crecimiento en Argentina y Paraguay, ideal para marcas que buscan conectar con audiencias jóvenes.",
  },
  {
    title: "Posicionamiento SEO",
    description: "Escala puestos de forma orgánica en los resultados de búsqueda de Google mediante acciones tanto dentro como fuera de la web. Estrategias de SEO local para Argentina y Paraguay.",
  },
  {
    title: "Google My Business",
    description: "Hazte visible en las búsquedas de Google y conviértelas en clientes. Creamos la ficha de tu negocio para que tu empresa destaque y tenga presencia online, aumentando la visibilidad para que tus clientes puedan encontrarte fácilmente en Google Maps.",
  },
  {
    title: "Email Marketing",
    description: "Aumenta tus conversiones y convierte a tus leads (clientes potenciales) en clientes a través del correo electrónico. Herramienta con el mayor ROI con diferencia. Campañas con Mailchimp, Omnisend y más.",
  },
  {
    title: "Google Analytics",
    description: "Conoce cómo interactúan los usuarios con tu web. Analiza los datos y descubre qué funciona y qué no en tu sitio. Toma decisiones basadas en datos reales.",
  },
  
]

// Process steps
const processSteps = [
  { 
    step: "01", 
    title: "Análisis", 
    subtitle: "de tu negocio", 
    description: "Estudiamos tu negocio, competencia y mercado en Argentina y Paraguay para definir la estrategia más efectiva.",
    highlight: "Definimos objetivos claros y medibles."
  },
  { 
    step: "02", 
    title: "Estrategia", 
    subtitle: "personalizada", 
    description: "Creamos un plan de marketing digital adaptado a tu presupuesto y objetivos, seleccionando las plataformas más efectivas.",
    highlight: null
  },
  { 
    step: "03", 
    title: "Implementación", 
    subtitle: "y lanzamiento", 
    description: "Configuramos las campañas, creamos los anuncios y lanzamos en las plataformas seleccionadas con seguimiento constante.",
    highlight: null
  },
  { 
    step: "04", 
    title: "Optimización", 
    subtitle: "y resultados", 
    description: "Monitoreamos el rendimiento y optimizamos constantemente para maximizar el retorno de inversión.",
    highlight: "El objetivo: generar leads y ventas desde el primer día."
  },
]

// Portfolio items
const portfolioItems = [
  { title: "Campaña Meta Ads - Restaurante", category: "Meta Ads", image: "/images/projects/marketing-1.jpg" },
  { title: "Meta Ads - E-commerce", category: "Meta Ads", image: "/images/projects/marketing-2.jpg" },
  { title: "SEO Local - Clínica", category: "SEO", image: "/images/projects/marketing-3.jpg" },
  { title: "TikTok Ads - Moda", category: "TikTok Ads", image: "/images/projects/marketing-4.jpg" },
  { title: "Email Marketing - SaaS", category: "Email Marketing", image: "/images/projects/marketing-5.jpg" },
  { title: "Meta Ads - Gimnasio", category: "Meta Ads", image: "/images/projects/marketing-6.jpg" },
  { title: "Google Business Profile - Servicios", category: "GBP", image: "/images/projects/marketing-7.jpg" },
  { title: "Google Ads - Inmobiliaria", category: "Google Ads", image: "/images/projects/marketing-8.jpg" },
]

// Stats
const stats = [
  { value: 10, prefix: "+", suffix: "", label: "Años de experiencia" },
  { value: 50, prefix: "+", suffix: "", label: "Campañas gestionadas" },
  { value: 45, prefix: "+", suffix: "", label: "Reseñas 5 estrellas" },
  { value: 500, prefix: "+", suffix: "K", label: "Invertidos en Ads" },
]

// FAQs for marketing digital
const faqs = [
  { question: "Qué es el marketing digital y por qué lo necesito?", answer: "El marketing digital reúne estrategias de promoción en buscadores, plataformas de anuncios y email. Es esencial porque tu público está online. En Argentina y Paraguay, más del 80% de las personas buscan productos y servicios en internet antes de comprar." },
  { question: "Cuánto cuesta una campaña de Google Ads en Argentina?", answer: "El presupuesto de Google Ads es flexible y lo defines tú. Recomendamos empezar con un mínimo de $50.000 ARS mensuales para ver resultados. A esto se suma nuestra gestión que incluye creación de anuncios, seguimiento y optimización constante." },
  { question: "Qué diferencia hay entre Google Ads y Meta Ads?", answer: "Google Ads capta intención de compra en el momento exacto de búsqueda. Meta Ads trabaja con segmentación por intereses, comportamientos y audiencias para generar demanda. La combinación suele potenciar resultados." },
  { question: "Sirve TikTok Ads para tu negocio?", answer: "TikTok es ideal si tu público objetivo tiene entre 16-35 años. Es la plataforma de mayor crecimiento y ofrece costos por clic muy competitivos. Funciona muy bien para moda, gastronomía, entretenimiento y marcas que quieran una imagen fresca y moderna." },
  { question: "Cuánto tiempo tarda el SEO en dar resultados?", answer: "El SEO es una estrategia a mediano-largo plazo. Generalmente se empiezan a ver resultados entre 3-6 meses, dependiendo de la competencia del sector. Sin embargo, los resultados son duraderos y el tráfico orgánico no tiene costo por clic." },
  { question: "Qué es Google Business Profile y por qué es importante?", answer: "Google Business Profile es la ficha de tu negocio que aparece en Google y Google Maps. Es gratuito y fundamental para negocios locales en Argentina y Paraguay. Permite que tus clientes te encuentren, vean tus horarios, fotos, reseñas y te contacten directamente." },
  { question: "Cómo miden los resultados de las campañas?", answer: "Utilizamos Google Analytics, Meta Business Suite y las herramientas nativas de cada plataforma. Te enviamos reportes mensuales con métricas clave: impresiones, clics, conversiones, costo por resultado y ROI. Todo transparente y medible." },
  { question: "Trabajan con empresas de Paraguay?", answer: "Sí, trabajamos con clientes en toda Argentina y Paraguay. Las reuniones se realizan por videollamada y la comunicación es fluida. Tenemos experiencia en campañas para ambos países con segmentación geográfica específica." },
  { question: "Qué plataformas de email marketing utilizan?", answer: "Trabajamos principalmente con Mailchimp y Omnisend, que son las más populares y efectivas. Configuramos automatizaciones, secuencias de bienvenida, carritos abandonados y campañas promocionales para maximizar tus conversiones." },
]

// Complementary services
const complementaryServices = [
  {
    title: "Diseño Web",
    subtitle: "Tu presencia online profesional",
    features: ["Landing pages optimizadas", "Webs corporativas", "Diseño responsive", "Optimización SEO", "Integración con Ads", "Google Analytics"],
    href: "/servicios/diseno-web",
    icon: Monitor
  },
  {
    title: "Tienda Online",
    subtitle: "Vende tus productos 24/7",
    features: ["E-commerce completo", "Integración con MercadoPago", "Catálogo de productos", "Gestión de pedidos", "Campañas de remarketing", "Pixel de conversión"],
    href: "/servicios/tienda-online",
    icon: ShoppingCart
  },
  {
    title: "Agentes IA",
    subtitle: "Automatiza tu atención al cliente",
    features: ["Chatbots inteligentes", "Atención 24/7", "Integración WhatsApp", "Respuestas automáticas", "Generación de leads", "Análisis de conversaciones"],
    href: "/servicios/agentes-ia",
    icon: Bot
  },
]

interface MarketingDigitalClientProps {
  testimonials: Testimonial[]
}

export default function MarketingDigitalClient({ testimonials }: MarketingDigitalClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const statsRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
              setAnimatedStats(prev => {
                const newStats = [...prev]
                newStats[index] = Math.floor(start)
                return newStats
              })
            }, 16)
          })
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28 w-full">
          <div className="grid items-center gap-12">
            <div className="relative z-10">
              <span className="inline-flex items-center text-base sm:text-lg text-white mb-4">
                <span className="mr-2">👋</span> Somos Vektra, tu equipo de expertos en marketing
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 uppercase">Agencia de marketing digital</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}en{" "}
                <span className="font-extrabold">Argentina</span> y en{" "}
                <span className="font-extrabold">Paraguay</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                Especialistas en <strong className="text-white">Google Ads</strong>,{" "}
                <strong className="text-white">Meta Ads</strong> y{" "}
                <strong className="text-white">TikTok Ads</strong> con foco en resultados.
              </p>
              
              <p className="mt-4 text-white/80">
                Objetivo: <span className="text-[#00DEC7] font-semibold">más visitas, más clientes y más ventas</span>{" "}
                para tu negocio con estrategias de marketing digital efectivas.
              </p>

              <p className="mt-4 text-white/80 max-w-xl">
                Brindamos servicio en <strong className="text-white">Argentina</strong> o en <strong className="text-white">Paraguay</strong>, con segmentación y estrategia específica para cada país.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="#formulario">¿Hablamos?</Link>
                </Button>
                
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-black">Google</span>
                      <span className="font-bold text-black">5.0</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">+45 reseñas</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2">
                  <Image
                    src="https://www.gstatic.com/partners/badge/images/2023/PartnerBadgeClickable.svg"
                    alt="Google Partners"
                    width={92}
                    height={20}
                    className="h-5 w-auto"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2">
                  <Image
                    src="https://www.gstatic.com/images/branding/product/2x/meta_48dp.png"
                    alt="Meta Partners"
                    width={24}
                    height={24}
                    className="h-5 w-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 text-sm">
                {item.highlight ? (
                  <span className="text-[#00DEC7] font-semibold">{item.text}</span>
                ) : (
                  <span className="text-white/70">{item.text}</span>
                )}
                <span className="mx-4 text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - White Background with illustration */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Column - Services List */}
            <div>
              {servicesIncluded.map((service, index) => (
                <div key={service.title} className={`flex gap-4 ${index > 0 ? 'mt-6' : ''}`}>
                  <div className="shrink-0 mt-1">
                    <div className="flex h-5 w-5 items-center justify-center rounded border border-[#00DEC7]">
                      <Check className="h-3 w-3 text-[#00DEC7]" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{service.title}</h4>
                    <p className="mt-1 text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                  <Link href="#formulario" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Presupuesto
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Illustration and Tools */}
            <div className="flex flex-col items-center">
              {/* Marketing Illustration */}
              <div className="relative w-full max-w-md aspect-square mb-8">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Laptop */}
                  <rect x="80" y="120" width="240" height="160" rx="8" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
                  <rect x="90" y="130" width="220" height="140" rx="4" fill="#2a2a2a"/>
                  {/* Screen content - chart */}
                  <rect x="110" y="150" width="80" height="60" fill="#00DEC7" opacity="0.3" rx="4"/>
                  <rect x="200" y="180" width="90" height="30" fill="#00DEC7" opacity="0.5" rx="4"/>
                  <circle cx="245" cy="165" r="20" fill="#00DEC7" opacity="0.4"/>
                  {/* Chart bars */}
                  <rect x="120" y="190" width="15" height="15" fill="#00DEC7"/>
                  <rect x="140" y="180" width="15" height="25" fill="#00DEC7"/>
                  <rect x="160" y="170" width="15" height="35" fill="#00DEC7"/>
                  {/* Person */}
                  <circle cx="340" cy="220" r="25" fill="#FFD5B5"/>
                  <rect x="310" y="250" width="60" height="80" rx="10" fill="#00DEC7"/>
                  <rect x="320" y="330" width="15" height="40" fill="#1a1a1a"/>
                  <rect x="345" y="330" width="15" height="40" fill="#1a1a1a"/>
                  {/* Pencils */}
                  <rect x="60" y="80" width="8" height="60" fill="#FF6B6B" rx="2"/>
                  <rect x="360" y="100" width="8" height="50" fill="#4ECDC4" rx="2"/>
                  {/* Gears */}
                  <circle cx="280" cy="100" r="20" fill="none" stroke="#666" strokeWidth="4"/>
                  <circle cx="280" cy="100" r="8" fill="#666"/>
                  <circle cx="310" cy="120" r="12" fill="none" stroke="#666" strokeWidth="3"/>
                  <circle cx="310" cy="120" r="5" fill="#666"/>
                  {/* Business Plan text */}
                  <text x="200" y="110" textAnchor="middle" fill="#00DEC7" fontSize="14" fontWeight="bold">Business Plan</text>
                </svg>
              </div>

              {/* Tools Section */}
              <div className="w-full text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 block">Herramientas</span>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image
                        src="https://www.gstatic.com/images/branding/product/2x/meta_48dp.png"
                        alt="Meta Ads"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Meta<br/>Ads</span>
                  </div>
                  {/* TikTok */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                    </div>
                    <span className="text-xs mt-2 text-gray-600">TikTok<br/>Ads</span>
                  </div>
                  {/* Google Ads */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image
                        src="https://www.gstatic.com/images/branding/product/2x/ads_48dp.png"
                        alt="Google Ads"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Google<br/>Ads</span>
                  </div>
                  {/* Google My Business */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image
                        src="https://www.gstatic.com/images/branding/product/2x/google_my_business_48dp.png"
                        alt="Google My Business"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Google<br/>My Business</span>
                  </div>
                  {/* Analytics */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image
                        src="https://www.gstatic.com/images/branding/product/2x/analytics_48dp.png"
                        alt="Google Analytics"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Google<br/>Analytics</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image
                        src="https://www.gstatic.com/images/branding/product/2x/tag_manager_48dp.png"
                        alt="Google Tag Manager"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Tag<br/>Manager</span>
                  </div>
                </div>
              </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Objetivo
            </h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Aumentar tu visibilidad online y generar ventas</strong>. 4 pasos para crear una estrategia de marketing digital que genere{" "}
              <strong className="text-white font-bold">resultados reales para tu negocio en Argentina y Paraguay</strong>.
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Últimos Trabajos</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">Marketing Digital</p>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.title}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[#00DEC7] text-xs uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-bold mt-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
              <Link href="/trabajos">Ver todos los trabajos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trayectoria Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Trayectoria profesional<br />respaldada por resultados
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              A lo largo de estos años como <span className="text-white">equipo especialista en marketing digital</span>, 
              hemos trabajado con clientes en <span className="text-white">Argentina y Paraguay</span> que avalan nuestra experiencia y compromiso. 
              Los siguientes datos reflejan el <span className="text-white">crecimiento</span> y la confianza 
              que nuestros clientes han depositado en nosotros.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {stat.prefix}{animatedStats[index]}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials items={testimonials} category="marketing-digital" />

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">Marketing Digital</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white text-sm pr-4">{faq.question}</span>
                  <span className="text-[#00DEC7] shrink-0">
                    {openFaq === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
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
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              ¿Tenés alguna otra duda?
            </h3>
            <p className="mt-2 text-gray-400">
              Contactá con nosotros <span className="text-white font-semibold">sin compromiso</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent">
                <Link href="#formulario" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Escribinos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="formulario" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="relative hidden lg:block">
              <svg viewBox="0 0 500 500" className="w-full max-w-lg mx-auto">
                {/* Rocket */}
                <ellipse cx="280" cy="420" rx="100" ry="20" fill="#e0e0e0"/>
                <path d="M280 100 L320 300 L280 280 L240 300 Z" fill="#00DEC7"/>
                <circle cx="280" cy="180" r="30" fill="#1a1a1a"/>
                <circle cx="280" cy="180" r="15" fill="#00DEC7" opacity="0.5"/>
                <path d="M240 300 L220 350 L260 320 Z" fill="#1a1a1a"/>
                <path d="M320 300 L340 350 L300 320 Z" fill="#1a1a1a"/>
                {/* Flames */}
                <ellipse cx="280" cy="320" rx="20" ry="40" fill="#FF6B6B"/>
                <ellipse cx="280" cy="340" rx="12" ry="25" fill="#FFE66D"/>
                {/* Clouds */}
                <ellipse cx="200" cy="380" rx="40" ry="20" fill="#00DEC7" opacity="0.3"/>
                <ellipse cx="360" cy="400" rx="50" ry="25" fill="#00DEC7" opacity="0.3"/>
                <ellipse cx="280" cy="410" rx="60" ry="30" fill="#00DEC7" opacity="0.4"/>
                {/* Person */}
                <circle cx="150" cy="320" r="25" fill="#FFD5B5"/>
                <rect x="125" y="350" width="50" height="70" rx="10" fill="#1a1a1a"/>
                <rect x="130" y="420" width="15" height="40" fill="#1a1a1a"/>
                <rect x="155" y="420" width="15" height="40" fill="#1a1a1a"/>
                {/* Arm pointing */}
                <line x1="175" y1="370" x2="220" y2="350" stroke="#FFD5B5" strokeWidth="12" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <div className="bg-[#00DEC7] rounded-2xl p-6 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
                  ¿Listo para impulsar<br />tu negocio online?
                </h2>
              </div>

              <p className="text-center mb-2 font-semibold text-black">Consúltanos sin compromiso</p>
              <p className="text-center text-gray-600 text-sm mb-8">
                Escribinos a{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                o envíanos el siguiente formulario y{" "}
                <span className="font-semibold">te responderemos en menos de 24 horas</span>.
              </p>

              <form className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nombre *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                    required
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    placeholder="Mensaje *"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7] resize-none"
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="policy"
                    checked={acceptedPolicy}
                    onChange={(e) => setAcceptedPolicy(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="policy" className="text-xs text-gray-600">
                    He leído y acepto la <a href="/politica-de-privacidad" className="underline">política de privacidad</a>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full py-3 font-semibold">
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Services Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementos</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-black/60">También te puede interesar</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementaryServices.map((service) => (
              <div
                key={service.title}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mt-1">{service.subtitle}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-black/80">
                      <Check className="h-4 w-4 text-black shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-black font-semibold">
                  <span className="underline-offset-4 group-hover:underline">Más info</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
