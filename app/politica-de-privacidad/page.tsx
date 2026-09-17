import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | Vektra - Agencia Digital",
  description: "Política de privacidad de Vektra. Conocé cómo protegemos y tratamos tus datos personales en cumplimiento con la legislación argentina de protección de datos.",
  robots: "noindex, follow",
}

export default function PrivacidadPage() {
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
            Política de Privacidad
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
            
            <h2 className="text-2xl font-bold text-black mb-4">1. Información del Responsable</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Denominación:</strong> Vektra - Agencia Digital</li>
                <li><strong>Actividad:</strong> Desarrollo web, aplicaciones móviles, marketing digital y soluciones de inteligencia artificial</li>
                <li><strong>Email de contacto:</strong> info@vektra.digital</li>
                <li><strong>Sitio web:</strong> https://vektra.digital</li>
                <li><strong>Ámbito de operación:</strong> Clientes de todo el mundo</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">2. Normativa Aplicable</h2>
            <p className="text-gray-700 mb-4">
              Esta política de privacidad se rige por la siguiente normativa:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Argentina:</strong> Ley 25.326 de Protección de Datos Personales y su Decreto Reglamentario 1558/2001, y disposiciones de la Agencia de Acceso a la Información Pública (AAIP), aplicable como legislación del domicilio de Vektra.</li>
              <li>Para clientes de otros países, aplicamos además los principios y estándares internacionales de protección de datos que resulten pertinentes según su jurisdicción.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">3. Datos que Recopilamos</h2>
            <p className="text-gray-700 mb-4">
              Recopilamos los siguientes tipos de datos personales:
            </p>
            
            <h3 className="text-xl font-semibold text-black mb-3">3.1 Datos proporcionados directamente</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Nombre y apellido</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Nombre de empresa u organizacion</li>
              <li>Información del proyecto o consulta</li>
              <li>Presupuesto estimado para servicios</li>
            </ul>

            <h3 className="text-xl font-semibold text-black mb-3">3.2 Datos recopilados automáticamente</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Dirección IP</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Origen del tráfico (cómo llegó a nuestro sitio)</li>
              <li>Cookies y tecnologías similares (ver Política de Cookies)</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">4. Finalidad del Tratamiento</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos sus datos personales para las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Responder a sus consultas y solicitudes de presupuesto</li>
              <li>Prestar los servicios contratados de desarrollo web, apps, marketing digital o IA</li>
              <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
              <li>Mejorar la experiencia de usuario en nuestro sitio web</li>
              <li>Cumplir con obligaciones legales y fiscales</li>
              <li>Enviar newsletters y novedades (solo con consentimiento previo)</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">5. Base Legal del Tratamiento</h2>
            <p className="text-gray-700 mb-4">
              El tratamiento de sus datos se fundamenta en:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Consentimiento:</strong> Al completar nuestros formularios de contacto</li>
              <li><strong>Ejecución contractual:</strong> Para prestar los servicios solicitados</li>
              <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y comunicaciones</li>
              <li><strong>Obligación legal:</strong> Para cumplir con normativas fiscales y legales</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">6. Destinatarios de los Datos</h2>
            <p className="text-gray-700 mb-4">
              Sus datos podrán ser compartidos con:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Proveedores de hosting y servicios tecnológicos</li>
              <li>Plataformas de email marketing (con su consentimiento)</li>
              <li>Herramientas de análisis web (Google Analytics)</li>
              <li>Autoridades competentes cuando sea requerido por ley</li>
            </ul>
            <p className="text-gray-700 mb-8">
              No vendemos ni cedemos sus datos personales a terceros con fines comerciales.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">7. Transferencias Internacionales</h2>
            <p className="text-gray-700 mb-8">
              Al atender clientes de todo el mundo, algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Argentina. En estos casos, nos aseguramos de que cuenten con medidas de protección adecuadas para garantizar la seguridad de sus datos personales.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">8. Plazo de Conservación</h2>
            <p className="text-gray-700 mb-8">
              Conservaremos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas, y posteriormente durante los plazos legales de prescripción aplicables (generalmente 5 años para obligaciones contractuales bajo legislación argentina).
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">9. Derechos del Titular</h2>
            <p className="text-gray-700 mb-4">
              De acuerdo con la legislación vigente, usted tiene derecho a:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Acceso</h4>
                <p className="text-sm text-gray-600">Conocer qué datos personales tenemos sobre usted</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Rectificación</h4>
                <p className="text-sm text-gray-600">Corregir datos inexactos o incompletos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Supresión</h4>
                <p className="text-sm text-gray-600">Solicitar la eliminación de sus datos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Oposición</h4>
                <p className="text-sm text-gray-600">Oponerse al tratamiento de sus datos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Revocación</h4>
                <p className="text-sm text-gray-600">Retirar su consentimiento en cualquier momento</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Portabilidad</h4>
                <p className="text-sm text-gray-600">Recibir sus datos en formato electrónico</p>
              </div>
            </div>
            <p className="text-gray-700 mb-8">
              Para ejercer estos derechos, contáctenos a <a href="mailto:info@vektra.digital" className="text-[#00DEC7] hover:underline">info@vektra.digital</a> indicando claramente su solicitud y adjuntando copia de su documento de identidad.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">10. Medidas de Seguridad</h2>
            <p className="text-gray-700 mb-8">
              Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o destrucción. Esto incluye encriptación SSL/TLS, firewalls, control de acceso y copias de seguridad periódicas.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">11. Menores de Edad</h2>
            <p className="text-gray-700 mb-8">
              Nuestros servicios están dirigidos a mayores de 18 años. No recopilamos intencionalmente datos de menores de edad. Si detectamos que hemos recopilado datos de un menor sin el consentimiento de sus padres o tutores, procederemos a eliminarlos.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">12. Autoridades de Control</h2>
            <p className="text-gray-700 mb-4">
              Si considera que el tratamiento de sus datos no cumple con la normativa vigente, puede presentar una reclamación ante:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Argentina:</strong> Agencia de Acceso a la Información Pública (AAIP) - www.argentina.gob.ar/aaip</li>
              <li>Clientes de otros países pueden además presentar su reclamación ante la autoridad de protección de datos que corresponda en su país de residencia.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">13. Modificaciones</h2>
            <p className="text-gray-700 mb-8">
              Nos reservamos el derecho de modificar esta política de privacidad para adaptarla a novedades legislativas o cambios en nuestros servicios. Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">14. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Para cualquier consulta relacionada con esta política de privacidad o el tratamiento de sus datos personales, puede contactarnos a:
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
