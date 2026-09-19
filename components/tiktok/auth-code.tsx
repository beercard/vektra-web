"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

type Estado =
  | { tipo: "cargando" }
  | { tipo: "ok"; code: string }
  | { tipo: "error"; detalle: string }
  | { tipo: "vacio" }

export function TikTokAuthCode() {
  const [estado, setEstado] = useState<Estado>({ tipo: "cargando" })
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("auth_code") ?? params.get("code")
    const error = params.get("error_description") ?? params.get("error")

    if (code) setEstado({ tipo: "ok", code })
    else if (error) setEstado({ tipo: "error", detalle: error })
    else setEstado({ tipo: "vacio" })
  }, [])

  async function copiar(code: string) {
    try {
      await navigator.clipboard.writeText(code)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      setCopiado(false)
    }
  }

  if (estado.tipo === "cargando") {
    return <p className="text-gray-400">Verificando la autorización…</p>
  }

  if (estado.tipo === "ok") {
    return (
      <div>
        <p className="text-gray-300 mb-6">
          Listo, la cuenta quedó autorizada. Copiá este código y envialo a tu contacto en Vektra
          para terminar la conexión.
        </p>

        <code className="block bg-black border border-gray-800 rounded-xl p-4 mb-4 text-sm text-white font-mono break-all">
          {estado.code}
        </code>

        <button
          type="button"
          onClick={() => copiar(estado.code)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#00DEC7] px-5 py-3 font-semibold text-black transition-opacity hover:opacity-90"
        >
          {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copiado ? "Copiado" : "Copiar código"}
        </button>

        <p className="text-sm text-gray-500 mt-6">
          El código vence a los pocos minutos. Ya podés cerrar esta ventana.
        </p>
      </div>
    )
  }

  if (estado.tipo === "error") {
    return (
      <div>
        <p className="text-gray-300 mb-4">TikTok devolvió un error al autorizar:</p>
        <code className="block bg-black border border-gray-800 rounded-xl p-4 text-sm text-white font-mono break-all">
          {estado.detalle}
        </code>
        <p className="text-sm text-gray-500 mt-6">
          Volvé a abrir el enlace de autorización que te enviamos. Si sigue fallando, escribinos a{" "}
          <a href="mailto:info@vektra.digital" className="text-[#00DEC7] hover:underline">
            info@vektra.digital
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-gray-300">No llegó ningún código de autorización.</p>
      <p className="text-sm text-gray-500 mt-4">
        Abrí de nuevo el enlace que te enviamos y confirmá el acceso desde tu cuenta de TikTok.
      </p>
    </div>
  )
}
