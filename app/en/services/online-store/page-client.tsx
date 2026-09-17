"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, CreditCard, Truck, Smartphone, Monitor, ShieldCheck, TrendingUp, ArrowRight, User, Mail, MessageSquare } from "lucide-react"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

interface OnlineStoreClientProps {
  testimonials: Testimonial[]
}

// Marquee items
const marqueeItems = [
  "Online Store",
  "E-commerce",
  "Sell 24/7",
  "Global Sales",
  "Secure Payments",
  "Order Management",
  "Custom Design",
  "Online Store",
  "E-commerce",
  "Sell 24/7",
  "Global Sales",
  "Secure Payments",
  "Order Management",
  "Custom Design",
]

// Services included
const servicesIncluded = [
  {
    title: "Product Catalog",
    description: "Unlimited upload of products with photos, descriptions, prices, stock, and variants (sizes, colors, etc.). Easy management from the admin panel.",
  },
  {
    title: "Payment Gateways",
    description: "Integration with the most popular payment methods worldwide (Stripe, PayPal, MercadoPago) so your customers can pay with credit/debit cards and other local methods.",
  },
  {
    title: "Shipping Methods",
    description: "Configuration of shipping zones and costs. Integration with logistics companies (FedEx, DHL, local couriers) for automatic calculation or custom tables.",
  },
  {
    title: "Mobile Design",
    description: "100% responsive design optimized for mobile devices. More than 70% of online purchases are made from cell phones, so your store will look perfect on any screen.",
  },
  {
    title: "Shopping Cart",
    description: "Agile and secure checkout process to maximize conversions. Abandoned cart recovery and automatic emails.",
  },
  {
    title: "Stock Management",
    description: "Automatic inventory control. When a sale is made, stock is deducted automatically. Notifications of low stock.",
  },
  {
    title: "Sales Panel",
    description: "Complete dashboard to see your orders, customers, and billing. Export data and analyze the performance of your business.",
  },
  {
    title: "SEO Optimization",
    description: "Technical SEO structure so your products appear in Google. Schema markup for products, friendly URLs, and fast loading speed.",
  },
]

// Process steps
const technologies = [
  { name: "WooCommerce", image: "https://cdn.simpleicons.org/woocommerce/000000" },
  { name: "Shopify", image: "https://cdn.simpleicons.org/shopify/000000" },
  { name: "WordPress", image: "https://cdn.simpleicons.org/wordpress/000000" },
  { name: "MercadoPago", image: "https://cdn.simpleicons.org/mercadopago/000000" },
  { name: "Stripe", image: "https://cdn.simpleicons.org/stripe/000000" },
  { name: "PayPal", image: "https://cdn.simpleicons.org/paypal/000000" },
]

const processSteps = [
  { 
    step: "01", 
    title: "Planning", 
    subtitle: "and setup", 
    description: "We define the structure of the store, categories, and necessary functionalities for your business model.",
    highlight: "We organize your catalog efficiently."
  },
  { 
    step: "02", 
    title: "Design", 
    subtitle: "and development", 
    description: "We create the visual design of the store and configure all technical functionalities (payments, shipping, taxes).",
    highlight: null
  },
  { 
    step: "03", 
    title: "Loading", 
    subtitle: "of products", 
    description: "We upload the first products and teach you how to manage the catalog so you can continue independently.",
    highlight: null
  },
  { 
    step: "04", 
    title: "Launch", 
    subtitle: "and sales", 
    description: "We perform final tests, activate the store, and connect it with analysis tools to start selling.",
    highlight: "Ready to receive orders."
  },
]

// Portfolio items
const portfolioItems = [
  { title: "Fashion Store", category: "E-commerce", image: "/placeholder.svg?height=400&width=600" },
  { title: "Electronics Shop", category: "Tech", image: "/placeholder.svg?height=400&width=600" },
  { title: "Home Decor", category: "Retail", image: "/placeholder.svg?height=400&width=600" },
  { title: "Sports Gear", category: "Sports", image: "/placeholder.svg?height=400&width=600" },
]

// Stats
const stats = [
  { value: 50, prefix: "+", suffix: "", label: "Online Stores Created" },
  { value: 10, prefix: "+", suffix: "M", label: "Generated Sales (USD)" },
  { value: 99, prefix: "", suffix: "%", label: "Uptime Guaranteed" },
  { value: 24, prefix: "", suffix: "/7", label: "Support Available" },
]

// FAQs
const faqs = [
  { question: "Do I need technical knowledge to manage the store?", answer: "No. We deliver the store with an intuitive administration panel so you can upload products, change prices, and manage orders very easily. We also provide you with training." },
  { question: "What payment methods can I accept?", answer: "You can accept all credit and debit cards through gateways like Stripe, PayPal, or MercadoPago. You can also configure manual payments like bank transfer or cash on delivery." },
  { question: "Are there commissions per sale?", answer: "We do not charge commissions per sale. You only pay the cost of the web development. However, payment gateways (PayPal, Stripe, etc.) usually charge a small commission per transaction." },
  { question: "Is the store secure?", answer: "Yes, we include SSL certificate (the padlock in the browser) to encrypt customer data. In addition, payment gateways handle sensitive card data with the highest banking security standards." },
  { question: "Can I sell internationally?", answer: "Yes, we can configure the store to accept payments in multiple currencies and configure shipping zones for different countries." },
  { question: "How long does it take to have the store ready?", answer: "A standard online store usually takes between 3 to 5 weeks, depending on the number of products and specific functionalities required." },
  { question: "Do you include hosting and domain?", answer: "We can include hosting and domain registration in the budget, or we can use the ones you have already contracted. We advise you on the best option." },
]

// Complementary services
const complementaryServices = [
  {
    title: "Digital Marketing",
    subtitle: "Attract customers to your store",
    features: ["Google Shopping", "Meta Ads (Catalog)", "Remarketing", "Email Marketing", "SEO for E-commerce", "Conversion Analysis"],
    href: "/en/services/digital-marketing",
    icon: TrendingUp
  },
  {
    title: "Web Maintenance",
    subtitle: "Your store always active",
    features: ["Plugin updates", "Security backups", "Speed optimization", "Technical support", "Content changes", "Security monitoring"],
    href: "/en/services/web-maintenance",
    icon: ShieldCheck
  },
  {
    title: "Apps Development",
    subtitle: "Your store in an App",
    features: ["iOS and Android App", "Push Notifications", "Loyalty Program", "Offline Mode", "Native Experience", "App Store Publishing"],
    href: "/en/services/apps",
    icon: Smartphone
  },
]

export default function OnlineStoreClient({ testimonials }: OnlineStoreClientProps) {
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
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28 w-full">
          <div className="grid items-center gap-12">
            <div className="relative z-10">
              <span className="inline-flex items-center text-base sm:text-lg text-white mb-4">
                <span className="mr-2">👋</span> E-commerce Experts
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Create your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Online Store</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}and sell <br className="hidden md:block" />
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00DEC7] to-white">
                  Worldwide
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                We design and develop professional e-commerce sites optimized for sales. 
                Accept payments, manage shipments, and grow your business globally.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="#form">Start Selling</Link>
                </Button>
                
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                  <ShoppingCart className="h-5 w-5 text-black" />
                  <span className="text-sm font-bold text-black">Ready to sell 24/7</span>
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
            </div>

            {/* Right Column - Illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                 {/* Simple E-commerce Illustration */}
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <rect x="50" y="80" width="300" height="240" rx="10" fill="#1a1a1a" />
                  <rect x="60" y="90" width="280" height="220" rx="5" fill="#2a2a2a" />
                  {/* Header */}
                  <rect x="60" y="90" width="280" height="40" rx="5" fill="#333" />
                  <circle cx="80" cy="110" r="5" fill="#FF6B6B" />
                  <circle cx="100" cy="110" r="5" fill="#FFE66D" />
                  <circle cx="120" cy="110" r="5" fill="#4ECDC4" />
                  {/* Products Grid */}
                  <rect x="80" y="150" width="70" height="80" rx="4" fill="#00DEC7" opacity="0.2" />
                  <rect x="165" y="150" width="70" height="80" rx="4" fill="#00DEC7" opacity="0.2" />
                  <rect x="250" y="150" width="70" height="80" rx="4" fill="#00DEC7" opacity="0.2" />
                  <rect x="80" y="240" width="70" height="50" rx="4" fill="#00DEC7" opacity="0.2" />
                  <rect x="165" y="240" width="70" height="50" rx="4" fill="#00DEC7" opacity="0.2" />
                  <rect x="250" y="240" width="70" height="50" rx="4" fill="#00DEC7" opacity="0.2" />
                  
                  {/* Floating Elements */}
                  <circle cx="340" cy="300" r="30" fill="#00DEC7" />
                  <path d="M330 300 L335 305 L350 290" stroke="black" strokeWidth="3" fill="none" />
                  
                  <rect x="30" y="280" width="60" height="40" rx="8" fill="#fff" transform="rotate(-10 60 300)" />
                  <text x="40" y="305" fontSize="12" fontWeight="bold" fill="black" transform="rotate(-10 60 300)">SALE</text>
                </svg>
              </div>
              <div className="mt-8 text-center">
                 <p className="text-xl font-bold text-black">Ready to scale?</p>
                 <Button asChild className="mt-4 bg-black text-white hover:bg-black/80 rounded-full px-8">
                    <Link href="#form">Get a Quote</Link>
                 </Button>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-16 pt-16 border-t border-black/20">
            <p className="text-center text-black/60 uppercase tracking-widest text-sm mb-8">Technologies</p>
            <div className="flex flex-wrap justify-center gap-8">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 bg-white/50 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm">
                    <Image 
                      src={tech.image}
                      alt={tech.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-sm text-black font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Black Background */}
      <section className="relative py-20 lg:py-28 bg-black">
         <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Process
            </h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              How do we create your store? A structured process to ensure <strong className="text-white font-bold">success and sales</strong>.
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

      {/* Portfolio Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Recent Stores</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">E-commerce Projects</p>
          </div>
          
           <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item) => (
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
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Testimonials */}
      <Testimonials 
        items={testimonials}
        title="What our clients say"
        subtitle="Success Stories"
      />

      {/* FAQ */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">FAQ</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">Online Stores</p>
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
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#00DEC7] rounded-2xl p-6 mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Ready to open your store?
              </h2>
            </div>
            
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
                    placeholder="Tell us about your project *"
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
                  Send Message
                </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complementary Services</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
             {complementaryServices.map((service) => (
              <Link href={service.href} key={service.title} className="block bg-white/20 backdrop-blur border border-black/5 p-8 rounded-2xl hover:bg-white/40 transition-colors group">
                 <div className="h-12 w-12 bg-black/10 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="h-6 w-6 text-black" />
                 </div>
                 <h3 className="text-xl font-bold text-black mb-2">{service.title}</h3>
                 <p className="text-sm text-black/70 mb-4">{service.subtitle}</p>
                 <div className="flex items-center gap-2 font-semibold text-black group-hover:underline">
                    View more <ArrowRight className="h-4 w-4" />
                 </div>
              </Link>
             ))}
          </div>
        </div>
      </section>
    </>
  )
}