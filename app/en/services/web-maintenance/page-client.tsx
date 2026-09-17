"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus, Wrench, Shield, Zap, RefreshCw, Database, Monitor, Bot, TrendingUp, ArrowRight } from "lucide-react"

import { pushToDataLayer } from "@/lib/gtm"
import { LatestWorks } from "@/components/sections/latest-works"
import { Project } from "@/app/trabajos/data"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

const marqueeItems = [
  { text: "Professional Web Maintenance", highlight: true },
  { text: "your web always updated" },
  { text: "Anti-Malware Security", highlight: true },
  { text: "24/7 protection" },
  { text: "Backups", highlight: true },
  { text: "daily automatic backups" },
  { text: "Speed Optimization", highlight: true },
  { text: "ultrafast loading" },
]

const servicesIncluded = [
  { title: "WordPress, plugin and theme updates", description: "We keep your website updated with the latest versions to ensure security and performance." },
  { title: "Automatic backups", description: "Periodic backups stored in the cloud. If something goes wrong, we restore your website in minutes." },
  { title: "Anti-malware security and firewall", description: "We scan your website for malware, block attacks, and reinforce security." },
  { title: "24/7 uptime monitoring", description: "We constantly monitor your website. If we detect downtime, we act immediately." },
  { title: "Speed optimization", description: "We optimize images, cache, database, and code so your website loads fast." },
  { title: "SSL Certificate and HTTPS", description: "We install and renew your SSL certificate so your website is secure." },
  { title: "Database cleaning", description: "We remove revisions, spam, and unnecessary data that slow down your website." },
  { title: "Image optimization", description: "We compress and optimize images without losing quality." },
  { title: "Monthly status reports", description: "Detailed reports on updates, security, and performance." },
  { title: "Priority technical support", description: "Team of experts available to resolve any technical issue." },
]

const processSteps = [
  { step: "01", title: "Audit", subtitle: "initial", description: "We analyze the current state of your website: security, speed, plugins, and vulnerabilities.", highlight: "Free complete diagnosis." },
  { step: "02", title: "Configuration", subtitle: "of protection", description: "We configure backups, firewall, monitoring, and all protection tools.", highlight: null },
  { step: "03", title: "Maintenance", subtitle: "continuous", description: "We perform periodic updates, security scans, and optimizations.", highlight: null },
  { step: "04", title: "Reports", subtitle: "and support", description: "We send monthly reports and are available for any inquiry.", highlight: "Priority support included." },
]

const stats = [
  { value: 150, prefix: "+", suffix: "", label: "Maintained websites" },
  { value: 99.9, prefix: "", suffix: "%", label: "Guaranteed uptime" },
  { value: 0, prefix: "", suffix: "", label: "Hacks on clients" },
  { value: 24, prefix: "", suffix: "/7", label: "Active monitoring" },
]

const faqs = [
  { question: "What does the web maintenance service include?", answer: "It includes WordPress, plugin and theme updates, periodic backups, security monitoring, speed optimization, and technical support according to the chosen plan." },
  { question: "How often are backups performed?", answer: "It depends on the plan: weekly in the Basic plan, daily in the Professional plan, and every 6 hours in the Enterprise plan. All are securely stored in the cloud." },
  { question: "What happens if my website is hacked?", answer: "We restore the last clean backup, remove the malware, reinforce security, and inform you of the actions taken at no additional cost." },
  { question: "Can I change plans at any time?", answer: "Yes, you can upgrade or downgrade whenever you need. The change applies in the next billing period." },
  { question: "Does maintenance include design changes?", answer: "Professional and Enterprise plans include hours for minor changes. Complete redesigns are quoted separately." },
  { question: "Do you work only with WordPress?", answer: "Mainly WordPress and WooCommerce, but we also offer maintenance for websites with Next.js, React, and other technologies." },
  { question: "What happens if I need urgent support?", answer: "Professional and Enterprise plans include priority support. The Enterprise plan has 24/7 coverage for emergencies." },
  { question: "How do I know what updates were made?", answer: "We send detailed monthly reports with all updates, security scans, and speed metrics." },
  { question: "Do you work with companies in other countries?", answer: "Yes, we work with companies all over the world. Communication is smooth thanks to digital tools." },
  { question: "Can I cancel the service whenever I want?", answer: "Yes, our plans are monthly with no long-term contract. You can cancel at any time." },
]

const complementaryServices = [
  { title: "Web Development", subtitle: "Improve your site", features: ["Website Redesign", "New Features", "SEO Optimization", "E-commerce", "Landing pages", "Corporate Sites"], href: "/en/services/web-design", icon: Monitor },
  { title: "AI Agents", subtitle: "Automate attention", features: ["WhatsApp Chatbots", "24/7 Virtual Assistants", "ChatGPT Integration", "Order Taking", "Instant Responses", "Human Escalation"], href: "/en/services/ai-agents", icon: Bot },
  { title: "Digital Marketing", subtitle: "More traffic and sales", features: ["Google Ads", "Meta Ads", "SEO and Positioning", "Email Marketing", "Social Media", "Analytics"], href: "/en/services/digital-marketing", icon: TrendingUp },
]

interface WebMaintenancePageClientProps {
  projects: Project[]
  testimonials: Testimonial[]
}

export default function WebMaintenanceClient({ projects, testimonials }: WebMaintenancePageClientProps) {
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
    pushToDataLayer("form_submit", { form_name: "Web Maintenance Service Form", service: "web-maintenance" })
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
          setCounts(prev => { const n = [...prev]; n[index] = Math.round(start * 10) / 10; return n })
        }, 16)
      })
    }
  }, [isVisible])

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
                <Wrench className="h-6 w-6" />
                Professional Web Maintenance
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your web <span className="relative inline-block"><span className="relative z-10">always</span><span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" /></span> updated, <span className="font-extrabold">secure and fast</span>
                <span className="block text-white/80 text-lg sm:text-xl md:text-2xl font-semibold mt-3">worldwide</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                We take care of the <strong className="text-white">technical maintenance</strong> of your website. <strong className="text-white">Updates, security, backups</strong> and <strong className="text-white">speed optimization</strong> so you can focus on your business.
              </p>
              <p className="mt-4 text-gray-300">
                <span className="text-[#00DEC7] font-semibold">Goal:</span> <span className="text-[#00DEC7]">that your website works perfectly 24/7</span> without you having to worry about anything.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black font-semibold hover:bg-[#00DEC7]/90 rounded-full px-8">
                  <Link href="/en/contact">I want maintenance</Link>
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
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><RefreshCw className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Updates</p><p className="text-gray-400 text-sm">Automatic</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Shield className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Security</p><p className="text-gray-400 text-sm">Anti-malware</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Database className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Backups</p><p className="text-gray-400 text-sm">Daily</p></div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-[#00DEC7]/20"><Zap className="h-10 w-10 text-[#00DEC7] mb-3" /><p className="text-white font-medium">Speed</p><p className="text-gray-400 text-sm">Optimized</p></div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">Your web protected<br />and optimized</h2>
            <p className="mt-6 text-black/80 text-lg">You will have a <strong className="text-black">dedicated technical team</strong> that keeps your web <strong className="text-black">updated, secure and running</strong> at maximum speed.</p>
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
            <h3 className="text-2xl md:text-3xl font-bold text-black">Consult us <span className="font-normal">without commitment</span></h3>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent"><Link href="/en/contact">Get a quote</Link></Button>
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
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed"><strong className="text-white font-bold">That your web works perfectly 24/7</strong>. 4 steps to keep your web <strong className="text-white font-bold">secure, fast and updated</strong>.</p>
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

      <LatestWorks projects={projects} title="Latest Projects" subtitle="Web Maintenance" viewAllText="View all projects" viewAllLink="/en/portfolio" />

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Experience in<br />web maintenance</h2>
            <p className="mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">We maintain <span className="text-white">websites</span> for companies <span className="text-white">worldwide</span>.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (<div key={stat.label}><span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">{stat.prefix}{counts[index]}{stat.suffix}</span><p className="mt-2 text-gray-400 text-sm">{stat.label}</p></div>))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} category="mantenimiento-web" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2><p className="mt-2 text-gray-500 uppercase tracking-widest text-sm">Web Maintenance</p></div>
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
                  <div className="relative"><Wrench className="h-32 w-32 text-[#00DEC7]" /><div className="absolute -top-4 -right-4 bg-[#00DEC7] rounded-full p-2"><Shield className="h-6 w-6 text-black" /></div><div className="absolute -bottom-2 -left-4 bg-black rounded-full p-2"><RefreshCw className="h-6 w-6 text-white" /></div></div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-6 py-4 mb-6"><h3 className="text-xl md:text-2xl font-bold text-black text-center">Do you want to keep your web protected?</h3></div>
              <p className="text-center text-gray-600 mb-2">Consult us <span className="font-semibold text-black">without commitment</span></p>
              <p className="text-center text-gray-600 text-sm mb-8">Write to us at <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a> or send the form.</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                  <input type="url" placeholder="Your website URL" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7]" />
                </div>
                <textarea placeholder="Tell me about your website... *" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] resize-none" />
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
