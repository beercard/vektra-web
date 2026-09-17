"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus, Workflow, Zap, Link2, Bot, Clock, TrendingUp, Monitor, ArrowRight } from "lucide-react"

import { pushToDataLayer } from "@/lib/gtm"
import { LatestWorks } from "@/components/sections/latest-works"
import { Project } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

// Marquee items for scrolling text
const marqueeItems = [
  { text: "Process Automation", highlight: true },
  { text: "save time and money" },
  { text: "System Integration", highlight: true },
  { text: "everything connected effortlessly" },
  { text: "Intelligent Workflows", highlight: true },
  { text: "automatic work 24/7" },
  { text: "Less Human Errors", highlight: true },
  { text: "more reliable processes" },
  { text: "Zapier and Make", highlight: true },
  { text: "more than 5000 integrations" },
]

// Services included in automation
const servicesIncluded = [
  {
    title: "Automated workflow design",
    description: "We analyze your current processes, identify repetitive tasks, and design automated workflows that optimize your operation.",
  },
  {
    title: "System and application integration",
    description: "We connect all your tools: CRM, ERP, email, invoicing, e-commerce, spreadsheets, and more than 5000 available apps.",
  },
  {
    title: "Email marketing automation",
    description: "Automatic email sequences, lead tracking, scheduled newsletters, and campaigns based on user behavior.",
  },
  {
    title: "Data synchronization between systems",
    description: "We keep your databases automatically synchronized. When you update something in one system, it reflects in all others.",
  },
  {
    title: "Automatic report generation",
    description: "Daily, weekly, or monthly reports generated and sent automatically with the data you need for decision making.",
  },
  {
    title: "Form and lead processing",
    description: "Leads from your website automatically go to your CRM, receive a welcome email, and are assigned to the corresponding salesperson.",
  },
  {
    title: "Invoicing automation",
    description: "Automatic invoice generation, sending to clients, payment tracking, and due date reminders.",
  },
  {
    title: "Intelligent notifications and alerts",
    description: "Alerts via WhatsApp, Slack, email, or SMS when important events occur: sales, errors, low stock, etc.",
  },
  {
    title: "Bots and assistants for repetitive tasks",
    description: "We create bots that process data, update spreadsheets, send messages, and execute tasks that previously required manual work.",
  },
  {
    title: "Monitoring and continuous optimization",
    description: "We monitor your automations 24/7, detect errors, and continuously optimize to improve efficiency.",
  },
]

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Audit",
    subtitle: "of processes",
    description: "We analyze your current processes, identify repetitive tasks, and calculate the time you could save with automation.",
    highlight: "We map improvement opportunities.",
  },
  {
    step: "02",
    title: "Design",
    subtitle: "of the workflow",
    description: "We design the automated workflows, define connections between systems, and plan the implementation.",
    highlight: null,
  },
  {
    step: "03",
    title: "Implementation",
    subtitle: "and testing",
    description: "We configure the automations in Make, Zapier, or custom development. We test exhaustively before going to production.",
    highlight: null,
  },
  {
    step: "04",
    title: "Launch",
    subtitle: "and monitoring",
    description: "We activate the automations and monitor their operation.",
    highlight: "We optimize continuously based on data.",
  },
]

// Stats for trajectory section
const stats = [
  { value: 200, prefix: "+", suffix: "", label: "Automated processes" },
  { value: 85, prefix: "", suffix: "%", label: "Time savings" },
  { value: 50, prefix: "+", suffix: "", label: "Satisfied clients" },
  { value: 5000, prefix: "+", suffix: "", label: "Available integrations" },
]

// FAQs for automation service
const faqs = [
  { question: "What kind of processes can be automated?", answer: "Almost any repetitive task: email sending, report generation, data synchronization, notifications, invoicing, inventory management, social media posting, form processing, and much more." },
  { question: "What tools do you use for automation?", answer: "Mainly Make (Integromat), Zapier and n8n for no-code automations. For more complex projects, we develop custom solutions with Python, Node.js and custom APIs." },
  { question: "How long does it take to implement an automation?", answer: "Simple automations are implemented in 1-2 weeks. More complex projects with multiple integrations can take 4-8 weeks depending on the number of systems to connect." },
  { question: "Are there additional costs for automation tools?", answer: "Platforms like Make and Zapier have their own plans based on task volume. We advise you on the best option for your needs. Many clients start with free plans." },
  { question: "What happens if something fails in the automation?", answer: "We configure alerts and monitoring to detect problems immediately. We have contingency plans and support to resolve incidents quickly. Most errors are detected and fixed before they affect your business." },
  { question: "Can I modify the automations later?", answer: "Yes, automations are flexible and scalable. We train you to make simple changes on your own, and we are available for more complex modifications or new integrations." },
  { question: "How much can I save with automation?", answer: "It depends on your processes, but on average our clients save between 10-30 hours of manual work per week. Additionally, they reduce human errors and improve response times." },
  { question: "Can you connect legacy systems or old software?", answer: "In most cases, yes. If the system has any type of API or allows data export/import, we can integrate it. We evaluate each particular case and propose the best solution." },
  { question: "Do you work with companies in Argentina and Paraguay?", answer: "Yes, we work mainly with companies in Argentina and Paraguay. We understand local tools like MercadoPago, Tienda Nube, AFIP/SET invoicing systems, etc." },
  { question: "Do you offer post-implementation support?", answer: "Yes, all our plans include a support period. We also offer monthly maintenance plans for continuous monitoring, updates, and new automations." },
]

// Complementary services
const complementaryServices = [
  {
    title: "AI Agents",
    subtitle: "Intelligent chatbots",
    features: [
      "WhatsApp Chatbots",
      "24/7 Virtual Assistants",
      "ChatGPT Integration",
      "Automatic Order Taking",
      "Human Escalation",
      "Admin Panel",
    ],
    href: "/en/services/ai-agents",
    icon: Bot
  },
  {
    title: "Web Development",
    subtitle: "Your digital presence",
    features: [
      "Landing pages",
      "Corporate sites",
      "E-commerce",
      "Dashboards",
      "Automation integration",
      "Admin Panel",
    ],
    href: "/en/services/web-design",
    icon: Monitor
  },
  {
    title: "Digital Marketing",
    subtitle: "Automate your marketing",
    features: [
      "Automatic Email Marketing",
      "Google Ads",
      "Meta Ads",
      "SEO and Positioning",
      "Lead Nurturing",
      "Automated Analytics",
    ],
    href: "/en/services/digital-marketing",
    icon: TrendingUp
  },
]

interface AutomationPageClientProps {
  projects: Project[]
  testimonials: Testimonial[]
}

export default function AutomationPageClient({ projects, testimonials }: AutomationPageClientProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    pushToDataLayer("form_submit", {
      form_name: "Automation Service Form",
      service: "automation"
    })
    alert("Thank you for your inquiry. We will respond shortly.")
  }

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

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
                <Workflow className="h-6 w-6" />
                Process Automation
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10">Automate</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}your business{" "}
                <span className="font-extrabold">and multiply your time</span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">
                  in Argentina and Paraguay
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                We eliminate <strong className="text-white">repetitive tasks</strong> that steal your time.{" "}
                <strong className="text-white">We connect your systems</strong>,{" "}
                <strong className="text-white">automate processes</strong> and free you to{" "}
                focus on what really matters.
              </p>

              <p className="mt-4 text-gray-300">
                <span className="text-[#00DEC7] font-semibold">Goal:</span>{" "}
                <span className="text-[#00DEC7]">save you hours of manual work every week</span>{" "}
                with automatic and reliable workflows.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8"
                >
                  <Link href="/en/contact">I want to automate</Link>
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
                      <Workflow className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Workflows</p>
                      <p className="text-gray-400 text-sm">Automated</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Link2 className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">+5000 Apps</p>
                      <p className="text-gray-400 text-sm">Connected</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Zap className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">No-code</p>
                      <p className="text-gray-400 text-sm">Make & Zapier</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Clock className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">24/7</p>
                      <p className="text-gray-400 text-sm">Running</p>
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
              Automate everything,<br />
              focus on growing
            </h2>
            <p className="mt-6 text-black/80 text-lg">
              You will have <strong className="text-black">automated processes</strong> that run{" "}
              <strong className="text-black">24/7 without human intervention</strong>.{" "}
              Fewer errors, more speed, and free time for what matters.
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

          {/* Tools */}
          <div className="mt-16 pt-16 border-t border-black/20">
            <p className="text-center text-black/60 uppercase tracking-widest text-sm mb-8">Tools we use</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#6366F1] rounded-xl flex items-center justify-center">
                  <Workflow className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Make</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#FF4F00] rounded-xl flex items-center justify-center">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Zapier</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#EA4B71] rounded-xl flex items-center justify-center">
                  <Link2 className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">n8n</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#3776AB] rounded-xl flex items-center justify-center">
                  <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                  </svg>
                </div>
                <span className="text-black text-sm font-medium">Python</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#339933] rounded-xl flex items-center justify-center">
                  <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                  </svg>
                </div>
                <span className="text-black text-sm font-medium">Node.js</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black">
              Consult us <span className="font-normal">without commitment</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              If you want to <strong className="text-black">automate your business processes</strong>, contact us and we will show you how we can help.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                <Link href="/en/contact" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                  Get a quote
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
              <strong className="text-white font-bold">Automate and optimize your business</strong>. 4 steps to create{" "}
              <strong className="text-white font-bold">workflows that run themselves</strong>.
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
      <LatestWorks
        projects={projects}
        title="Latest Projects"
        subtitle="Automation"
        viewAllText="View all projects"
        viewAllLink="/en/portfolio?category=automatizacion"
      />

      {/* Trajectory Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Experience in<br />automation
            </h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">
              We automate <span className="text-white">business processes</span> for companies <span className="text-white">worldwide</span>. The numbers reflect our clients&apos; trust.
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
      <Testimonials items={testimonials} category="automatizacion" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">Automation</p>
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
              Contact us <span className="text-white font-semibold">without commitment</span>
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
                    <Workflow className="h-32 w-32 text-[#00DEC7]" />
                    <div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2">
                      <Zap className="h-6 w-6 text-black" />
                    </div>
                    <div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2">
                      <Link2 className="h-6 w-6 text-white" />
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
                Consult us <span className="font-semibold text-black">without commitment</span>
              </p>
              <p className="text-center text-gray-600 text-sm mb-8">
                Write to us at{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                or send the form below and{" "}
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
                    placeholder="Tell me what processes you want to automate... *"
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
            <h2 className="text-4xl md:text-5xl font-bold text-black">Complements</h2>
            <p className="mt-2 text-black/60 uppercase tracking-widest text-sm">You might also be interested in</p>
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
