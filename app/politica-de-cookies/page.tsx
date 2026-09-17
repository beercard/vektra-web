import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Cookies | Vektra - Agencia Digital",
  description: "Política de cookies de Vektra. Información sobre el uso de cookies y tecnologías similares en nuestro sitio web.",
  robots: "noindex, follow",
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00DEC7] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-gray-400">
            Última actualización: Enero 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-black mb-4">1. Qué son las Cookies</h2>
            <p className="text-gray-700 mb-8">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, tablet, teléfono móvil) cuando los visita. Estas cookies permiten que el sitio web recuerde sus acciones y preferencias (como idioma, tamaño de fuente y otras preferencias de visualización) durante un periodo de tiempo, para que no tenga que volver a configurarlas cada vez que visite el sitio o navegue de una página a otra.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">2. Tipos de Cookies que Utilizamos</h2>
            
            <h3 className="text-xl font-semibold text-black mb-3">2.1 Según su Finalidad</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Cookies Técnicas (Necesarias)
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Son esenciales para el funcionamiento del sitio web. Sin ellas, el sitio no funcionaría correctamente.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Mantener la sesión del usuario</li>
                  <li>Recordar preferencias de configuración</li>
                  <li>Garantizar la seguridad del sitio</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Cookies Analíticas
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Nos permiten analizar el comportamiento de los usuarios para mejorar nuestro sitio web.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Número de visitantes</li>
                  <li>Páginas más visitadas</li>
                  <li>Tiempo de permanencia</li>
                  <li>Origen del tráfico</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  Cookies de Marketing
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas publicitarias.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Remarketing y retargeting</li>
                  <li>Medición de conversiones</li>
                  <li>Personalización de anuncios</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-black mb-3">2.2 Según su Duración</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Cookies de sesión:</strong> Se eliminan al cerrar el navegador</li>
              <li><strong>Cookies persistentes:</strong> Permanecen en su dispositivo durante un periodo determinado o hasta que las elimine manualmente</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">3. Cookies de Terceros</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos servicios de terceros que pueden instalar sus propias cookies:
            </p>
            
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Proveedor</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Finalidad</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Tipo</th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Más info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Google Analytics</td>
                    <td className="border border-gray-200 px-4 py-3">Análisis de tráfico web</td>
                    <td className="border border-gray-200 px-4 py-3">Analítica</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Política de Google
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Google Ads</td>
                    <td className="border border-gray-200 px-4 py-3">Remarketing y conversiones</td>
                    <td className="border border-gray-200 px-4 py-3">Marketing</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Política de Google
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Meta Pixel</td>
                    <td className="border border-gray-200 px-4 py-3">Seguimiento de conversiones Facebook/Instagram</td>
                    <td className="border border-gray-200 px-4 py-3">Marketing</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Politica de Meta
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Vercel Analytics</td>
                    <td className="border border-gray-200 px-4 py-3">Rendimiento del sitio</td>
                    <td className="border border-gray-200 px-4 py-3">Analítica</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Política de Vercel
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">4. Cómo Gestionar las Cookies</h2>
            <p className="text-gray-700 mb-4">
              Puede configurar su navegador para aceptar o rechazar cookies. A continuación le indicamos cómo hacerlo en los navegadores más comunes:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Google Chrome</h4>
                <p className="text-sm text-[#00DEC7]">Ver instrucciones →</p>
              </a>
              <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Mozilla Firefox</h4>
                <p className="text-sm text-[#00DEC7]">Ver instrucciones →</p>
              </a>
              <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Safari</h4>
                <p className="text-sm text-[#00DEC7]">Ver instrucciones →</p>
              </a>
              <a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Microsoft Edge</h4>
                <p className="text-sm text-[#00DEC7]">Ver instrucciones →</p>
              </a>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-amber-800 mb-2">Importante</h4>
              <p className="text-sm text-amber-700">
                Si deshabilita las cookies, es posible que algunas funcionalidades del sitio web no funcionen correctamente o que su experiencia de navegación se vea afectada.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">5. Opt-out de Cookies Analíticas</h2>
            <p className="text-gray-700 mb-4">
              Puede optar por no ser rastreado por Google Analytics instalando el siguiente complemento de navegador:
            </p>
            <a 
              href="https://tools.google.com/dlpage/gaoptout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors mb-8"
            >
              Descargar complemento de exclusion de Google Analytics
            </a>

            <h2 className="text-2xl font-bold text-black mb-4">6. Marco Legal</h2>
            <p className="text-gray-700 mb-4">
              Esta política de cookies se rige por:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Argentina:</strong> Ley 25.326 de Protección de Datos Personales y disposiciones de la AAIP sobre consentimiento informado, aplicable como legislación del domicilio de Vektra</li>
              <li>Para clientes de otros países, aplicamos además los estándares internacionales de consentimiento y privacidad en línea que resulten pertinentes</li>
              <li>Adicionalmente, seguimos las mejores prácticas internacionales basadas en el RGPD europeo</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">7. Actualizaciones</h2>
            <p className="text-gray-700 mb-8">
              Esta política de cookies puede actualizarse periódicamente para reflejar cambios en nuestras prácticas o por motivos legales. Le recomendamos revisar esta página regularmente para estar informado sobre cómo utilizamos las cookies.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">8. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Si tiene alguna pregunta sobre nuestra política de cookies, puede contactarnos:
            </p>
            <div className="bg-[#00DEC7]/10 border border-[#00DEC7]/30 rounded-xl p-6">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> info@vektra.digital</p>
              <p className="text-gray-700"><strong>Web:</strong> https://vektra.digital/contacto</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
