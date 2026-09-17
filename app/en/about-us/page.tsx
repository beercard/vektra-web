
import type { Metadata } from "next"
import Image from "next/image"
import { 
  GraduationCap,
  Award,
  Mail,
  MapPin,
  Linkedin,
  Globe
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Vektra - Digital Agency Worldwide",
  description: "Meet the team behind Vektra: experts in web development, digital marketing, and artificial intelligence providing global solutions.",
}

export default function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero1.webp"
          alt="Vektra - Web development, apps and AI agents agency Worldwide"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About <span className="text-[#00DEC7]">Us</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Meet the team behind Vektra: experts in web development, digital marketing, and artificial intelligence serving clients worldwide.
          </p>
        </div>
      </section>

      {/* Introduction - Who We Are */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Martin */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-40 h-40 rounded-xl overflow-hidden relative bg-gray-200">
                    <Image
                      src="/images/staff/Martin Garcia.JPG"
                      alt="Martin Garcia - Digital Marketing Degree"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">Martin Garcia</h2>
                  <p className="text-[#00DEC7] font-medium mb-3">Digital Marketing Degree</p>

                  <div className="flex items-center gap-3 mb-4">
                    <a href="https://www.linkedin.com/in/martinlgarcia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="https://es.fiverr.com/users/martingarcia508/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1dbf73] transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.707 9.878h-2.784v-1.12c0-1.28.618-1.574 1.348-1.574.628 0 1.033.303 1.033.303l.663-2.618s-.82-.472-2.123-.472c-2.505 0-3.695 1.54-3.695 3.966v1.516h-2.438v2.798h2.438v8.663h3.556v-8.663h2.64l.36-2.798zm-9.01 11.46h-3.55V9.879h3.55v11.46zm-1.77-13.044c1.135 0 1.91-.798 1.91-1.854 0-1.09-.764-1.854-1.921-1.854-1.146 0-1.91.764-1.91 1.854 0 1.056.775 1.854 1.921 1.854zm-8.663 13.045h3.55V9.879H2.264v11.46z"/>
                      </svg>
                    </a>
                    <a href="https://www.behance.net/martinlgarcia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1769ff] transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 7h-5v3h5V7zM6.2 12.5c1.9 0 3 .6 3.6 1.7.4.7.5 1.6.5 2.5 0 1.9-1.1 3.4-2.9 4.1.7.5 1.2 1.2 1.2 2.1 0 2-1.6 3.1-4 3.1H0V7h4.8c2.1 0 3.8 1.1 3.8 3.3 0 1.1-.5 1.9-1.4 2.2zM2.8 9.5v4h1.7c1.1 0 1.7-.5 1.7-1.5 0-1.2-.6-1.6-1.8-1.6H2.8zm0 6.5v4.5h2c1.3 0 2-.6 2-1.8 0-1.2-.6-1.8-2-1.8h-2z"/>
                      </svg>
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Google Ads</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Meta Ads</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">TikTok Ads</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">SEO</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">WordPress</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">WooCommerce</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Tiendanube</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Shopify</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Graduated in 2021</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  Martin is the strategic brain behind Vektra&apos;s digital marketing campaigns. With his degree in Digital Marketing and years of experience managing advertising on <strong>Google Ads, Meta Ads, and TikTok Ads</strong>, he has helped dozens of companies <strong>worldwide</strong> increase their online sales.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Additionally, he is part of the team of experts in <strong>web design with WordPress, WooCommerce, Tiendanube, and Shopify</strong>, creating online stores optimized for conversion and search engine positioning. His deep knowledge of the Google ecosystem (Analytics, Search Console, Tag Manager, My Business) allows offering comprehensive digital marketing strategies.
                </p>
              </div>
            </div>

            {/* Matias */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-40 h-40 rounded-xl overflow-hidden relative bg-gray-200">
                    <Image
                      src="/images/staff/Matias Garcia.jpeg"
                      alt="Matias Garcia - Systems Analyst"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">Matias Garcia</h2>
                  <p className="text-[#00DEC7] font-medium mb-3">Systems Analyst</p>

                  <div className="flex items-center gap-3 mb-4">
                    <a href="https://www.linkedin.com/in/matias-luciano-garcia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="https://github.com/matiaslgarcia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Next.js</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">React</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Node.js</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">AI Agents</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Chatbots</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Mobile Apps</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">React Native</span>
                    <span className="px-3 py-1 bg-[#00DEC7]/10 text-[#00b3a0] text-xs font-medium rounded-full">Flutter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Award className="h-4 w-4" />
                    <span>AI and Automation Specialist</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  Matias is the technical expert at Vektra, specializing in <strong>modern web development with Next.js, React, and Node.js</strong>. As a Systems Analyst, he has developed advanced technological solutions for companies <strong>globally</strong>, from web applications to complex systems.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  His passion for <strong>artificial intelligence</strong> led him to specialize in the development of <strong>AI agents and bots, WhatsApp chatbots</strong>, and business automations. He also integrates the team of experts in <strong>mobile application development</strong> with React Native and Flutter, creating native apps for iOS and Android.
                </p>
              </div>
            </div>
          </div>

          {/* Vektra Description */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              We are <span className="text-[#00DEC7]">Vektra</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Vektra, we merge <strong>high-level software engineering</strong> with <strong>digital marketing strategies</strong>, creating visual narratives and technological products that drive your brand&apos;s success. We are two brothers passionate about technology and entrepreneurship, committed to helping companies <strong>worldwide</strong> grow in the digital world.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="h-4 w-4 text-[#00DEC7]" />
                <span>info@vektra.digital</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4 text-[#00DEC7]" />
                <span>Argentina</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section className="relative py-16 bg-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00DEC7]" />
        <div className="mx-auto max-w-5xl px-4 lg:px-8 text-center">
          <p className="text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed">
            &ldquo;Our goal is for our clients to be able to launch their digital business or project so they can <span className="text-[#00DEC7] font-semibold">offer their services</span> or <span className="text-[#00DEC7] font-semibold">sell their products online</span> to the world&rdquo;
          </p>
        </div>
      </section>

      {/* Time to Entrepreneur */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                It&apos;s time to<br />
                <span className="text-[#00DEC7]">Go Global</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                We live in a hyper-connected world where digital presence is key to business success. E-commerce and digital services are experiencing exponential growth globally.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                It is the perfect time to digitize your business and reach thousands of potential clients around the world. Don&apos;t limit your growth; expand your horizons with a solid digital strategy.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed italic">
                &ldquo;We face each project with great enthusiasm and desire to demonstrate our professionalism, with attractive and effective work so that you as a client obtain <strong className="text-black">more contacts, more sales, and achieve your goals</strong>.&rdquo;
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/about/emprender.jpg"
                alt="It's time to entrepreneur Worldwide - Vektra digital agency"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
