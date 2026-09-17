"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LatestWorks } from "@/components/sections/latest-works"
import { allProjects } from "@/app/trabajos/data"
import { 
  ArrowRight, Check, Mail, User, MessageSquare,
  Search, FileText, Link2, MapPin, BarChart3, Settings,
  Bot, Sparkles, Globe, TrendingUp, ChevronLeft, ChevronRight, Star, Quote, ShoppingCart
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"
import { pushToDataLayer } from "@/lib/gtm"

interface SEOPageClientProps {
  testimonials: Testimonial[]
}


const marqueeItems = [
  { text: "SEO and Web Positioning", highlight: true },
  { text: "appear in the first results of Google" },
  { text: "SEO for Artificial Intelligence", highlight: true },
  { text: "rank on ChatGPT, Perplexity and Gemini" },
  { text: "Local SEO", highlight: true },
  { text: "stand out on Google Maps and local searches" },
  { text: "Professional SEO Audit", highlight: true },
  { text: "complete analysis of your website" },
  { text: "Link Building", highlight: true },
  { text: "increase your domain authority" },
]

const servicesIncluded = [
  "Complete SEO audit of your website",
  "Keyword and competition analysis",
  "On-Page Optimization (titles, metas, content)",
  "Technical SEO (speed, indexing, structure)",
  "Local SEO and Google My Business",
  "Link Building Strategy",
  "Optimization for AI search engines (ChatGPT, Perplexity)",
  "Content optimized for SEO",
  "Monthly results reports",
  "Continuous support and consulting",
]

const seoServices = [
  {
    title: "On-Page SEO",
    subtitle: "Internal optimization",
    description: "We optimize every page of your site: titles, meta descriptions, headings, content, images, and URL structure to maximize your ranking.",
    icon: FileText,
  },
  {
    title: "Technical SEO",
    subtitle: "Performance and crawling",
    description: "We improve loading speed, web architecture, indexing, sitemap, robots.txt, and all technical aspects that affect your ranking.",
    icon: Settings,
  },
  {
    title: "Local SEO",
    subtitle: "Geolocated searches",
    description: "We position your business in local searches. Google My Business optimization, reviews, and local citations.",
    icon: MapPin,
  },
  {
    title: "Link Building",
    subtitle: "Domain authority",
    description: "We build quality links from relevant sites to increase your domain authority and improve your position on Google.",
    icon: Link2,
  },
  {
    title: "SEO for AI",
    subtitle: "The future of SEO",
    description: "We optimize your content to appear in answers from ChatGPT, Perplexity, Gemini, and other artificial intelligence search engines.",
    icon: Bot,
  },
  {
    title: "Analysis and Reports",
    subtitle: "Result measurement",
    description: "Detailed reports of positions, organic traffic, conversions, and ROI. Continuous tracking with Google Analytics and Search Console.",
    icon: BarChart3,
  },
]

const processSteps = [
  { 
    step: "01", 
    title: "Audit", 
    subtitle: "Complete SEO", 
    description: "We analyze your current website, competition, keywords, and improvement opportunities.",
    highlight: "We identify what is working and what needs optimization."
  },
  { 
    step: "02", 
    title: "Strategy", 
    subtitle: "personalized", 
    description: "We create an action plan based on audit data, prioritizing high-impact actions.",
    highlight: null
  },
  { 
    step: "03", 
    title: "Implementation", 
    subtitle: "and optimization", 
    description: "We execute technical, on-page, and off-page improvements. We optimize existing content and create new content.",
    highlight: null
  },
  { 
    step: "04", 
    title: "Measurement", 
    subtitle: "and continuous improvement", 
    description: "We monitor results, adjust the strategy, and keep optimizing to maintain and improve positions.",
    highlight: "SEO is a continuous process, not a one-time project."
  },
]

const stats = [
  { value: "+150", label: "Websites positioned" },
  { value: "+500", label: "Keywords in Top 10" },
  { value: "+200%", label: "Average traffic increase" },
  { value: "8", label: "Years of experience" },
]

const faqs = [
  { 
    question: "How long does it take to see SEO results?", 
    answer: "SEO is a medium-to-long-term strategy. Generally, improvements start to be seen between 3-6 months, although it depends on sector competition, current site status, and target keywords. Technical improvements can have a faster impact, while ranking competitive keywords takes longer."
  },
  { 
    question: "What is SEO for Artificial Intelligence?", 
    answer: "It is the optimization of content to appear in the answers of AI search engines like ChatGPT, Perplexity, Gemini, and Copilot. These systems search the web for information to generate answers, and with the right techniques, we can make your business cited as a source. It is the future of web positioning."
  },
  { 
    question: "How much does SEO service cost?", 
    answer: "The cost of SEO varies according to site size, sector competition, and goals. We offer plans from basic services to complete strategies. Contact us for a personalized quote based on your specific needs."
  },
  { 
    question: "Do you do SEO for online stores and e-commerce?", 
    answer: "Yes, we have extensive experience in SEO for e-commerce worldwide. We optimize stores in WooCommerce, Shopify, and Tiendanube. We work on categories, products, technical sheets, and specific strategies to increase organic sales."
  },
  { 
    question: "What is the difference between SEO and Google Ads?", 
    answer: "Google Ads are paid advertisements that appear immediately but stop showing when you stop paying. SEO is organic positioning: it takes longer but results are long-lasting and you don't pay for every click. Ideally, combine both strategies."
  },
  { 
    question: "Do you work with international companies?", 
    answer: "Yes, we provide SEO services worldwide. We have clients in USA, Europe, and Latin America. We work 100% remotely with video call meetings."
  },
  { 
    question: "What does the free SEO audit include?", 
    answer: "The initial audit includes analysis of your current web situation, review of basic technical errors, analysis of main keywords, competition review, and initial recommendations. It is without obligation and helps you understand where you stand."
  },
  { 
    question: "Do you guarantee the first spot on Google?", 
    answer: "No serious agency can guarantee the first spot as Google constantly updates its algorithm. What we do guarantee is professional work, proven strategies, total transparency, and measurable improvements in your positioning. Our results speak for themselves."
  },
  { 
    question: "How do you measure SEO results?", 
    answer: "We use professional tools like Google Analytics, Google Search Console, SEMrush, and Ahrefs. We measure keyword positions, organic traffic, impressions, clicks, conversions, and ROI. We deliver detailed and easy-to-understand monthly reports."
  },
  { 
    question: "What is local SEO and why is it important?", 
    answer: "Local SEO optimizes your presence for geographic searches like 'restaurant in miami' or 'lawyer near me'. It includes Google My Business, reviews, local citations, and geolocated content. It is fundamental for businesses with a physical location or serving specific areas."
  },
]

const complements = [
  {
    title: "Digital Marketing",
    subtitle: "Boost your online presence",
    items: [
      "Google Ads and SEM",
      "Meta Ads",
      "TikTok Ads",
      "Email Marketing",
      "Remarketing",
      "Content Strategy",
    ],
    href: "/en/services/digital-marketing",
    icon: TrendingUp,
  },
  {
    title: "Web Development",
    subtitle: "SEO-optimized sites",
    items: [
      "Fast and optimized webs",
      "SEO-friendly architecture",
      "Core Web Vitals",
      "Schema markup",
      "Responsive design",
      "WordPress and Next.js",
    ],
    href: "/en/services/web-design",
    icon: Globe,
  },
  {
    title: "Online Store",
    subtitle: "Positioned E-commerce",
    items: [
      "SEO for products",
      "Optimized sheets",
      "SEO-friendly categories",
      "Marketplace integration",
      "WooCommerce and Shopify",
      "Tiendanube",
    ],
    href: "/en/services/online-store",
    icon: ShoppingCart,
  },
]

export default function SEOPageClient({ testimonials }: SEOPageClientProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)
  const [formStartTime, setFormStartTime] = useState(Date.now())

  useEffect(() => {
    setFormStartTime(Date.now())
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      mensaje: formData.get("mensaje") as string,
      servicio: "SEO and Web Positioning (EN)",
      website: formData.get("website") as string,
      formStartTime,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        pushToDataLayer("form_submit", {
          form_name: "SEO Audit Form",
          service: "SEO and Web Positioning (EN)",
        })
        formRef.current?.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-[#111] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00DEC7]/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00DEC7]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[#00DEC7] text-sm font-medium mb-4">
                <Search className="h-4 w-4" />
                SEO Experts
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                SEO Positioning &{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Organic Growth</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}
                <span className="font-extrabold">Worldwide</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
                Improve your visibility in Google and attract quality traffic to your website. SEO strategies tailored to rank your business in global markets.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 font-semibold" asChild>
                  <Link href="#contact">
                    <Search className="mr-2 h-4 w-4" />
                    Free SEO Audit
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <Globe className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">Google</h3>
                    <p className="text-gray-400 text-sm">First positions</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <Bot className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">ChatGPT</h3>
                    <p className="text-gray-400 text-sm">SEO for AI</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <Sparkles className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">Perplexity</h3>
                    <p className="text-gray-400 text-sm">Cited answers</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                    <TrendingUp className="h-8 w-8 text-[#00DEC7] mb-3" />
                    <h3 className="text-white font-semibold">Results</h3>
                    <p className="text-gray-400 text-sm">+200% traffic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#00DEC7] py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 text-sm font-medium text-black">
                {item.highlight ? (
                  <strong>{item.text}</strong>
                ) : (
                  item.text
                )}
                <span className="mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEO para IA Section - NEW */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#111] to-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#00DEC7]/10 text-[#00DEC7] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                New: SEO for Artificial Intelligence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The future of SEO is here: Rank on ChatGPT, Perplexity, and Gemini
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                AI search engines are revolutionizing how people find information. 
                When someone asks ChatGPT &ldquo;what is the best web development agency&rdquo;, 
                <strong className="text-white"> your business can be the answer</strong>.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                We optimize your content with specific techniques so that Large Language Models 
                (LLMs) cite your website as a reliable source. It&apos;s time to get ahead of your competition.
              </p>
              <ul className="space-y-3">
                {[
                  "Content optimization for LLMs",
                  "Data structure for citation",
                  "Topical authority and E-E-A-T",
                  "Optimized conversational content",
                  "AI mention monitoring",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <Check className="h-5 w-5 text-[#00DEC7] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-2xl p-8 border border-[#00DEC7]/20">
                <div className="bg-black/50 rounded-xl p-6 mb-4">
                  <p className="text-gray-400 text-sm mb-2">User asks:</p>
                  <p className="text-white font-medium">&ldquo;What is the best web development agency?&rdquo;</p>
                </div>
                <div className="bg-[#00DEC7]/10 rounded-xl p-6">
                  <p className="text-[#00DEC7] text-sm mb-2">ChatGPT answers:</p>
                  <p className="text-white">&ldquo;<strong>Vektra</strong> is a prominent global digital agency, specializing in web development, mobile applications, and AI solutions...&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Incluidos Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                We take care of everything
              </h2>
              <p className="text-black/80 text-lg leading-relaxed mb-8">
                Our SEO service includes everything needed to position your business 
                on Google and AI search engines. No surprises or hidden costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10 bg-transparent" asChild>
                  <Link href="#contact">
                    Request Quote
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-black/10 rounded-2xl p-8">
              <ul className="grid gap-3">
                {servicesIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span className="text-black font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Professional SEO Services
            </h2>
            <p className="text-gray-600">
              Complete web positioning strategies for companies worldwide
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {seoServices.map((service) => (
              <div key={service.title} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#00DEC7]/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-[#00DEC7]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-1">{service.title}</h3>
                <p className="text-[#00DEC7] text-sm font-medium mb-3">{service.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goal Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Goal
            </h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Increase your online visibility and generate more customers</strong>. 
              4 steps to position your business on Google and AI search engines with{" "}
              <strong className="text-white font-bold">measurable and lasting results</strong>.
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

      {/* Trajectory Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Professional trajectory<br/>
              <span className="text-white/80">backed by results</span>
            </h2>
            <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
              Throughout these years as SEO experts, we have positioned hundreds of websites 
              worldwide. The following data reflects our commitment to results.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="text-5xl lg:text-6xl font-bold text-white">{stat.value}</span>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials 
        items={testimonials}
        title="What they say about our SEO service"
        subtitle="Real results from clients worldwide who trusted us"
      />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Frequently Asked Questions about SEO
              </h2>
              <p className="text-gray-600 mb-8">
                We answer your questions about web positioning
              </p>
              <div className="bg-[#00DEC7]/10 rounded-xl p-6">
                <p className="text-black font-medium mb-4">
                  Do you have more questions? Contact us <span className="font-semibold text-[#00DEC7]">without obligation</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90" asChild>
                    <a href="mailto:info@vektra.digital">
                      Email us
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-black hover:text-[#00DEC7] py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Request your Free SEO Audit
            </h2>
            <p className="text-gray-600">
              We analyze your website and show you how to improve your ranking
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            {submitStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Message sent</h3>
                <p className="text-gray-600">We will contact you shortly to coordinate your free SEO audit.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Name *"
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00DEC7] transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00DEC7] transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="mensaje"
                    placeholder="Tell us about your website and your positioning goals..."
                    rows={4}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00DEC7] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="privacy" required className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I have read and accept the{" "}
                    <Link href="/en/privacy-policy" className="text-[#00DEC7] hover:underline">
                      privacy policy
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request Free Audit"}
                </Button>

                {submitStatus === "error" && (
                  <p className="text-red-500 text-center">Error sending. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Complementos Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Add-ons
            </h2>
            <p className="mt-2 text-black/70 tracking-widest uppercase text-sm">
              You may also be interested in
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complements.map((comp) => (
              <Link
                key={comp.title}
                href={comp.href}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <comp.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black mb-1">{comp.title}</h3>
                <p className="text-black/70 text-sm italic mb-6">{comp.subtitle}</p>
                <ul className="space-y-2 mb-6">
                  {comp.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-black text-sm">
                      <Check className="h-4 w-4 text-black" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div 
                  className="mt-auto inline-flex items-center gap-2 text-black font-semibold"
                >
                  <span className="underline-offset-4 group-hover:underline">More info</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  )
}
