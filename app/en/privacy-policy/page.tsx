
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Vektra - Digital Agency",
  description: "Vektra's privacy policy. Learn how we protect and treat your personal data in compliance with Argentine data protection legislation.",
  robots: "noindex, follow",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Link 
            href="/en" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00DEC7] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-black mb-4">1. Information of the Responsible Party</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Denomination:</strong> Vektra - Digital Agency</li>
                <li><strong>Activity:</strong> Web development, mobile applications, digital marketing, and artificial intelligence solutions</li>
                <li><strong>Contact Email:</strong> info@vektra.digital</li>
                <li><strong>Website:</strong> https://vektra.digital</li>
                <li><strong>Area of operation:</strong> Clients worldwide</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">2. Applicable Regulations</h2>
            <p className="text-gray-700 mb-4">
              This privacy policy is governed by the following regulations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Argentina:</strong> Law 25.326 on Personal Data Protection and its Regulatory Decree 1558/2001, and provisions of the Agency for Access to Public Information (AAIP), applicable as the legislation of Vektra's domicile.</li>
              <li>For clients in other countries, we additionally apply relevant international data protection principles and standards according to their jurisdiction.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">3. Data We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect the following types of personal data:
            </p>
            
            <h3 className="text-xl font-semibold text-black mb-3">3.1 Data provided directly</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Name and surname</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or organization name</li>
              <li>Project or inquiry information</li>
              <li>Estimated budget for services</li>
            </ul>

            <h3 className="text-xl font-semibold text-black mb-3">3.2 Automatically collected data</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>IP Address</li>
              <li>Browser type and device</li>
              <li>Pages visited and time spent</li>
              <li>Traffic source (how you arrived at our site)</li>
              <li>Cookies and similar technologies (see Cookie Policy)</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">4. Purpose of Treatment</h2>
            <p className="text-gray-700 mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Respond to your inquiries and budget requests</li>
              <li>Provide contracted services for web development, apps, digital marketing, or AI</li>
              <li>Send communications related to our services</li>
              <li>Improve user experience on our website</li>
              <li>Comply with legal and fiscal obligations</li>
              <li>Send newsletters and news (only with prior consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">5. Legal Basis for Treatment</h2>
            <p className="text-gray-700 mb-4">
              The processing of your data is based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Consent:</strong> When completing our contact forms</li>
              <li><strong>Contractual execution:</strong> To provide requested services</li>
              <li><strong>Legitimate interest:</strong> To improve our services and communications</li>
              <li><strong>Legal obligation:</strong> To comply with fiscal and legal regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">6. Data Recipients</h2>
            <p className="text-gray-700 mb-4">
              Your data may be shared with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Hosting and technology service providers</li>
              <li>Email marketing platforms (with your consent)</li>
              <li>Web analytics tools (Google Analytics)</li>
              <li>Competent authorities when required by law</li>
            </ul>
            <p className="text-gray-700 mb-8">
              We do not sell or lease your personal data to third parties for commercial purposes.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">7. International Transfers</h2>
            <p className="text-gray-700 mb-8">
              As we serve clients worldwide, some of our service providers may be located outside of Argentina. In these cases, we ensure that they have appropriate protection measures to guarantee the security of your personal data.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">8. Conservation Period</h2>
            <p className="text-gray-700 mb-8">
              We will keep your personal data for the time necessary to fulfill the purposes described, and subsequently during the applicable legal prescription periods (generally 5 years for contractual obligations under Argentine legislation).
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">9. Rights of the Holder</h2>
            <p className="text-gray-700 mb-4">
              In accordance with current legislation, you have the right to:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Access</h4>
                <p className="text-sm text-gray-600">Know what personal data we have about you</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Rectification</h4>
                <p className="text-sm text-gray-600">Correct inaccurate or incomplete data</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Suppression</h4>
                <p className="text-sm text-gray-600">Request the deletion of your data</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Opposition</h4>
                <p className="text-sm text-gray-600">Oppose the processing of your data</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Revocation</h4>
                <p className="text-sm text-gray-600">Withdraw your consent at any time</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Portability</h4>
                <p className="text-sm text-gray-600">Receive your data in electronic format</p>
              </div>
            </div>
            <p className="text-gray-700 mb-8">
              To exercise these rights, contact us at <a href="mailto:info@vektra.digital" className="text-[#00DEC7] hover:underline">info@vektra.digital</a> clearly indicating your request and attaching a copy of your identity document.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">10. Security Measures</h2>
            <p className="text-gray-700 mb-8">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, alteration, or destruction. This includes SSL/TLS encryption, firewalls, access control, and periodic backups.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">11. Minors</h2>
            <p className="text-gray-700 mb-8">
              Our services are directed to people over 18 years of age. We do not knowingly collect data from minors. If we detect that we have collected data from a minor without the consent of their parents or guardians, we will proceed to delete it.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">12. Control Authorities</h2>
            <p className="text-gray-700 mb-4">
              If you consider that the processing of your data does not comply with current regulations, you can file a complaint with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Argentina:</strong> Agency for Access to Public Information (AAIP) - www.argentina.gob.ar/aaip</li>
              <li>Clients in other countries may also file a complaint with the data protection authority corresponding to their country of residence.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">13. Modifications</h2>
            <p className="text-gray-700 mb-8">
              We reserve the right to modify this privacy policy to adapt it to legislative developments or changes in our services. Any change will be published on this page with the corresponding update date.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">14. Contact</h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding this privacy policy or the processing of your personal data, you can contact us at:
            </p>
            <div className="bg-[#00DEC7]/10 border border-[#00DEC7]/30 rounded-xl p-6">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> info@vektra.digital</p>
              <p className="text-gray-700"><strong>Web:</strong> https://vektra.digital/en/contact</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
