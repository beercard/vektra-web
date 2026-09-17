"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo, createRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, ArrowRight, ShieldCheck, Headset, TrendingUp } from "lucide-react"
import { LatestWorks } from "@/components/sections/latest-works"

import { allProjects } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

// SEO optimized data for Tienda Online
const marqueeItems = [
  { text: "Tienda online profesional", highlight: true },
  { text: "vende tus productos las 24 horas del día, los 7 días de la semana" },
  { text: "WooCommerce", highlight: true },
  { text: "la plataforma de e-commerce más utilizada del mundo" },
  { text: "Shopify", highlight: true },
  { text: "solución escalable para tu negocio online" },
  { text: "Tiendanube", highlight: true },
  { text: "la plataforma líder de e-commerce en Argentina y Latinoamérica" },
  { text: "Pasarelas de pago", highlight: true },
  { text: "MercadoPago, PayPal, Stripe y más" },
  { text: "Gestión de inventario", highlight: true },
  { text: "control total de tu stock y productos" },
  { text: "Envíos automatizados", highlight: true },
  { text: "integración con Correo Argentino, Andreani y OCA" },
]

const servicesIncluded = [
  { title: "Hosting + dominio", description: "Contratación del alojamiento web optimizado para e-commerce y registro del dominio. Nos encargamos de contratar el hosting que soporte el tráfico de tu tienda online." },
  { title: "Catálogo de productos", description: "Carga y configuración de todos tus productos con imágenes optimizadas, descripciones, precios, variantes (tallas, colores) y gestión de stock automática." },
  { title: "Pasarelas de pago", description: "Integración con MercadoPago, PayPal, Stripe y transferencia bancaria. Tus clientes podrán pagar con tarjetas de crédito, débito y otros medios de pago." },
  { title: "Gestión de envíos", description: "Configuración de zonas de envío, tarifas por peso/precio y seguimiento de pedidos. Integración con Correo Argentino, Andreani, OCA y retiro en local." },
  { title: "Carrito optimizado", description: "Proceso de compra simplificado en pocos pasos para maximizar las conversiones. Recuperación de carritos abandonados por email." },
  { title: "Panel de administración", description: "Gestión completa de pedidos, clientes, productos e inventario desde un panel intuitivo. Reportes de ventas y estadísticas." },
  { title: "Cupones y descuentos", description: "Sistema de cupones de descuento, ofertas por tiempo limitado, precios mayoristas y programas de fidelización para tus clientes." },
  { title: "WhatsApp Business", description: "Botón de WhatsApp para consultas rápidas y notificaciones automáticas de pedidos a tu celular." },
  { title: "Optimización SEO", description: "SEO On Page para productos y categorías. URLs amigables, meta descripciones y schema markup para aparecer en Google Shopping." },
  { title: "Emails automáticos", description: "Confirmación de pedido, seguimiento de envío, factura automática y emails de recuperación de carritos abandonados." },
  { title: "Capacitación completa", description: "Te enseñamos a gestionar productos, pedidos, envíos y promociones de forma autónoma. Incluye manual de uso personalizado." },
  { title: "Soporte técnico", description: "Incluido durante el primer mes. Soporte para resolver dudas y ajustes post-lanzamiento de tu tienda online." },
]

const technologies = [
  { name: "WooCommerce", image: "https://cdn.simpleicons.org/woocommerce/000000" },
  { name: "Shopify", image: "https://cdn.simpleicons.org/shopify/000000" },
  { name: "WordPress", image: "https://cdn.simpleicons.org/wordpress/000000" },
  { name: "MercadoPago", image: "https://cdn.simpleicons.org/mercadopago/000000" },
  { name: "Stripe", image: "https://cdn.simpleicons.org/stripe/000000" },
  { name: "PayPal", image: "https://cdn.simpleicons.org/paypal/000000" },
]

const processSteps = [
  { step: "01", title: "Análisis", subtitle: "del proyecto", description: "Primera reunión donde analizamos tu catálogo de productos, tu público objetivo, competencia y objetivos de venta.", highlight: "Definimos el diseño, funcionalidades y estrategia de lanzamiento." },
  { step: "02", title: "Diseño y", subtitle: "desarrollo", description: "Creamos el diseño de tu tienda online adaptado a tu marca. Configuramos productos, pasarelas de pago, envíos y todas las funcionalidades.", highlight: null },
  { step: "03", title: "Revisión", subtitle: "y ajustes", description: "Te mostramos la tienda terminada para que hagas pedidos de prueba. Verificamos pagos, envíos y proceso de compra completo.", highlight: null },
  { step: "04", title: "Lanzamiento", subtitle: "y ventas", description: "Publicamos tu tienda y te ayudamos con la estrategia de marketing inicial.", highlight: "El objetivo: generar tus primeras ventas desde el día uno." },
]

const ecommerceStats = [
  { value: 10, prefix: "+", suffix: "", label: "Años de experiencia en e-commerce" },
  { value: 50, prefix: "+", suffix: "", label: "Tiendas online creadas" },
  { value: 45, prefix: "+", suffix: "", label: "Reseñas 5 estrellas" },
  { value: 2, prefix: "", suffix: "", label: "Países (Argentina y Paraguay)" },
]

const ecommerceFaqs = [
  { question: "¿Cuánto cuesta crear una tienda online en Argentina?", answer: "Los precios varían según la complejidad. Una tienda online básica con hasta 50 productos comienza desde $450.000 ARS. Tiendas más grandes con funcionalidades avanzadas tienen presupuestos personalizados. Contáctanos para una cotización sin compromiso." },
  { question: "¿Qué plataforma usan para crear tiendas online?", answer: "Trabajamos con WooCommerce (WordPress) por su flexibilidad, Shopify para soluciones rápidas y escalables, y Tiendanube que es la plataforma líder en Argentina y Latinoamérica. Te asesoramos sobre la mejor opción según tu negocio, presupuesto y objetivos." },
  { question: "¿Cuánto tiempo tarda en estar lista mi tienda online?", answer: "Una tienda online básica puede estar lista en 3-4 semanas. Proyectos más complejos con muchos productos, integraciones especiales o diseño personalizado pueden tardar entre 6-10 semanas." },
  { question: "¿Qué pasarelas de pago puedo integrar?", answer: "Integramos MercadoPago (la más usada en Argentina), PayPal, Stripe, transferencia bancaria y pago contra entrega. Puedes ofrecer múltiples opciones de pago a tus clientes." },
  { question: "¿Cómo funciona la gestión de envíos?", answer: "Configuramos zonas de envío con tarifas por peso o precio. Integramos con Correo Argentino, Andreani, OCA y opción de retiro en local. Tus clientes ven el costo de envío antes de pagar." },
  { question: "¿Puedo gestionar mi tienda sin conocimientos técnicos?", answer: "Sí, te entregamos la tienda con un panel de administración muy intuitivo. Te brindamos capacitación completa para que puedas agregar productos, gestionar pedidos, aplicar descuentos y más." },
  { question: "¿La tienda funciona en celulares?", answer: "Sí, todas las tiendas son 100% responsive. El proceso de compra está optimizado para celulares, que es donde se realizan la mayoría de las compras online actualmente." },
  { question: "¿Ofreces mantenimiento para tiendas online?", answer: "Sí, incluimos soporte técnico durante el primer mes. Luego ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, copias de seguridad, monitoreo y soporte continuo." },
]

const complementos = [
  {
    title: "Mantenimiento e-commerce",
    subtitle: "Tu tienda protegida y actualizada",
    items: ["Actualizaciones de WooCommerce", "Copias de seguridad diarias", "Monitoreo de seguridad", "Actualización de productos", "Soporte técnico prioritario", "Optimización de velocidad"],
    href: "/servicios/mantenimiento-web",
    icon: ShieldCheck
  },
  {
    title: "Soporte técnico",
    subtitle: "Soluciones para tu tienda",
    items: ["Problemas con pasarelas de pago", "Configuración de envíos", "Nuevas funcionalidades", "Migración de tienda", "Integraciones con sistemas", "Optimización de conversiones"],
    href: "/servicios/soporte-tecnico",
    icon: Headset
  },
  {
    title: "Marketing para e-commerce",
    subtitle: "Aumenta tus ventas online",
    items: ["Meta Ads", "Google Shopping", "Email marketing automatizado", "SEO para productos", "Remarketing", "Estrategia de lanzamiento"],
    href: "/servicios/marketing-digital",
    icon: TrendingUp
  },
]

interface TiendaOnlineClientProps {
  testimonials: Testimonial[]
}

export default function TiendaOnlineClient({ testimonials }: TiendaOnlineClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "", privacy: false })
  const ecommerceStatsRefs = useMemo(() => ecommerceStats.map(() => createRef<HTMLDivElement>()), [])
  const [ecommerceStatsCounts, setEcommerceStatsCounts] = useState(() => ecommerceStats.map(() => 0))
  const [ecommerceStatsVisible, setEcommerceStatsVisible] = useState(() => ecommerceStats.map(() => false))
  const [ecommerceStatsStarted, setEcommerceStatsStarted] = useState(() => ecommerceStats.map(() => false))

  useEffect(() => {
    const observers = ecommerceStatsRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEcommerceStatsVisible((prev) => {
              if (prev[index]) return prev
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        },
        { threshold: 0.1 }
      )

      if (ref.current) observer.observe(ref.current)

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [ecommerceStatsRefs])

  useEffect(() => {
    ecommerceStatsVisible.forEach((visible, index) => {
      if (!visible || ecommerceStatsStarted[index]) return
      setEcommerceStatsStarted((prev) => {
        if (prev[index]) return prev
        const next = [...prev]
        next[index] = true
        return next
      })
      const end = ecommerceStats[index].value
      const duration = 2000
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setEcommerceStatsCounts((prev) => {
          const next = [...prev]
          next[index] = Math.floor(progress * end)
          return next
        })
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    })
  }, [ecommerceStatsVisible, ecommerceStatsStarted])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-20 lg:py-28 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 min-h-[70vh]">
            <div className="space-y-6">
              <p className="text-white text-base sm:text-lg flex items-center gap-2">
                <span className="text-2xl">👋</span> Somos Vektra
              </p>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Expertos en{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">tiendas online</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}con{" "}
                <span className="font-extrabold">WooCommerce</span>,{" "}
                <span className="font-extrabold">Shopify</span> y{" "}
                <span className="font-extrabold">Tiendanube</span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">
                  en Argentina y Paraguay
                </span>
              </h1>
              
              <p className="text-white/80 text-base sm:text-lg max-w-xl">
                Desarrollamos tiendas online profesionales para que puedas{" "}
                <strong className="text-white">vender tus productos 24/7</strong> en{" "}
                <strong className="text-white">Argentina y Paraguay</strong>
              </p>

              <p className="text-[#00DEC7] text-base sm:text-lg">
                <strong>Objetivo:</strong> más ventas, más clientes y tu negocio online funcionando
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="/contacto">¿Hablamos?</Link>
                </Button>
                
                <div className="flex items-center gap-3">
                  <svg className="h-10 w-10" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">Google</span>
                      <span className="text-white text-sm">5.0</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/60 text-xs">+45 reseñas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative w-full h-[500px] flex items-center justify-center">
                <div className="w-80 h-80 bg-[#00DEC7]/20 rounded-full flex items-center justify-center">
                  <svg className="w-40 h-40 text-[#00DEC7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10 bg-black py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-4 text-sm">
                {item.highlight ? (
                  <strong className="text-[#00DEC7]">{item.text}:</strong>
                ) : (
                  <span className="text-white">{item.text}</span>
                )}
                <span className="mx-4 text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section - Cyan Background */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Tu tienda online en Argentina y Paraguay,<br />
              lista para vender
            </h2>
            <p className="mt-6 text-black/80 text-base sm:text-lg">
              Tendrás una <strong className="text-black">tienda online profesional</strong> con todo lo necesario para{" "}
              <strong className="text-black">vender tus productos</strong> y{" "}
              <strong className="text-black">gestionar tu negocio</strong> de forma autónoma. Sin comisiones por ventas.
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
            {servicesIncluded.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black">
                    <svg className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
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

          <div className="mt-16 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-black">
              Consúltanos <span className="font-normal">sin compromiso</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              Si querés <strong className="text-black">vender online en Argentina o Paraguay</strong>, podemos ayudarte a crear la tienda perfecta para tu negocio.
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Objetivo
            </h2>
            <p className="mt-6 text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Vender online y aumentar tus ingresos</strong>. 4 pasos para crear una tienda online profesional que genere{" "}
              <strong className="text-white font-bold">ventas reales desde el primer día</strong>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
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
        projects={allProjects.filter(p => p.category === "tienda-online")} 
        title="Tiendas Online Destacadas" 
        subtitle="E-COMMERCE" 
        viewAllLink="/trabajos?category=tienda-online"
      />

      {/* Trayectoria Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Trayectoria profesional<br />
              respaldada por resultados
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              A lo largo de estos años como <span className="text-white">equipo experto en e-commerce</span>, 
              hemos trabajado con clientes en <span className="text-white">Argentina y Paraguay</span> que avalan nuestra experiencia y compromiso. 
              Los siguientes datos reflejan el <span className="text-white">crecimiento</span> y la confianza 
              que nuestros clientes han depositado en nosotros.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {ecommerceStats.map((stat, index) => (
              <div key={index} ref={ecommerceStatsRefs[index]}>
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {stat.prefix}{ecommerceStatsCounts[index]}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials items={testimonials} category="tienda-online" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-[0.3em] text-sm">TIENDAS ONLINE & E-COMMERCE</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ecommerceFaqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <span className="text-[#00DEC7] shrink-0">
                    {openFaq === index ? <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17L7.41 12L6 13.41L12 19.41V24h2v-4.59l5.59-5.59z"/></svg> : <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m8-8H4"/></svg>}
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

          <div className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              ¿Tenés alguna otra duda?
            </h3>
            <p className="mt-2 text-gray-400">
              Contactá con nosotros <span className="font-semibold text-white">sin compromiso</span>
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
            <div className="hidden lg:flex items-center justify-center">
              <svg className="w-96 h-96" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="250" r="120" fill="#f0f0f0"/>
                <rect x="160" y="100" width="80" height="150" rx="10" fill="#00DEC7"/>
                <rect x="170" y="110" width="60" height="80" rx="5" fill="white"/>
                <circle cx="200" cy="225" r="8" fill="white"/>
                <path d="M140 280 L120 320 L160 300 Z" fill="#00DEC7"/>
                <path d="M260 280 L280 320 L240 300 Z" fill="#00DEC7"/>
                <circle cx="200" cy="60" r="20" fill="#1a1a1a"/>
                <rect x="180" y="80" width="40" height="30" fill="#1a1a1a"/>
              </svg>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-black text-center">
                  ¿List@ para empezar a vender online?
                </h2>
              </div>

              <p className="text-center text-gray-600 mb-2">
                Consúltanos <span className="font-semibold text-black">sin compromiso</span>
              </p>
              <p className="text-center text-gray-500 text-sm mb-8">
                Escribinos a{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                o envíanos el siguiente formulario y <span className="font-semibold">te responderemos en menos de 24 horas</span>.
              </p>

              <form className="space-y-4">
                <div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Nombre *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2"/>
                      <path d="M3 8l9 6 9-6"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-400">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2"/>
                      <path d="M3 8l9 6 9-6"/>
                    </svg>
                  </span>
                  <textarea
                    placeholder="Mensaje *"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7] resize-none"
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    He leído y acepto la{" "}
                    <a href="/politica-de-privacidad" className="underline">política de privacidad</a>
                  </label>
                </div>

                <div className="text-center pt-4">
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
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementos</h2>
            <p className="mt-2 text-black/60 uppercase tracking-[0.3em] text-sm">TAMBIÉN TE PUEDE INTERESAR</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementos.map((service) => (
              <Link href={service.href} key={service.title} className="block bg-white/20 backdrop-blur border border-black/5 p-8 rounded-2xl hover:bg-white/40 transition-colors group">
                 <div className="h-12 w-12 bg-black/10 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="h-6 w-6 text-black" />
                 </div>
                 <h3 className="text-xl font-bold text-black mb-2">{service.title}</h3>
                 <p className="text-sm text-black/70 mb-4">{service.subtitle}</p>
                 <div className="flex items-center gap-2 font-semibold text-black group-hover:underline">
                    Ver más <ArrowRight className="h-4 w-4" />
                 </div>
              </Link>
             ))}
          </div>
        </div>
      </section>
    </>
  )
}
