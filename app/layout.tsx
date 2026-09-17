import React from "react"
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from "next/script"
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LanguageProvider } from '@/lib/i18n'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { CustomCursor } from '@/components/ui/custom-cursor'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vektra.digital'),
  title: {
    default: 'Vektra | Desarrollo Web, Apps y Agentes IA a Nivel Mundial',
    template: '%s | Vektra - Agencia Digital'
  },
  description: 'Vektra: Agencia digital de desarrollo web, tiendas online, aplicaciones móviles, marketing digital y agentes de IA para empresas de todo el mundo. Fusionamos ingeniería de software con estrategias de marketing digital.',
  keywords: [
    'vektra', 'agencia digital', 'agencia digital global',
    'desarrollo web', 'diseño web profesional', 'desarrollo web internacional',
    'tienda online', 'ecommerce', 'marketing digital', 'publicidad digital',
    'agentes ia', 'chatbots whatsapp', 'bots inteligencia artificial',
    'desarrollo de apps', 'aplicaciones móviles', 'apps android ios',
    'automatización de procesos', 'chatgpt para empresas', 'asistentes virtuales',
    'página web profesional', 'sitio web corporativo', 'landing page',
    'WooCommerce', 'WordPress', 'Tiendanube', 'Shopify', 'Next.js', 'React',
    'posicionamiento web', 'SEO internacional', 'SEO para IA',
    'Google Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Ads',
    'consultoría digital', 'transformación digital'
  ],
  authors: [{ name: 'Vektra', url: 'https://vektra.digital' }],
  creator: 'Vektra',
  publisher: 'Vektra',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Vektra | Desarrollo Web, Apps y Agentes IA',
    description: 'Agencia digital especializada en desarrollo web, aplicaciones, tiendas online y agentes de IA para empresas de todo el mundo.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Vektra - Agencia Digital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vektra | Desarrollo Web, Apps y Agentes IA',
    description: 'Agencia digital: desarrollo web, apps móviles, tiendas online y agentes de IA para empresas de todo el mundo.',
    creator: '@vektradigital',
  },
  alternates: {
    canonical: 'https://vektra.digital',
    languages: {
      'es': 'https://vektra.digital',
      'en': 'https://vektra.digital/en',
    },
  },
  verification: {
    google: 'google-site-verification=2mh0Rgl8tR-C8XUxPw_HXJI8nYGAG5tJLwIDERjm5hU',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://vektra.digital/#organization",
  "name": "Vektra",
  "alternateName": "Vektra Digital",
  "legalName": "Vektra Digital Solutions S.A.S.",
  "taxID": "30-71955290-7",
  "description": "Somos una agencia digital especializada en desarrollo web, aplicaciones móviles, tiendas online, marketing digital y agentes de IA para empresas de todo el mundo.",
  "url": "https://vektra.digital",
  "logo": "https://vektra.digital/logo.png",
  "email": "info@vektra.digital",
  "foundingDate": "2026",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 2,
    "maxValue": 10
  },
  "slogan": "Fusionamos ingeniería de software con estrategias de marketing digital",
  "knowsAbout": ["Desarrollo Web", "E-commerce", "Marketing Digital", "SEO", "Inteligencia Artificial", "Chatbots", "Apps Móviles"],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR"
  },
  "areaServed": "Worldwide",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://facebook.com/vektradigital",
    "https://linkedin.com/company/vektradigital",
    "https://instagram.com/vektra.digital"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "45"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Desarrollo Digital",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo Web Profesional"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tienda Online / E-commerce"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo de Apps Móviles"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Marketing Digital"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Agentes y Bots de IA"
        }
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProd = process.env.NODE_ENV === "production"
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {isProd ? (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-MQRF347T8P"
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-MQRF347T8P');`}
            </Script>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-52XK5LJK');`}
            </Script>
          </>
        ) : null}
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ScrollProgress />
          <CustomCursor />
          {isProd ? (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-52XK5LJK"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          ) : null}
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
