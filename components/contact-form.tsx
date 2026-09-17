"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Script from "next/script"
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
import { Send, CheckCircle } from "lucide-react"

const services = [
  { value: "diseno-web", label: "Diseño Web" },
  { value: "tienda-online", label: "Tienda Online" },
  { value: "marketing-digital", label: "Marketing Digital" },
  { value: "agentes-ia", label: "Agentes y Bots IA" },
  { value: "apps", label: "Aplicaciones Móviles" },
  { value: "otro", label: "Otro" },
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          servicio: formData.servicio || "Consulta general",
          mensaje: formData.empresa 
            ? `Empresa: ${formData.empresa}\n\n${formData.mensaje}`
            : formData.mensaje,
          honeypot: formData.honeypot,
          timestamp,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el formulario")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el formulario")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-[#00DEC7]/50 bg-[#00DEC7]/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEC7]/20">
          <CheckCircle className="h-8 w-8 text-[#00DEC7]" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Mensaje enviado correctamente
        </h3>
        <p className="text-muted-foreground">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 bg-transparent"
          onClick={() => {
            setIsSubmitted(false)
            setFormData({
              nombre: "",
              email: "",
              empresa: "",
              servicio: "",
              mensaje: "",
              acepto: false,
              honeypot: "",
            })
          }}
        >
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=6LdXk1MsAAAAAP6rbOwWHfG9qv47gpAs3sCU3jLI"
        strategy="afterInteractive"
      />
      <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Tu nombre"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Empresa</Label>
        <Input
          id="company"
          name="company"
          placeholder="Nombre de tu empresa"
          value={formData.empresa}
          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Servicio de interes *</Label>
        <Select 
          value={formData.servicio} 
          onValueChange={(value) => setFormData({ ...formData, servicio: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un servicio" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Contanos sobre tu proyecto *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe tu proyecto, objetivos, plazos y cualquier detalle relevante..."
          rows={5}
          required
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          required
          checked={formData.acepto}
          onChange={(e) => setFormData({ ...formData, acepto: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-border accent-[#00DEC7]"
        />
        <Label htmlFor="privacy" className="text-sm text-muted-foreground font-normal">
          He leido y acepto la{" "}
          <Link href="/politica-de-privacidad" className="text-[#00DEC7] hover:underline">
            politica de privacidad
          </Link>
          . *
        </Label>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-[#00DEC7] text-black hover:bg-[#00C4B0]"
        disabled={isSubmitting || !formData.acepto}
      >
        {isSubmitting ? (
          "Enviando..."
        ) : (
          <>
            Enviar mensaje
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
    </>
  )
}
