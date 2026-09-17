"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Mail, User, MessageSquare, ListFilter, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { pushToDataLayer } from "@/lib/gtm"
import { Testimonial } from "@/app/testimonials/data"

const servicios = [
  { value: "web-design", label: "Web Design" },
  { value: "online-store", label: "Online Store" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "ai-agents", label: "AI Agents and Bots" },
  { value: "apps", label: "Mobile Apps" },
  { value: "other", label: "Other" },
]

const stats = [
  { number: "+8", label: "Years of experience" },
  { number: "+150", label: "Completed projects" },
  { number: "+45", label: "5-star reviews" },
  { number: "100%", label: "Clients Worldwide" },
]

const faqs = [
  {
    question: "How much does it cost to develop a professional website?",
    answer: "Prices vary depending on the complexity of the project. A basic corporate website starts from USD 500, online stores from USD 800, and projects with advanced features are quoted individually. We offer no-obligation quotes.",
  },
  {
    question: "How long does it take to develop a project?",
    answer: "Timelines depend on the type of project: a corporate website takes between 2-3 weeks, online store between 4-6 weeks, mobile applications between 6-12 weeks, and chatbots or AI agents between 2-4 weeks.",
  },
  {
    question: "Do you offer maintenance and technical support?",
    answer: "Yes, all our projects include 30 days of initial technical support at no additional cost. We also offer monthly maintenance plans that include updates, backups, monitoring, and priority support.",
  },
  {
    question: "Do you work with clients from other countries?",
    answer: "Yes, we work with clients worldwide. Communication is done via video call and email to ensure smooth project management regardless of location.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept International Bank Transfers (SWIFT), Crypto (USDT), PayPal, and Wise. We offer flexible payment plans.",
  },
  {
    question: "Can I see examples of previous work?",
    answer: "Of course. In our Portfolio section, you can see the complete portfolio with web design projects, online stores, mobile apps, and more. We can also show you success stories similar to your project.",
  },
  {
    question: "What does the digital marketing service include?",
    answer: "Our service includes campaign management on Google Ads, Meta Ads, and TikTok Ads, SEO optimization, Google Business Profile configuration, email marketing, and monthly results reports.",
  },
  {
    question: "What is the work process like?",
    answer: "Our process has 4 stages: 1) Initial meeting to understand your needs, 2) Proposal and budget, 3) Development with periodic reviews, 4) Launch and training. You maintain direct communication throughout the project.",
  },
]

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!startCounting) return
    
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, startCounting])
  
  return count
}

export default function ContactClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    servicio: "",
    mensaje: "",
    acepto: false,
    honeypot: "",
  })
  const [timestamp, setTimestamp] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [statsInView, setStatsInView] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimestamp(Date.now())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true)
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const stat1 = useCountUp(8, 2000, statsInView)
  const stat2 = useCountUp(150, 2000, statsInView)
  const stat3 = useCountUp(45, 2000, statsInView)
  const stat4 = useCountUp(2, 2000, statsInView)
  const animatedStats = [stat1, stat2, stat3, stat4]

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      let token = ""
      if ((window as any).grecaptcha) {
        token = await (window as any).grecaptcha.execute('6LdXk1MsAAAAAP6rbOwWHfG9qv47gpAs3sCU3jLI', { action: 'contact_submit' })
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp, token }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Error sending form")

      setIsSubmitted(true)
      pushToDataLayer("form_submit", {
        form_name: "Contact Page",
        service: formData.servicio,
      })
      setFormData({
        nombre: "",
        email: "",
        servicio: "",
        mensaje: "",
        acepto: false,
        honeypot: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error sending form")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero1.webp"
          alt="Contact Vektra"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            We are ready to help you boost your digital business
          </p>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
            <a href="mailto:info@vektra.digital" className="group flex flex-col md:flex-row items-center justify-center gap-3 p-4 md:p-0 rounded-2xl bg-gray-50 md:bg-transparent text-black hover:text-[#00DEC7] transition-all hover:shadow-sm md:hover:shadow-none col-span-2 md:col-span-auto">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00DEC7] bg-white group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-[#00DEC7]" />
              </div>
              <span className="font-medium text-sm md:text-base">info@vektra.digital</span>
            </a>
          </div>
        </div>
      </section>

      {/* Form Section - Centered */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          {/* Dotted separator */}
          <div className="border-t-2 border-dotted border-gray-300 mb-10" />

          {/* CTA Text */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg">
              Write to us at{" "}
              <a href="mailto:info@vektra.digital" className="underline font-semibold text-black hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
              or send us the following form and we will respond as soon as possible
            </p>
          </div>

          {isSubmitted ? (
            <div className="rounded-2xl border-2 border-[#00DEC7] bg-[#00DEC7]/10 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEC7]/20">
                <CheckCircle className="h-8 w-8 text-[#00DEC7]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Message sent successfully</h3>
              <p className="text-gray-600">Thank you for contacting us. We will respond in less than 24 hours.</p>
              <Button 
                variant="outline" 
                className="mt-6 bg-transparent border-black hover:bg-black hover:text-white"
                onClick={() => setIsSubmitted(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Servicio Select */}
              <div className="relative">
                <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                <Select value={formData.servicio} onValueChange={(value) => setFormData({ ...formData, servicio: value })} required>
                  <SelectTrigger className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7] text-left">
                    <SelectValue placeholder="Budget / Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicios.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Nombre */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7]"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 py-6 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7]"
                />
              </div>

              {/* Mensaje */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <Textarea
                  placeholder="Message *"
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="pl-10 border-gray-200 focus:border-[#00DEC7] focus:ring-[#00DEC7] resize-none"
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="acepto"
                  checked={formData.acepto}
                  onCheckedChange={(checked) => setFormData({ ...formData, acepto: checked as boolean })}
                  className="mt-1 data-[state=checked]:bg-[#00DEC7] data-[state=checked]:border-[#00DEC7]"
                  required
                />
                <label htmlFor="acepto" className="text-sm text-gray-600">
                  I have read and accept the{" "}
                  <Link href="/en/privacy-policy" className="underline font-semibold text-black hover:text-[#00DEC7]">
                    privacy policy
                  </Link>
                </label>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.acepto}
                  className="bg-[#00DEC7] hover:bg-[#00C4B0] text-black font-semibold px-12 py-6 rounded-full text-base"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Trayectoria Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Professional trajectory<br />
              backed by results
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Throughout these years working with clients worldwide, we have built a portfolio of successful projects. The following data reflects the growth and trust that our clients have placed in us.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center md:text-left">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {stat.number.startsWith("+") ? "+" : ""}{animatedStats[index]}
                </span>
                <p className="mt-2 text-white/60 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                What they say about us
              </h2>
              <p className="mt-4 text-gray-600 max-w-xl">
                The satisfaction of our clients is our best letter of introduction
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2">
                <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
                <span className="font-semibold text-black ml-1">4.9</span>
                <div className="flex ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl text-black leading-relaxed mb-6">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                      <div>
                        <p className="font-semibold text-black">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-[#00DEC7] hover:text-[#00DEC7] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentTestimonial ? "w-8 bg-[#00DEC7]" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-[#00DEC7] hover:text-[#00DEC7] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-600">
              We answer your questions about our services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-gray-200 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-black hover:text-[#00DEC7] py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA after FAQs */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Can&apos;t find what you&apos;re looking for?{" "}
              <span className="font-semibold text-black">Contact us</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="bg-[#00DEC7] hover:bg-[#00C4B0] text-black font-semibold px-8 rounded-full">
                <a href="mailto:info@vektra.digital">
                  <Mail className="mr-2 h-4 w-4" />
                  Email us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Banner */}
      <section className="py-4 bg-black">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#00DEC7] opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-[#00DEC7]" />
              </div>
              <span className="text-white font-medium">Available for new projects</span>
            </div>
            <span className="text-white/60 text-sm">Monday to Friday, 9:00 - 18:00 (GMT-3)</span>
          </div>
        </div>
      </section>
    </>
  )
}
