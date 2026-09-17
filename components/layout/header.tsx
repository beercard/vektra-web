"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Calculator, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n"
import { type Dictionary } from "@/lib/dictionaries"

interface HeaderProps {
  dict?: Dictionary
  lang?: "es" | "en"
}

export function Header({ dict, lang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t: contextT, language: contextLang } = useLanguage()
  
  // Use props if available (Server Component), otherwise fall back to context (Client Component)
  const t = dict || contextT
  const currentLang = lang || contextLang

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: t.header.home, href: currentLang === "en" ? "/en" : "/", underline: true },
    {
      name: t.header.services,
      href: currentLang === "en" ? "/en/services" : "/servicios",
      children: [
        { name: t.header.webDev, href: currentLang === "en" ? "/en/services/web-design" : "/servicios/diseno-web" },
        { name: t.header.ecommerce, href: currentLang === "en" ? "/en/services/online-store" : "/servicios/tienda-online" },
        { name: t.header.apps, href: currentLang === "en" ? "/en/services/apps" : "/servicios/apps" },
        { name: t.header.aiAgents, href: currentLang === "en" ? "/en/services/ai-agents" : "/servicios/agentes-ia" },
        { name: t.header.marketing, href: currentLang === "en" ? "/en/services/digital-marketing" : "/servicios/marketing-digital" },
        { name: t.header.automation, href: currentLang === "en" ? "/en/services/automation" : "/servicios/automatizacion" },
        { name: t.header.uiux, href: currentLang === "en" ? "/en/services/ui-ux-design" : "/servicios/diseno-ui-ux" },
        { name: t.header.maintenance, href: currentLang === "en" ? "/en/services/web-maintenance" : "/servicios/mantenimiento-web" },
        { name: t.header.support, href: currentLang === "en" ? "/en/services/technical-support" : "/servicios/soporte-tecnico" },
      ],
    },
    { name: t.header.work, href: currentLang === "en" ? "/en/portfolio" : "/trabajos" },
    { name: t.header.about, href: currentLang === "en" ? "/en/about-us" : "/sobre-nosotros" },
    { name: t.header.blog, href: currentLang === "en" ? "/en/blog" : "/blog" },
    { name: t.header.contact, href: currentLang === "en" ? "/en/contact" : "/contacto" },
  ]

  const toggleLink = currentLang === "es" ? "/en" : "/"

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-black/95 backdrop-blur-md shadow-md border-b border-white/10" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href={currentLang === "en" ? "/en" : "/"} className="flex items-center gap-3">
          <Image
            src="/logo/logo vektra digital.png"
            alt="Vektra Digital"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl tracking-tight">
              Vek<span className="text-[#00DEC7]">tra</span>
            </span>
            <span className="text-white/60 text-[10px] tracking-widest uppercase">
              {t.header.subtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-6">
          {navigation.map((item) => {
            const isActive = item.href === "/" || item.href === "/en" 
              ? pathname === item.href 
              : pathname?.startsWith(item.href)

            return item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#00DEC7] focus:outline-none ${
                  isActive ? "text-[#00DEC7] underline underline-offset-4 decoration-[#00DEC7] decoration-2" : "text-white"
                }`}>
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-[#1a1a1a] border-[#333] p-0 min-w-[200px]">
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.name}
                      asChild
                      className="text-white px-4 py-3 cursor-pointer transition-all duration-200 rounded-none hover:bg-[#00DEC7] hover:text-black focus:bg-[#00DEC7] focus:text-black"
                    >
                      <Link href={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#00DEC7] ${
                  isActive 
                    ? "text-[#00DEC7] underline underline-offset-4 decoration-[#00DEC7] decoration-2" 
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* CTA Buttons & Language Switch */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white hover:text-[#00DEC7] hover:bg-white/10"
          >
            <Link href={toggleLink}>
              <Globe className="mr-2 h-4 w-4" />
              {currentLang === "es" ? "EN" : "ES"}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#00DEC7] text-[#00DEC7] hover:bg-[#00DEC7] hover:text-black rounded-full px-5 bg-transparent"
          >
            <Link href={currentLang === "en" ? "/en/contacto?asunto=Budget" : "/contacto?asunto=Presupuesto"} className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              {t.header.budget}
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white hover:text-[#00DEC7] hover:bg-white/10"
          >
            <Link 
              href={toggleLink}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${currentLang === "es" ? "en" : "es"}; path=/; max-age=31536000`
              }}
            >
              {currentLang === "es" ? "EN" : "ES"}
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#000000ee] backdrop-blur-md">
          <div className="space-y-1 px-4 pb-6 pt-2">
            {navigation.map((item) => {
              const isActive = item.href === "/" || item.href === "/en" 
                ? pathname === item.href 
                : pathname?.startsWith(item.href)

              return item.children ? (
                <div key={item.name} className="space-y-1">
                  <span className={`block px-3 py-2 text-base font-medium ${isActive ? "text-[#00DEC7]" : "text-white"}`}>
                    {item.name}
                  </span>
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`block px-6 py-2 text-sm ${isChildActive ? "text-[#00DEC7]" : "text-white/70"} hover:text-[#00DEC7]`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium hover:text-[#00DEC7] ${
                    isActive ? "text-[#00DEC7]" : "text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="flex flex-col gap-3 pt-4 px-3">
              <Button
                asChild
                variant="outline"
                className="border-[#00DEC7] text-[#00DEC7] hover:bg-[#00DEC7] hover:text-black rounded-full w-full bg-transparent"
              >
                <Link href={currentLang === "en" ? "/en/contacto?asunto=Budget" : "/contacto?asunto=Presupuesto"} className="flex items-center justify-center gap-2">
                  <Calculator className="h-4 w-4" />
                  {t.header.budget}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
