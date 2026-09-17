"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import { allProjects, type Project } from "@/app/trabajos/data"
import { useLanguage } from "@/lib/i18n"
import { type Dictionary } from "@/lib/dictionaries"

interface FooterProps {
  dict?: Dictionary
}

const fallbackTrabajosDestacados = [
  { name: "Tienda Online Muebles del Norte", href: "/trabajos/muebles-del-norte" },
  { name: "Web Estudio Jurídico Pérez", href: "/trabajos/estudio-juridico-perez" },
  { name: "App Turnos Médicos ClinicApp", href: "/trabajos/clinicapp" },
  { name: "Chatbot WhatsApp Inmobiliaria", href: "/trabajos/inmobiliaria-sur-bot" },
  { name: "E-commerce Deportes Extremos", href: "/trabajos/deportes-extremos" },
  { name: "Landing Page SaaS TechFlow", href: "/trabajos/techflow-landing" },
  { name: "App Delivery Sabores del Chaco", href: "/trabajos/sabores-del-chaco" },
  { name: "Web Restaurante Asunción Grill", href: "/trabajos/asuncion-grill" },
  { name: "Agente IA Soporte Técnico", href: "/trabajos/soporte-tecnico-ia" },
]

const websPorSectores = [
  { name: "Diseño Web para Restaurantes", href: "/trabajos?categoria=gastronomia" },
  { name: "Diseño Web para Hoteles", href: "/trabajos?categoria=turismo" },
  { name: "Diseño Web para Inmobiliarias", href: "/trabajos?categoria=inmobiliarias" },
  { name: "Diseño Web para Abogados", href: "/trabajos?categoria=profesionales" },
  { name: "Diseño Web para Médicos", href: "/trabajos?categoria=salud" },
  { name: "Diseño Web para Gimnasios", href: "/trabajos?categoria=fitness" },
  { name: "Diseño Web para Tiendas de Ropa", href: "/trabajos?categoria=moda" },
  { name: "Diseño Web para Constructoras", href: "/trabajos?categoria=construccion" },
  { name: "Diseño Web para Clínicas", href: "/trabajos?categoria=salud" },
  { name: "Diseño Web para Concesionarios", href: "/trabajos?categoria=automotriz" },
  { name: "Diseño Web para Contadores", href: "/trabajos?categoria=profesionales" },
  { name: "Diseño Web para Empresas", href: "/trabajos?categoria=corporativo" },
]

const servicios = [
  { name: "Diseño Web Profesional", href: "/servicios/diseno-web" },
  { name: "Tienda Online / E-commerce", href: "/servicios/tienda-online" },
  { name: "Aplicaciones Móviles", href: "/servicios/apps" },
  { name: "Agentes y Bots IA", href: "/servicios/agentes-ia" },
  { name: "Marketing Digital", href: "/servicios/marketing-digital" },
  { name: "SEO y Posicionamiento", href: "/servicios/seo" },
]

const herramientas = [
  { name: "Calculadora de Ads", href: "/herramientas/calculadora-ads" },
]

const ubicacionesArgentina = [
  "Buenos Aires", "Resistencia", "Corrientes", "Córdoba", "Rosario", 
  "Mendoza", "Tucumán", "Salta", "Santa Fe", "Mar del Plata"
]

const ubicacionesParaguay = [
  "Asunción", "Ciudad del Este", "Encarnación", "San Lorenzo", "Luque"
]

const seoKeywords = [
  "Desarrollo Web Argentina", "Diseño Web Paraguay", "Tienda Online Argentina",
  "E-commerce Paraguay", "Apps Móviles Argentina", "Agentes IA", "Chatbots WhatsApp",
  "Bots de Atención", "Marketing Digital Argentina", "SEO Argentina", "SEO Paraguay",
  "Desarrollo Web Resistencia", "Desarrollo Web Asunción", "Páginas Web Profesionales",
  "WordPress Argentina", "WooCommerce Paraguay", "Next.js", "React", "Node.js",
  "Automatización de Procesos", "Inteligencia Artificial", "Machine Learning",
  "Google Ads Argentina", "Meta Ads", "Publicidad Digital",
  "Posicionamiento Web", "Landing Pages", "Sistemas Web", "Apps Empresariales"
]

const parseDate = (value?: string) => {
  if (!value) return null
  const [day, month, year] = value.split(".")
  if (!day || !month || !year) return null
  return new Date(Number(year), Number(month) - 1, Number(day))
}

const scoreProject = (project: Project) => (project.searchVolume ?? 0) * 3 + (project.views ?? 0)

export function Footer({ dict }: FooterProps) {
  const [projectItems, setProjectItems] = useState<Project[]>(allProjects)
  const { t: contextT, language } = useLanguage()
  const t = dict || contextT
  const isEn = language === "en"

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/content")
        if (!response.ok) return
        const data = await response.json()
        if (Array.isArray(data?.projects) && data.projects.length) {
          setProjectItems(data.projects)
        }
      } catch {
        return
      }
    }

    loadContent()
  }, [])

  const featuredProjects = useMemo(() => {
    const sorted = [...projectItems].sort((a, b) => {
      const scoreDiff = scoreProject(b) - scoreProject(a)
      if (scoreDiff !== 0) return scoreDiff
      const dateA = parseDate(a.date)?.getTime() ?? 0
      const dateB = parseDate(b.date)?.getTime() ?? 0
      return dateB - dateA
    })
    return sorted.slice(0, 10)
  }, [projectItems])

  const servicesLinks = [
    { name: t.header.webDev, href: isEn ? "/en/services/web-design" : "/servicios/diseno-web" },
    { name: t.header.ecommerce, href: isEn ? "/en/services/online-store" : "/servicios/tienda-online" },
    { name: t.header.apps, href: isEn ? "/en/services/apps" : "/servicios/apps" },
    { name: t.header.aiAgents, href: isEn ? "/en/services/ai-agents" : "/servicios/agentes-ia" },
    { name: t.header.marketing, href: isEn ? "/en/services/digital-marketing" : "/servicios/marketing-digital" },
    { name: t.header.seo || "SEO", href: isEn ? "/en/services/seo" : "/servicios/seo" },
    { name: isEn ? "Web Maintenance" : "Mantenimiento Web", href: isEn ? "/en/services/web-maintenance" : "/servicios/mantenimiento-web" },
    { name: isEn ? "Technical Support" : "Soporte Técnico", href: isEn ? "/en/services/technical-support" : "/servicios/soporte-tecnico" },
    { name: isEn ? "UI/UX Design" : "Diseño UI/UX", href: isEn ? "/en/services/ui-ux-design" : "/servicios/diseno-ui-ux" },
    { name: isEn ? "Automation" : "Automatización", href: isEn ? "/en/services/automation" : "/servicios/automatizacion" },
  ]

  const websPorSectores = [
    { name: isEn ? "Web Design for Restaurants" : "Diseño Web para Restaurantes", href: isEn ? "/en/portfolio?q=restaurante" : "/trabajos?q=restaurante" },
    { name: isEn ? "Web Design for Hotels" : "Diseño Web para Hoteles", href: isEn ? "/en/portfolio?q=hotel" : "/trabajos?q=hotel" },
    { name: isEn ? "Web Design for Real Estate" : "Diseño Web para Inmobiliarias", href: isEn ? "/en/portfolio?q=inmobiliaria" : "/trabajos?q=inmobiliaria" },
    { name: isEn ? "Web Design for Lawyers" : "Diseño Web para Abogados", href: isEn ? "/en/portfolio?q=abogado" : "/trabajos?q=abogado" },
    { name: isEn ? "Web Design for Doctors" : "Diseño Web para Médicos", href: isEn ? "/en/portfolio?q=medico" : "/trabajos?q=medico" },
    { name: isEn ? "Web Design for Gyms" : "Diseño Web para Gimnasios", href: isEn ? "/en/portfolio?q=fitness" : "/trabajos?q=fitness" },
    { name: isEn ? "Web Design for Clothing Stores" : "Diseño Web para Tiendas de Ropa", href: isEn ? "/en/portfolio?q=ropa" : "/trabajos?q=ropa" },
    { name: isEn ? "Web Design for Construction" : "Diseño Web para Constructoras", href: isEn ? "/en/portfolio?q=constructora" : "/trabajos?q=constructora" },
    { name: isEn ? "Web Design for Clinics" : "Diseño Web para Clínicas", href: isEn ? "/en/portfolio?q=clinica" : "/trabajos?q=clinica" },
    { name: isEn ? "Web Design for Car Dealerships" : "Diseño Web para Concesionarios", href: isEn ? "/en/portfolio?q=autos" : "/trabajos?q=autos" },
  ]

  const toolsLinks = [
    { name: isEn ? "Ads Calculator" : "Calculadora de Ads", href: isEn ? "/en/tools/ads-calculator" : "/herramientas/calculadora-ads" },
    { name: isEn ? "ROI Calculator" : "Calculadora de ROI", href: isEn ? "/en/tools/roi-calculator" : "/herramientas/calculadora-roi" },
  ]

  return (
    <footer className="bg-black text-white" itemScope itemType="https://schema.org/Organization">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href={isEn ? "/en" : "/"} className="flex items-center gap-3" itemProp="url">
              {/* Logo Image */}
              <Image
                src="/logo/logo vektra digital.png"
                alt="Vektra Digital"
                width={50}
                height={50}
                className="h-12 w-auto rounded-lg"
              />
              <div>
                <span className="font-bold text-xl" itemProp="name">
                  <span className="text-white">Vek</span>
                  <span className="text-[#00DEC7]">tra</span>
                </span>
                <p className="text-xs text-gray-400">{t.header.subtitle}</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed" itemProp="description">
              {t.footer.description}
            </p>
            
            {/* Contact Info */}
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@vektra.digital" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#00DEC7] transition-colors" itemProp="email">
                  <Mail className="h-4 w-4 text-[#00DEC7]" />
                  info@vektra.digital
                </a>
              </li>
              
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href="https://www.linkedin.com/company/vektra-digital/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/vektra.digital" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Trabajos Destacados Column */}
          <nav aria-label="Trabajos destacados">
            <h3 className="font-bold text-base mb-4">{t.header.work}</h3>
            <ul className="space-y-2">
              {(featuredProjects.length
                ? featuredProjects.map((project) => ({
                    name: project.title,
                    href: isEn ? `/en/portfolio/${project.slug}` : `/trabajos/${project.slug}`,
                  }))
                : fallbackTrabajosDestacados.map(link => ({
                    ...link,
                    href: isEn ? link.href.replace("/trabajos/", "/en/portfolio/") : link.href
                }))
              ).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#00DEC7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Webs por Sectores Column */}
          <nav aria-label="Webs por sectores">
            <h3 className="font-bold text-base mb-4">{t.footer.webSectors}</h3>
            <ul className="space-y-2">
              {websPorSectores.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#00DEC7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Herramientas Column */}
          <nav aria-label="Herramientas">
            <h3 className="font-bold text-base mb-4">{t.footer.tools}</h3>
            <ul className="space-y-2">
              {toolsLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#00DEC7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios Column */}
          <nav aria-label="Servicios">
            <h3 className="font-bold text-base mb-4">{t.footer.services}</h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#00DEC7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Vektra. {t.footer.rights}
            <br />
            <span className="text-xs text-gray-600">Vektra Digital Solutions S.A.S. — CUIT 30-71955290-7</span>
          </p>
          <div className="flex gap-6">
            <Link href={isEn ? "/en/legal" : "/aviso-legal"} className="text-sm text-gray-500 hover:text-[#00DEC7] transition-colors">
              {t.footer.legal}
            </Link>
            <Link href={isEn ? "/en/privacy-policy" : "/politica-de-privacidad"} className="text-sm text-gray-500 hover:text-[#00DEC7] transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href={isEn ? "/en/cookie-policy" : "/politica-de-cookies"} className="text-sm text-gray-500 hover:text-[#00DEC7] transition-colors">
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
