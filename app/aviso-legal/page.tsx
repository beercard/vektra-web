import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Aviso Legal y Términos de Uso | Vektra - Agencia Digital Argentina y Paraguay",
  description: "Términos y condiciones de uso del sitio web de Vektra. Condiciones generales de contratación de servicios de desarrollo web, apps y marketing digital.",
  robots: "noindex, follow",
}

export default function AvisoLegalPage() {
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
            Aviso Legal y Términos de Uso
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
            
            <h2 className="text-2xl font-bold text-black mb-4">1. Identificación del Titular</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Denominación:</strong> Vektra - Agencia Digital</li>
                <li><strong>Razón Social:</strong> Vektra Digital Solutions S.A.S.</li>
                <li><strong>CUIT:</strong> 30-71955290-7</li>
                <li><strong>Actividad:</strong> Servicios de desarrollo web, aplicaciones móviles, marketing digital, e-commerce y soluciones de inteligencia artificial</li>
                <li><strong>Email:</strong> info@vektra.digital</li>
                <li><strong>Sitio web:</strong> https://vektra.digital</li>
                <li><strong>Ámbito de operación:</strong> República Argentina y República del Paraguay</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">2. Objeto</h2>
            <p className="text-gray-700 mb-8">
              El presente aviso legal regula el acceso y uso del sitio web https://vektra.digital (en adelante, el &quot;Sitio Web&quot;), así como las condiciones generales de contratación de los servicios ofrecidos por Vektra. El acceso y uso del Sitio Web implica la aceptación plena de estos términos.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">3. Condiciones de Uso del Sitio Web</h2>
            <p className="text-gray-700 mb-4">
              El usuario se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Utilizar el Sitio Web de conformidad con la ley, la moral y el orden público</li>
              <li>No realizar actividades ilícitas o contrarias a la buena fe</li>
              <li>No difundir contenidos de carácter racista, xenófobo, pornográfico o que atenten contra los derechos humanos</li>
              <li>No introducir virus informáticos o realizar acciones que puedan dañar los sistemas informáticos</li>
              <li>No intentar acceder a áreas restringidas del Sitio Web sin autorización</li>
              <li>No reproducir, copiar o distribuir el contenido del Sitio Web sin autorización expresa</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">4. Servicios Ofrecidos</h2>
            <p className="text-gray-700 mb-4">
              Vektra ofrece los siguientes servicios profesionales:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Desarrollo Web</h4>
                <p className="text-sm text-gray-600">Diseño y desarrollo de sitios web profesionales, landing pages y portales corporativos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Tiendas Online</h4>
                <p className="text-sm text-gray-600">E-commerce con WooCommerce, Shopify y Tiendanube</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Apps Móviles</h4>
                <p className="text-sm text-gray-600">Desarrollo de aplicaciones para Android e iOS</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Marketing Digital</h4>
                <p className="text-sm text-gray-600">Google Ads, Meta Ads, SEO y posicionamiento web</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Agentes y Bots IA</h4>
                <p className="text-sm text-gray-600">Chatbots, automatización y soluciones de inteligencia artificial</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">SEO y Posicionamiento</h4>
                <p className="text-sm text-gray-600">Optimización para buscadores y posicionamiento en IA</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">5. Condiciones de Contratación</h2>
            
            <h3 className="text-xl font-semibold text-black mb-3">5.1 Presupuestos</h3>
            <p className="text-gray-700 mb-6">
              Los presupuestos emitidos por Vektra tienen una validez de 30 días desde su emisión, salvo indicación contraria. Los precios indicados no incluyen IVA salvo que se especifique expresamente.
            </p>

            <h3 className="text-xl font-semibold text-black mb-3">5.2 Forma de Pago</h3>
            <p className="text-gray-700 mb-4">
              Las condiciones de pago serán las establecidas en cada presupuesto. Como norma general:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>50% al inicio del proyecto como seña</li>
              <li>50% restante a la entrega del proyecto</li>
              <li>Para proyectos de mayor envergadura, se podrán acordar pagos fraccionados</li>
            </ul>

            <h3 className="text-xl font-semibold text-black mb-3">5.3 Plazos de Entrega</h3>
            <p className="text-gray-700 mb-6">
              Los plazos de entrega son orientativos y dependen de la complejidad del proyecto y la colaboración del cliente. Los retrasos por falta de material o información por parte del cliente no serán responsabilidad de Vektra.
            </p>

            <h3 className="text-xl font-semibold text-black mb-3">5.4 Obligaciones del Cliente</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Proporcionar el material necesario (textos, imágenes, logos) en tiempo y forma</li>
              <li>Realizar las revisiones y aprobaciones en los plazos acordados</li>
              <li>Efectuar los pagos según lo convenido</li>
              <li>Proporcionar accesos y credenciales necesarias para el desarrollo</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">6. Propiedad Intelectual</h2>
            <p className="text-gray-700 mb-4">
              El contenido del Sitio Web, incluyendo pero no limitado a textos, gráficos, imágenes, logotipos, iconos, software y código fuente, está protegido por las leyes de propiedad intelectual de Argentina (Ley 11.723) y Paraguay (Ley 1328/98).
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>El cliente adquiere los derechos de uso del trabajo final una vez abonado el precio total</li>
              <li>Vektra se reserva el derecho de incluir los trabajos realizados en su portfolio</li>
              <li>Los elementos de terceros (plugins, plantillas, librerías) mantienen sus licencias originales</li>
              <li>El código fuente desarrollado a medida será propiedad del cliente tras el pago completo</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">7. Garantías y Soporte</h2>
            <p className="text-gray-700 mb-4">
              Vektra ofrece las siguientes garantías:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Garantía de funcionamiento:</strong> 30 días desde la entrega para corrección de errores de desarrollo</li>
              <li><strong>Soporte técnico:</strong> Incluido durante el período de garantía</li>
              <li><strong>Mantenimiento:</strong> Disponible mediante contratación adicional</li>
              <li>La garantía no cubre modificaciones realizadas por terceros ni mal uso del sistema</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">8. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 mb-4">
              Vektra no será responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Daños derivados del mal uso de los servicios contratados</li>
              <li>Pérdida de datos por causas ajenas a nuestro control</li>
              <li>Interrupciones del servicio por causas de fuerza mayor</li>
              <li>Contenido publicado por el cliente en los sitios desarrollados</li>
              <li>Resultados de campañas de marketing (sujetos a múltiples variables)</li>
              <li>Cambios en algoritmos de terceros (Google, Meta, etc.)</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">9. Cancelaciones y Reembolsos</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>La seña inicial no es reembolsable una vez iniciado el proyecto</li>
              <li>Si el cliente cancela el proyecto, deberá abonar el trabajo realizado hasta la fecha</li>
              <li>Vektra se reserva el derecho de cancelar proyectos por incumplimiento de pago</li>
              <li>Los servicios de marketing digital pueden cancelarse con 15 días de preaviso</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">10. Confidencialidad</h2>
            <p className="text-gray-700 mb-8">
              Ambas partes se comprometen a mantener la confidencialidad de la información intercambiada durante la relación comercial. Esta obligación se mantendrá vigente incluso después de finalizada la relación contractual.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">11. Enlaces Externos</h2>
            <p className="text-gray-700 mb-8">
              El Sitio Web puede contener enlaces a sitios de terceros. Vektra no se responsabiliza del contenido, políticas de privacidad o prácticas de estos sitios externos.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">12. Legislación y Jurisdicción</h2>
            <p className="text-gray-700 mb-8">
              Las presentes condiciones se rigen por la legislación argentina y paraguaya según corresponda al domicilio del cliente. Para la resolución de cualquier controversia, las partes se someten a los tribunales ordinarios competentes, renunciando a cualquier otro fuero que pudiera corresponderles.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">13. Modificaciones</h2>
            <p className="text-gray-700 mb-8">
              Vektra se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor desde su publicación en el Sitio Web. Para proyectos en curso, aplicarán las condiciones vigentes al momento de la contratación.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">14. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Para cualquier consulta sobre estos términos y condiciones:
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
