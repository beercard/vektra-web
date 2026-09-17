"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { type Dictionary } from "@/lib/dictionaries"

interface CTAProps {
  dict?: Dictionary
}

export function CTA({ dict }: CTAProps) {
  const { t: contextT } = useLanguage()
  const t = dict || contextT

  return (
    <section className="py-20 lg:py-28 bg-accent">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl lg:text-5xl text-balance">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-lg text-accent-foreground/80">
            {t.cta.subtitle}
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:-translate-y-0.5"
            >
              <Link href="/contacto">
                <Calendar className="mr-2 h-5 w-5" />
                {t.cta.proposal}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 bg-transparent transition-transform hover:-translate-y-0.5"
            >
              <a href="mailto:info@vektra.digital">
                <Mail className="mr-2 h-5 w-5" />
                {t.cta.whatsapp}
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-accent-foreground/70">
            {t.cta.response}
          </p>
        </div>
      </div>
    </section>
  )
}
