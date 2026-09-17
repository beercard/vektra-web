"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, Bot, MessageSquare, Zap, Brain, Cpu, Workflow, Monitor, TrendingUp, ArrowRight } from "lucide-react"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

import { pushToDataLayer } from "@/lib/gtm"

interface AgentesIAPageClientProps {
  testimonials: Testimonial[]
}


// Marquee items for scrolling text
const marqueeItems = [
  { text: "Custom AI Agents", highlight: true },
  { text: "automate repetitive tasks and save time" },
  { text: "Chatbots for WhatsApp", highlight: true },
  { text: "24/7 customer service without human intervention" },
  { text: "ChatGPT Integration", highlight: true },
  { text: "intelligent responses based on your business" },
  { text: "Process Automation", highlight: true },
  { text: "connect your tools and optimize workflows" },
  { text: "Virtual Assistants", highlight: true },
  { text: "that learn and improve with every interaction" },
  { text: "APIs and Integrations", highlight: true },
  { text: "we connect your bot with any platform" },
]

// Services included in AI development
const servicesIncluded = [
  {
    title: "Chatbots for WhatsApp Business",
    description: "Development of intelligent chatbots for WhatsApp that answer queries, take orders, schedule appointments, and provide 24/7 support. Integration with the official WhatsApp Business API.",
  },
  {
    title: "Agents with ChatGPT/OpenAI",
    description: "Creation of custom AI agents using GPT-4 and other language models. Trained with your business information to give precise and contextual responses.",
  },
  {
    title: "Website Chatbots",
    description: "Virtual assistants embedded in your website that guide visitors, answer frequent questions, and capture leads automatically.",
  },
  {
    title: "Process Automation",
    description: "Connection of your tools and systems through APIs. We automate repetitive tasks like sending emails, updating databases, and generating reports.",
  },
  {
    title: "CRM and Tools Integration",
    description: "We connect your bot with HubSpot, Salesforce, Google Sheets, Notion, Trello, Slack, and more. All information synchronized automatically.",
  },
  {
    title: "Custom Training",
    description: "We train the agent with your knowledge base, FAQs, product catalogs, and internal procedures so it responds like an expert team in your business.",
  },
  {
    title: "Admin Panel",
    description: "Dashboard to monitor conversations, analyze metrics, view usage statistics, and adjust bot responses without technical knowledge.",
  },
  {
    title: "Multi-language",
    description: "Bots that can communicate in Spanish, English, Portuguese, and other languages. Ideal for global businesses.",
  },
  {
    title: "Human Handoff",
    description: "Configuration of automatic transfer to human agents when the bot detects complex queries or the customer requests it.",
  },
  {
    title: "Support and Maintenance",
    description: "Continuous technical support, AI model updates, improvements based on feedback, and bot performance monitoring.",
  },
]

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Analysis",
    subtitle: "of needs",
    description: "We evaluate your business, identify automatable processes, and define the objectives of the AI agent.",
    highlight: "We map conversation flows and use cases.",
  },
  {
    step: "02",
    title: "Design and",
    subtitle: "training",
    description: "We design the bot's personality, create conversation flows, and train the model with your information.",
    highlight: null,
  },
  {
    step: "03",
    title: "Development and",
    subtitle: "integration",
    description: "We program the agent, connect it with your systems (WhatsApp, web, CRM), and perform exhaustive testing.",
    highlight: null,
  },
  {
    step: "04",
    title: "Launch",
    subtitle: "and optimization",
    description: "We publish the bot in production and monitor its performance.",
    highlight: "We continuously optimize based on real data.",
  },
]

// Portfolio items - AI/Bot projects
const portfolioItems = [
  { title: "E-commerce Chatbot", category: "WhatsApp Bot", image: "/placeholder.svg?height=300&width=400&text=Bot+Ecommerce" },
  { title: "Real Estate Assistant", category: "AI Agent", image: "/placeholder.svg?height=300&width=400&text=Bot+Inmobiliaria" },
  { title: "Restaurant Booking Bot", category: "WhatsApp Bot", image: "/placeholder.svg?height=300&width=400&text=Bot+Reservas" },
  { title: "Tech Support Agent", category: "ChatGPT", image: "/placeholder.svg?height=300&width=400&text=Bot+Soporte" },
  { title: "Medical Appointments Bot", category: "WhatsApp Bot", image: "/placeholder.svg?height=300&width=400&text=Bot+Turnos" },
  { title: "Legal Assistant", category: "AI Agent", image: "/placeholder.svg?height=300&width=400&text=Bot+Legal" },
  { title: "B2B Sales Bot", category: "Automation", image: "/placeholder.svg?height=300&width=400&text=Bot+Ventas" },
  { title: "HR Agent", category: "ChatGPT", image: "/placeholder.svg?height=300&width=400&text=Bot+RRHH" },
]

// Stats for trajectory section
const stats = [
  { value: 50, prefix: "+", suffix: "", label: "Bots developed" },
  { value: 1, prefix: "", suffix: "M+", label: "Messages processed" },
  { value: 98, prefix: "", suffix: "%", label: "Resolution rate" },
  { value: 24, prefix: "", suffix: "/7", label: "Availability" },
]

// FAQs for AI/Bots service
const faqs = [
  { question: "What is an AI agent and how can it help my business?", answer: "An AI agent is an intelligent program that can maintain conversations, answer questions, and execute tasks autonomously. It can serve customers 24/7, take orders, schedule appointments, solve frequent doubts, and more, freeing up your team&apos;s time for more important tasks." },
  { question: "What is the difference between a traditional chatbot and one with AI?", answer: "A traditional chatbot works with fixed rules and only responds to specific keywords. A chatbot with AI (like the ones we use with ChatGPT) understands context, interprets different ways of asking the same thing, and gives natural and personalized answers, as if it were a person." },
  { question: "Can you make a bot for WhatsApp Business?", answer: "Yes, we develop chatbots for WhatsApp Business using the official Meta API. The bot can answer messages automatically, send catalogs, process orders, schedule appointments, and more. It works worldwide." },
  { question: "How long does it take for a chatbot to be ready?", answer: "It depends on complexity. A basic WhatsApp bot with FAQ answers can be ready in 1-2 weeks. A complete AI agent with CRM integrations, product database, and complex flows can take 3-4 weeks." },
  { question: "Can I train the bot with my business information?", answer: "Absolutely. We train the agent with your knowledge base: products, services, prices, policies, FAQs, internal procedures. The bot will answer as an expert team in your business, with the information you provide." },
  { question: "Can the bot integrate with my current systems?", answer: "Yes, we integrate with most tools: Google Sheets, HubSpot, Salesforce, Notion, Trello, Slack, billing systems, ERPs, and more. If your system has an API, we can connect it." },
  { question: "What happens if the bot cannot resolve a query?", answer: "We configure automatic scaling to human agents. The bot detects when a query is very complex or when the customer requests it, and refers the conversation to your team with all the context of what was discussed." },
  { question: "How much does it cost to keep a bot running?", answer: "The cost depends on message volume and integrations. We use transparent pricing models: an initial development cost and then a monthly maintenance that includes hosting, updates, and support. We give you a personalized quote." },
  { question: "Does the bot work in multiple languages?", answer: "Yes, our bots can communicate in Spanish, English, Portuguese, and other languages. It is ideal for global businesses." },
  { question: "Do you work with international companies?", answer: "Yes, we work with companies worldwide. We understand the global market, payment methods, and international shipping platforms." },
]

// Complementary services
const complementaryServices = [
  {
    title: "Process Automation",
    subtitle: "Optimize your operation",
    features: [
      "Application connection",
      "Automatic workflows",
      "API Integration",
      "Data synchronization",
      "Automatic reports",
      "Smart notifications",
    ],
    href: "/en/services/automation",
    icon: Workflow
  },
  {
    title: "Web Development",
    subtitle: "Your digital presence",
    features: [
      "Landing pages",
      "Corporate websites",
      "Custom dashboards",
      "Bot integration",
      "Admin panel",
      "Responsive design",
    ],
    href: "/en/services/web-design",
    icon: Monitor
  },
  {
    title: "Digital Marketing",
    subtitle: "Reach more customers",
    features: [
      "Google Ads",
      "Meta Ads",
      "SEO and positioning",
      "Email marketing",
      "WhatsApp campaigns",
      "Remarketing",
    ],
    href: "/en/services/digital-marketing",
    icon: TrendingUp
  },
]

export default function AgentesIAPageClient({ testimonials }: AgentesIAPageClientProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
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
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(start)
            return newCounts
          })
        }, 16)
      })
    }
  }, [isVisible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., call API)
    pushToDataLayer("form_submit", {
      form_name: "AI Agents Service Form (EN)",
      service: "ai-agents"
    })
    alert("Thank you for your inquiry. We will respond shortly.")
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
                <Bot className="h-6 w-6" />
                AI Innovation
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                AI Agents &{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Automation</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">
                  Worldwide
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                Boost your business with <strong className="text-white">intelligent agents</strong> and{" "}
                <strong className="text-white">custom automation</strong>. We implement AI solutions to optimize processes and improve customer experience globally.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8"
                >
                  <Link href="/en/contact">I want a bot for my business</Link>
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg className="h-8 w-8" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <div>
                      <span className="font-bold text-white">5.0</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">+45 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-[#00DEC7]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl p-8 border border-[#00DEC7]/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Bot className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Chatbots</p>
                      <p className="text-gray-400 text-sm">WhatsApp & Web</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Brain className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">ChatGPT</p>
                      <p className="text-gray-400 text-sm">Advanced AI</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Workflow className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Automation</p>
                      <p className="text-gray-400 text-sm">Processes & APIs</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Zap className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">24/7</p>
                      <p className="text-gray-400 text-sm">Always active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 border-t border-[#00DEC7]">
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={index} className="mx-4 text-sm">
                  {item.highlight ? (
                    <strong className="text-[#00DEC7]">{item.text}</strong>
                  ) : (
                    <span className="text-gray-400">{item.text}</span>
                  )}
                  <span className="mx-4 text-gray-600">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Included Section - Cyan Background */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Your business automated,<br />
              your customers always served
            </h2>
            <p className="mt-6 text-black/80 text-lg">
              You will have a <strong className="text-black">custom AI agent</strong> that knows your business,{" "}
              <strong className="text-black">serves customers 24 hours</strong> and{" "}
              <strong className="text-black">automates repetitive tasks</strong>. You focus on growing your business.
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
            {servicesIncluded.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black">
                    <Check className="h-4 w-4 text-black" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black text-lg">{service.title}</h4>
                  <p className="mt-1 text-black/70 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platforms */}
          <div className="mt-16 pt-16 border-t border-black/20">
            <p className="text-center text-black/60 uppercase tracking-widest text-sm mb-8">Technologies we use</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                  </svg>
                </div>
                <span className="text-black text-sm font-medium">ChatGPT</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#25D366] rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <Cpu className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Claude AI</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-xl flex items-center justify-center">
                  <Workflow className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Make/Zapier</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#0066FF] rounded-xl flex items-center justify-center">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Botpress</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black">
              Consult us <span className="font-normal">without obligation</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              If you want to <strong className="text-black">automate your customer service</strong> or create a bot for your business, contact us and we will advise you on the best solution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                <Link href="/en/contact" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                  Get Quote
                </Link>
              </Button>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white">Goal</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Automate and scale your business</strong>. 4 steps to create an AI agent that{" "}
              <strong className="text-white font-bold">serves customers, closes sales, and reduces costs</strong>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">
                  {item.title}<br />{item.subtitle}
                </h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                  {item.highlight && <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Latest Projects</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">AI Agents and Chatbots</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[#00DEC7] text-xs uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
              <Link href="/en/portfolio">View all projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trajectory Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Experience in<br />artificial intelligence
            </h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">
              We develop <span className="text-white">AI agents and chatbots</span> for companies <span className="text-white">worldwide</span>. The numbers reflect the trust of our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {stat.prefix}{counts[index]}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials 
        items={testimonials}
        title="What they say about us"
        subtitle="Clients with AI Agents"
      />

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">AI Agents and Chatbots</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
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

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Do you have any other questions?
            </h3>
            <p className="mt-2 text-gray-400">
              Contact us <span className="text-white font-semibold">without obligation</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent">
                <Link href="/en/contact" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                  Write to us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-gray-100 rounded-full w-80 h-80 mx-auto flex items-center justify-center">
                  <div className="relative">
                    <Bot className="h-32 w-32 text-[#00DEC7]" />
                    <div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2">
                      <MessageSquare className="h-6 w-6 text-black" />
                    </div>
                    <div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-black text-center">
                  Ready to automate your business?
                </h3>
              </div>

              <p className="text-center text-gray-600 mb-2">
                Consult us <span className="font-semibold text-black">without obligation</span>
              </p>
              <p className="text-center text-gray-600 text-sm mb-8">
                Write to us at{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                or send us the following form and{" "}
                <span className="font-semibold">we will respond in less than 24 hours</span>.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name *"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                </div>

                <div className="relative">
                  <textarea
                    placeholder="Tell me about your project... *"
                    rows={4}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent resize-none"
                  />
                  <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy" className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I have read and accept the{" "}
                    <Link href="/en/privacy-policy" className="underline hover:text-[#00DEC7]">
                      privacy policy
                    </Link>
                  </label>
                </div>

                <div className="text-center pt-4">
                  <Button type="submit" size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-12">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Services Section - Cyan Background */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Add-ons</h2>
            <p className="mt-2 text-black/60 uppercase tracking-widest text-sm">You may also be interested in</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {complementaryServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
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
                      <Check className="h-4 w-4 text-black" />
                      {feature}
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
    </>
  )
}
