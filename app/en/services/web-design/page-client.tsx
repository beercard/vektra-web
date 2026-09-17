"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo, createRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, ArrowRight, ShieldCheck, Headset, Megaphone } from "lucide-react"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

interface WebDesignClientProps {
  testimonials: Testimonial[]
}

const marqueeItems = [
  { text: "Worldwide Web Design", highlight: true },
  { text: "International Development" },
  { text: "Custom Websites", highlight: true },
  { text: "Global UX/UI Design" },
  { text: "Responsive Design", highlight: true },
  { text: "SEO Optimization" },
  { text: "Web Maintenance", highlight: true },
  { text: "Worldwide Web Design" },
  { text: "International Development", highlight: true },
  { text: "Custom Websites" },
  { text: "Global UX/UI Design", highlight: true },
  { text: "Responsive Design" },
  { text: "SEO Optimization", highlight: true },
  { text: "Web Maintenance" },
]

const servicesIncluded = [
  { title: "Hosting + domain", description: "Hiring web hosting and domain registration. We take care of hiring the hosting that best fits your website&apos;s needs, as well as the domain search and registration." },
  { title: "Corporate email", description: "Creation of company emails. Creation and configuration of company emails so you can start using them from day one." },
  { title: "Professional web development", description: "No templates or pre-made themes. We create the development from scratch with Next.js, React or WordPress so your website is totally personalized and adapted to your business needs." },
  { title: "Web security", description: "Installation of the best tools so the web is protected from possible hacks. Backups, SSL certificate, anti-malware protection." },
  { title: "Privacy policies", description: "Included all necessary functionalities for the web to be 100% legal. Creation of Legal Notice, Privacy Policy pages and checkbox in contact forms." },
  { title: "Measurement integration", description: "We configure pixels, events and analytics tools to measure results from day one." },
  { title: "WhatsApp", description: "Direct integration with WhatsApp thanks to the insertion of a floating button that will automatically allow the user to contact your business." },
  { title: "SEO Optimization", description: "Complete On Page SEO on all pages. Insertion of titles, descriptions, H1, H2 and H3, image descriptions, as well as sending the sitemap to Google for indexing." },
  { title: "Speed optimization", description: "So the web loads in the shortest possible time. Images, CSS, JS, HTML codes and cache will be optimized to achieve the best web performance score." },
  { title: "Google Analytics", description: "I connect your new website with Google Analytics so you can see how many people visit it, where they come from and what pages interest them most." },
  { title: "Training", description: "We teach you how to add, modify and delete web content in a very simple way thanks to the content manager or administration panel." },
  { title: "Technical support", description: "Included for one month. Once the web is finished, you will have updates and support included for one month to have your web as protected as possible." },
]

const technologies = [
  { name: "React", image: "https://cdn.simpleicons.org/react/000000" },
  { name: "Next.js", image: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "WordPress", image: "https://cdn.simpleicons.org/wordpress/000000" },
  { name: "TypeScript", image: "https://cdn.simpleicons.org/typescript/000000" },
  { name: "Tailwind CSS", image: "https://cdn.simpleicons.org/tailwindcss/000000" },
  { name: "Figma", image: "https://cdn.simpleicons.org/figma/000000" },
]

const processSteps = [
  { step: "01", title: "Analysis", subtitle: "of the project", description: "First meeting where we talk about the project, your objectives and what you need on your website or online store.", highlight: "We define the style, functions and content." },
  { step: "02", title: "Design and", subtitle: "development", description: "We create the home page of the web with a design adapted to your brand and style. When you approve it, we continue the development of the rest of the website or online store.", highlight: null },
  { step: "03", title: "Review", subtitle: "and adjustments", description: "We show you the finished web so you can review it calmly: forms, mobile version, speed... Once we have your Ok, the web is published.", highlight: null },
  { step: "04", title: "Launch", subtitle: "and Marketing", description: "We help you give visibility to the web with digital marketing tools like Google Ads.", highlight: "The goal: generate visits from day one and convert them into customers." },
]

const webProjects = [
  { title: "Aura Taxi Transfers", category: "Transport", image: "/images/projects/project-1.jpg" },
  { title: "Ciem Systems", category: "Technology", image: "/images/projects/project-2.jpg" },
  { title: "CGA Arquitectura", category: "Architecture", image: "/images/projects/project-3.jpg" },
  { title: "Andre Rehse", category: "Education", image: "/images/projects/project-4.jpg" },
  { title: "Time at Work", category: "Software", image: "/images/projects/project-5.jpg" },
  { title: "Oceana Inmobiliaria", category: "Real Estate", image: "/images/projects/project-6.jpg" },
  { title: "Oscar Calmaestra", category: "Training", image: "/images/projects/project-7.jpg" },
  { title: "Jorge Morejón", category: "Health", image: "/images/projects/project-8.jpg" },
]

const webStats = [
  { value: 10, prefix: "+", suffix: "", label: "Years of experience in web development" },
  { value: 80, prefix: "+", suffix: "", label: "Websites developed" },
  { value: 45, prefix: "+", suffix: "", label: "5 star reviews" },
  { value: 12, prefix: "+", suffix: "", label: "Countries served" },
]

const webFaqs = [
  { question: "What does the web development service include?", answer: "The service includes custom design, development with Next.js/React/WordPress, hosting, domain, corporate email, SEO optimization, WhatsApp integration, Google Analytics, training and technical support for one month." },
  { question: "What is the price to create a professional website?", answer: "Prices vary according to the complexity of the project. A basic web starts from $350.000 ARS, while more complex projects with advanced functionalities have custom budgets. Contact us for a no-obligation quote." },
  { question: "How long does it take for my website to be ready?", answer: "The delivery time depends on the type of project. A basic web can be ready in 2-3 weeks, while more complex projects can take between 4-8 weeks. We always give you an estimated time before starting." },
  { question: "Does the web include responsive design for mobiles?", answer: "Yes, all the websites we develop are 100% responsive and optimized to look perfectly on mobiles, tablets and desktop computers." },
  { question: "Can I edit and manage my web once finished?", answer: "Yes, we deliver the web with an intuitive administration panel and we provide you with training so you can update content, images and texts autonomously." },
  { question: "Do you include SEO optimization for Google?", answer: "Yes, all websites include basic On Page SEO: titles, descriptions, H1-H3 header structure, image optimization and sending the sitemap to Google for indexing." },
  { question: "Do you offer web maintenance after delivery?", answer: "Yes, we include technical support during the first month. Then we offer monthly maintenance plans that include updates, backups, security control and continuous support." },
  { question: "Do you work with international clients?", answer: "Yes, we work with clients from all over the world. Meetings are held by video call and communication is fluid thanks to digital tools like Zoom and email." },
]

const complementos = [
  {
    title: "Web maintenance",
    subtitle: "Your web protected and updated",
    items: ["Updates", "Backups", "Daily security control", "Content update", "Technical support", "WPO Speed Optimization"],
    href: "/en/services/web-maintenance", 
    icon: ShieldCheck
  },
  {
    title: "Technical support",
    subtitle: "Solutions for your web",
    items: ["Solutions to technical problems", "Web design changes", "Functionalities for your web", "Web migration", "OnPage SEO", "WPO: Speed optimization", "Hosting + domain hiring"],
    href: "/en/services/technical-support",
    icon: Headset
  },
  {
    title: "Online marketing",
    subtitle: "Improve your business's online presence",
    items: ["Meta Ads", "SEO", "Google Ads", "Google Business Profile", "Email Marketing", "Remarketing"],
    href: "/en/services/digital-marketing",
    icon: Megaphone
  },
]

const DisenoWebClient = ({ testimonials }: WebDesignClientProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "", privacy: false })
  const webStatsRefs = useMemo(() => webStats.map(() => createRef<HTMLDivElement>()), [])
  const [webStatsCounts, setWebStatsCounts] = useState(() => webStats.map(() => 0))
  const [webStatsVisible, setWebStatsVisible] = useState(() => webStats.map(() => false))
  const [webStatsStarted, setWebStatsStarted] = useState(() => webStats.map(() => false))

  useEffect(() => {
    const observers = webStatsRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setWebStatsVisible((prev) => {
              if (prev[index]) return prev
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        },
        { threshold: 0.1 }
      )

      if (ref.current) observer.observe(ref.current)

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [webStatsRefs])

  useEffect(() => {
    webStatsVisible.forEach((visible, index) => {
      if (!visible || webStatsStarted[index]) return
      setWebStatsStarted((prev) => {
        if (prev[index]) return prev
        const next = [...prev]
        next[index] = true
        return next
      })
      const end = webStats[index].value
      const duration = 2000
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setWebStatsCounts((prev) => {
          const next = [...prev]
          next[index] = Math.floor(progress * end)
          return next
        })
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    })
  }, [webStatsVisible, webStatsStarted])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-32 pb-20 lg:py-28 lg:px-8">
          <div className="grid items-center gap-8 min-h-[70vh]">
            <div className="space-y-6">
              <p className="text-white text-base sm:text-lg flex items-center gap-2">
                <span className="text-2xl">👋</span> Global Web Design
              </p>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Web Design &{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Development</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}Worldwide
              </h1>
              
              <p className="text-white/80 text-base sm:text-lg max-w-xl">
                We create unique and high-impact digital experiences for businesses around the globe. Custom web design focused on results.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="/en/contact">Let&apos;s talk?</Link>
                </Button>
                
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-8 w-8">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black">Google</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-black">5.0</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-3 w-3 fill-[#FBBC05]" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500">+45 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 text-sm">
                {item.highlight ? (
                  <span className="text-[#00DEC7] font-semibold">{item.text}</span>
                ) : (
                  <span className="text-white/70">{item.text}</span>
                )}
                <span className="mx-4 text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section - Cyan Background */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              We take care of everything,<br />worry only about your business
            </h2>
            <p className="mt-6 text-black/80 text-base sm:text-lg">
              You will have a <strong className="text-black">professional website</strong> that will allow you to give{" "}
              <strong className="text-black">visibility to your business</strong> and{" "}
              <strong className="text-black">increase your customers and your sales</strong>.
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

          <div className="mt-16 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-black">Consult us <span className="font-normal">without obligation</span></h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              If you need a <strong className="text-black">professional web development team</strong>, we can help you give visibility to your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 bg-transparent">
                <Link href="/en/contact">Budget</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Objective</h2>
            <p className="mt-6 text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Attract visitors and convert them into customers</strong>. 4 steps to create a professional website that generates{" "}
              <strong className="text-white font-bold">real results and increases your sales</strong>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{item.step}.</span>
                <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{item.title}<br/>{item.subtitle}</h3>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                  {item.highlight && <span className="text-[#00DEC7] font-medium"> {item.highlight}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Últimos Trabajos Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">Latest Works</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gray-500">DEVELOPMENT / WEB DESIGN</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {webProjects.map((project, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-[#00DEC7] uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-white font-bold">{project.title}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-sm">{project.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
              <Link href="/en/portfolio">See all works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trayectoria Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Professional trajectory<br />backed by results
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              Throughout these years as a <span className="text-white">professional web development team</span>, 
              we have worked with clients <span className="text-white">worldwide</span> who endorse our experience and commitment. 
              The following data reflect the <span className="text-white">growth</span> and trust our clients have placed in us.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {webStats.map((stat, index) => (
              <div key={index} ref={webStatsRefs[index]} className="text-center lg:text-left">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {stat.prefix}{webStatsCounts[index]}{stat.suffix}
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
        subtitle="AS A WEB DEVELOPMENT TEAM"
      />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Frequent Questions</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gray-500">PROFESSIONAL WEB DEVELOPMENT</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {webFaqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
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

          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Do you have any other questions?</h3>
            <p className="mt-2 text-gray-400">Contact us <span className="text-white font-semibold">without obligation</span></p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 bg-transparent">
                <Link href="/en/contact">Write to us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="flex justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-md">
                <circle cx="200" cy="320" rx="120" ry="30" fill="#e5e7eb" />
                <rect x="160" y="180" width="80" height="140" rx="10" fill="#00DEC7" />
                <rect x="165" y="185" width="70" height="100" fill="#1a1a1a" />
                <circle cx="200" cy="300" r="8" fill="#00DEC7" />
                <path d="M200 100 L220 180 L180 180 Z" fill="#1a1a1a" />
                <circle cx="200" cy="90" r="15" fill="#1a1a1a" />
                <path d="M170 140 Q200 120 230 140" stroke="#00DEC7" strokeWidth="3" fill="none" />
                <circle cx="240" cy="160" r="5" fill="#00DEC7" />
                <circle cx="160" cy="160" r="5" fill="#00DEC7" />
                <circle cx="250" cy="130" r="3" fill="#00DEC7" />
              </svg>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-xl p-6 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
                  Ready to start your new<br />business or project?
                </h2>
              </div>
              
              <p className="text-center text-black font-semibold mb-2">Consult us without obligation</p>
              <p className="text-center text-gray-600 text-sm mb-6">
                Write to us at{" "}
                <a href="mailto:info@vektra.digital" className="underline font-medium hover:text-[#00DEC7]">info@vektra.digital</a>{" "}
                or send us the following form and <span className="font-semibold">we will respond in less than 24 hours</span>.
              </p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <textarea
                  placeholder="Message *"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00DEC7] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  />
                  I have read and accept the <a href="/en/privacy-policy" className="underline">privacy policy</a>
                </label>
                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-12">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Complementos Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Add-ons</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-black/60">YOU MAY ALSO BE INTERESTED IN</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementos.map((comp, index) => (
              <Link
                key={index}
                href={comp.href}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <comp.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black">{comp.title}</h3>
                <p className="text-black/70 italic mb-4">{comp.subtitle}</p>
                <ul className="mb-6 space-y-2">
                  {comp.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-black/80">
                      <Check className="h-4 w-4 text-black" strokeWidth={2} />
                      {item}
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

export default DisenoWebClient
