"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Clock, Minus, Plus, type LucideIcon } from "lucide-react"

/**
 * Plantilla de las páginas de producto propio de Vektra (ERP, CRM y Hotel) dentro de /servicios.
 * Repite el lenguaje visual de las páginas de servicios (hero oscuro con marquee, bloque cian con checks,
 * pasos numerados en negro, preguntas frecuentes y complementos), pero sin portfolio ni testimonios de agencia:
 * son productos de software y cada afirmación tiene que poder sostenerse con lo que el producto hace hoy.
 */

/** "hoy" = funciona; "proximamente" = está planificado y todavía no existe. */
export type EstadoFuncion = "hoy" | "proximamente"

export interface ProductoVektraData {
  icono: LucideIcon
  rotulo: string
  /** Disponible o próximamente: se muestra como insignia en el hero. */
  estado: { texto: string; disponible: boolean }
  h1: { antes: string; destacado: string; despues?: string }
  bajada: ReactNode
  /** Aclaración honesta del estado del producto, debajo del hero. */
  aviso?: string
  ctaPrincipal: { texto: string; href: string }
  ctaSecundario?: { texto: string; href: string }
  heroTarjetas: { icono: LucideIcon; titulo: string; detalle: string }[]
  marquee: { text: string; highlight?: boolean }[]
  beneficios: { titulo: string; bajada: ReactNode; items: { title: string; description: string }[] }
  funciones: {
    titulo: string
    bajada: string
    /** Muestra la leyenda y la marca de estado de cada punto. */
    conEstados?: boolean
    etiquetaHoy?: string
    grupos: { icono: LucideIcon; titulo: string; items: { texto: string; estado?: EstadoFuncion }[] }[]
  }
  pasos: { titulo: ReactNode; bajada: ReactNode; items: { step: string; title: string; subtitle: string; description: string }[] }
  paraQuien: { titulo: string; bajada: string; items: { titulo: string; texto: string }[] }
  precio: { titulo: string; texto: string; detalle?: string }
  faqs: { question: string; answer: string }[]
  faqSubtitulo: string
  cierre: { titulo: string; bajada: string }
  complementos: { title: string; subtitle: string; features: string[]; href: string; icon: LucideIcon; external?: boolean }[]
}

function Enlace({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function MarcaEstado({ estado, etiquetaHoy }: { estado?: EstadoFuncion; etiquetaHoy: string }) {
  if (estado === "proximamente") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
        <Clock className="h-3 w-3" />
        Próximamente
      </span>
    )
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#00DEC7]/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#008a7c]">
      <Check className="h-3 w-3" strokeWidth={3} />
      {etiquetaHoy}
    </span>
  )
}

export function ProductoVektra({ data }: { data: ProductoVektraData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const Icono = data.icono
  const etiquetaHoy = data.funciones.etiquetaHoy ?? "Disponible"

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-28 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="text-base sm:text-lg text-[#00DEC7] font-medium flex items-center gap-2">
                  <Icono className="h-6 w-6" />
                  {data.rotulo}
                </p>
                <span
                  className={
                    data.estado.disponible
                      ? "inline-flex items-center rounded-full bg-[#00DEC7] px-3 py-1 text-xs font-semibold text-black"
                      : "inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white"
                  }
                >
                  {data.estado.texto}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {data.h1.antes}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{data.h1.destacado}</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {data.h1.despues && (
                  <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">{data.h1.despues}</span>
                )}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">{data.bajada}</p>
              {data.aviso && (
                <p className="mt-4 text-sm text-gray-400 border-l-2 border-[#00DEC7] pl-3 leading-relaxed">{data.aviso}</p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
                  <Enlace href={data.ctaPrincipal.href}>{data.ctaPrincipal.texto}</Enlace>
                </Button>
                {data.ctaSecundario && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent"
                  >
                    <Enlace href={data.ctaSecundario.href}>{data.ctaSecundario.texto}</Enlace>
                  </Button>
                )}
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-[#00DEC7]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl p-8 border border-[#00DEC7]/30">
                  <div className="grid grid-cols-2 gap-4">
                    {data.heroTarjetas.map((tarjeta) => (
                      <div key={tarjeta.titulo} className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                        <tarjeta.icono className="h-10 w-10 text-[#00DEC7] mb-3" />
                        <p className="text-white font-medium">{tarjeta.titulo}</p>
                        <p className="text-gray-400 text-sm">{tarjeta.detalle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 border-t border-[#00DEC7]">
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              {[...data.marquee, ...data.marquee].map((item, index) => (
                <span key={index} className="mx-4 text-sm">
                  {item.highlight ? <strong className="text-[#00DEC7]">{item.text}</strong> : <span className="text-gray-400">{item.text}</span>}
                  <span className="mx-4 text-gray-600">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">{data.beneficios.titulo}</h2>
            <p className="mt-6 text-black/80 text-lg">{data.beneficios.bajada}</p>
          </div>
          <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
            {data.beneficios.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black">
                    <Check className="h-4 w-4 text-black" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg">{item.title}</h3>
                  <p className="mt-1 text-black/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
                <Enlace href={data.ctaPrincipal.href}>{data.ctaPrincipal.texto}</Enlace>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Funciones */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{data.funciones.titulo}</h2>
            <p className="text-gray-600">{data.funciones.bajada}</p>
            {data.funciones.conEstados && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <MarcaEstado estado="hoy" etiquetaHoy={etiquetaHoy} />
                <MarcaEstado estado="proximamente" etiquetaHoy={etiquetaHoy} />
              </div>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.funciones.grupos.map((grupo) => (
              <div key={grupo.titulo} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#00DEC7]/10 rounded-xl flex items-center justify-center mb-6">
                  <grupo.icono className="h-7 w-7 text-[#00DEC7]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{grupo.titulo}</h3>
                <ul className="space-y-3">
                  {grupo.items.map((item) => (
                    <li key={item.texto} className="text-gray-600 text-sm leading-relaxed">
                      <span className="flex items-start gap-2">
                        {data.funciones.conEstados ? null : <Check className="h-4 w-4 text-[#00DEC7] mt-0.5 shrink-0" />}
                        <span>{item.texto}</span>
                      </span>
                      {data.funciones.conEstados && (
                        <span className="mt-1 block">
                          <MarcaEstado estado={item.estado} etiquetaHoy={etiquetaHoy} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">{data.pasos.titulo}</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">{data.pasos.bajada}</p>
          </div>
          <div className={`grid gap-12 md:grid-cols-2 ${data.pasos.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {data.pasos.items.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">
                  {item.title}
                  <br />
                  {item.subtitle}
                </h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#111] to-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{data.paraQuien.titulo}</h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">{data.paraQuien.bajada}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.paraQuien.items.map((item) => (
              <div key={item.titulo} className="rounded-2xl border border-[#00DEC7]/20 bg-gradient-to-br from-[#00DEC7]/10 to-transparent p-6">
                <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>

          {/* Precio */}
          <div className="mt-16 rounded-2xl bg-[#00DEC7] p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">{data.precio.titulo}</h3>
              <p className="mt-3 text-black/80 leading-relaxed">{data.precio.texto}</p>
              {data.precio.detalle && <p className="mt-2 text-sm text-black/60">{data.precio.detalle}</p>}
            </div>
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
              <Link href="/precios" className="inline-flex items-center gap-2">
                Ver precios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">{data.faqSubtitulo}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
            {data.faqs.map((faq, index) => (
              <div key={faq.question} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white text-sm font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">¿Tenés alguna otra duda?</h3>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent"
              >
                <Link href="/contacto">Escribinos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-black">{data.cierre.titulo}</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">{data.cierre.bajada}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
              <Enlace href={data.ctaPrincipal.href}>{data.ctaPrincipal.texto}</Enlace>
            </Button>
            {data.ctaSecundario && (
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                <Enlace href={data.ctaSecundario.href}>{data.ctaSecundario.texto}</Enlace>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Complementos */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementos</h2>
            <p className="mt-2 text-black/60 uppercase tracking-widest text-sm">También te puede interesar</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {data.complementos.map((service) => (
              <div
                key={service.title}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mb-4">{service.subtitle}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-black/80">
                      <Check className="h-4 w-4 text-black shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Enlace href={service.href} className="mt-auto inline-flex items-center gap-2 text-black font-semibold">
                  <span className="underline-offset-4 group-hover:underline">Más info</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Enlace>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
