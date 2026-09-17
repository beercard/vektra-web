import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Home, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Página no encontrada | Vektra",
  description: "La página que buscás no existe o fue movida. Explorá nuestros servicios de desarrollo web, marketing digital y agentes IA para empresas de todo el mundo.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-7xl sm:text-9xl font-bold text-[#00DEC7] mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-white/70 text-lg mb-8">
          La página que buscás no existe o fue movida. Pero podemos ayudarte a encontrar lo que necesitás.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90 rounded-full px-8">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8">
            <Link href="/servicios">
              Nuestros servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8">
            <Link href="/contacto">
              <Phone className="mr-2 h-4 w-4" />
              Contactar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
