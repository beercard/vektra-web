"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { 
  Calculator, DollarSign, CreditCard, Wallet, Smartphone,
  TrendingUp, ArrowRight, CheckCircle2, HelpCircle,
  Facebook, Instagram, Mail, RefreshCw
} from "lucide-react"

// Alicuotas de IIBB por provincia argentina
const PROVINCIAS = [
  { id: "buenos_aires", nombre: "Buenos Aires", tasa: 0.02 },
  { id: "caba", nombre: "CABA", tasa: 0.02 },
  { id: "catamarca", nombre: "Catamarca", tasa: 0.035 },
  { id: "chaco", nombre: "Chaco", tasa: 0.055 },
  { id: "chubut", nombre: "Chubut", tasa: 0.045 },
  { id: "cordoba", nombre: "Cordoba", tasa: 0.03 },
  { id: "corrientes", nombre: "Corrientes", tasa: 0.035 },
  { id: "entre_rios", nombre: "Entre Rios", tasa: 0.03 },
  { id: "formosa", nombre: "Formosa", tasa: 0.02 },
  { id: "jujuy", nombre: "Jujuy", tasa: 0.02 },
  { id: "la_pampa", nombre: "La Pampa", tasa: 0.01 },
  { id: "la_rioja", nombre: "La Rioja", tasa: 0.02 },
  { id: "mendoza", nombre: "Mendoza", tasa: 0.04 },
  { id: "misiones", nombre: "Misiones", tasa: 0.045 },
  { id: "neuquen", nombre: "Neuquen", tasa: 0.04 },
  { id: "rio_negro", nombre: "Rio Negro", tasa: 0.05 },
  { id: "salta", nombre: "Salta", tasa: 0.036 },
  { id: "san_juan", nombre: "San Juan", tasa: 0.025 },
  { id: "san_luis", nombre: "San Luis", tasa: 0.025 },
  { id: "santa_cruz", nombre: "Santa Cruz", tasa: 0.02 },
  { id: "santa_fe", nombre: "Santa Fe", tasa: 0.03 },
  { id: "santiago_del_estero", nombre: "Santiago del Estero", tasa: 0.03 },
  { id: "tierra_del_fuego", nombre: "Tierra del Fuego", tasa: 0.03 },
  { id: "tucuman", nombre: "Tucuman", tasa: 0.055 },
]

// Format currency
const formatARS = (value: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const formatUSD = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

type PaymentMethod = "bancaria" | "prepaga" | "local"

export default function CalculadoraAdsClient() {
  const [inversion, setInversion] = useState(100000)
  const [provinciaId, setProvinciaId] = useState("chaco")
  const [dolarBolsa, setDolarBolsa] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("local")

  // Fetch dolar bolsa
  useEffect(() => {
    async function fetchDolar() {
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares/bolsa")
        if (!response.ok) throw new Error("Error fetching dolar")
        const data = await response.json()
        setDolarBolsa(data.venta)
      } catch (error) {
        console.error("Error al cargar cotizacion:", error)
        setDolarBolsa(1350)
      } finally {
        setLoading(false)
      }
    }
    fetchDolar()
  }, [])

  const provincia = PROVINCIAS.find(p => p.id === provinciaId) || PROVINCIAS[0]

  // Calculos
  const calculos = useMemo(() => {
    const inversionUSD = dolarBolsa ? inversion / dolarBolsa : 0
    const tasaIIBB = provincia.tasa

    // --- TARJETA BANCARIA (Visa/Master bancarizada) ---
    const bancaria = {
      base: inversion,
      percGanancias: inversion * 0.30,
      percIIBB: inversion * tasaIIBB,
      impSellos: 0 as number,
      total: 0 as number,
    }
    bancaria.impSellos = (bancaria.base + bancaria.percGanancias + bancaria.percIIBB) * 0.012
    bancaria.total = bancaria.base + bancaria.percGanancias + bancaria.percIIBB + bancaria.impSellos

    // --- TARJETA PREPAGA (Uala, Lemon, MP internacional) ---
    const prepaga = {
      base: inversion,
      ivaDigital: inversion * 0.21,
      percIIBB: inversion * tasaIIBB,
      total: 0 as number,
    }
    prepaga.total = prepaga.base + prepaga.ivaDigital + prepaga.percIIBB

    // --- PAGO LOCAL (MercadoPago, tarjetas locales - Solo IVA) ---
    const local = {
      base: inversion,
      iva: inversion * 0.21,
      total: 0 as number,
    }
    local.total = local.base + local.iva

    const mejorOpcion = local.total <= prepaga.total && local.total <= bancaria.total 
      ? "local" 
      : prepaga.total <= bancaria.total ? "prepaga" : "bancaria"

    return {
      inversionUSD,
      tasaIIBB,
      bancaria,
      prepaga,
      local,
      mejorOpcion,
      ahorroBancaria: bancaria.total - local.total,
      ahorroPrepaga: prepaga.total - local.total,
    }
  }, [inversion, provincia, dolarBolsa])

  const paymentMethods = [
    {
      id: "local" as const,
      name: "Pago Local",
      icon: Smartphone,
      description: "MercadoPago, Tarjetas Locales",
      recommended: true,
    },
    {
      id: "prepaga" as const,
      name: "Tarjeta Prepaga",
      icon: Wallet,
      description: "Uala, Lemon, MP (Internacional)",
      recommended: false,
    },
    {
      id: "bancaria" as const,
      name: "Tarjeta Bancaria",
      icon: CreditCard,
      description: "Visa/Mastercard Bancarizadas",
      recommended: false,
    },
  ]

  return (
    <>
      {/* Hero Section - Compact */}
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] pt-28 pb-12 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="lg:max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-[#00DEC7]/10 border border-[#00DEC7]/30 px-3 py-1.5 rounded-full">
                  <Facebook className="h-4 w-4 text-[#00DEC7]" />
                  <Instagram className="h-4 w-4 text-[#00DEC7]" />
                  <span className="text-[#00DEC7] text-xs font-medium">Meta Ads</span>
                </div>
                <span className="text-gray-500 text-xs">Actualizado 2026</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Calculadora de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DEC7] to-emerald-400">
                  Meta Ads
                </span>{" "}
                en Argentina
              </h1>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Calcula el costo real de tu inversión en Facebook e Instagram Ads en Argentina según
                provincia e IIBB. Compara métodos de pago y descubrí cuál te conviene más.
              </p>
            </div>

            {/* Dolar Card */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#333] rounded-2xl p-6 lg:min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Dolar MEP/Bolsa</span>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-gray-500 hover:text-[#00DEC7] transition-colors"
                  title="Actualizar cotizacion"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <DollarSign className="h-8 w-8 text-[#00DEC7]" />
                <span className="text-4xl font-bold text-white">
                  {loading ? "..." : dolarBolsa?.toLocaleString("es-AR")}
                </span>
                <span className="text-gray-500">ARS</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Fuente: dolarapi.com - Cotizacion en tiempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
            {/* Left - Input & Results */}
            <div className="space-y-6">
              {/* Input Card */}
              <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#00DEC7]" />
                  Configura tu inversión en Meta Ads
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Monto a invertir (ARS)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={inversion}
                        onChange={(e) => setInversion(Number(e.target.value) || 0)}
                        className="w-full bg-[#1a1a1a] border border-[#333] text-white text-xl font-semibold pl-8 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00DEC7] transition-colors"
                        placeholder="100000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Equivalente: <span className="text-white">{formatUSD(calculos.inversionUSD)}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Tu provincia (para IIBB)
                    </label>
                    <select
                      value={provinciaId}
                      onChange={(e) => setProvinciaId(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-4 rounded-xl focus:outline-none focus:border-[#00DEC7] transition-colors appearance-none cursor-pointer"
                    >
                      {PROVINCIAS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} ({(p.tasa * 100).toFixed(1)}%)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {[50000, 100000, 250000, 500000, 1000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setInversion(amount)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        inversion === amount
                          ? "bg-[#00DEC7] text-black"
                          : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222] hover:text-white"
                      }`}
                    >
                      {formatARS(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">
                  Método de pago en Argentina
                </h2>
                
                <div className="grid gap-4 md:grid-cols-3">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedMethod === method.id
                    const isBest = calculos.mejorOpcion === method.id
                    
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? "border-[#00DEC7] bg-[#00DEC7]/5"
                            : "border-[#222] bg-[#0d0d0d] hover:border-[#333]"
                        }`}
                      >
                        {isBest && (
                          <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                            MEJOR
                          </span>
                        )}
                        <method.icon className={`h-6 w-6 mb-3 ${isSelected ? "text-[#00DEC7]" : "text-gray-500"}`} />
                        <p className={`font-semibold mb-1 ${isSelected ? "text-white" : "text-gray-300"}`}>
                          {method.name}
                        </p>
                        <p className="text-xs text-gray-500">{method.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Result Card - Selected Method */}
              <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-2xl p-6 md:p-8">
                {selectedMethod === "local" && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Pago Local</h3>
                        <p className="text-sm text-gray-500">MercadoPago, Tarjetas Argentinas</p>
                      </div>
                    </div>

                    <div className="bg-[#0d0d0d] rounded-xl p-6 mb-6">
                      <p className="text-sm text-gray-500 mb-2">Costo Total</p>
                      <p className="text-4xl md:text-5xl font-bold text-white">
                        {formatARS(calculos.local.total)}
                      </p>
                      {calculos.mejorOpcion === "local" && (
                        <p className="flex items-center gap-2 text-emerald-400 text-sm mt-3">
                          <CheckCircle2 className="h-4 w-4" />
                          Mejor opcion - Ahorras {formatARS(calculos.ahorroBancaria)} vs bancaria
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Monto base (pauta)</span>
                        <span className="text-white font-medium">{formatARS(calculos.local.base)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400 flex items-center gap-2">
                          IVA (21%)
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Unico impuesto</span>
                        </span>
                        <span className="text-white">{formatARS(calculos.local.iva)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <p className="text-sm text-emerald-400">
                        <strong>Ventaja:</strong> Al pagar localmente con MercadoPago o tarjetas argentinas, 
                        solo se aplica el 21% de IVA. No hay percepciones de ganancias ni IIBB adicional.
                      </p>
                    </div>
                  </>
                )}

                {selectedMethod === "prepaga" && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-violet-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Tarjeta Prepaga</h3>
                        <p className="text-sm text-gray-500">Uala, Lemon, Mercado Pago Internacional</p>
                      </div>
                    </div>

                    <div className="bg-[#0d0d0d] rounded-xl p-6 mb-6">
                      <p className="text-sm text-gray-500 mb-2">Costo Total</p>
                      <p className="text-4xl md:text-5xl font-bold text-white">
                        {formatARS(calculos.prepaga.total)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Monto base (pauta)</span>
                        <span className="text-white font-medium">{formatARS(calculos.prepaga.base)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">IVA Servicios Digitales (21%)</span>
                        <span className="text-white">{formatARS(calculos.prepaga.ivaDigital)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Percepcion IIBB ({provincia.nombre} - {(provincia.tasa * 100).toFixed(1)}%)</span>
                        <span className="text-white">{formatARS(calculos.prepaga.percIIBB)}</span>
                      </div>
                    </div>
                  </>
                )}

                {selectedMethod === "bancaria" && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Tarjeta Bancaria</h3>
                        <p className="text-sm text-gray-500">Visa/Mastercard de Bancos</p>
                      </div>
                    </div>

                    <div className="bg-[#0d0d0d] rounded-xl p-6 mb-6">
                      <p className="text-sm text-gray-500 mb-2">Costo Total</p>
                      <p className="text-4xl md:text-5xl font-bold text-white">
                        {formatARS(calculos.bancaria.total)}
                      </p>
                      <p className="text-red-400 text-sm mt-3">
                        Pagas {formatARS(calculos.ahorroBancaria)} mas que con pago local
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Monto base (pauta)</span>
                        <span className="text-white font-medium">{formatARS(calculos.bancaria.base)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Percepcion Ganancias (30%)</span>
                        <span className="text-white">{formatARS(calculos.bancaria.percGanancias)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Percepcion IIBB ({provincia.nombre} - {(provincia.tasa * 100).toFixed(1)}%)</span>
                        <span className="text-white">{formatARS(calculos.bancaria.percIIBB)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#222]">
                        <span className="text-gray-400">Impuesto Sellos (1.2%)</span>
                        <span className="text-white">{formatARS(calculos.bancaria.impSellos)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Sidebar - Comparison */}
            <div className="space-y-6">
              <div className="bg-[#111] border border-[#222] rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#00DEC7]" />
                  Comparativa rápida de costos
                </h3>

                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border ${calculos.mejorOpcion === "local" ? "border-emerald-500 bg-emerald-500/10" : "border-[#222] bg-[#0d0d0d]"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Pago Local</span>
                      {calculos.mejorOpcion === "local" && (
                        <span className="text-xs bg-emerald-500 text-black px-2 py-0.5 rounded-full font-bold">MEJOR</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white">{formatARS(calculos.local.total)}</p>
                  </div>

                  <div className={`p-4 rounded-xl border ${calculos.mejorOpcion === "prepaga" ? "border-violet-500 bg-violet-500/10" : "border-[#222] bg-[#0d0d0d]"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Tarjeta Prepaga</span>
                      {calculos.mejorOpcion === "prepaga" && (
                        <span className="text-xs bg-violet-500 text-white px-2 py-0.5 rounded-full font-bold">MEJOR</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white">{formatARS(calculos.prepaga.total)}</p>
                    <p className="text-xs text-gray-500 mt-1">+{formatARS(calculos.ahorroPrepaga)} vs local</p>
                  </div>

                  <div className={`p-4 rounded-xl border ${calculos.mejorOpcion === "bancaria" ? "border-blue-500 bg-blue-500/10" : "border-[#222] bg-[#0d0d0d]"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Tarjeta Bancaria</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{formatARS(calculos.bancaria.total)}</p>
                    <p className="text-xs text-gray-500 mt-1">+{formatARS(calculos.ahorroBancaria)} vs local</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-[#00DEC7]/20 to-emerald-500/10 rounded-xl border border-[#00DEC7]/30">
                  <p className="text-sm text-gray-300 mb-1">Ahorro potencial</p>
                  <p className="text-3xl font-bold text-[#00DEC7]">
                    {formatARS(calculos.ahorroBancaria)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    usando pago local vs tarjeta bancaria
                  </p>
                </div>

                <Link
                  href="/contacto"
                  className="flex items-center justify-center gap-2 w-full bg-[#00DEC7] text-black font-semibold py-4 rounded-xl mt-6 hover:bg-[#00c9b4] transition-colors"
                >
                  Quiero asesoramiento
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Preguntas frecuentes sobre impuestos en Meta Ads Argentina 2026
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  q: "Que es el pago local de Meta Ads?",
                  a: "Es la opcion de pagar tu publicidad en Facebook e Instagram con medios de pago argentinos como MercadoPago o tarjetas de credito locales. Solo se aplica el 21% de IVA, sin percepciones adicionales."
                },
                {
                  q: "Por que pagar con tarjeta bancaria es mas caro?",
                  a: "Las tarjetas bancarias (Visa/Mastercard de bancos) tienen percepciones de Ganancias (30%), IIBB segun provincia, e Impuesto de Sellos (1.2%), ademas de usar el dolar MEP como referencia."
                },
                {
                  q: "Las tarjetas prepagas son mejor opcion?",
                  a: "Las prepagas como Uala, Lemon o MP no tienen percepcion de ganancias, pero si aplican IVA servicios digitales (21%) y IIBB segun tu provincia. Son mejor que bancarias pero peor que pago local."
                },
                {
                  q: "Como configuro el pago local en Meta?",
                  a: "En la configuracion de pagos de tu Business Manager, podes seleccionar 'Argentina' como pais y agregar MercadoPago o una tarjeta argentina como metodo de pago local."
                },
              ].map((faq, i) => (
                <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-[#00DEC7] flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#00DEC7] to-emerald-400 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
            ¿Necesitas ayuda con tus campañas de Meta Ads?
          </h2>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto text-lg">
            En Vektra somos especialistas en publicidad digital. Te ayudamos a optimizar 
            tu inversion y conseguir mejores resultados en Facebook e Instagram.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:info@vektra.digital"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-black/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              Escribinos por email
            </Link>
            <Link
              href="/servicios/marketing-digital"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Ver servicio de Marketing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
