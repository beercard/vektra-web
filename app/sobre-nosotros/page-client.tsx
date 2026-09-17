"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronLeft,
  ChevronRight,
  Star,
  Mail,
  Linkedin,
  Instagram,
  Code,
  Megaphone,
  Cpu,
  Smartphone,
  GraduationCap,
  Award,
  Globe
} from "lucide-react"

// Testimonios variados de todos los servicios
const testimonials = [
  {
    name: "Carolina Mendez",
    company: "Boutique Elegante - Buenos Aires",
    image: "/images/testimonials/testimonial-1.jpg",
    text: "Martín y Matías son un equipo increíble. Me crearon la tienda online con WooCommerce y las campañas de Google Ads. En 3 meses dupliqué mis ventas en Argentina.",
    rating: 5,
  },
  {
    name: "Roberto Fernández",
    company: "Clínica Dental Sonrisas - Asunción",
    image: "/images/testimonials/testimonial-2.jpg",
    text: "El chatbot de WhatsApp que desarrollaron es espectacular. Ahora mis pacientes en Paraguay pueden agendar turnos las 24 horas automáticamente.",
    rating: 5,
  },
  {
    name: "Lucía Paredes",
    company: "Estudio Jurídico LP - Resistencia",
    image: "/images/testimonials/testimonial-3.jpg",
    text: "La web corporativa es exactamente lo que necesitaba. Profesional, elegante y el SEO ya me está trayendo clientes nuevos del Chaco y toda la región.",
    rating: 5,
  },
  {
    name: "Diego Ramírez",
    company: "Fitness Pro Gym - Corrientes",
    image: "/images/testimonials/testimonial-4.jpg",
    text: "La app móvil para mi gimnasio superó todas mis expectativas. Mis clientes pueden ver horarios, reservar clases y pagar todo desde el celular.",
    rating: 5,
  },
  {
    name: "Valentina Torres",
    company: "Agencia de Viajes Aventura - Ciudad del Este",
    image: "/images/testimonials/testimonial-5.jpg",
    text: "Las campañas de Meta Ads e Instagram que maneja Vektra me trajeron un 300% más de consultas desde Paraguay y Argentina. Muy profesionales.",
    rating: 5,
  },
]

// Stats generales de toda la agencia
const stats = [
  { value: "+8", label: "Años de experiencia" },
  { value: "+150", label: "Proyectos completados" },
  { value: "+45", label: "Reseñas 5 estrellas" },
  { value: "2", label: "Idiomas de atención" },
]

export default function SobreNosotrosClient() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [counters, setCounters] = useState(stats.map(() => 0))
  const statsRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Animate counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          stats.forEach((stat, index) => {
            const target = Number.parseInt(stat.value.replace(/\D/g, ""))
            const duration = 2000
            const steps = 60
            const increment = target / steps
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters((prev) => {
                const newCounters = [...prev]
                newCounters[index] = Math.floor(current)
                return newCounters
              })
            }, duration / steps)
          })
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      {/* Hero Section - Banner Angosto */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero1.webp"
          alt="Vektra - Agencia de desarrollo web, apps y agentes IA para todo el mundo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Sobre <span className="text-[#00DEC7]">Nosotros</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Conocé al equipo detrás de Vektra: expertos en desarrollo web, marketing digital e inteligencia artificial para empresas de todo el mundo
          </p>
        </div>
      </section>

      {/* Introduccion - Quienes Somos */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Martin */}
            <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#00DEC7]/10 hover:-translate-y-1 group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-40 h-40 rounded-xl overflow-hidden relative bg-gray-200 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg">
                    <Image
                      src="/images/staff/Martin Garcia.JPG"
                      alt="Martin Garcia - Licenciado en Marketing Digital"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">Martin Garcia</h2>
                  <p className="text-[#00DEC7] font-medium mb-3">Licenciado en Marketing Digital</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Link href="https://www.linkedin.com/in/martinlgarcia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://es.fiverr.com/users/martingarcia508/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1dbf73] transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.707 9.878h-2.784v-1.12c0-1.28.618-1.574 1.348-1.574.628 0 1.033.303 1.033.303l.663-2.618s-.82-.472-2.123-.472c-2.505 0-3.695 1.54-3.695 3.966v1.516h-2.438v2.798h2.438v8.663h3.556v-8.663h2.64l.36-2.798zm-9.01 11.46h-3.55V9.879h3.55v11.46zm-1.77-13.044c1.135 0 1.91-.798 1.91-1.854 0-1.09-.764-1.854-1.921-1.854-1.146 0-1.91.764-1.91 1.854 0 1.056.775 1.854 1.921 1.854zm-8.663 13.045h3.55V9.879H2.264v11.46z"/>
                      </svg>
                    </Link>
                    <Link href="https://www.behance.net/martinlgarcia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1769ff] transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 7h-5v3h5V7zM6.2 12.5c1.9 0 3 .6 3.6 1.7.4.7.5 1.6.5 2.5 0 1.9-1.1 3.4-2.9 4.1.7.5 1.2 1.2 1.2 2.1 0 2-1.6 3.1-4 3.1H0V7h4.8c2.1 0 3.8 1.1 3.8 3.3 0 1.1-.5 1.9-1.4 2.2zM2.8 9.5v4h1.7c1.1 0 1.7-.5 1.7-1.5 0-1.2-.6-1.6-1.8-1.6H2.8zm0 6.5v4.5h2c1.3 0 2-.6 2-1.8 0-1.2-.6-1.8-2-1.8h-2z"/>
                      </svg>
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Google Ads</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Meta Ads</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">TikTok Ads</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">SEO</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">WordPress</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">WooCommerce</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Tiendanube</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Shopify</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Recibido en 2021</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  Martin es el cerebro estratégico detrás de las campañas de marketing digital de Vektra. Con su licenciatura en Marketing Digital y años de experiencia gestionando publicidad en <strong>Google Ads, Meta Ads y TikTok Ads</strong>, ha ayudado a decenas de empresas de <strong>todo el mundo</strong> a aumentar sus ventas online.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Además, forma parte del equipo de expertos en <strong>diseño web con WordPress, WooCommerce, Tiendanube y Shopify</strong>, creando tiendas online optimizadas para conversión y posicionamiento en buscadores. Su conocimiento profundo del ecosistema de Google (Analytics, Search Console, Tag Manager, My Business) permite ofrecer estrategias integrales de marketing digital.
                </p>
              </div>
            </div>

            {/* Matias */}
            <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#00DEC7]/10 hover:-translate-y-1 group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-40 h-40 rounded-xl overflow-hidden relative bg-gray-200 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg">
                    <Image
                      src="/images/staff/Matias Garcia.jpeg"
                      alt="Matias Garcia - Analista en Sistemas"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">Matias Garcia</h2>
                  <p className="text-[#00DEC7] font-medium mb-3">Analista en Sistemas</p>

                  <div className="flex items-center gap-3 mb-4">
                    <Link href="https://www.linkedin.com/in/matias-luciano-garcia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://github.com/matiaslgarcia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Next.js</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">React</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Node.js</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Agentes IA</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Chatbots</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Apps Mobile</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">React Native</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Flutter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Award className="h-4 w-4" />
                    <span>Especialista en IA y Automatización</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  Matias es el experto técnico de Vektra, especializado en <strong>desarrollo web moderno con Next.js, React y Node.js</strong>. Como Analista en Sistemas, ha desarrollado soluciones tecnológicas avanzadas para empresas de <strong>todo el mundo</strong>, desde aplicaciones web hasta sistemas complejos.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Su pasión por la <strong>inteligencia artificial</strong> lo llevó a especializarse en el desarrollo de <strong>agentes y bots de IA, chatbots para WhatsApp</strong> y automatizaciones empresariales. También integra el equipo de expertos en <strong>desarrollo de aplicaciones móviles</strong> con React Native y Flutter, creando apps nativas para iOS y Android.
                </p>
              </div>
            </div>
          </div>

          {/* Vektra Description */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Somos <span className="text-[#00DEC7]">Vektra</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              En Vektra fusionamos <strong>ingeniería de software de alto nivel</strong> con <strong>estrategias de marketing digital</strong>, creando narrativas visuales y productos tecnológicos que impulsan el éxito de tu marca. Somos dos hermanos apasionados por la tecnología y el emprendimiento, comprometidos en ayudar a empresas de <strong>todo el mundo</strong> a crecer en el mundo digital.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="h-4 w-4 text-[#00DEC7]" />
                <span>info@vektra.digital</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Globe className="h-4 w-4 text-[#00DEC7]" />
                <span>Todo el mundo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Objetivo */}
      <section className="relative py-16 bg-black overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7] shadow-[0_0_20px_rgba(0,222,199,0.5)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7] shadow-[0_0_20px_rgba(0,222,199,0.5)]" />
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-5xl px-4 lg:px-8 text-center relative">
          <p className="text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed">
            &ldquo;Nuestro objetivo es que nuestros clientes puedan poner en marcha su negocio o proyecto digital para que puedan <span className="text-[#00DEC7] font-semibold animate-pulse" style={{ animationDuration: '3s' }}>ofrecer sus servicios</span> o <span className="text-[#00DEC7] font-semibold animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>vender sus productos online</span> en cualquier parte del mundo&rdquo;
          </p>
        </div>
      </section>

      {/* Es hora de Emprender */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Es hora de<br />
                <span className="text-[#00DEC7]">Emprender</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                El mundo está viviendo un momento histórico para el emprendimiento digital. Con el crecimiento exponencial del comercio electrónico post-pandemia, cada vez más consumidores prefieren comprar online sin importar el país. Las barreras de entrada nunca fueron tan bajas.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                El e-commerce a nivel global no deja de crecer, y cada vez son más los mercados digitales que se consolidan como motores de esta expansión. Es el momento perfecto para digitalizar tu negocio y llegar a miles de clientes potenciales en cualquier parte del mundo.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed italic">
                &ldquo;Afrontamos cada proyecto con gran ilusión y muchas ganas de demostrar nuestra profesionalidad, con trabajos atractivos y efectivos para que vos como cliente obtengas <strong className="text-black">más contactos, más ventas y consigas tus metas</strong>.&rdquo;
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/about/emprender.jpg"
                alt="Es hora de emprender a nivel mundial - Vektra agencia digital"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trayectoria Profesional */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Trayectoria profesional<br />
              respaldada por resultados
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              A lo largo de estos años como agencia digital para clientes de todo el mundo, hemos trabajado con proyectos que avalan nuestra experiencia y compromiso. Los siguientes datos reflejan el crecimiento y la confianza que nuestros clientes han depositado en Vektra.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center md:text-left p-6 rounded-2xl transition-all duration-500 hover:bg-white/5 group"
              >
                <span className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white transition-all duration-300 group-hover:text-[#00DEC7] ${hasAnimated ? 'animate-number-flash' : ''}`}>
                  {stat.value.includes("+") ? "+" : ""}
                  {counters[index]}
                </span>
                <p className="mt-2 text-gray-400 group-hover:text-white transition-colors duration-300">{stat.label}</p>
                {/* Decorative line */}
                <div className="mt-4 h-1 bg-[#00DEC7]/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-[#00DEC7] transition-all duration-1000 ease-out ${hasAnimated ? 'w-full' : 'w-0'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            {/* Left side - Title and Google badge */}
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Qué opinan<br />
                <span className="text-[#00DEC7]">de nosotros</span>
              </h2>
              <p className="mt-4 text-gray-600">
                Testimonios reales de clientes de todo el mundo que confiaron en Vektra para sus proyectos digitales.
              </p>
              
              {/* Google Reviews Badge */}
              <div className="mt-8 inline-flex items-center gap-4 bg-gray-50 rounded-xl px-6 py-4">
                <svg className="h-12 w-12" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-2xl text-black">5.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">+45 reseñas en Google</p>
                </div>
              </div>
            </div>

            {/* Right side - Testimonial carousel */}
            <div className="lg:w-2/3">
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                  <div className="flex mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#00DEC7] flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-black">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-gray-500">{testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentTestimonial ? "bg-[#00DEC7] w-6" : "bg-gray-300"
                        }`}
                        aria-label={`Ver testimonio ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full border border-gray-300 hover:border-[#00DEC7] hover:text-[#00DEC7] transition-colors"
                      aria-label="Testimonio anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full border border-gray-300 hover:border-[#00DEC7] hover:text-[#00DEC7] transition-colors"
                      aria-label="Siguiente testimonio"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact Form */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                Hablemos de tu<br />proyecto digital
              </h2>
              <p className="mt-6 text-black/80 text-lg leading-relaxed">
                Contanos sobre tu negocio y tus objetivos. Te asesoramos sin compromiso sobre la mejor solución digital para vos, ya sea desarrollo web, tienda online, app móvil, marketing digital o automatización con IA.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-black">
                  <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="font-medium">info@vektra.digital</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="nombre" className="text-black font-medium">Nombre *</Label>
                  <Input id="nombre" placeholder="Tu nombre" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="email" className="text-black font-medium">Email *</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="servicio" className="text-black font-medium">Servicio que te interesa</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Desarrollo Web</SelectItem>
                      <SelectItem value="tienda">Tienda Online</SelectItem>
                      <SelectItem value="app">App Móvil</SelectItem>
                      <SelectItem value="marketing">Marketing Digital</SelectItem>
                      <SelectItem value="ia">Agentes y Bots IA</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mensaje" className="text-black font-medium">Mensaje</Label>
                  <Textarea id="mensaje" placeholder="Contanos sobre tu proyecto..." className="mt-1 min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-black/90 rounded-full">
                  Enviar consulta
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Al enviar aceptas nuestra política de privacidad. Respondemos en menos de 24 horas.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
