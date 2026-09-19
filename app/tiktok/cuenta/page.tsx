import type { Metadata } from "next"
import { TikTokAuthCode } from "@/components/tiktok/auth-code"

export const metadata: Metadata = {
  title: "Autorización de cuenta de TikTok | Vektra",
  description: "Página de retorno de la autorización de cuentas de TikTok para Spark Ads.",
  robots: "noindex, nofollow",
}

export default function TikTokCuentaPage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <p className="text-sm uppercase tracking-widest text-[#00DEC7] mb-3">
            TikTok Ads
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Autorización de tu cuenta de TikTok
          </h1>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8">
            <TikTokAuthCode />
          </div>
        </div>
      </section>
    </main>
  )
}
