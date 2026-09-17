"use client"

import React from "react"

import { useState, useEffect } from "react"
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
import { User, Mail, MessageSquare, ListFilter, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Dictionary } from "@/lib/dictionaries"
import { pushToDataLayer } from "@/lib/gtm"
import { Confetti } from "@/components/ui/confetti"

interface ContactFormSectionProps {
  dict?: Dictionary["contactForm"]
}

export function ContactFormSection({ dict }: ContactFormSectionProps) {
  const { t: contextT } = useLanguage()
  const t = dict || contextT.contactForm

  const servicios = [
    { value: "diseno-web", label: t.form.services.options.web },
    { value: "tienda-online", label: t.form.services.options.store },
    { value: "marketing-digital", label: t.form.services.options.marketing },
    { value: "agentes-ia", label: t.form.services.options.ai },
    { value: "apps", label: t.form.services.options.apps },
    { value: "otro", label: t.form.services.options.other },
  ]

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

  useEffect(() => {
    setTimestamp(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.form.error)
      }

      setIsSubmitted(true)
      pushToDataLayer("form_submit", {
        form_name: "Home Contact Form",
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
      setError(err instanceof Error ? err.message : t.form.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const [showConfetti, setShowConfetti] = useState(false)

  // Trigger confetti when form is submitted successfully
  useEffect(() => {
    if (isSubmitted) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted])

  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      <Confetti isActive={showConfetti} />
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Rocket Illustration - Animated */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative animate-rocket-float">
              <svg
                width="400"
                height="450"
                viewBox="0 0 400 450"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-md"
              >
                {/* Cloud base */}
                <ellipse cx="200" cy="420" rx="150" ry="30" fill="#E8F4F8" className="animate-pulse" style={{ animationDuration: '3s' }} />

                {/* Small clouds - animated */}
                <ellipse cx="120" cy="380" rx="40" ry="20" fill="#B8E6E8" className="animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                <ellipse cx="280" cy="370" rx="35" ry="18" fill="#B8E6E8" className="animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }} />
                <ellipse cx="180" cy="390" rx="50" ry="25" fill="#C8EDEF" className="animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '0.7s' }} />
                <ellipse cx="240" cy="400" rx="45" ry="22" fill="#C8EDEF" className="animate-pulse" style={{ animationDuration: '2.6s', animationDelay: '0.2s' }} />

                {/* Rocket body */}
                <path
                  d="M200 50C200 50 160 120 160 220C160 280 180 340 200 380C220 340 240 280 240 220C240 120 200 50 200 50Z"
                  fill="#E8E8E8"
                  stroke="#333"
                  strokeWidth="3"
                />

                {/* Rocket tip */}
                <path
                  d="M200 50C200 50 180 80 180 100C180 110 190 120 200 120C210 120 220 110 220 100C220 80 200 50 200 50Z"
                  fill="#00DEC7"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Windows - with glow */}
                <circle cx="200" cy="160" r="20" fill="#333" stroke="#333" strokeWidth="2" />
                <circle cx="200" cy="160" r="15" fill="#666" className="animate-pulse" style={{ animationDuration: '2s' }} />
                <circle cx="195" cy="155" r="5" fill="#00DEC7" className="animate-sparkle" />

                <circle cx="200" cy="220" r="15" fill="#333" stroke="#333" strokeWidth="2" />
                <circle cx="200" cy="220" r="10" fill="#666" className="animate-pulse" style={{ animationDuration: '2.5s' }} />

                {/* Fins */}
                <path
                  d="M160 280L120 340L160 320Z"
                  fill="#00DEC7"
                  stroke="#333"
                  strokeWidth="2"
                />
                <path
                  d="M240 280L280 340L240 320Z"
                  fill="#00DEC7"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Rocket base */}
                <path
                  d="M170 370C170 370 185 400 200 400C215 400 230 370 230 370"
                  fill="#333"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Fire/exhaust - animated */}
                <g className="animate-fire-pulse">
                  <ellipse cx="200" cy="395" rx="20" ry="10" fill="#FFB347" />
                  <ellipse cx="200" cy="400" rx="15" ry="8" fill="#FF6B6B" />
                  <ellipse cx="200" cy="405" rx="10" ry="5" fill="#FFE66D" />
                  <ellipse cx="200" cy="412" rx="6" ry="4" fill="#FFE66D" opacity="0.7" />
                </g>

                {/* Person - waving animation */}
                <ellipse cx="100" cy="350" rx="20" ry="5" fill="#DDD" />
                <rect x="85" y="300" width="30" height="50" rx="5" fill="#333" />
                <circle cx="100" cy="285" r="18" fill="#F5D0C5" />
                <path
                  d="M85 280C85 265 92 255 100 255C108 255 115 265 115 280"
                  fill="#333"
                />
                <g className="origin-bottom-left" style={{ animation: 'wave 1s ease-in-out infinite', transformOrigin: '115px 310px' }}>
                  <path
                    d="M115 310L140 290"
                    stroke="#333"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <circle cx="145" cy="285" r="8" fill="#F5D0C5" />
                </g>

                {/* Decorative elements - animated sparkles */}
                <circle cx="280" cy="100" r="8" fill="#00DEC7" className="animate-sparkle" />
                <circle cx="260" cy="80" r="5" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.3s' }} />
                <circle cx="300" cy="120" r="4" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.6s' }} />

                <circle cx="320" cy="180" r="6" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.9s' }} />
                <circle cx="340" cy="160" r="4" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '1.2s' }} />

                <circle cx="60" cy="200" r="5" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.4s' }} />
                <circle cx="80" cy="250" r="4" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.8s' }} />

                {/* Stars/sparkles - animated */}
                <path d="M70 150L75 160L70 170L65 160Z" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.2s' }} />
                <path d="M330 250L335 260L330 270L325 260Z" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '0.5s' }} />
                <path d="M50 300L55 310L50 320L45 310Z" fill="#00DEC7" className="animate-sparkle" style={{ animationDelay: '1s' }} />
              </svg>

              {/* Additional floating particles */}
              <div className="absolute top-10 right-10 w-3 h-3 bg-[#00DEC7] rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
              <div className="absolute top-32 right-0 w-2 h-2 bg-[#00DEC7] rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              <div className="absolute bottom-40 left-5 w-2 h-2 bg-[#00DEC7] rounded-full animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
            </div>
          </div>

          {/* Form */}
          <div>
            {/* Cyan Header */}
            <div className="bg-[#00DEC7] rounded-xl p-6 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black text-center leading-tight whitespace-pre-line">
                {t.rocket.title}
              </h2>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-700">
                {t.rocket.text} <span className="font-semibold">{t.rocket.highlight}</span>
              </p>
              <p className="mt-2 text-gray-600 text-sm">
                {t.rocket.subtext.form}{" "}
                <span className="font-semibold">{t.rocket.subtext.response}</span>.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl border-2 border-[#00DEC7] bg-[#00DEC7]/10 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEC7]/20">
                  <CheckCircle className="h-8 w-8 text-[#00DEC7]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {t.form.success.title}
                </h3>
                <p className="text-gray-600">
                  {t.form.success.message}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 bg-transparent border-black hover:bg-black hover:text-white"
                  onClick={() => setIsSubmitted(false)}
                >
                  {t.form.success.button}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* Servicio */}
                <div className="relative">
                  <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Select
                    value={formData.servicio}
                    onValueChange={(value) => setFormData({ ...formData, servicio: value })}
                    required
                  >
                    <SelectTrigger className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7] text-left">
                      <SelectValue placeholder={t.form.services.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {servicios.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Nombre */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t.form.name}
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
                    placeholder={t.form.email}
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
                    placeholder={t.form.message}
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="pl-10 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7] resize-none"
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="acepto-section"
                    checked={formData.acepto}
                    onCheckedChange={(checked) => setFormData({ ...formData, acepto: checked as boolean })}
                    className="mt-1 data-[state=checked]:bg-[#00DEC7] data-[state=checked]:border-[#00DEC7]"
                    required
                  />
                  <label htmlFor="acepto-section" className="text-sm text-gray-600">
                    {t.form.privacy.text}{" "}
                    <Link href="/politica-de-privacidad" className="underline hover:text-[#00DEC7]">
                      {t.form.privacy.link}
                    </Link>
                  </label>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.acepto}
                    className="bg-[#00DEC7] hover:bg-[#00C4B0] text-black font-semibold px-10 py-6 rounded-full text-base"
                  >
                    {isSubmitting ? t.form.submitting : t.form.submit}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
