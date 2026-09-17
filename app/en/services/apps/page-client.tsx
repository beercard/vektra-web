"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Plus, Minus, Star, Smartphone, Monitor, Cpu, Zap, Shield, Cloud, Wrench, Palette, TrendingUp, ArrowRight } from "lucide-react"
import { Testimonials } from "@/components/sections/testimonials"
import { Testimonial } from "@/app/testimonials/data"

interface AppsPageClientProps {
  testimonials: Testimonial[]
}


const marqueeItems = [
  { text: "App Development", highlight: false },
  { text: "iOS & Android", highlight: false },
  { text: "React Native", highlight: true },
  { text: "Flutter", highlight: true },
  { text: "Global Solutions", highlight: false },
  { text: "UX/UI Mobile", highlight: false },
  { text: "App Maintenance", highlight: false },
  { text: "App Development", highlight: false },
  { text: "iOS & Android", highlight: false },
  { text: "React Native", highlight: true },
  { text: "Flutter", highlight: true },
  { text: "Global Solutions", highlight: false },
  { text: "UX/UI Mobile", highlight: false },
  { text: "App Maintenance", highlight: false },
];

const servicesIncluded = [
  {
    title: "Native Android Apps",
    description: "Native application development for Android with Kotlin or Java. Publication on Google Play Store included. Apps optimized for all Android devices.",
  },
  {
    title: "Native iOS Apps",
    description: "Native application development for iPhone and iPad with Swift. Publication on App Store included. Compliance with all Apple guidelines.",
  },
  {
    title: "Hybrid Apps (React Native / Flutter)",
    description: "Single codebase for Android and iOS. Reduced costs and development time. Same user experience on both platforms.",
  },
  {
    title: "Progressive Web Apps (PWA)",
    description: "Web apps that function as native applications. No need to download from stores. Work offline and send push notifications.",
  },
  {
    title: "Custom UI/UX Design",
    description: "Modern and attractive interface design. Optimized user experience. Prototyping and validation before development.",
  },
  {
    title: "Backend and APIs",
    description: "Server and database development for your app. REST or GraphQL APIs. Scalable cloud infrastructure (AWS, Google Cloud, Vercel).",
  },
  {
    title: "Integrations",
    description: "Connection with MercadoPago, payment gateways, maps, push notifications, analytics, and any external service you need.",
  },
  {
    title: "Admin Panel",
    description: "Web dashboard to manage your app, users, content, and statistics. Total control of your application from anywhere.",
  },
  {
    title: "Store Publication",
    description: "We handle the entire publication process on Google Play Store and Apple App Store. ASO optimization for better visibility.",
  },
  {
    title: "Maintenance and Updates",
    description: "Continuous technical support, security updates, new features, and compatibility with new Android and iOS versions.",
  },
]

const technologies = [
  { name: "React Native", image: "https://cdn.simpleicons.org/react/000000" },
  { name: "Flutter", image: "https://cdn.simpleicons.org/flutter/000000" },
  { name: "Swift", image: "https://cdn.simpleicons.org/swift/000000" },
  { name: "Kotlin", image: "https://cdn.simpleicons.org/kotlin/000000" },
  { name: "Firebase", image: "https://cdn.simpleicons.org/firebase/000000" },
  { name: "Node.js", image: "https://cdn.simpleicons.org/nodedotjs/000000" },
]

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "and planning",
    description: "We analyze your idea, define functionalities, create wireframes, and establish the project roadmap.",
    highlight: "Complete documentation before starting."
  },
  {
    step: "02",
    title: "Design",
    subtitle: "UI/UX",
    description: "We create the visual design of your app, prototype screens, and validate the user experience with you.",
    highlight: null
  },
  {
    step: "03",
    title: "Development",
    subtitle: "and integration",
    description: "We program your app with best practices, integrate APIs and services, and perform continuous testing.",
    highlight: null
  },
  {
    step: "04",
    title: "Launch",
    subtitle: "and support",
    description: "We publish on stores, monitor performance, and provide continuous support.",
    highlight: "Your app ready to conquer the market."
  },
]

const portfolioProjects = [
  { title: "Delivery App", category: "E-commerce", image: "/placeholder.svg?height=300&width=400&text=Delivery+App" },
  { title: "Medical Appointments App", category: "Health", image: "/placeholder.svg?height=300&width=400&text=Medical+App" },
  { title: "Fitness App", category: "Sports", image: "/placeholder.svg?height=300&width=400&text=Fitness+App" },
  { title: "Business Management App", category: "Enterprise", image: "/placeholder.svg?height=300&width=400&text=Management+App" },
  { title: "E-learning App", category: "Education", image: "/placeholder.svg?height=300&width=400&text=Elearning+App" },
  { title: "Booking App", category: "Tourism", image: "/placeholder.svg?height=300&width=400&text=Booking+App" },
  { title: "Finance App", category: "Fintech", image: "/placeholder.svg?height=300&width=400&text=Fintech+App" },
  { title: "Logistics App", category: "Transport", image: "/placeholder.svg?height=300&width=400&text=Logistics+App" },
]

const stats = [
  { value: 30, prefix: "+", suffix: "", label: "Apps developed" },
  { value: 50000, prefix: "+", suffix: "", label: "Total downloads" },
  { value: 4.8, prefix: "", suffix: "", label: "Average store rating" },
  { value: 100, prefix: "", suffix: "%", label: "Clients Worldwide" },
]

const faqs = [
  { question: "How much does it cost to develop a mobile app?", answer: "The cost depends on complexity, features, and platforms (Android, iOS, or both). A basic app can start from USD 3,000, while more complex apps with backend, integrations, and admin panel can cost between USD 8,000 and USD 25,000. We give you a detailed quote after analyzing your project." },
  { question: "How long does it take to develop an app?", answer: "A basic app can be ready in 2-3 months. Medium complexity apps take between 4-6 months, and large projects can take 6-12 months. The exact time depends on features, integrations, and feedback during the development process." },
  { question: "Is a native or hybrid app better?", answer: "It depends on your project. Hybrid apps (React Native, Flutter) allow developing for Android and iOS with a single codebase, reducing costs and time. Native apps offer maximum performance for very demanding apps (games, AR/VR). For most projects, we recommend React Native or Flutter." },
  { question: "What is a PWA and when is it suitable?", answer: "A Progressive Web App is a website that functions like an app: it can be installed, works offline, and sends notifications. It&apos;s suitable when you want to reach users without them downloading from stores, or as a first step before investing in native apps. It&apos;s more economical and faster to develop." },
  { question: "Do you include publication on Google Play and App Store?", answer: "Yes, we handle the entire publication process: developer account creation, asset preparation (icons, screenshots, descriptions), compliance with store policies, and ASO optimization for better visibility. Developer accounts have a one-time cost (Google Play USD 25, Apple USD 99/year)." },
  { question: "Can I update my app content without knowing how to code?", answer: "Yes, we develop a web administration panel where you can manage users, content, products, notifications, and view statistics. All without touching code. Content updates are automatically reflected in the app." },
  { question: "What happens if I need changes after launch?", answer: "We offer monthly maintenance plans that include security updates, compatibility with new Android/iOS versions, small adjustments, and technical support. For large new features, we quote separately." },
  { question: "Do you work with international companies?", answer: "Yes, we work with clients worldwide. Meetings are via video call (Meet, Zoom) and communication flows perfectly. We have already developed apps for companies in USA, Europe, and Latin America." },
  { question: "What technologies do you use for the backend?", answer: "We use Node.js, Next.js, or Python for the backend depending on project needs. For databases: PostgreSQL, MongoDB, or Firebase. Infrastructure can be on AWS, Google Cloud, Vercel, or dedicated servers depending on expected volume." },
  { question: "Can I integrate my app with systems I already have?", answer: "Of course. We develop APIs to connect your app with ERPs, CRMs, billing systems, e-commerce, payment gateways (MercadoPago, Stripe), shipping services, and any system that has an API available or allows integration." },
]

const complementServices = [
  {
    title: "App Maintenance",
    subtitle: "Your app always updated",
    items: ["Security updates", "New OS compatibility", "Bug fixes", "Performance optimization", "24/7 Monitoring", "Automatic backups"],
    href: "/en/services/maintenance",
    icon: Wrench
  },
  {
    title: "UI/UX Design",
    subtitle: "Memorable experiences",
    items: ["User research", "Wireframes and prototypes", "Interface design", "Usability testing", "Design system", "Animations and micro-interactions"],
    href: "/en/services/ui-design",
    icon: Palette
  },
  {
    title: "App Marketing",
    subtitle: "Grow your app",
    items: ["ASO (App Store Optimization)", "Download campaigns", "Google Ads for apps", "Meta Ads", "Analytics and metrics", "Retention strategy"],
    href: "/en/services/digital-marketing",
    icon: TrendingUp
  },
]

export default function AppsPageClient({ testimonials }: AppsPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const statsRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Stats animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          stats.forEach((stat, index) => {
            const duration = 2000
            const steps = 60
            const increment = stat.value / steps
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                current = stat.value
                clearInterval(timer)
              }
              setAnimatedStats((prev) => {
                const newStats = [...prev]
                newStats[index] = current
                return newStats
              })
            }, duration / steps)
          })
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  const formatStat = (value: number, index: number) => {
    if (index === 2) return value.toFixed(1)
    if (value >= 1000) return Math.floor(value).toLocaleString()
    return Math.floor(value)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00DEC7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <p className="text-[#00DEC7] text-lg font-medium flex items-center gap-2">
                <span className="text-2xl">📱</span> Global App Development
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Mobile App{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Development</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00DEC7] -z-0 opacity-60" />
                </span>
                {" "}Worldwide
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                We transform your ideas into powerful mobile applications for iOS and Android. Native and cross-platform development for <strong className="text-white">global startups and companies</strong>.
              </p>

              <p className="text-gray-300">
                Goal:{" "}
                <span className="text-[#00DEC7] font-medium">
                  turn your idea into a successful app
                </span>{" "}
                that your users love to use.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8 font-semibold">
                  <Link href="/en/contact">Let&apos;s talk about your app</Link>
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
                          <Star key={i} className="h-3 w-3 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">+45 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - App Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-96">
                {/* Phone mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00DEC7]/20 to-transparent rounded-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-black rounded-[2.5rem] border-4 border-gray-700 shadow-2xl">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-full" />
                  <div className="absolute inset-4 top-8 bg-gradient-to-br from-[#00DEC7] to-[#00DEC7]/50 rounded-2xl flex items-center justify-center">
                    <Smartphone className="h-16 w-16 text-black/50" />
                  </div>
                </div>
                {/* Floating icons */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="absolute top-20 -right-8 w-16 h-16 bg-[#00DEC7] rounded-xl shadow-lg flex items-center justify-center">
                  <Zap className="h-8 w-8 text-black" />
                </div>
                <div className="absolute bottom-20 -left-8 w-16 h-16 bg-black rounded-xl shadow-lg flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#00DEC7]" />
                </div>
                <div className="absolute -bottom-4 right-8 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Cloud className="h-8 w-8 text-[#00DEC7]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 inline-flex items-center">
                {item.highlight ? (
                  <span className="text-[#00DEC7] font-semibold">{item.text}</span>
                ) : (
                  <span className="text-white">{item.text}</span>
                )}
                <span className="mx-4 text-gray-600">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Your complete app,<br />
              ready to conquer the market
            </h2>
            <p className="mt-6 text-black/80 text-base sm:text-lg">
              We develop your <strong className="text-black">mobile application from start to finish</strong>. From design to store publication, we take care of everything so you can focus on your business.
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

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
              Consult us <span className="font-normal">without obligation</span>
            </h3>
            <p className="mt-2 text-black/70 max-w-xl mx-auto">
              Tell us your idea and we will advise you on the best technical solution for your app.
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

      {/* Goal Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Goal for global businesses</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-bold">Turn your idea into a successful app</strong>. 4 steps to develop a mobile application that{" "}
              <strong className="text-white font-bold">your users love and recommend</strong>.
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
            <h2 className="text-4xl md:text-5xl font-bold text-black">Apps developed worldwide</h2>
            <p className="mt-4 text-gray-600 uppercase tracking-widest text-sm">MOBILE APPLICATION DEVELOPMENT</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {portfolioProjects.map((project, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[#00DEC7] text-sm font-medium">{project.category}</span>
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Professional trajectory<br />
              backed by results
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              Throughout these years as an <span className="text-white">app development team</span>, 
              we have worked with clients <span className="text-white">worldwide</span> who vouch for our experience and commitment. 
              The following data reflects the <span className="text-white">growth</span> and trust 
              that our clients have placed in us.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {stat.prefix}{formatStat(animatedStats[index], index)}{stat.suffix}
                </span>
                <p className="mt-2 text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials 
        items={testimonials}
        title="What they say about us"
        subtitle="As an app development team"
      />

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-28 bg-black">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently asked questions about apps</h2>
            <p className="mt-4 text-gray-500 uppercase tracking-widest text-sm">MOBILE APPLICATION DEVELOPMENT</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-[#00DEC7] shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Do you have any other questions?
            </h3>
            <p className="mt-2 text-gray-400">
              Contact us <span className="text-white font-medium">without obligation</span>
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
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square bg-gradient-to-br from-[#00DEC7]/10 to-transparent rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone className="h-32 w-32 text-[#00DEC7] mx-auto mb-4" />
                    <Monitor className="h-24 w-24 text-black/20 mx-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-[#00DEC7] rounded-2xl px-8 py-6 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-black text-center">
                  Ready to create your app?
                </h3>
              </div>

              <p className="text-center text-gray-600 mb-8">
                Consult us <span className="font-bold text-black">without obligation</span>
              </p>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your app project *"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DEC7] focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy" className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I have read and accept the{" "}
                    <Link href="/en/privacy-policy" className="underline">privacy policy</Link>
                  </label>
                </div>
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

      {/* Complement Section */}
      <section className="py-20 lg:py-28 bg-[#00DEC7]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Add-ons for your app</h2>
            <p className="mt-4 text-black/60 uppercase tracking-widest text-sm">YOU MAY ALSO BE INTERESTED IN</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {complementServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-black/0 bg-white/20 p-8 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-black/60 hover:bg-white/30"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/10 text-black">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                <p className="text-black/70 italic mb-4">{service.subtitle}</p>
                <ul className="mb-6 space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-black/80 text-sm">
                      <Check className="h-4 w-4 text-black" />
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
