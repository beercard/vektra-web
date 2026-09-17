"use client"

import React from "react"

import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { type Dictionary } from "@/lib/dictionaries"

interface ServicesProps {
  dict?: Dictionary["services"]
}

const serviceIcons = {
  web: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <rect x="8" y="12" width="64" height="48" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="8" y1="22" x2="72" y2="22" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="17" r="2" fill="currentColor"/>
      <circle cx="22" cy="17" r="2" fill="currentColor"/>
      <circle cx="30" cy="17" r="2" fill="currentColor"/>
      <path d="M20 32L28 40L20 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 32L44 40L36 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="32" y1="32" x2="32" y2="48" stroke="currentColor" strokeWidth="2"/>
      <rect x="50" y="30" width="14" height="4" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="50" y="38" width="14" height="4" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="50" y="46" width="14" height="4" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="24" y="60" width="32" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  store: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <rect x="8" y="8" width="64" height="48" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="8" y1="18" x2="72" y2="18" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="13" r="2" fill="currentColor"/>
      <circle cx="22" cy="13" r="2" fill="currentColor"/>
      <path d="M22 28H58L54 46H26L22 28Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="30" cy="52" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="52" r="3" stroke="currentColor" strokeWidth="2"/>
      <line x1="32" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="2"/>
      <rect x="24" y="62" width="32" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <rect x="8" y="8" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="22" cy="18" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 30V26C16 24 18 22 22 22C26 22 28 24 28 26V30" stroke="currentColor" strokeWidth="2"/>
      <rect x="44" y="8" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
      <polygon points="58,14 62,22 54,22" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="52" y="26" width="12" height="6" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="44" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="50" width="16" height="10" stroke="currentColor" strokeWidth="2"/>
      <line x1="14" y1="64" x2="30" y2="64" stroke="currentColor" strokeWidth="2"/>
      <rect x="44" y="44" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="58" cy="54" r="6" stroke="currentColor" strokeWidth="2"/>
      <rect x="52" y="64" width="12" height="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <rect x="16" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="28" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="48" cy="28" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M28 40C28 40 34 46 40 46C46 46 52 40 52 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="8" x2="40" y2="12" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="6" r="2" fill="currentColor"/>
      <path d="M12 28H16" stroke="currentColor" strokeWidth="2"/>
      <path d="M64 28H68" stroke="currentColor" strokeWidth="2"/>
      <rect x="28" y="52" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="36" y1="60" x2="36" y2="68" stroke="currentColor" strokeWidth="2"/>
      <line x1="44" y1="60" x2="44" y2="68" stroke="currentColor" strokeWidth="2"/>
      <rect x="30" y="68" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="42" y="68" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

interface ServiceCardProps {
  service: {
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    href: string
  }
  moreInfoText: string
}

function ServiceCard({ service, moreInfoText }: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <Link
      href={service.href}
      ref={cardRef}
      className={`relative flex flex-col p-6 rounded-2xl text-center md:text-left transition-all duration-500 ease-out ${
        isHovered
          ? "bg-black text-white scale-[1.02] shadow-2xl shadow-black/30 -translate-y-2"
          : "bg-transparent"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated circle that follows mouse */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-200 hidden md:block z-10"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: 40,
            height: 40,
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      )}

      {/* Icon */}
      <div className={`mb-6 flex justify-center md:justify-start transition-all duration-500 ${
        isHovered ? "text-[#00DEC7] scale-110" : "text-black"
      }`}>
        {service.icon}
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
        isHovered ? "text-white" : "text-black"
      }`}>
        {service.title}
      </h3>

      {/* Subtitle */}
      <p className={`font-semibold mb-3 leading-snug transition-colors duration-500 ${
        isHovered ? "text-white/90" : "text-black"
      }`}>
        {service.subtitle}
      </p>

      {/* Description */}
      <p className={`text-sm mb-4 flex-grow transition-colors duration-500 ${
        isHovered ? "text-white/70" : "text-black/70"
      }`}>
        {service.description}
      </p>

      {/* Link visual */}
      <div
        className={`inline-flex items-center justify-center md:justify-start text-sm font-medium transition-all duration-500 ${
          isHovered ? "text-[#00DEC7]" : "text-black"
        }`}
      >
        {moreInfoText}
        <ArrowRight className={`ml-1 h-4 w-4 transition-transform duration-500 ${
          isHovered ? "translate-x-2" : ""
        }`} />
      </div>
    </Link>
  )
}

export function Services({ dict }: ServicesProps) {
  const { t: contextT } = useLanguage()
  const t = dict || contextT.services

  const services = [
    {
      ...t.items.web,
      icon: serviceIcons.web,
      href: "/servicios/diseno-web",
    },
    {
      ...t.items.store,
      icon: serviceIcons.store,
      href: "/servicios/tienda-online",
    },
    {
      ...t.items.marketing,
      icon: serviceIcons.marketing,
      href: "/servicios/marketing-digital",
    },
    {
      ...t.items.ai,
      icon: serviceIcons.ai,
      href: "/servicios/agentes-ia",
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#00DEC7]" id="servicios">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-black/80">
            {t.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} moreInfoText={t.cta.moreInfo} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6">
            <span className="font-extrabold">{t.cta.title}</span> {t.cta.subtitle}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild 
              size="lg" 
              variant="outline"
              className="border-2 border-black text-black hover:bg-black/5 rounded-full px-8 h-12 bg-transparent"
            >
              <Link href="/contacto">
                <FileText className="mr-2 h-4 w-4" />
                {t.cta.budget}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
