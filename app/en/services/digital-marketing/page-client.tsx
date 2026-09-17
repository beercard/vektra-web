"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, Mail, User, MessageSquare, Monitor, ShoppingCart, Bot, ArrowRight } from "lucide-react"
import { pushToDataLayer } from "@/lib/gtm"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

interface DigitalMarketingClientProps {
  testimonials: Testimonial[]
}

// Marquee items for marketing digital
const marqueeItems = [
  "Digital Marketing",
  "Social Media Ads",
  "Google Ads",
  "Content Strategy",
  "Global Growth",
  "ROI Focused",
  "Brand Awareness",
  "Digital Marketing",
  "Social Media Ads",
  "Google Ads",
  "Content Strategy",
  "Global Growth",
  "ROI Focused",
  "Brand Awareness",
];

// Services included in marketing digital
const servicesIncluded = [
  {
    title: "Google Ads",
    description: "Get more visits to your store or business, receive more calls, and increase visits to your website. Show your ads in the top positions of Google searches. Necessary to make your business known globally.",
  },
  {
    title: "Meta Ads",
    description: "Campaigns on the Meta platform with advanced segmentation, lookalike audiences, and focus on conversions. Ideal for sales, leads, and brand awareness.",
  },
  {
    title: "TikTok Ads",
    description: "Reach Gen Z and millennials with creative video ads. TikTok is the fastest-growing platform globally, ideal for brands looking to connect with young audiences.",
  },
  {
    title: "SEO Positioning",
    description: "Climb rankings organically in Google search results through on-page and off-page actions. Global and Local SEO strategies.",
  },
  {
    title: "Google My Business",
    description: "Be visible in Google searches and turn them into customers. We create your business profile so your company stands out and has an online presence, increasing visibility so your customers can easily find you on Google Maps.",
  },
  {
    title: "Email Marketing",
    description: "Increase your conversions and turn your leads (potential customers) into customers through email. Tool with the highest ROI by far. Campaigns with Mailchimp, Omnisend, and more.",
  },
  {
    title: "Google Analytics",
    description: "Know how users interact with your website. Analyze data and discover what works and what doesn&apos;t on your site. Make decisions based on real data.",
  },
]

// Process steps
const processSteps = [
  { 
    step: "01", 
    title: "Analysis", 
    subtitle: "of your business", 
    description: "We study your business, competition, and your target market to define the most effective strategy.",
    highlight: "We define clear and measurable goals."
  },
  { 
    step: "02", 
    title: "Strategy", 
    subtitle: "personalized", 
    description: "We create a digital marketing plan adapted to your budget and goals, selecting the most effective platforms.",
    highlight: null
  },
  { 
    step: "03", 
    title: "Implementation", 
    subtitle: "and launch", 
    description: "We configure campaigns, create ads, and launch on selected platforms with constant tracking.",
    highlight: null
  },
  { 
    step: "04", 
    title: "Optimization", 
    subtitle: "and results", 
    description: "We monitor performance and constantly optimize to maximize return on investment.",
    highlight: "The goal: generate leads and sales from day one."
  },
]

// Portfolio items
const portfolioItems = [
  { title: "Google Ads Campaign - Real Estate", category: "Google Ads", image: "/placeholder.svg?height=400&width=600" },
  { title: "Meta Ads Campaign - Restaurant", category: "Meta Ads", image: "/placeholder.svg?height=400&width=600" },
  { title: "Meta Ads - E-commerce", category: "Meta Ads", image: "/placeholder.svg?height=400&width=600" },
  { title: "Local SEO - Clinic", category: "SEO", image: "/placeholder.svg?height=400&width=600" },
  { title: "TikTok Ads - Fashion", category: "TikTok Ads", image: "/placeholder.svg?height=400&width=600" },
  { title: "Email Marketing - SaaS", category: "Email Marketing", image: "/placeholder.svg?height=400&width=600" },
  { title: "Meta Ads - Fitness", category: "Meta Ads", image: "/placeholder.svg?height=400&width=600" },
  { title: "Google Business Profile - Services", category: "GBP", image: "/placeholder.svg?height=400&width=600" },
]

// Stats
const stats = [
  { value: 10, prefix: "+", suffix: "", label: "Years of experience" },
  { value: 50, prefix: "+", suffix: "", label: "Managed campaigns" },
  { value: 45, prefix: "+", suffix: "", label: "5-star reviews" },
  { value: 500, prefix: "+", suffix: "K", label: "Invested in Ads" },
]

// FAQs for marketing digital
const faqs = [
  { question: "What is digital marketing and why do I need it?", answer: "Digital marketing gathers promotion strategies in search engines, ad platforms, and email. It is essential because your audience is online. Worldwide, more than 80% of people search for products and services on the internet before buying." },
  { question: "How much does a Google Ads campaign cost?", answer: "The Google Ads budget is flexible and defined by you. We recommend starting with a minimum budget to see results. Added to this is our management fee which includes ad creation, tracking, and constant optimization." },
  { question: "What is the difference between Google Ads and Meta Ads?", answer: "Google Ads captures purchase intent at the exact moment of search. Meta Ads works with segmentation by interests, behaviors, and audiences to generate demand. The combination usually boosts results." },
  { question: "Is TikTok Ads useful for your business?", answer: "TikTok is ideal if your target audience is between 16-35 years old. It is the fastest-growing platform and offers very competitive costs per click. It works very well for fashion, gastronomy, entertainment, and brands that want a fresh and modern image." },
  { question: "How long does SEO take to show results?", answer: "SEO is a medium-to-long-term strategy. Generally, results start to be seen between 3-6 months, depending on sector competition. However, results are long-lasting and organic traffic has no cost per click." },
  { question: "What is Google Business Profile and why is it important?", answer: "Google Business Profile is your business listing that appears on Google and Google Maps. It is free and fundamental for local businesses. It allows your customers to find you, see your hours, photos, reviews, and contact you directly." },
  { question: "How do you measure campaign results?", answer: "We use Google Analytics, Meta Business Suite, and the native tools of each platform. We send you monthly reports with key metrics: impressions, clicks, conversions, cost per result, and ROI. Everything transparent and measurable." },
  { question: "Do you work with international companies?", answer: "Yes, we work with clients worldwide. Meetings are held by video call and communication is fluid. We have experience in campaigns for different countries with specific geographic segmentation." },
  { question: "What email marketing platforms do you use?", answer: "We work mainly with Mailchimp and Omnisend, which are the most popular and effective. We configure automations, welcome sequences, abandoned carts, and promotional campaigns to maximize your conversions." },
]

// Complementary services
const complementaryServices = [
  {
    title: "Web Design",
    subtitle: "Your professional online presence",
    features: ["Optimized landing pages", "Corporate websites", "Responsive design", "SEO Optimization", "Ads Integration", "Google Analytics"],
    href: "/en/services/web-design",
    icon: Monitor
  },
  {
    title: "Online Store",
    subtitle: "Sell your products 24/7",
    features: ["Complete E-commerce", "MercadoPago Integration", "Product catalog", "Order management", "Remarketing campaigns", "Conversion Pixel"],
    href: "/en/services/online-store",
    icon: ShoppingCart
  },
  {
    title: "AI Agents",
    subtitle: "Automate your customer service",
    features: ["Intelligent chatbots", "24/7 Service", "WhatsApp Integration", "Automatic responses", "Lead generation", "Conversation analysis"],
    href: "/en/services/ai-agents",
    icon: Bot
  },
]

export default function DigitalMarketingClient({ testimonials }: DigitalMarketingClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const statsRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          stats.forEach((stat, index) => {
            let start = 0
            const end = stat.value
            const duration = 2000
            const increment = end / (duration / 16)
            
            const timer = setInterval(() => {
              start += increment
              if (start >= end) {
                start = end
                clearInterval(timer)
              }
              setAnimatedStats(prev => {
                const newStats = [...prev]
                newStats[index] = Math.floor(start)
                return newStats
              })
            }, 16)
          })
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28 w-full">
          <div className="grid items-center gap-12">
            <div className="relative z-10">
              <span className="inline-flex items-center text-base sm:text-lg text-white mb-4">
                <span className="mr-2">👋</span> We are Vektra, your marketing expert team
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 uppercase">Digital Marketing Agency</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}
                <span className="font-extrabold">Worldwide</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                Specialists in <strong className="text-white">Google Ads</strong>,{" "}
                <strong className="text-white">Meta Ads</strong> and{" "}
                <strong className="text-white">TikTok Ads</strong> focused on results.
              </p>
              
              <p className="mt-4 text-white/80">
                Goal: <span className="text-[#00DEC7] font-semibold">more visits, more customers, and more sales</span>{" "}
                for your business with effective digital marketing strategies.
              </p>

              <p className="mt-4 text-white/80 max-w-xl">
                We provide service <strong className="text-white">worldwide</strong>, with segmentation and strategy specific to each country.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="#form">Let&apos;s talk?</Link>
                </Button>
                
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-black">Google</span>
                      <span className="font-bold text-black">5.0</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">+45 reviews</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2">
                  <Image
                    src="https://www.gstatic.com/partners/badge/images/2023/PartnerBadgeClickable.svg"
                    alt="Google Partners"
                    width={92}
                    height={20}
                    className="h-5 w-auto"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2">
                  <Image
                    src="https://www.gstatic.com/images/branding/product/2x/meta_48dp.png"
                    alt="Meta Partners"
                    width={24}
                    height={24}
                    className="h-5 w-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 text-sm">
                {/* Simplified marquee logic */}
                <span className="text-[#00DEC7] font-semibold">{item}</span>
                <span className="mx-4 text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Column - Services List */}
            <div>
              {servicesIncluded.map((service, index) => (
                <div key={service.title} className={`flex gap-4 ${index > 0 ? 'mt-6' : ''}`}>
                  <div className="shrink-0 mt-1">
                    <div className="flex h-5 w-5 items-center justify-center rounded border border-[#00DEC7]">
                      <Check className="h-3 w-3 text-[#00DEC7]" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{service.title}</h4>
                    <p className="mt-1 text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                  <Link href="#form" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Get Quote
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Illustration and Tools */}
            <div className="flex flex-col items-center">
              {/* Marketing Illustration - Placeholder SVG */}
              <div className="relative w-full max-w-md aspect-square mb-8">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <rect x="80" y="120" width="240" height="160" rx="8" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
                  <rect x="90" y="130" width="220" height="140" rx="4" fill="#2a2a2a"/>
                  <rect x="110" y="150" width="80" height="60" fill="#00DEC7" opacity="0.3" rx="4"/>
                  <rect x="200" y="180" width="90" height="30" fill="#00DEC7" opacity="0.5" rx="4"/>
                  <circle cx="245" cy="165" r="20" fill="#00DEC7" opacity="0.4"/>
                  <rect x="120" y="190" width="15" height="15" fill="#00DEC7"/>
                  <rect x="140" y="180" width="15" height="25" fill="#00DEC7"/>
                  <rect x="160" y="170" width="15" height="35" fill="#00DEC7"/>
                  <circle cx="340" cy="220" r="25" fill="#FFD5B5"/>
                  <rect x="310" y="250" width="60" height="80" rx="10" fill="#00DEC7"/>
                  <rect x="320" y="330" width="15" height="40" fill="#1a1a1a"/>
                  <rect x="345" y="330" width="15" height="40" fill="#1a1a1a"/>
                  <rect x="60" y="80" width="8" height="60" fill="#FF6B6B" rx="2"/>
                  <rect x="360" y="100" width="8" height="50" fill="#4ECDC4" rx="2"/>
                  <circle cx="280" cy="100" r="20" fill="none" stroke="#666" strokeWidth="4"/>
                  <circle cx="280" cy="100" r="8" fill="#666"/>
                  <circle cx="310" cy="120" r="12" fill="none" stroke="#666" strokeWidth="3"/>
                  <circle cx="310" cy="120" r="5" fill="#666"/>
                  <text x="200" y="110" textAnchor="middle" fill="#00DEC7" fontSize="14" fontWeight="bold">Business Plan</text>
                </svg>
              </div>

              {/* Tools Section */}
              <div className="w-full text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 block">Tools</span>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image src="https://www.gstatic.com/images/branding/product/2x/meta_48dp.png" alt="Meta Ads" width={28} height={28} className="h-7 w-7" />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Meta<br/>Ads</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                    </div>
                    <span className="text-xs mt-2 text-gray-600">TikTok<br/>Ads</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image src="https://www.gstatic.com/images/branding/product/2x/ads_48dp.png" alt="Google Ads" width={28} height={28} className="h-7 w-7" />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Google<br/>Ads</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image src="https://www.gstatic.com/images/branding/product/2x/google_my_business_48dp.png" alt="Google My Business" width={28} height={28} className="h-7 w-7" />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Google<br/>My Business</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image src="https://www.gstatic.com/images/branding/product/2x/analytics_48dp.png" alt="Google Analytics" width={28} height={28} className="h-7 w-7" />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Google<br/>Analytics</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                      <Image src="https://www.gstatic.com/images/branding/product/2x/tag_manager_48dp.png" alt="Google Tag Manager" width={32} height={32} className="h-8 w-8" />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">Tag<br/>Manager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal Section - Black Background */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Goal
            </h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Increase your online visibility and generate sales</strong>. 4 steps to create a digital marketing strategy that generates{" "}
              <strong className="text-white font-bold">real results for your business</strong>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">
                  {item.title}<br/>{item.subtitle}
                </h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                  {item.highlight && (
                    <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Latest Work</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">Digital Marketing</p>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.title}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[#00DEC7] text-xs uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-bold mt-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
              <Link href="/en/portfolio">View all works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trajectory Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Professional trajectory<br />backed by results
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              Throughout these years as a <span className="text-white">digital marketing team</span>, 
              we have worked with clients <span className="text-white">worldwide</span> who vouch for our experience and commitment. 
              The following data reflects the <span className="text-white">growth</span> and trust 
              that our clients have placed in us.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {stat.prefix}{animatedStats[index]}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials 
        items={testimonials}
        title="What they say about us"
        subtitle="As a digital marketing team"
      />

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">Digital Marketing</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white text-sm pr-4">{faq.question}</span>
                  <span className="text-[#00DEC7] shrink-0">
                    {openFaq === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Do you have any other questions?
            </h3>
            <p className="mt-2 text-gray-400">
              Contact us <span className="text-white font-semibold">without obligation</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent">
                <Link href="#form" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Write to us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="form" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="relative hidden lg:block">
              <svg viewBox="0 0 500 500" className="w-full max-w-lg mx-auto">
                <ellipse cx="280" cy="420" rx="100" ry="20" fill="#e0e0e0"/>
                <path d="M280 100 L320 300 L280 280 L240 300 Z" fill="#00DEC7"/>
                <circle cx="280" cy="180" r="30" fill="#1a1a1a"/>
                <circle cx="280" cy="180" r="15" fill="#00DEC7" opacity="0.5"/>
                <path d="M240 300 L220 350 L260 320 Z" fill="#1a1a1a"/>
                <path d="M320 300 L340 350 L300 320 Z" fill="#1a1a1a"/>
                <ellipse cx="280" cy="320" rx="20" ry="40" fill="#FF6B6B"/>
                <ellipse cx="280" cy="340" rx="12" ry="25" fill="#FFE66D"/>
                <ellipse cx="200" cy="380" rx="40" ry="20" fill="#00DEC7" opacity="0.3"/>
                <ellipse cx="360" cy="400" rx="50" ry="25" fill="#00DEC7" opacity="0.3"/>
                <ellipse cx="280" cy="410" rx="60" ry="30" fill="#00DEC7" opacity="0.4"/>
                <circle cx="150" cy="320" r="25" fill="#FFD5B5"/>
                <rect x="125" y="350" width="50" height="70" rx="10" fill="#1a1a1a"/>
                <rect x="130" y="420" width="15" height="40" fill="#1a1a1a"/>
                <rect x="155" y="420" width="15" height="40" fill="#1a1a1a"/>
                <line x1="175" y1="370" x2="220" y2="350" stroke="#FFD5B5" strokeWidth="12" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <div className="bg-[#00DEC7] rounded-2xl p-6 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
                  Ready to boost<br />your online business?
                </h2>
              </div>

              <p className="text-center mb-2 font-semibold text-black">Consult us without obligation</p>
              <p className="text-center text-gray-600 text-sm mb-8">
                Write to us at{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                or send us the following form and{" "}
                <span className="font-semibold">we will respond in less than 24 hours</span>.
              </p>

              <form className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                    required
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    placeholder="Message *"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7] resize-none"
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="policy"
                    checked={acceptedPolicy}
                    onChange={(e) => setAcceptedPolicy(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="policy" className="text-xs text-gray-600">
                    I have read and accept the <a href="/en/privacy-policy" className="underline">privacy policy</a>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full py-3 font-semibold">
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Services Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Add-ons</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-black/60">You may also be interested in</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementaryServices.map((service) => (
              <div
                key={service.title}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mt-1">{service.subtitle}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-black/80">
                      <Check className="h-4 w-4 text-black shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-black font-semibold">
                  <span className="underline-offset-4 group-hover:underline">More info</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
