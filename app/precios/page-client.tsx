"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { ArrowRight, Check, Clock, House, Inbox, Minus, Plus, Receipt, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ADICIONALES_ERP,
  DESCUENTO_COMBO,
  DIAS_DE_PRUEBA,
  MESES_COBRADOS_EN_ANUAL,
  PLANES_ERP,
  PRECIO_USUARIO_ADICIONAL,
  URL_CRM,
  URL_ERP,
  URL_ERP_REGISTRO,
  URL_ALQUILERES,
  formatearPesos,
  precioAnual,
} from "@/lib/productos-vektra"
import { faqsPrecios } from "./preguntas"

type Pestana = "erp" | "crm" | "alquileres"
const PESTANAS: Pestana[] = ["erp", "crm", "alquileres"]

const suscribirHash = (aviso: () => void) => {
  window.addEventListener("hashchange", aviso)
  return () => window.removeEventListener("hashchange", aviso)
}
const leerHash = () => window.location.hash.replace("#", "")

const marqueeItems = [
  { text: "Vektra ERP", highlight: true },
  { text: "plan Gratis sin vencimiento" },
  { text: "Precios en pesos", highlight: true },
  { text: "por mes, más IVA" },
  { text: "Pago anual", highlight: true },
  { text: `abonás ${MESES_COBRADOS_EN_ANUAL} meses y usás 12` },
  { text: "Combos", highlight: true },
  { text: `${DESCUENTO_COMBO} % al combinar productos` },
]

/** Producto en lista de espera: sin cifras, solo el modelo de precio que se está pensando y lo que va a incluir. */
const listaDeEspera = {
  crm: {
    nombre: "Vektra CRM",
    icono: Inbox,
    href: URL_CRM,
    servicio: "/servicios/crm",
    modelo: [
      { titulo: "Según tu equipo", texto: "Pensamos que el precio dependa de cuántas personas atienden consultas, no de la cantidad de contactos." },
      { titulo: "En pesos y sin permanencia", texto: "Pago mensual en pesos argentinos y baja cuando quieras. Lo confirmamos al lanzar." },
      {
        titulo: "Costos de los canales aparte",
        texto: "WhatsApp cobra algunos mensajes de plantilla: eso lo factura Meta y lo vamos a explicar claro antes de que lo uses.",
      },
    ],
    incluye: [
      "Bandeja de conversaciones: WhatsApp Business oficial, correo y formularios web",
      "Instagram y Facebook (Messenger), a medida que estén listos",
      "Embudos de venta, tareas con vencimiento y reportes",
      "Automatizaciones y asistente con IA",
      "Conexión con Vektra ERP para facturar y cobrar",
    ],
  },
  alquileres: {
    nombre: "Vektra Alquileres",
    icono: House,
    href: URL_ALQUILERES,
    servicio: "/servicios/alquileres",
    modelo: [
      { titulo: "Según tus unidades", texto: "Pensamos que el precio dependa de la cantidad de departamentos, casas o cabañas que gestionás." },
      { titulo: "Argentina y Paraguay", texto: "Pago mensual en moneda local y baja cuando quieras. Lo confirmamos al lanzar." },
      {
        titulo: "Facturación por el ERP",
        texto: "En Argentina la factura electrónica sale de Vektra ERP, que tiene su propio plan Gratis y planes pagos. En Paraguay, más adelante.",
      },
    ],
    incluye: [
      "Calendario unificado con sincronización iCal con Airbnb, Booking y otras plataformas",
      "Sincronización con Google Calendar",
      "Reservas directas con cobro de la seña",
      "Mensajes a huéspedes y limpieza entre estadías",
      "Liquidación a propietarios para administradoras",
      "Cobros con Mercado Pago en Argentina y medios locales en Paraguay",
      "Facturación ARCA vía Vektra ERP en Argentina; Paraguay, próximamente",
      "Conexión directa con las plataformas: en nuestra hoja de ruta",
    ],
  },
} as const

const combos = [
  { nombre: "ERP + CRM", texto: "Vendés en el CRM, facturás y cobrás en el ERP, con los mismos clientes.", iconos: [Receipt, Inbox] },
  { nombre: "ERP + Alquileres", texto: "Tus alquileres temporarios y, detrás, la facturación ARCA, la caja y los impuestos.", iconos: [Receipt, House] },
  { nombre: "CRM + Alquileres", texto: "Las consultas de futuros huéspedes con seguimiento y las reservas en un solo calendario.", iconos: [Inbox, House] },
]

function Limite({ children }: { children: React.ReactNode }) {
  return <li className="flex items-center gap-2 text-sm">{children}</li>
}

export default function PreciosPageClient() {
  const hash = useSyncExternalStore(suscribirHash, leerHash, () => "")
  const pestana: Pestana = PESTANAS.includes(hash as Pestana) ? (hash as Pestana) : "erp"
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // La pestaña vive en el hash (/precios#crm) para poder enlazarla desde las páginas de cada producto.
  const cambiarPestana = (valor: string) => {
    if (PESTANAS.includes(valor as Pestana)) window.location.hash = valor
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-8 pt-36 pb-32 lg:pt-40">
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              Productos Vektra
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Precios{" "}
              <span className="relative inline-block">
                <span className="relative z-10">claros y en pesos</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
              </span>
              <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">Vektra ERP, Vektra CRM y Vektra Alquileres</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              <strong className="text-white">Vektra ERP</strong> tiene un plan Gratis y planes pagos con precio publicado.{" "}
              <strong className="text-white">Vektra CRM</strong> y <strong className="text-white">Vektra Alquileres</strong> están en
              preparación: sumate a la lista de espera y recibí primero el precio de lanzamiento.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 border-t border-[#00DEC7]">
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={index} className="mx-4 text-sm">
                  {item.highlight ? <strong className="text-[#00DEC7]">{item.text}</strong> : <span className="text-gray-400">{item.text}</span>}
                  <span className="mx-4 text-gray-600">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Productos en pestañas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Tabs value={pestana} onValueChange={cambiarPestana} className="gap-12">
            <TabsList className="mx-auto h-auto w-full max-w-xl rounded-full bg-gray-100 p-1.5">
              {(
                [
                  { valor: "erp", nombre: "Vektra ERP", icono: Receipt },
                  { valor: "crm", nombre: "Vektra CRM", icono: Inbox },
                  { valor: "alquileres", nombre: "Vektra Alquileres", icono: House },
                ] as const
              ).map((t) => (
                <TabsTrigger
                  key={t.valor}
                  value={t.valor}
                  className="h-auto rounded-full border-0 px-3 py-2.5 text-sm font-semibold text-gray-600 sm:px-5 data-[state=active]:bg-[#00DEC7] data-[state=active]:text-black data-[state=active]:shadow-none"
                >
                  <t.icono className="hidden h-4 w-4 sm:block" />
                  {t.nombre}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ERP */}
            <TabsContent value="erp" forceMount className="data-[state=inactive]:hidden">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="inline-flex items-center rounded-full bg-[#00DEC7] px-3 py-1 text-xs font-semibold text-black">Disponible</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-black">Planes de Vektra ERP</h2>
                <p className="mt-4 text-gray-600">
                  Precios de lista por mes, en pesos y <strong className="text-black">sin IVA</strong>. Pagando el año por adelantado abonás{" "}
                  <strong className="text-black">{MESES_COBRADOS_EN_ANUAL} meses</strong> y usás 12.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {PLANES_ERP.map((plan) => {
                  const oscuro = plan.destacado
                  return (
                    <div
                      key={plan.id}
                      className={`relative flex h-full flex-col rounded-2xl p-7 transition-shadow ${
                        oscuro ? "bg-black text-white ring-2 ring-[#00DEC7] shadow-xl" : "bg-gray-50 text-black hover:shadow-lg"
                      }`}
                    >
                      {oscuro && (
                        <span className="absolute -top-3 left-7 rounded-full bg-[#00DEC7] px-3 py-1 text-xs font-semibold text-black">Recomendado</span>
                      )}
                      <h3 className="text-2xl font-bold">{plan.nombre}</h3>
                      <p className={`mt-2 text-sm leading-relaxed min-h-[2.5rem] ${oscuro ? "text-gray-300" : "text-gray-600"}`}>{plan.lema}</p>

                      <div className="mt-6">
                        <span className="text-4xl font-bold">{formatearPesos(plan.precioMensual)}</span>
                        <span className={`ml-1 text-sm ${oscuro ? "text-gray-400" : "text-gray-500"}`}>
                          {plan.precioMensual === 0 ? "sin vencimiento" : "/mes + IVA"}
                        </span>
                        <p className={`mt-1 text-xs ${oscuro ? "text-gray-400" : "text-gray-500"}`}>
                          {plan.precioMensual === 0
                            ? "Para siempre, con los límites del plan"
                            : `o ${formatearPesos(precioAnual(plan.precioMensual))} + IVA por año`}
                        </p>
                      </div>

                      <ul className={`mt-6 space-y-2 border-y py-5 ${oscuro ? "border-white/10" : "border-black/10"}`}>
                        <Limite>
                          <strong>{plan.usuarios}</strong> {plan.usuarios === 1 ? "usuario" : "usuarios"}
                        </Limite>
                        <Limite>
                          <strong>{plan.comprobantesMes === null ? "Sin límite" : formatearPesos(plan.comprobantesMes).slice(1)}</strong>{" "}
                          {plan.comprobantesMes === null ? "de comprobantes" : "comprobantes por mes"}
                        </Limite>
                        <Limite>
                          <strong>{plan.puntosVenta}</strong> {plan.puntosVenta === 1 ? "punto de venta" : "puntos de venta"}
                        </Limite>
                      </ul>

                      <ul className="mt-5 space-y-2.5">
                        {[...plan.incluye, ...plan.beneficios].map((item) => (
                          <li key={item} className={`flex items-start gap-2 text-sm ${oscuro ? "text-gray-200" : "text-gray-700"}`}>
                            <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#00DEC7]" strokeWidth={3} />
                            {item}
                          </li>
                        ))}
                        {!plan.admiteAdicionales && (
                          <li className={`flex items-start gap-2 text-sm ${oscuro ? "text-gray-400" : "text-gray-500"}`}>
                            <Minus className="h-4 w-4 mt-0.5 shrink-0" />
                            Sin aplicaciones adicionales
                          </li>
                        )}
                      </ul>

                      <div className="mt-auto pt-7">
                        <Button
                          asChild
                          size="lg"
                          className={`w-full rounded-full font-semibold ${
                            oscuro ? "bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90" : "bg-black text-white hover:bg-black/90"
                          }`}
                        >
                          <a href={URL_ERP_REGISTRO}>{plan.precioMensual === 0 ? "Empezá gratis" : `Probalo ${DIAS_DE_PRUEBA} días gratis`}</a>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                La prueba gratis de {DIAS_DE_PRUEBA} días es con el plan Inicial más la aplicación de tu rubro. Precios de lista en pesos,
                sin IVA (se factura A o B con el 21 %), que se ajustan cada trimestre.
              </p>

              {/* Adicionales */}
              <div className="mt-16 rounded-2xl bg-black p-8 md:p-10">
                <div className="max-w-3xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Aplicaciones adicionales</h3>
                  <p className="mt-3 text-gray-400">
                    Se suman a cualquier plan pago desde el indicado y se habilitan en la misma empresa, con los mismos clientes, stock y
                    facturación.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {ADICIONALES_ERP.map((adicional) => (
                    <div key={adicional.nombre} className="rounded-xl border border-[#00DEC7]/20 bg-gradient-to-br from-[#00DEC7]/10 to-transparent p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{adicional.nombre}</h4>
                        <span className="text-right">
                          {adicional.precioMensual === null ? (
                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#00DEC7]">
                              <Clock className="h-4 w-4" />
                              Precio a confirmar
                            </span>
                          ) : (
                            <>
                              <span className="text-xl font-bold text-white">{formatearPesos(adicional.precioMensual)}</span>
                              <span className="ml-1 text-xs text-gray-400">/mes + IVA</span>
                            </>
                          )}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{adicional.detalle}</p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                        Desde el plan {adicional.desde}
                        {adicional.nota && <span className="text-[#00DEC7]"> · {adicional.nota}</span>}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-400">
                  <strong className="text-white">Usuario adicional:</strong> {formatearPesos(PRECIO_USUARIO_ADICIONAL)} por mes más IVA, por cada
                  usuario por encima de los que trae el plan.
                </p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
                  <a href={URL_ERP_REGISTRO}>Probalo gratis {DIAS_DE_PRUEBA} días</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                  <Link href="/servicios/erp">Qué incluye Vektra ERP</Link>
                </Button>
              </div>
            </TabsContent>

            {/* CRM y Alquileres */}
            {(["crm", "alquileres"] as const).map((id) => {
              const p = listaDeEspera[id]
              return (
                <TabsContent key={id} value={id} forceMount className="data-[state=inactive]:hidden">
                  <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-start">
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-black/20 px-3 py-1 text-xs font-semibold text-black">
                        <Clock className="h-3.5 w-3.5" />
                        Próximamente · lista de espera
                      </span>
                      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-black flex items-center gap-3">
                        <p.icono className="h-8 w-8 text-[#00DEC7]" />
                        {p.nombre}
                      </h2>
                      <div className="mt-6 rounded-2xl bg-[#00DEC7] p-7">
                        <p className="text-2xl md:text-3xl font-bold text-black leading-tight">Precio de lanzamiento</p>
                        <p className="mt-2 text-black/80 text-lg">Sumate a la lista de espera y recibilo antes que nadie.</p>
                        <p className="mt-3 text-sm text-black/70">
                          Todavía no tiene precio publicado y no vamos a anunciar una cifra que después cambie.
                        </p>
                      </div>
                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
                          <a href={p.href}>Sumate a la lista de espera</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                          <Link href={p.servicio}>Conocé {p.nombre}</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-2xl p-7">
                        <h3 className="text-lg font-bold text-black">Cómo pensamos el precio</h3>
                        <ul className="mt-4 space-y-4">
                          {p.modelo.map((m) => (
                            <li key={m.titulo} className="flex gap-3">
                              <div className="shrink-0 mt-0.5">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black">
                                  <Check className="h-4 w-4 text-black" strokeWidth={3} />
                                </div>
                              </div>
                              <div>
                                <p className="font-bold text-black">{m.titulo}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{m.texto}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-7">
                        <h3 className="text-lg font-bold text-black">Qué va a incluir</h3>
                        <ul className="mt-4 space-y-2.5">
                          {p.incluye.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                              <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#00DEC7]" strokeWidth={3} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 text-xs text-gray-500">Lo que todavía no existe se suma a medida que esté listo; no lo damos por disponible antes.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </section>

      {/* Combos */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Combiná productos y ahorrá un {DESCUENTO_COMBO} %
            </h2>
            <p className="mt-6 text-black/80 text-lg">
              Al contratar <strong className="text-black">dos productos de Vektra</strong> tenés {DESCUENTO_COMBO} % de descuento. Los precios
              finales de cada combo se publican cuando CRM y Alquileres salgan a la venta.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {combos.map((combo) => (
              <div
                key={combo.nombre}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex items-center gap-2">
                  {combo.iconos.map((Icono, i) => (
                    <div key={i} className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/10 text-black">
                      <Icono className="h-7 w-7" />
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-black">{combo.nombre}</h3>
                <p className="text-black/70 italic mb-4">{DESCUENTO_COMBO} % de descuento</p>
                <p className="text-sm text-black/80 leading-relaxed mb-6">{combo.texto}</p>
                <Link href="/contacto" className="mt-auto inline-flex items-center gap-2 text-black font-semibold">
                  <span className="underline-offset-4 group-hover:underline">Consultanos</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Preguntas frecuentes</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">Precios</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
            {faqsPrecios.map((faq, index) => (
              <div key={faq.question} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white text-sm font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" /> : <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-black">¿No sabés qué plan elegir?</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Probá Vektra ERP {DIAS_DE_PRUEBA} días gratis o escribinos y te ayudamos a elegir según cuántos usuarios y comprobantes manejás.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
              <a href={URL_ERP_REGISTRO}>Probalo gratis {DIAS_DE_PRUEBA} días</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
              <a href={URL_ERP}>Ir a Vektra ERP</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
              <Link href="/contacto">Escribinos</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
