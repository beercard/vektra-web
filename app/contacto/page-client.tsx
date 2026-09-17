"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Mail, User, MessageSquare, ListFilter, CheckCircle, Star, ChevronLeft, ChevronRight, Instagram, Linkedin } from "lucide-react"
import { pushToDataLayer } from "@/lib/gtm"

const servicios = [
  { value: "diseno-web", label: "Diseño Web" },
  { value: "tienda-online", label: "Tienda Online" },
  { value: "marketing-digital", label: "Marketing Digital" },
  { value: "agentes-ia", label: "Agentes y Bots IA" },
  { value: "apps", label: "Aplicaciones Móviles" },
  { value: "otro", label: "Otro" },
]

const stats = [
  { number: "+8", label: "Años de experiencia" },
  { number: "+150", label: "Proyectos completados" },
  { number: "+45", label: "Reseñas 5 estrellas" },
  { number: "2", label: "Idiomas de atención" },
]

const testimonials = [
  {
    name: "Martin Paz",
    role: "Gerente Comercial",
    company: "Uniplaza Shopping",
    location: "Corrientes, Argentina",
    text: "Excelente trabajo con nuestra tienda online. Las ventas aumentaron un 200% en los primeros 3 meses. El equipo de Vektra es muy profesional.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/50.jpg"
  },
  {
    name: "Clinic FSC",
    role: "Doctor",
    company: "Spa Clinic FSC",
    location: "España",
    text: "Desarrollaron nuestra web corporativa y el sistema de turnos online. Ahora nuestros pacientes pueden agendar citas las 24 horas. Muy recomendados.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Sebastian Aura",
    role: "Director Creativo",
    company: "Aura Image",
    location: "Delaware, 19901 United States",
    text: "El chatbot de WhatsApp que nos implementaron redujo nuestro tiempo de respuesta de horas a segundos. Increíble servicio.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Ruben Sinat",
    role: "Gerente",
    company: "Patagonia Construcciones",
    location: "Resistencia, Chaco, Argentina",
    text: "Profesionales y puntuales. Entregaron mi sitio web en tiempo y forma. Las campañas de Google Ads trajeron muchos clientes nuevos.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/26.jpg"
  },
  {
    name: "Juan Pérez",
    role: "CEO",
    company: "Agua Viva",
    location: "Resistencia, Chaco, Argentina",
    text: "La app móvil que desarrollaron para nuestro negocio es exactamente lo que necesitábamos. Nuestros clientes la aman.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
]

const faqs = [
  {
    question: "Cuánto cuesta desarrollar una página web profesional?",
    answer: "Los precios varían según la complejidad del proyecto. Una web corporativa básica parte desde USD 500, tiendas online desde USD 800, y proyectos con funcionalidades avanzadas se cotizan de manera personalizada. Ofrecemos presupuestos sin compromiso.",
  },
  {
    question: "Cuánto tiempo tarda el desarrollo de un proyecto?",
    answer: "Los tiempos dependen del tipo de proyecto: una web corporativa tarda entre 2-3 semanas, tienda online entre 4-6 semanas, aplicaciones móviles entre 6-12 semanas, y chatbots o agentes IA entre 2-4 semanas.",
  },
  {
    question: "Ofrecen mantenimiento y soporte técnico?",
    answer: "Sí, todos nuestros proyectos incluyen 30 días de soporte técnico inicial sin costo adicional. También ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, backups, monitoreo y soporte prioritario.",
  },
  {
    question: "Trabajan con clientes de otros países?",
    answer: "Sí, trabajamos con clientes de todo el mundo. La comunicación se realiza por videollamada y email.",
  },
  {
    question: "Qué formas de pago aceptan?",
    answer: "Aceptamos transferencias bancarias internacionales (SWIFT), MercadoPago para clientes de Latinoamérica, PayPal, Wise y criptomonedas (USDT). Ofrecemos planes de pago en cuotas sin interés.",
  },
  {
    question: "Puedo ver ejemplos de trabajos anteriores?",
    answer: "Por supuesto. En nuestra sección de Trabajos podés ver el portfolio completo con proyectos de diseño web, tiendas online, apps móviles y más. También podemos mostrarte casos de éxito similares a tu proyecto.",
  },
  {
    question: "Qué incluye el servicio de marketing digital?",
    answer: "Nuestro servicio incluye gestión de campañas en Google Ads, Meta Ads y TikTok Ads, optimización SEO, configuración de Google Business Profile, email marketing y reportes mensuales de resultados.",
  },
  {
    question: "Cómo es el proceso de trabajo?",
    answer: "Nuestro proceso tiene 4 etapas: 1) Reunión inicial para entender tus necesidades, 2) Propuesta y presupuesto, 3) Desarrollo con revisiones periódicas, 4) Lanzamiento y capacitación. Mantenés comunicación directa durante todo el proyecto.",
  },
]

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!startCounting) return
    
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, startCounting])
  
  return count
}

export default function ContactoClient() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    servicio: "",
    mensaje: "",
    acepto: false,
    honeypot: "",
  })
  const [timestamp, setTimestamp] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [statsInView, setStatsInView] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimestamp(Date.now())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true)
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const stat1 = useCountUp(8, 2000, statsInView)
  const stat2 = useCountUp(150, 2000, statsInView)
  const stat3 = useCountUp(45, 2000, statsInView)
  const stat4 = useCountUp(2, 2000, statsInView)
  const animatedStats = [stat1, stat2, stat3, stat4]

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Error al enviar el formulario")

      setIsSubmitted(true)
      pushToDataLayer("form_submit", {
        form_name: "Contact Page",
        service: formData.servicio,
      })
      setFormData({
        nombre: "",
        email: "",
        servicio: "",
        mensaje: "",
        acepto: false,
        honeypot: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el formulario")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero1.webp"
          alt="Contacto Vektra"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contacto
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Estamos listos para ayudarte a impulsar tu negocio digital
          </p>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
            <a href="mailto:info@vektra.digital" className="group flex flex-col md:flex-row items-center justify-center gap-3 p-4 md:p-0 rounded-2xl bg-gray-50 md:bg-transparent text-black hover:text-[#00DEC7] transition-all hover:shadow-sm md:hover:shadow-none col-span-2 sm:col-span-1 md:col-span-auto">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00DEC7] bg-white group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-[#00DEC7]" />
              </div>
              <span className="font-medium text-sm md:text-base">info@vektra.digital</span>
            </a>

            <a href="https://www.instagram.com/vektra.digital" target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row items-center justify-center gap-3 p-4 md:p-0 rounded-2xl bg-gray-50 md:bg-transparent text-black hover:text-[#00DEC7] transition-all hover:shadow-sm md:hover:shadow-none">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00DEC7] bg-white group-hover:scale-110 transition-transform">
                <Instagram className="h-5 w-5 text-[#00DEC7]" />
              </div>
              <span className="font-medium text-sm md:text-base">Instagram</span>
            </a>

            <a href="https://www.linkedin.com/company/vektra-digital/" target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row items-center justify-center gap-3 p-4 md:p-0 rounded-2xl bg-gray-50 md:bg-transparent text-black hover:text-[#00DEC7] transition-all hover:shadow-sm md:hover:shadow-none col-span-2 md:col-span-auto">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00DEC7] bg-white group-hover:scale-110 transition-transform">
                <Linkedin className="h-5 w-5 text-[#00DEC7]" />
              </div>
              <span className="font-medium text-sm md:text-base">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Form Section - Centered */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          {/* Dotted separator */}
          <div className="border-t-2 border-dotted border-gray-300 mb-10" />

          {/* CTA Text */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg">
              Escribinos a{" "}
              <a href="mailto:info@vektra.digital" className="underline font-semibold text-black hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
              o envíanos el siguiente formulario y te responderemos en la mayor brevedad posible
            </p>
          </div>

          {isSubmitted ? (
            <div className="rounded-2xl border-2 border-[#00DEC7] bg-[#00DEC7]/10 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEC7]/20">
                <CheckCircle className="h-8 w-8 text-[#00DEC7]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Mensaje enviado correctamente</h3>
              <p className="text-gray-600">Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
              <Button 
                variant="outline" 
                className="mt-6 bg-transparent border-black hover:bg-black hover:text-white"
                onClick={() => setIsSubmitted(false)}
              >
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Servicio Select */}
              <div className="relative">
                <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                <Select value={formData.servicio} onValueChange={(value) => setFormData({ ...formData, servicio: value })} required>
                  <SelectTrigger className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7] text-left">
                    <SelectValue placeholder="Presupuesto" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicios.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Nombre */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Nombre *"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7]"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7]"
                />
              </div>

              {/* Mensaje */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <Textarea
                  placeholder="Mensaje *"
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="pl-10 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7] resize-none"
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="acepto"
                  checked={formData.acepto}
                  onCheckedChange={(checked) => setFormData({ ...formData, acepto: checked as boolean })}
                  className="mt-1 data-[state=checked]:bg-[#00DEC7] data-[state=checked]:border-[#00DEC7]"
                  required
                />
                <label htmlFor="acepto" className="text-sm text-gray-600">
                  He leído y acepto la{" "}
                  <Link href="/politica-de-privacidad" className="underline font-semibold text-black hover:text-[#00DEC7]">
                    política de privacidad
                  </Link>
                </label>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.acepto}
                  className="bg-[#00DEC7] hover:bg-[#00C4B0] text-black font-semibold px-12 py-6 rounded-full text-base"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Trayectoria Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Trayectoria profesional<br />
              respaldada por resultados
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              A lo largo de estos años trabajando con clientes de todo el mundo, hemos construido una cartera de proyectos exitosos. Los siguientes datos reflejan el crecimiento y la confianza que nuestros clientes han depositado en nosotros.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center md:text-left p-4 rounded-xl transition-all duration-500 hover:bg-white/5 group"
              >
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white group-hover:text-[#00DEC7] transition-colors duration-300">
                  {stat.number.startsWith("+") ? "+" : ""}{animatedStats[index]}
                </span>
                <p className="mt-2 text-white/60 text-sm md:text-base group-hover:text-white/80 transition-colors duration-300">{stat.label}</p>
                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00DEC7] transition-all duration-1000 ease-out"
                    style={{
                      width: statsInView ? '100%' : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Qué opinan de nosotros
              </h2>
              <p className="mt-4 text-gray-600 max-w-xl">
                La satisfacción de nuestros clientes es nuestra mejor carta de presentación
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2">
                <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
                <span className="font-semibold text-black ml-1">4.9</span>
                <div className="flex ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl text-black leading-relaxed mb-8">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          unoptimized={testimonial.image.startsWith("http")}
                          className="rounded-full object-cover shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-black text-lg">
                            {testimonial.name} {testimonial.role ? <span className="text-gray-500 font-normal">- {testimonial.role}</span> : ""}
                          </p>
                          <p className="text-gray-600 text-sm">{testimonial.company}</p>
                          <p className="text-gray-400 text-xs">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-[#00DEC7] hover:text-[#00DEC7] transition-colors"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentTestimonial ? "w-8 bg-[#00DEC7]" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-[#00DEC7] hover:text-[#00DEC7] transition-colors"
                aria-label="Testimonio siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-gray-600">
              Resolvemos tus dudas sobre nuestros servicios
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-gray-200 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-black hover:text-[#00DEC7] py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA after FAQs */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿No encontrás lo que buscás?{" "}
              <span className="font-semibold text-black">Contactá con nosotros</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="bg-[#00DEC7] hover:bg-[#00C4B0] text-black font-semibold px-8 rounded-full">
                <a href="mailto:info@vektra.digital">
                  <Mail className="mr-2 h-4 w-4" />
                  Escribinos
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Banner */}
      <section className="py-4 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#00DEC7] opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-[#00DEC7]" />
              </div>
              <span className="text-white font-medium">Disponibles para nuevos proyectos</span>
            </div>
            <span className="text-white/60 text-sm">Lunes a Viernes, 9:00 - 18:00 (GMT-3)</span>
          </div>
        </div>
      </section>
    </>
  )
}
