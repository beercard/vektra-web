"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, Star, Smartphone, Monitor, Cpu, Zap, Shield, Cloud, Wrench, Palette, TrendingUp, ArrowRight } from "lucide-react"

import { LatestWorks } from "@/components/sections/latest-works"
import { allProjects } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

const servicesIncluded = [
  {
    title: "Apps Nativas Android",
    description: "Desarrollo de aplicaciones nativas para Android con Kotlin o Java. Publicación en Google Play Store incluida. Apps optimizadas para todos los dispositivos Android.",
  },
  {
    title: "Apps Nativas iOS",
    description: "Desarrollo de aplicaciones nativas para iPhone y iPad con Swift. Publicación en App Store incluida. Cumplimiento con todas las pautas de Apple.",
  },
  {
    title: "Apps Híbridas (React Native / Flutter)",
    description: "Una sola base de código para Android e iOS. Reducción de costos y tiempo de desarrollo. Misma experiencia de usuario en ambas plataformas.",
  },
  {
    title: "Progressive Web Apps (PWA)",
    description: "Apps web que funcionan como aplicaciones nativas. No requieren descarga de las tiendas. Funcionan offline y envían notificaciones push.",
  },
  {
    title: "Diseño UI/UX Personalizado",
    description: "Diseño de interfaz moderno y atractivo. Experiencia de usuario optimizada. Prototipado y validación antes del desarrollo.",
  },
  {
    title: "Backend y APIs",
    description: "Desarrollo del servidor y base de datos para tu app. APIs REST o GraphQL. Infraestructura escalable en la nube (AWS, Google Cloud, Vercel).",
  },
  {
    title: "Integraciones",
    description: "Conexión con MercadoPago, pasarelas de pago, mapas, notificaciones push, analíticas y cualquier servicio externo que necesites.",
  },
  {
    title: "Panel de Administración",
    description: "Dashboard web para gestionar tu app, usuarios, contenidos y estadísticas. Control total de tu aplicación desde cualquier lugar.",
  },
  {
    title: "Publicación en Tiendas",
    description: "Nos encargamos de todo el proceso de publicación en Google Play Store y Apple App Store. Optimización ASO para mayor visibilidad.",
  },
  {
    title: "Mantenimiento y Actualizaciones",
    description: "Soporte técnico continuo, actualizaciones de seguridad, nuevas funcionalidades y compatibilidad con nuevas versiones de Android e iOS.",
  },
]

const technologies = [
  { name: "React Native", image: "https://cdn.simpleicons.org/react/000000" },
  { name: "Flutter", image: "https://cdn.simpleicons.org/flutter/000000" },
  { name: "Swift", image: "https://cdn.simpleicons.org/swift/000000" },
  { name: "Kotlin", image: "https://cdn.simpleicons.org/kotlin/000000" },
  { name: "Firebase", image: "https://cdn.simpleicons.org/firebase/000000" },
  { name: "Node.js", image: "https://cdn.simpleicons.org/nodedotjs/000000" },
]

const processSteps = [
  {
    step: "01",
    title: "Descubrimiento",
    subtitle: "y planificación",
    description: "Analizamos tu idea, definimos funcionalidades, creamos wireframes y establecemos la hoja de ruta del proyecto.",
    highlight: "Documentación completa antes de empezar."
  },
  {
    step: "02",
    title: "Diseño",
    subtitle: "UI/UX",
    description: "Creamos el diseño visual de tu app, prototipamos las pantallas y validamos la experiencia de usuario con vos.",
    highlight: null
  },
  {
    step: "03",
    title: "Desarrollo",
    subtitle: "e integración",
    description: "Programamos tu app con las mejores prácticas, integramos APIs y servicios, y realizamos pruebas continuas.",
    highlight: null
  },
  {
    step: "04",
    title: "Lanzamiento",
    subtitle: "y soporte",
    description: "Publicamos en las tiendas, monitoreamos el rendimiento y brindamos soporte continuo.",
    highlight: "Tu app lista para conquistar el mercado."
  },
]

const stats = [
  { value: 30, prefix: "+", suffix: "", label: "Apps desarrolladas" },
  { value: 50000, prefix: "+", suffix: "", label: "Descargas totales" },
  { value: 4.8, prefix: "", suffix: "", label: "Calificación promedio" },
  { value: 100, prefix: "", suffix: "%", label: "Clientes Satisfechos" },
]

const faqs = [
  { question: "¿Cuánto cuesta desarrollar una app móvil?", answer: "El costo depende de la complejidad, funcionalidades y plataformas (Android, iOS o ambas). Una app básica puede partir desde USD 3.000, mientras que apps más complejas con backend, integraciones y panel de administración pueden costar entre USD 8.000 y USD 25.000. Te damos un presupuesto detallado tras analizar tu proyecto." },
  { question: "¿Cuánto tiempo lleva desarrollar una app?", answer: "Una app básica puede estar lista en 2-3 meses. Apps de complejidad media llevan entre 4-6 meses, y proyectos grandes pueden tomar 6-12 meses. El tiempo exacto depende de las funcionalidades, integraciones y feedback durante el proceso." },
  { question: "¿Es mejor una app nativa o híbrida?", answer: "Depende de tu proyecto. Las apps híbridas (React Native, Flutter) permiten desarrollar para Android e iOS con una sola base de código, reduciendo costos y tiempo. Las nativas ofrecen el máximo rendimiento para apps muy exigentes (juegos, AR/VR). Para la mayoría de proyectos, recomendamos React Native o Flutter." },
  { question: "¿Qué es una PWA y cuándo conviene?", answer: "Una Progressive Web App es un sitio web que funciona como una app: se puede instalar, funciona offline y envía notificaciones. Conviene cuando querés llegar a usuarios sin que descarguen de las tiendas, o como primer paso antes de invertir en apps nativas. Es más económico y rápido de desarrollar." },
  { question: "¿Incluyen la publicación en Google Play y App Store?", answer: "Sí, nos encargamos de todo el proceso de publicación: creación de cuentas de desarrollador, preparación de activos (iconos, capturas, descripciones), cumplimiento de políticas de las tiendas y optimización ASO para mejor visibilidad. Las cuentas de desarrollador tienen un costo único (Google Play USD 25, Apple USD 99/año)." },
  { question: "¿Puedo actualizar el contenido de mi app sin saber programar?", answer: "Sí, desarrollamos un panel de administración web donde podés gestionar usuarios, contenidos, productos, notificaciones y ver estadísticas. Todo sin tocar código. Los cambios de contenido se reflejan automáticamente en la app." },
  { question: "¿Qué pasa si necesito cambios después del lanzamiento?", answer: "Ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, compatibilidad con nuevas versiones de Android/iOS, pequeños ajustes y soporte técnico. Para nuevas funcionalidades grandes, presupuestamos por separado." },
  { question: "¿Trabajan con empresas internacionales?", answer: "Sí, trabajamos con clientes de todo el mundo. Las reuniones son por videollamada (Meet, Zoom) y la comunicación fluye perfectamente. Ya hemos desarrollado apps para empresas en USA, Europa y Latinoamérica." },
  { question: "¿Qué tecnologías usan para el backend?", answer: "Usamos Node.js, Next.js o Python para el backend según las necesidades del proyecto. Para bases de datos: PostgreSQL, MongoDB o Firebase. La infraestructura puede ser en AWS, Google Cloud, Vercel o servidores dedicados según el volumen esperado." },
  { question: "¿Puedo integrar mi app con sistemas que ya tengo?", answer: "Por supuesto. Desarrollamos APIs para conectar tu app con ERPs, CRMs, sistemas de facturación, ecommerce, pasarelas de pago (MercadoPago, Stripe), servicios de envío y cualquier sistema que tenga API disponible o permita integración." },
]

const complementServices = [
  {
    title: "Mantenimiento de Apps",
    subtitle: "Tu app siempre actualizada",
    items: ["Actualizaciones de seguridad", "Compatibilidad nuevos SO", "Corrección de errores", "Optimización de rendimiento", "Monitoreo 24/7", "Backups automáticos"],
    href: "/servicios/mantenimiento",
    icon: Wrench
  },
  {
    title: "Diseño UI/UX",
    subtitle: "Experiencias memorables",
    items: ["Investigación de usuarios", "Wireframes y prototipos", "Diseño de interfaz", "Pruebas de usabilidad", "Sistema de diseño", "Animaciones y micro-interacciones"],
    href: "/servicios/diseno-ui-ux",
    icon: Palette
  },
  {
    title: "Marketing para Apps",
    subtitle: "Hacé crecer tu app",
    items: ["ASO (App Store Optimization)", "Campañas de descargas", "Google Ads para apps", "Meta Ads", "Analítica y métricas", "Estrategia de retención"],
    href: "/servicios/marketing-digital",
    icon: TrendingUp
  },
]

interface AppsPageClientProps {
  testimonials: Testimonial[]
}

export default function AppsPageClient({ testimonials }: AppsPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const statsRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Stats animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          stats.forEach((stat, index) => {
            const duration = 2000
            const steps = 60
            const increment = stat.value / steps
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                current = stat.value
                clearInterval(timer)
              }
              setAnimatedStats((prev) => {
                const newStats = [...prev]
                newStats[index] = current
                return newStats
              })
            }, duration / steps)
          })
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  const formatStat = (value: number, index: number) => {
    if (index === 2) return value.toFixed(1)
    if (value >= 1000) return Math.floor(value).toLocaleString()
    return Math.floor(value)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <p className="text-[#00DEC7] text-lg font-medium flex items-center gap-2">
                <span className="text-2xl">📱</span> Desarrollo de Apps
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Desarrollo de{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Apps Móviles</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}para{" "}
                <span className="font-extrabold">Android</span> e{" "}
                <span className="font-extrabold">iOS</span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">
                  para todo el mundo
                </span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                Desarrollo aplicaciones móviles nativas e híbridas con{" "}
                <strong className="text-white">React Native</strong> y{" "}
                <strong className="text-white">Flutter</strong>.
                Apps para empresas de <strong className="text-white">todo el mundo</strong>.
              </p>

              <p className="text-gray-300">
                Objetivo:{" "}
                <span className="text-[#00DEC7] font-medium">
                  convertir tu idea en una app exitosa
                </span>{" "}
                que tus usuarios amen usar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="/contacto">Hablemos de tu app</Link>
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
                          <Star key={i} className="h-3 w-3 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">+45 reseñas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - App Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-96">
                {/* Phone mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-black rounded-[2.5rem] border-4 border-gray-700 shadow-2xl">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-full" />
                  <div className="absolute inset-4 top-8 bg-gradient-to-br from-[#00DEC7] to-[#00DEC7]/50 rounded-2xl flex items-center justify-center">
                    <Smartphone className="h-16 w-16 text-black/50" />
                  </div>
                </div>
                {/* Floating icons */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="absolute top-20 -right-8 w-16 h-16 bg-[#00DEC7] rounded-xl shadow-lg flex items-center justify-center">
                  <Zap className="h-8 w-8 text-black" />
                </div>
                <div className="absolute bottom-20 -left-8 w-16 h-16 bg-black rounded-xl shadow-lg flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#00DEC7]" />
                </div>
                <div className="absolute -bottom-4 right-8 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Cloud className="h-8 w-8 text-[#00DEC7]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 inline-flex items-center">
                {item.highlight ? (
                  <span className="text-[#00DEC7] font-semibold">{item.text}</span>
                ) : (
                  <span className="text-white">{item.text}</span>
                )}
                <span className="mx-4 text-gray-600">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Tu app completa, lista para<br />
              conquistar el mercado global
            </h2>
            <p className="mt-6 text-black/80 text-base sm:text-lg">
              Desarrollamos tu <strong className="text-black">aplicación móvil de principio a fin</strong>. Desde el diseño hasta la publicación en tiendas, nos encargamos de todo para que vos te enfoques en tu negocio.
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

          {/* Technologies */}
          <div className="mt-16 pt-16 border-t border-black/20">
            <p className="text-center text-black/60 uppercase tracking-widest text-sm mb-8">Tecnologías</p>
            <div className="flex flex-wrap justify-center gap-8">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 bg-white/50 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm">
                    <Image 
                      src={tech.image} 
                      alt={tech.name} 
                      width={32} 
                      height={32} 
                      className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-sm text-black font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
              Consúltanos <span className="font-normal">sin compromiso</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              Contanos tu idea y te asesoramos sobre la mejor solución técnica para tu app.
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

      {/* Objetivo Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Objetivo para negocios de todo el mundo</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Convertir tu idea en una app exitosa</strong>. 4 pasos para desarrollar una aplicación móvil que{" "}
              <strong className="text-white font-bold">tus usuarios amen y recomienden</strong>.
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
        projects={allProjects.filter(p => p.category === "apps")} 
        title="Apps desarrolladas para todo el mundo"
        subtitle="DESARROLLO DE APLICACIONES MÓVILES" 
        viewAllLink="/trabajos?category=apps"
      />

      {/* Trayectoria Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Trayectoria profesional<br />
              respaldada por resultados
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              A lo largo de estos años como <span className="text-white">equipo de desarrollo de apps</span>, 
              hemos trabajado con clientes de <span className="text-white">todo el mundo</span> que avalan nuestra experiencia y compromiso.
              Los siguientes datos reflejan el <span className="text-white">crecimiento</span> y la confianza 
              que nuestros clientes han depositado en nosotros.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {stat.prefix}{formatStat(animatedStats[index], index)}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials items={testimonials} category="apps" />

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes sobre apps móviles</h2>
            <p className="mt-4 text-gray-500 uppercase tracking-widest text-sm">DESARROLLO DE APPS MÓVILES</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              ¿Tenés alguna otra duda?
            </h3>
            <p className="mt-2 text-gray-400">
              Contactá con nosotros <span className="text-white font-medium">sin compromiso</span>
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
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square bg-gradient-to-br from-[#00DEC7]/10 to-transparent rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone className="h-32 w-32 text-[#00DEC7] mx-auto mb-4" />
                    <Monitor className="h-24 w-24 text-black/20 mx-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-8 py-6 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-black text-center">
                  ¿Listo para crear tu app?
                </h3>
              </div>

              <p className="text-center text-gray-600 mb-8">
                Consúltanos <span className="font-bold text-black">sin compromiso</span>
              </p>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Contame sobre tu proyecto de app *"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy" className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    He leído y acepto la{" "}
                    <Link href="/politica-de-privacidad" className="underline">política de privacidad</Link>
                  </label>
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-12">
                    Enviar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementos Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementos para tu app</h2>
            <p className="mt-4 text-black/60 uppercase tracking-widest text-sm">TAMBIÉN TE PUEDE INTERESAR</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mb-4">{service.subtitle}</p>
                <ul className="mb-6 space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-black/80 text-sm">
                      <Check className="h-4 w-4 text-black" />
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
    </>
  )
}

// Marquee items
const marqueeItems = [
  { text: "Apps Nativas Android e iOS", highlight: true },
  { text: "desarrollamos con las mejores tecnologías del mercado" },
  { text: "React Native", highlight: true },
  { text: "una sola base de codigo para Android y iOS" },
  { text: "Flutter", highlight: true },
  { text: "apps rápidas y con diseño moderno" },
  { text: "Progressive Web Apps (PWA)", highlight: true },
  { text: "apps web que funcionan como nativas" },
  { text: "Apps para empresas", highlight: true },
  { text: "soluciones a medida para tu negocio en cualquier parte del mundo" },
  { text: "Integraciones API", highlight: true },
  { text: "conexión con tus sistemas existentes" },
]
