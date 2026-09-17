"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus, Headset, Clock, MessageCircle, Wrench, Monitor, Bot, TrendingUp, ArrowRight, Users } from "lucide-react"

import { pushToDataLayer } from "@/lib/gtm"
import { LatestWorks } from "@/components/sections/latest-works"
import { Project } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

const marqueeItems = [
  { text: "Professional Web Technical Support", highlight: true },
  { text: "guaranteed fast response" },
  { text: "Remote Assistance", highlight: true },
  { text: "we solve without you moving" },
  { text: "Team of Experts", highlight: true },
  { text: "more than 10 years of experience" },
  { text: "Email Support", highlight: true },
  { text: "personalized attention" },
]

const servicesIncluded = [
  { title: "Code error resolution", description: "We identify and fix bugs, PHP, JavaScript errors, database problems, and any technical failure." },
  { title: "Plugin and theme problems", description: "We resolve conflicts between plugins, failed updates, compatibility issues, and configuration errors." },
  { title: "Security flaws and hacks", description: "We clean malware, restore hacked sites, reinforce security, and prevent future attacks." },
  { title: "Speed and performance issues", description: "We diagnose and solve slow loading problems, optimize database, and improve performance." },
  { title: "Email and form errors", description: "We solve email sending problems, forms not working, SMTP configuration, and deliverability." },
  { title: "Display problems", description: "We fix design issues, elements not looking right, broken responsive layout, and CSS problems." },
  { title: "Migrations and hosting changes", description: "We migrate your website to a new server, change domain, and solve post-migration problems." },
  { title: "Backup restoration", description: "We restore your website to a previous version, recover lost data, and solve backup problems." },
  { title: "Training and documentation", description: "We teach you how to use your panel, solve basic problems, and document the changes made." },
  { title: "Live remote assistance", description: "We connect to your server or shared screen to solve complex problems in real time." },
]

const processSteps = [
  { step: "01", title: "Contact", subtitle: "and diagnosis", description: "You contact us via email. We analyze the problem and give you an initial diagnosis.", highlight: "Response in less than 24 hours." },
  { step: "02", title: "Quote", subtitle: "and approval", description: "We send you a clear quote with the estimated resolution time. Once approved, we start working.", highlight: null },
  { step: "03", title: "Resolution", subtitle: "of the problem", description: "We work on solving the problem with remote access to your server or control panel.", highlight: null },
  { step: "04", title: "Verification", subtitle: "and delivery", description: "We verify that everything works correctly and inform you of the actions taken.", highlight: "Solution guarantee." },
]

const stats = [
  { value: 500, prefix: "+", suffix: "", label: "Resolved tickets" },
  { value: 98, prefix: "", suffix: "%", label: "Satisfaction" },
  { value: 2, prefix: "<", suffix: "h", label: "Average resolution time" },
  { value: 24, prefix: "", suffix: "/7", label: "Availability" },
]

const faqs = [
  { question: "How does per incident support work?", answer: "You contact us when you have a problem, we evaluate the complexity and give you an estimated budget in hours. Once approved, we work on the solution and charge you only for the hours used." },
  { question: "What kind of problems can you solve?", answer: "We solve code errors, plugin problems, security flaws, speed issues, database errors, email problems, and any technical incident related to your website." },
  { question: "What is the response time?", answer: "It depends on the plan: 24-48 hours for specific incidents, 12 hours for Hours Pack, and less than 4 hours for Unlimited Support. In critical emergencies, we respond in minutes." },
  { question: "Does support include design changes?", answer: "Technical support covers troubleshooting and small adjustments. For design changes or new functionalities, they are budgeted as additional development." },
  { question: "Do you work on weekends?", answer: "The Unlimited Support plan includes 24/7 coverage for emergencies. The other plans have coverage from Monday to Friday during business hours." },
  { question: "Can I cancel whenever I want?", answer: "The monthly plan can be canceled at any time. The Hours Pack does not expire but is non-refundable once purchased." },
  { question: "What happens if you can't solve the problem?", answer: "If for any reason we cannot solve the problem, we refund your money or find an alternative solution. We guarantee resolution or refund." },
  { question: "Do you work with any platform?", answer: "Yes, we work with WordPress, WooCommerce, Shopify, Next.js, React, PHP, and practically any modern web technology." },
  { question: "Do you work with companies in other countries?", answer: "Yes, we work with companies all over the world. Communication is smooth thanks to digital tools." },
  { question: "How do I keep informed of progress?", answer: "We keep you informed by email. You always know what state your problem resolution is in." },
]

const complementaryServices = [
  { title: "Web Maintenance", subtitle: "Prevent problems", features: ["Automatic Updates", "Backups", "Anti-malware Security", "Speed Optimization", "24/7 Monitoring", "Monthly Reports"], href: "/en/services/web-maintenance", icon: Wrench },
  { title: "AI Agents", subtitle: "Automate attention", features: ["WhatsApp Chatbots", "24/7 Virtual Assistants", "ChatGPT Integration", "Order Taking", "Instant Responses", "Human Escalation"], href: "/en/services/ai-agents", icon: Bot },
  { title: "Digital Marketing", subtitle: "More traffic and sales", features: ["Google Ads", "Meta Ads", "SEO and Positioning", "Email Marketing", "Social Media", "Analytics"], href: "/en/services/digital-marketing", icon: TrendingUp },
]

interface TechnicalSupportPageClientProps {
  projects: Project[]
  testimonials: Testimonial[]
}

export default function TechnicalSupportClient({ projects, testimonials }: TechnicalSupportPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true) }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    pushToDataLayer("form_submit", { form_name: "Technical Support Service Form", service: "technical-support" })
    alert("Thank you for your inquiry. We will respond shortly.")
  }

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.value
        const increment = end / 125
        const timer = setInterval(() => {
          start += increment
          if (start >= end) { start = end; clearInterval(timer) }
          setCounts(prev => { const n = [...prev]; n[index] = Math.floor(start); return n })
        }, 16)
      })
    }
  }, [isVisible])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-[#00DEC7] font-medium mb-4 flex items-center gap-2">
                <Headset className="h-6 w-6" />
                Professional Technical Support
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Problems with your web? <span className="relative inline-block"><span className="relative z-10">We solve them</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" /></span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">worldwide</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                Team of experts available to <strong className="text-white">solve any technical problem</strong> of your website. <strong className="text-white">Fast response</strong>, <strong className="text-white">effective solutions</strong> and multichannel support.
              </p>
              <p className="mt-4 text-gray-300">
                <span className="text-[#00DEC7] font-semibold">Goal:</span> <span className="text-[#00DEC7]">that your website works perfectly</span> as soon as possible.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
                  <Link href="/en/contact">I need help</Link>
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    <div>
                      <span className="font-bold text-white">5.0</span>
                      <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div>
                      <span className="text-xs text-gray-400">+45 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-[#00DEC7]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl p-8 border border-[#00DEC7]/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Wrench className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Resolution</p><p className="text-gray-400 text-sm">of errors</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Monitor className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Assistance</p><p className="text-gray-400 text-sm">Remote</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><MessageCircle className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Contact</p><p className="text-gray-400 text-sm">Email</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Clock className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Response</p><p className="text-gray-400 text-sm">Fast</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 border-t border-[#00DEC7]">
          <div className="flex overflow-hidden"><div className="animate-marquee flex whitespace-nowrap">{[...marqueeItems, ...marqueeItems].map((item, index) => (<span key={index} className="mx-4 text-sm">{item.highlight ? <strong className="text-[#00DEC7]">{item.text}</strong> : <span className="text-gray-400">{item.text}</span>}<span className="mx-4 text-gray-600">·</span></span>))}</div></div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">How can we<br />help you?</h2>
            <p className="mt-6 text-black/80 text-lg">Our <strong className="text-black">team of experts</strong> is prepared to solve <strong className="text-black">any technical problem</strong> with your website.</p>
          </div>
          <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
            {servicesIncluded.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="shrink-0 mt-1"><div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black"><Check className="h-4 w-4 text-black" strokeWidth={3} /></div></div>
                <div><h4 className="font-bold text-black text-lg">{service.title}</h4><p className="mt-1 text-black/70 text-sm leading-relaxed">{service.description}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black">Do you have an urgent problem?</h3>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8"><a href="mailto:info@vektra.digital">Email us</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Goal Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" /><div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Goal</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed"><strong className="text-white font-bold">Solve your problem as soon as possible</strong>. 4 steps for your website to <strong className="text-white font-bold">work perfectly again</strong>.</p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold text-white leading-tight">{item.title}<br />{item.subtitle}</h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{item.description}{item.highlight && <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LatestWorks projects={projects} title="Latest Projects" subtitle="Technical Support" viewAllText="View all projects" viewAllLink="/en/portfolio" />

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Experience in<br />Technical Support</h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">We solve <span className="text-white">technical problems</span> for companies <span className="text-white">worldwide</span>.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (<div key={stat.label}><span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">{stat.prefix}{counts[index]}{stat.suffix}</span><p className="mt-2 text-gray-400 text-sm">{stat.label}</p></div>))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} category="soporte-tecnico" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2><p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">Technical Support</p></div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-white text-sm font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" /> : <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />}
                </button>
                {openFaq === index && <div className="px-4 pb-4"><p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Do you have any other questions?</h3>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent"><Link href="/en/contact">Write to us</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-gray-100 rounded-full w-80 h-80 mx-auto flex items-center justify-center">
                  <div className="relative"><Headset className="h-32 w-32 text-[#00DEC7]" /><div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2"><Wrench className="h-6 w-6 text-black" /></div><div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2"><Users className="h-6 w-6 text-white" /></div></div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6"><h3 className="text-xl md:text-2xl font-bold text-black text-center">Do you have a problem with your website?</h3></div>
              <p className="text-center text-gray-600 mb-2">Tell us what is happening <span className="font-semibold text-black">and we will help you</span></p>
              <p className="text-center text-gray-600 text-sm mb-8">Write to us at <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a> or describe your problem.</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                  <input type="url" placeholder="Your website URL" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                </div>
                <textarea placeholder="Describe the problem you are having... *" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] resize-none" />
                <div className="flex items-start gap-2"><input type="checkbox" id="privacy" className="mt-1" /><label htmlFor="privacy" className="text-sm text-gray-600">I have read and accept the <Link href="/en/privacy-policy" className="underline hover:text-[#00DEC7]">privacy policy</Link></label></div>
                <div className="text-center pt-4"><Button type="submit" size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-12">Send</Button></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Services */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-black">Complements</h2><p className="mt-2 text-black/60 uppercase tracking-widest text-sm">You might also be interested in</p></div>
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
                <div className="mt-auto inline-flex items-center gap-2 text-black font-semibold">
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
