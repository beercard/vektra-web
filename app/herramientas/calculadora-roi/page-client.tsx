"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { 
  Calculator, DollarSign, TrendingUp, TrendingDown, 
  ArrowRight, BarChart3, PieChart, Target, RefreshCw,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CalculadoraROIClient() {
  const [ingresos, setIngresos] = useState<string>("500000")
  const [inversion, setInversion] = useState<string>("100000")
  const [costos, setCostos] = useState<string>("50000") // Costos adicionales (producto, operativos)

  const calculos = useMemo(() => {
    const ing = parseFloat(ingresos) || 0
    const inv = parseFloat(inversion) || 0
    const cost = parseFloat(costos) || 0
    
    const costoTotal = inv + cost
    const gananciaBruta = ing - costoTotal
    const roi = costoTotal > 0 ? (gananciaBruta / costoTotal) * 100 : 0
    const roas = inv > 0 ? (ing / inv) : 0 // Return on Ad Spend (solo considera inversión publicitaria)
    const margen = ing > 0 ? (gananciaBruta / ing) * 100 : 0

    return {
      ing,
      inv,
      cost,
      costoTotal,
      gananciaBruta,
      roi,
      roas,
      margen,
      esRentable: gananciaBruta > 0
    }
  }, [ingresos, inversion, costos])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] pt-28 pb-12 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="lg:max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-[#00DEC7]/10 border border-[#00DEC7]/30 px-3 py-1.5 rounded-full">
                  <BarChart3 className="h-4 w-4 text-[#00DEC7]" />
                  <span className="text-[#00DEC7] text-xs font-medium">Herramienta Gratuita</span>
                </div>
                <span className="text-gray-500 text-xs">Actualizado 2026</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Calculadora de <span className="text-[#00DEC7]">ROI</span>
                <br />Marketing
              </h1>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                Calcula el Retorno de Inversión (ROI) y el Retorno de Inversión Publicitaria (ROAS) de tus campañas. Descubre si tu estrategia es rentable y optimiza tu presupuesto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-[#f5f5f5]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Inputs Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#00DEC7]" />
                  Datos de la Campaña
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="ingresos" className="text-gray-700 font-medium">Ingresos Totales</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">Monto total facturado gracias a la campaña o periodo analizado.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="ingresos" 
                        type="number" 
                        value={ingresos}
                        onChange={(e) => setIngresos(e.target.value)}
                        className="pl-9 bg-gray-50 border-gray-200 focus:ring-[#00DEC7] focus:border-[#00DEC7]"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="inversion" className="text-gray-700 font-medium">Inversión Publicitaria</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">Gasto directo en plataformas de anuncios (Google Ads, Meta Ads, etc.).</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="inversion" 
                        type="number" 
                        value={inversion}
                        onChange={(e) => setInversion(e.target.value)}
                        className="pl-9 bg-gray-50 border-gray-200 focus:ring-[#00DEC7] focus:border-[#00DEC7]"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="costos" className="text-gray-700 font-medium">Otros Costos</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">Costos de producto, servicios, agencias o herramientas necesarios para la venta.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="costos" 
                        type="number" 
                        value={costos}
                        onChange={(e) => setCostos(e.target.value)}
                        className="pl-9 bg-gray-50 border-gray-200 focus:ring-[#00DEC7] focus:border-[#00DEC7]"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      setIngresos("0")
                      setInversion("0")
                      setCostos("0")
                    }}
                    variant="outline" 
                    className="w-full text-gray-500 hover:text-black"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Limpiar datos
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Main ROI Card */}
                <div className={`rounded-2xl p-6 border shadow-sm ${calculos.esRentable ? 'bg-black border-gray-800' : 'bg-red-950 border-red-900'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white/80">ROI (Retorno de Inversión)</h3>
                    {calculos.esRentable ? (
                      <TrendingUp className="h-6 w-6 text-[#00DEC7]" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${calculos.esRentable ? 'text-[#00DEC7]' : 'text-red-500'}`}>
                      {formatPercent(calculos.roi)}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    Por cada $1 invertido, {calculos.esRentable ? 'ganas' : 'pierdes'} {formatCurrency(Math.abs(calculos.roi / 100))} adicionales.
                  </p>
                </div>

                {/* Profit Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">Ganancia Neta</h3>
                    <DollarSign className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${calculos.esRentable ? 'text-black' : 'text-red-600'}`}>
                      {formatCurrency(calculos.gananciaBruta)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Ingresos - (Inversión + Costos)
                  </p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-6">Métricas Detalladas</h3>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      ROAS
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-56 text-xs">Retorno sobre la Inversión Publicitaria. Ingresos / Inversión en Ads.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </p>
                    <p className="text-2xl font-bold text-black">{calculos.roas.toFixed(2)}x</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(calculos.roas * 10, 100)}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      Margen de Ganancia
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-56 text-xs">Porcentaje de ganancia sobre los ingresos totales.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </p>
                    <p className="text-2xl font-bold text-black">{formatPercent(calculos.margen)}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(calculos.margen, 100)}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Costo Total</p>
                    <p className="text-2xl font-bold text-black">{formatCurrency(calculos.costoTotal)}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">¿Qué es el ROI en Marketing?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                El <strong>ROI (Return on Investment)</strong> o Retorno de Inversión es la métrica más importante para evaluar la rentabilidad de cualquier estrategia de marketing digital. Te permite saber cuánto dinero estás ganando (o perdiendo) por cada peso invertido en publicidad, herramientas o servicios.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">Fórmula del ROI</h3>
                <p className="text-gray-600 font-mono bg-white p-3 rounded border border-gray-200 text-sm">
                  ROI = ((Ingresos - Costos) / Costos) x 100
                </p>
                <p className="text-gray-500 text-sm mt-3">
                  El resultado se expresa en porcentaje. Un ROI positivo significa ganancia, uno negativo significa pérdida.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">Diferencia con el ROAS</h3>
                <p className="text-gray-600 text-sm">
                  El <strong>ROAS</strong> solo mide los ingresos brutos sobre la inversión publicitaria. El <strong>ROI</strong> considera todos los costos y calcula la ganancia real. El ROI es la métrica definitiva de negocio.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-black mb-6">¿Cómo mejorar tu ROI?</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#00DEC7]/10 flex items-center justify-center text-[#00DEC7] font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-black">Optimiza tus Campañas</h4>
                    <p className="text-gray-600 text-sm">Mejora la segmentación y los creativos en Meta Ads y Google Ads para reducir el costo por adquisición (CPA).</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#00DEC7]/10 flex items-center justify-center text-[#00DEC7] font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-black">Aumenta la Tasa de Conversión</h4>
                    <p className="text-gray-600 text-sm">Una web rápida y optimizada (CRO) convierte más visitas en clientes sin aumentar la inversión publicitaria.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#00DEC7]/10 flex items-center justify-center text-[#00DEC7] font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-black">Fideliza Clientes (LTV)</h4>
                    <p className="text-gray-600 text-sm">Venderle de nuevo a un cliente existente es más barato que adquirir uno nuevo. Implementa Email Marketing y estrategias de retención.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#00DEC7] rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-black mb-4">¿Necesitas mejorar la rentabilidad de tu negocio?</h2>
              <p className="text-black/80 mb-6">
                En Vektra nos especializamos en estrategias de alto rendimiento para maximizar tu ROI sin importar en qué país operes.
              </p>
              <Link href="/contacto">
                <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-full border-none">
                  Solicitar Auditoría Gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
