"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus, Palette, MousePointer, Smartphone, Users, Layers, Sparkles, Monitor, Bot, ArrowRight } from "lucide-react"

import { pushToDataLayer } from "@/lib/gtm"
import { LatestWorks } from "@/components/sections/latest-works"
import { Project } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

// Marquee items for scrolling text
const marqueeItems = [
  { text: "Professional UI/UX Design", highlight: true },
  { text: "interfaces that fall in love" },
  { text: "User Experience", highlight: true },
  { text: "people-centered design" },
  { text: "Interactive Prototyping", highlight: true },
  { text: "we test before developing" },
  { text: "Design System", highlight: true },
  { text: "consistency in every pixel" },
  { text: "UX Research", highlight: true },
  { text: "data-driven decisions" },
]

// Services included in UI/UX design
const servicesIncluded = [
  {
    title: "User Research (UX Research)",
    description: "We analyze your users, their needs, behaviors, and pain points to design solutions that truly solve their problems.",
  },
  {
    title: "Information Architecture",
    description: "We organize your product's content logically and intuitively so users find what they are looking for easily.",
  },
  {
    title: "Wireframes and User Flows",
    description: "We design the structure and navigation of your product before investing in visual design, validating usability from the start.",
  },
  {
    title: "Visual Interface Design (UI)",
    description: "We create attractive, modern interfaces aligned with your brand. Every visual element designed with purpose and coherence.",
  },
  {
    title: "Interactive Prototyping",
    description: "High-fidelity clickable prototypes to validate ideas and flows with real users before investing in development.",
  },
  {
    title: "Complete Design System",
    description: "We create a scalable design system with reusable components, style guides, and documentation for your team.",
  },
  {
    title: "Responsive Design",
    description: "Your design will look perfect on any device: mobile, tablets, and desktop. Adapted to every resolution.",
  },
  {
    title: "User Testing",
    description: "We conduct usability tests with real users to identify problems and improvement opportunities.",
  },
  {
    title: "Handoff for Development",
    description: "We deliver designs in Figma with technical specifications, exported assets, and everything needed for your team to develop.",
  },
  {
    title: "Redesign and Optimization",
    description: "We analyze your current product, identify UX problems, and propose improvements based on data and best practices.",
  },
]

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "and research",
    description: "Initial meeting to understand your business, users, and goals. We analyze the competition and define the project scope.",
    highlight: "Interviews, benchmarks, and user personas.",
  },
  {
    step: "02",
    title: "Architecture",
    subtitle: "and wireframes",
    description: "We design the information structure, navigation flows, and low-fidelity wireframes to validate usability.",
    highlight: null,
  },
  {
    step: "03",
    title: "Design",
    subtitle: "visual UI",
    description: "We apply your brand identity to wireframes, create the full visual design, and component system.",
    highlight: null,
  },
  {
    step: "04",
    title: "Prototype",
    subtitle: "and delivery",
    description: "We create the interactive prototype, conduct testing, and deliver everything ready for development.",
    highlight: "Figma with technical specs and assets.",
  },
]

// Stats for trajectory section
const stats = [
  { value: 120, prefix: "+", suffix: "", label: "Designed projects" },
  { value: 95, prefix: "", suffix: "%", label: "Client satisfaction" },
  { value: 40, prefix: "+", suffix: "%", label: "Conversion improvement" },
  { value: 8, prefix: "", suffix: "", label: "Years of experience" },
]

// FAQs for UI/UX service
const faqs = [
  { question: "What does UI/UX design include?", answer: "It includes user research, information architecture, wireframes, visual interface design, interactive prototypes, and documentation for development. The specific scope depends on your project needs." },
  { question: "What tools do you work with?", answer: "We mainly use Figma for design and prototyping. We also work with tools like Maze for usability testing, Hotjar for behavior analysis, and Notion for documentation." },
  { question: "How long does a design project take?", answer: "A landing page takes approximately 1-2 weeks. A complete website between 3-4 weeks. Digital product projects (apps, dashboards) can take 2-3 months depending on complexity." },
  { question: "Does the design include development?", answer: "No, design and development are separate services. We can quote both services or just the design if you already have a development team. We deliver everything ready for any developer to implement." },
  { question: "Do you do redesigns of existing products?", answer: "Yes, we perform UX audits of existing products, identify usability problems, and propose data-driven improvements and best practices. We can do complete or partial redesigns." },
  { question: "What is the work process like?", answer: "We start with a discovery meeting to understand your business and users. Then we go through research, wireframes, visual design with iterative reviews, and finish with the prototype and handoff for development." },
  { question: "Can I request changes during the project?", answer: "Yes, our process includes review rounds at each stage. We work iteratively, showing you progress and adjusting based on your feedback before moving to the next phase." },
  { question: "What do I receive at the end of the project?", answer: "You receive the complete Figma file with all designs, an interactive prototype, the Design System with components, style guide, and technical specifications for the development team." },
  { question: "Do you work with companies in other countries?", answer: "Yes, we work with companies all over the world. We adapt to the needs and particularities of each market." },
  { question: "Do you offer post-delivery support?", answer: "Yes, we offer a post-delivery support period to resolve questions from the development team. We can also make minor adjustments or accompany the implementation if needed." },
]

// Complementary services
const complementaryServices = [
  {
    title: "Process Automation",
    subtitle: "Optimize workflows",
    features: [
      "Workflow Automation",
      "System Integration",
      "Time Saving",
      "Error Reduction",
      "Scalability",
      "24/7 Operation",
    ],
    href: "/en/services/automation",
    icon: Bot
  },
  {
    title: "Web Development",
    subtitle: "We implement your design",
    features: [
      "Next.js and React",
      "WordPress and WooCommerce",
      "Corporate Sites",
      "Landing pages",
      "E-commerce",
      "Web Applications",
    ],
    href: "/en/services/web-design",
    icon: Monitor
  },
  {
    title: "AI Agents",
    subtitle: "Intelligent Chatbots",
    features: [
      "WhatsApp Chatbots",
      "Virtual Assistants",
      "24/7 Attention",
      "CRM Integration",
      "Custom ChatGPT",
      "Automation",
    ],
    href: "/en/services/ai-agents",
    icon: Bot
  },
  {
    title: "Digital Marketing",
    subtitle: "Drive traffic to your design",
    features: [
      "Google Ads",
      "Meta Ads",
      "SEO and Positioning",
      "Email Marketing",
      "Analytics",
      "Conversion Optimization",
    ],
    href: "/en/services/digital-marketing",
    icon: Sparkles
  },
]

interface UIUXDesignPageClientProps {
  projects: Project[]
  testimonials: Testimonial[]
}

export default function UIUXDesignClient({ projects, testimonials }: UIUXDesignPageClientProps) {
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
      form_name: "UI/UX Design Service Form",
      service: "ui-ux-design"
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
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
                <Palette className="h-6 w-6" />
                Professional UI/UX Design
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Design of{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Interfaces</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}and{" "}
                <span className="font-extrabold">User Experience</span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">
                  worldwide
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                We create <strong className="text-white">memorable digital experiences</strong> that{" "}
                <strong className="text-white">make your users fall in love</strong> and{" "}
                <strong className="text-white">convert visitors into customers</strong>.{" "}
                People-centered design, validated with data.
              </p>

              <p className="mt-4 text-gray-300">
                <span className="text-[#00DEC7] font-semibold">Goal:</span>{" "}
                <span className="text-[#00DEC7]">create intuitive, attractive, and effective digital products</span>{" "}
                that drive your business growth.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8"
                >
                  <Link href="/en/contact">Request a quote</Link>
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
                      <Users className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">UX Research</p>
                      <p className="text-gray-400 text-sm">Research</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Layers className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Wireframes</p>
                      <p className="text-gray-400 text-sm">Structure</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <Palette className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">UI Design</p>
                      <p className="text-gray-400 text-sm">Visual</p>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20">
                      <MousePointer className="h-10 w-10 text-[#00DEC7] mb-3" />
                      <p className="text-white font-medium">Prototype</p>
                      <p className="text-gray-400 text-sm">Interactive</p>
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
              Designs that fall in love<br />
              and convert
            </h2>
            <p className="mt-6 text-black/80 text-lg">
              You will have <strong className="text-black">professional interfaces</strong> designed to{" "}
              <strong className="text-black">make your users fall in love</strong> and{" "}
              <strong className="text-black">increase your conversions</strong>. Everything validated with research and real data.
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
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <svg className="h-10 w-10" viewBox="0 0 38 57" fill="none">
                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19H38V28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                  </svg>
                </div>
                <span className="text-black text-sm font-medium">Figma</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#FF61F6] rounded-xl flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Framer</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#0D1117] rounded-xl flex items-center justify-center">
                  <Layers className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Notion</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#6366F1] rounded-xl flex items-center justify-center">
                  <MousePointer className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Maze</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[#FF3C00] rounded-xl flex items-center justify-center">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <span className="text-black text-sm font-medium">Hotjar</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black">
              Consult us <span className="font-normal">without commitment</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              If you want to <strong className="text-black">improve your digital product experience</strong>, contact us and we will advise you on the best solution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                <Link href="/en/contact" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 8l9 6 9-6"/>
                  </svg>
                  Request a quote
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
              <strong className="text-white font-bold">Create digital products that people love</strong>. 4 phases to design an{" "}
              <strong className="text-white font-bold">exceptional user experience</strong>.
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
        subtitle="UI/UX Design"
        viewAllText="View all projects"
        viewAllLink="/en/portfolio?category=diseno-ui-ux"
      />

      {/* Trajectory Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Experience in<br />UI/UX design
            </h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">
              We design <span className="text-white">digital experiences</span> for companies <span className="text-white">worldwide</span>. The numbers reflect our clients&apos; trust.
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
      <Testimonials items={testimonials} category="diseno-ui-ux" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">UI/UX Design</p>
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
                    <Palette className="h-32 w-32 text-[#00DEC7]" />
                    <div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2">
                      <Layers className="h-6 w-6 text-black" />
                    </div>
                    <div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2">
                      <MousePointer className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-black text-center">
                  Ready to design your product?
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
