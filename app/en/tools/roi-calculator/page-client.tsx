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

export default function ROICalculatorClient() {
  const [ingresos, setIngresos] = useState<string>("5000")
  const [inversion, setInversion] = useState<string>("1000")
  const [costos, setCostos] = useState<string>("500") 

  const calculos = useMemo(() => {
    const ing = parseFloat(ingresos) || 0
    const inv = parseFloat(inversion) || 0
    const cost = parseFloat(costos) || 0
    
    const costoTotal = inv + cost
    const gananciaBruta = ing - costoTotal
    const roi = costoTotal > 0 ? (gananciaBruta / costoTotal) * 100 : 0
    const roas = inv > 0 ? (ing / inv) : 0 
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat("en-US", {
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
                  <span className="text-[#00DEC7] text-xs font-medium">Free Tool</span>
                </div>
                <span className="text-gray-500 text-xs">Updated 2026</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Marketing <span className="text-[#00DEC7]">ROI</span>
                <br />Calculator
              </h1>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                Calculate the Return on Investment (ROI) and Return on Ad Spend (ROAS) of your campaigns. Find out if your strategy is profitable and optimize your budget.
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
                  Campaign Data
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="ingresos" className="text-gray-700 font-medium">Total Revenue</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">Total amount billed thanks to the campaign or period analyzed.</p>
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
                      <Label htmlFor="inversion" className="text-gray-700 font-medium">Ad Spend</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">Direct spend on ad platforms (Google Ads, Meta Ads, etc.).</p>
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
                      <Label htmlFor="costos" className="text-gray-700 font-medium">Other Costs</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">Product costs, services, agencies, or tools needed for the sale.</p>
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
                    Clear Data
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
                    <h3 className="text-lg font-medium text-white/80">ROI (Return on Investment)</h3>
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
                    For every $1 invested, you {calculos.esRentable ? 'earn' : 'lose'} {formatCurrency(Math.abs(calculos.roi / 100))} extra.
                  </p>
                </div>

                {/* Profit Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">Net Profit</h3>
                    <DollarSign className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${calculos.esRentable ? 'text-black' : 'text-red-600'}`}>
                      {formatCurrency(calculos.gananciaBruta)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Revenue - (Ad Spend + Costs)
                  </p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-6">Detailed Metrics</h3>
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
                            <p className="w-56 text-xs">Return on Ad Spend. Revenue / Ad Spend.</p>
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
                      Profit Margin
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-56 text-xs">Profit percentage over total revenue.</p>
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
                    <p className="text-sm text-gray-500">Total Cost</p>
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
              <h2 className="text-3xl font-bold text-black mb-6">What is Marketing ROI?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                <strong>ROI (Return on Investment)</strong> is the most important metric for evaluating the profitability of any digital marketing strategy. It allows you to know how much money you are earning (or losing) for every dollar invested in advertising, tools, or services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">ROI Formula</h3>
                <p className="text-gray-600 font-mono bg-white p-3 rounded border border-gray-200 text-sm">
                  ROI = ((Revenue - Costs) / Costs) x 100
                </p>
                <p className="text-gray-500 text-sm mt-3">
                  The result is expressed as a percentage. A positive ROI means profit, a negative one means loss.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">Difference from ROAS</h3>
                <p className="text-gray-600 text-sm">
                  <strong>ROAS</strong> only measures gross revenue over ad spend. <strong>ROI</strong> considers all costs and calculates real profit. ROI is the definitive business metric.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-black mb-6">How to improve your ROI?</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#00DEC7]/10 flex items-center justify-center text-[#00DEC7] font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-black">Optimize your Campaigns</h4>
                    <p className="text-gray-600 text-sm">Improve targeting and creatives in Meta Ads and Google Ads to reduce cost per acquisition (CPA).</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#00DEC7]/10 flex items-center justify-center text-[#00DEC7] font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-black">Increase Conversion Rate</h4>
                    <p className="text-gray-600 text-sm">A fast and optimized web (CRO) converts more visitors into customers without increasing ad spend.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#00DEC7]/10 flex items-center justify-center text-[#00DEC7] font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-black">Customer Loyalty (LTV)</h4>
                    <p className="text-gray-600 text-sm">Selling again to an existing customer is cheaper than acquiring a new one. Implement Email Marketing and retention strategies.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#00DEC7] rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-black mb-4">Need to improve your business profitability?</h2>
              <p className="text-black/80 mb-6">
                At Vektra, we specialize in high-performance strategies to maximize your ROI, wherever your business operates.
              </p>
              <Link href="/en/contact">
                <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-full border-none">
                  Request Free Audit
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
