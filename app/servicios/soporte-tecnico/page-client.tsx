"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus, Headset, Clock, MessageCircle, Wrench, Monitor, Bot, TrendingUp, ArrowRight, Users } from "lucide-react"

import { pushToDataLayer } from "@/lib/gtm"
import { LatestWorks } from "@/components/sections/latest-works"
import { Project } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

const marqueeItems = [
  { text: "Soporte Técnico Web Profesional", highlight: true },
  { text: "respuesta rápida garantizada" },
  { text: "Asistencia Remota", highlight: true },
  { text: "solucionamos sin que te muevas" },
  { text: "Equipo de Expertos", highlight: true },
  { text: "más de 10 años de experiencia" },
  { text: "Soporte por Email", highlight: true },
  { text: "atención personalizada" },
]

const servicesIncluded = [
  { title: "Resolución de errores de código", description: "Identificamos y solucionamos bugs, errores de PHP, JavaScript, problemas de base de datos y cualquier falla técnica." },
  { title: "Problemas de plugins y temas", description: "Resolvemos conflictos entre plugins, actualizaciones fallidas, problemas de compatibilidad y errores de configuración." },
  { title: "Fallas de seguridad y hackeos", description: "Limpiamos malware, restauramos sitios hackeados, reforzamos la seguridad y prevenimos futuros ataques." },
  { title: "Problemas de velocidad y rendimiento", description: "Diagnosticamos y solucionamos problemas de carga lenta, optimizamos base de datos y mejoramos el rendimiento." },
  { title: "Errores de email y formularios", description: "Resolvemos problemas de envío de emails, formularios que no funcionan, configuración SMTP y deliverability." },
  { title: "Problemas de visualización", description: "Solucionamos problemas de diseño, elementos que no se ven bien, responsive roto y problemas de CSS." },
  { title: "Migraciones y cambios de hosting", description: "Migramos tu web a un nuevo servidor, cambiamos de dominio y solucionamos problemas post-migración." },
  { title: "Restauración de backups", description: "Restauramos tu web a una versión anterior, recuperamos datos perdidos y solucionamos problemas de backup." },
  { title: "Capacitación y documentación", description: "Te enseñamos a usar tu panel, resolver problemas básicos y documentamos los cambios realizados." },
  { title: "Asistencia remota en vivo", description: "Nos conectamos a tu servidor o pantalla compartida para resolver problemas complejos en tiempo real." },
]

const processSteps = [
  { step: "01", title: "Contacto", subtitle: "y diagnóstico", description: "Nos contactás por email. Analizamos el problema y te damos un diagnóstico inicial.", highlight: "Respuesta en menos de 24 horas." },
  { step: "02", title: "Presupuesto", subtitle: "y aprobación", description: "Te enviamos un presupuesto claro con el tiempo estimado de resolución. Una vez aprobado, comenzamos a trabajar.", highlight: null },
  { step: "03", title: "Resolución", subtitle: "del problema", description: "Trabajamos en la solución del problema con acceso remoto a tu servidor o panel de control.", highlight: null },
  { step: "04", title: "Verificación", subtitle: "y entrega", description: "Verificamos que todo funcione correctamente y te informamos de las acciones realizadas.", highlight: "Garantía de solución." },
]

const stats = [
  { value: 500, prefix: "+", suffix: "", label: "Tickets resueltos" },
  { value: 98, prefix: "", suffix: "%", label: "Satisfacción" },
  { value: 2, prefix: "<", suffix: "h", label: "Tiempo promedio resolución" },
  { value: 24, prefix: "", suffix: "/7", label: "Disponibilidad" },
]

const faqs = [
  { question: "¿Cómo funciona el soporte por incidente?", answer: "Nos contactás cuando tenés un problema, evaluamos la complejidad y te damos un presupuesto estimado en horas. Una vez aprobado, trabajamos en la solución y te cobramos solo las horas utilizadas." },
  { question: "¿Qué tipo de problemas pueden resolver?", answer: "Resolvemos errores de código, problemas de plugins, fallas de seguridad, problemas de velocidad, errores de base de datos, problemas de email, y cualquier incidencia técnica relacionada con tu web." },
  { question: "¿Cuál es el tiempo de respuesta?", answer: "Depende del plan: 24-48 horas para incidentes puntuales, 12 horas para Pack de horas, y menos de 4 horas para Soporte Ilimitado. En emergencias críticas, respondemos en minutos." },
  { question: "¿El soporte incluye cambios en el diseño?", answer: "El soporte técnico cubre resolución de problemas y pequeños ajustes. Para cambios de diseño o nuevas funcionalidades, se presupuestan como desarrollo adicional." },
  { question: "¿Trabajan los fines de semana?", answer: "El plan Soporte Ilimitado incluye cobertura 24/7 para emergencias. Los otros planes tienen cobertura de lunes a viernes en horario comercial." },
  { question: "¿Puedo cancelar cuando quiera?", answer: "El plan mensual se puede cancelar en cualquier momento. El Pack de horas no tiene vencimiento pero no es reembolsable una vez adquirido." },
  { question: "¿Qué pasa si no pueden resolver el problema?", answer: "Si por alguna razón no podemos resolver el problema, te devolvemos el dinero o buscamos una solución alternativa. Garantizamos la resolución o reembolso." },
  { question: "¿Trabajan con cualquier plataforma?", answer: "Sí, trabajamos con WordPress, WooCommerce, Shopify, Next.js, React, PHP, y prácticamente cualquier tecnología web moderna." },
  { question: "¿Trabajan con empresas de otros países?", answer: "Sí, trabajamos con empresas de todo el mundo. La comunicación es fluida gracias a herramientas digitales y nos adaptamos a las necesidades de cada cliente." },
  { question: "¿Cómo me mantengo informado del progreso?", answer: "Te mantenemos informado por email. Siempre sabés en qué estado está la resolución de tu problema." },
]

const complementaryServices = [
  { title: "Mantenimiento web", subtitle: "Prevení problemas", features: ["Actualizaciones automáticas", "Copias de seguridad", "Seguridad anti-malware", "Optimización velocidad", "Monitoreo 24/7", "Reportes mensuales"], href: "/servicios/mantenimiento-web", icon: Wrench },
  { title: "Agentes IA", subtitle: "Automatizá la atención", features: ["Chatbots para WhatsApp", "Asistentes virtuales 24/7", "Integración con ChatGPT", "Toma de pedidos", "Respuestas instantáneas", "Escalamiento a humanos"], href: "/servicios/agentes-ia", icon: Bot },
  { title: "Marketing digital", subtitle: "Más tráfico y ventas", features: ["Google Ads", "Meta Ads", "SEO y posicionamiento", "Email marketing", "Redes sociales", "Analytics"], href: "/servicios/marketing-digital", icon: TrendingUp },
]

interface SoporteTecnicoPageClientProps {
  projects: Project[]
  testimonials: Testimonial[]
}

export default function SoporteTecnicoClient({ projects, testimonials }: SoporteTecnicoPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true) }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    pushToDataLayer("form_submit", { form_name: "Technical Support Service Form", service: "soporte-tecnico" })
    alert("Gracias por tu consulta. Te responderemos pronto.")
  }

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.value
        const increment = end / 125
        const timer = setInterval(() => {
          start += increment
          if (start >= end) { start = end; clearInterval(timer) }
          setCounts(prev => { const n = [...prev]; n[index] = Math.floor(start); return n })
        }, 16)
      })
    }
  }, [isVisible])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
                <Headset className="h-6 w-6" />
                Soporte Técnico Profesional
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                ¿Problemas con tu web? <span className="relative inline-block"><span className="relative z-10">Los resolvemos</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" /></span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">para todo el mundo</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                Equipo de expertos disponible para <strong className="text-white">solucionar cualquier problema técnico</strong> de tu web. <strong className="text-white">Respuesta rápida</strong>, <strong className="text-white">soluciones efectivas</strong> y soporte multicanal.
              </p>
              <p className="mt-4 text-gray-300">
                <span className="text-[#00DEC7] font-semibold">Objetivo:</span> <span className="text-[#00DEC7]">que tu web funcione perfectamente</span> lo antes posible.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
                  <Link href="/contacto">Necesito ayuda</Link>
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    <div>
                      <span className="font-bold text-white">5.0</span>
                      <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div>
                      <span className="text-xs text-gray-400">+45 reseñas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-[#00DEC7]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl p-8 border border-[#00DEC7]/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Wrench className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Resolución</p><p className="text-gray-400 text-sm">de errores</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Monitor className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Asistencia</p><p className="text-gray-400 text-sm">Remota</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><MessageCircle className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Contacto</p><p className="text-gray-400 text-sm">Email</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Clock className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Respuesta</p><p className="text-gray-400 text-sm">Rápida</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 border-t border-[#00DEC7]">
          <div className="flex overflow-hidden"><div className="animate-marquee flex whitespace-nowrap">{[...marqueeItems, ...marqueeItems].map((item, index) => (<span key={index} className="mx-4 text-sm">{item.highlight ? <strong className="text-[#00DEC7]">{item.text}</strong> : <span className="text-gray-400">{item.text}</span>}<span className="mx-4 text-gray-600">·</span></span>))}</div></div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">¿Cómo te podemos<br />ayudar?</h2>
            <p className="mt-6 text-black/80 text-lg">Nuestro <strong className="text-black">equipo de expertos</strong> está preparado para resolver <strong className="text-black">cualquier problema técnico</strong> con tu web.</p>
          </div>
          <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
            {servicesIncluded.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="shrink-0 mt-1"><div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black"><Check className="h-4 w-4 text-black" strokeWidth={3} /></div></div>
                <div><h4 className="font-bold text-black text-lg">{service.title}</h4><p className="mt-1 text-black/70 text-sm leading-relaxed">{service.description}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black">¿Tenés un problema urgente?</h3>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8"><a href="mailto:info@vektra.digital">Escribinos</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" /><div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Objetivo</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed"><strong className="text-white font-bold">Resolver tu problema lo antes posible</strong>. 4 pasos para que tu web <strong className="text-white font-bold">vuelva a funcionar perfectamente</strong>.</p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">{item.title}<br />{item.subtitle}</h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{item.description}{item.highlight && <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LatestWorks projects={projects} title="Últimos Proyectos" subtitle="Soporte Técnico" viewAllText="Ver todos los proyectos" viewAllLink="/trabajos" />

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Experiencia en<br />soporte técnico</h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">Resolvemos <span className="text-white">problemas técnicos</span> para empresas de <span className="text-white">todo el mundo</span>.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (<div key={stat.label}><span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">{stat.prefix}{counts[index]}{stat.suffix}</span><p className="mt-2 text-gray-400 text-sm">{stat.label}</p></div>))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} category="soporte-tecnico" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes</h2><p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">Soporte Técnico</p></div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-white text-sm font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" /> : <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />}
                </button>
                {openFaq === index && <div className="px-4 pb-4"><p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">¿Tenés alguna otra duda?</h3>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent"><Link href="/contacto">Escribinos</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-gray-100 rounded-full w-80 h-80 mx-auto flex items-center justify-center">
                  <div className="relative"><Headset className="h-32 w-32 text-[#00DEC7]" /><div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2"><Wrench className="h-6 w-6 text-black" /></div><div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2"><Users className="h-6 w-6 text-white" /></div></div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6"><h3 className="text-xl md:text-2xl font-bold text-black text-center">¿Tenés un problema con tu web?</h3></div>
              <p className="text-center text-gray-600 mb-2">Contanos qué está pasando <span className="font-semibold text-black">y te ayudamos</span></p>
              <p className="text-center text-gray-600 text-sm mb-8">Escribinos a <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a> o describí tu problema.</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                  <input type="url" placeholder="URL de tu web" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                </div>
                <textarea placeholder="Describí el problema que estás teniendo... *" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] resize-none" />
                <div className="flex items-start gap-2"><input type="checkbox" id="privacy" className="mt-1" /><label htmlFor="privacy" className="text-sm text-gray-600">He leído y acepto la <Link href="/politica-de-privacidad" className="underline hover:text-[#00DEC7]">política de privacidad</Link></label></div>
                <div className="text-center pt-4"><Button type="submit" size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-12">Enviar</Button></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Services */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-black">Complementos</h2><p className="mt-2 text-black/60 uppercase tracking-widest text-sm">También te puede interesar</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {complementaryServices.map((service) => (
              <div key={service.title} className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black"><service.icon className="h-8 w-8" /></div>
                <h3 className="text-xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mb-4">{service.subtitle}</p>
                <ul className="space-y-2 mb-6">{service.features.map((feature) => (<li key={feature} className="flex items-center gap-2 text-sm text-black/80"><Check className="h-4 w-4 text-black" />{feature}</li>))}</ul>
                <Link href={service.href} className="mt-auto inline-flex items-center gap-2 text-black font-semibold"><span className="underline-offset-4 group-hover:underline">Más info</span><ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
