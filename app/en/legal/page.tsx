
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Legal Notice and Terms of Use | Vektra - Digital Agency Argentina and Paraguay",
  description: "Terms and conditions of use of the Vektra website. General contracting conditions for web development, apps, and digital marketing services.",
  robots: "noindex, follow",
}

export default function LegalNoticePage() {
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
            Legal Notice and Terms of Use
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
            
            <h2 className="text-2xl font-bold text-black mb-4">1. Identification of the Owner</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Denomination:</strong> Vektra - Digital Agency</li>
                <li><strong>Legal Name:</strong> Vektra Digital Solutions S.A.S.</li>
                <li><strong>Tax ID (CUIT):</strong> 30-71955290-7</li>
                <li><strong>Activity:</strong> Web development, mobile applications, digital marketing, e-commerce, and artificial intelligence solutions</li>
                <li><strong>Email:</strong> info@vektra.digital</li>
                <li><strong>Website:</strong> https://vektra.digital</li>
                <li><strong>Area of operation:</strong> Argentine Republic and Republic of Paraguay</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">2. Object</h2>
            <p className="text-gray-700 mb-8">
              This legal notice regulates the access and use of the website https://vektra.digital (hereinafter, the &quot;Website&quot;), as well as the general contracting conditions of the services offered by Vektra. Access and use of the Website implies full acceptance of these terms.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">3. Website Terms of Use</h2>
            <p className="text-gray-700 mb-4">
              The user agrees to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Use the Website in accordance with the law, morality, and public order</li>
              <li>Not engage in illicit activities or contrary to good faith</li>
              <li>Not disseminate content of a racist, xenophobic, pornographic nature or that violates human rights</li>
              <li>Not introduce computer viruses or perform actions that may damage computer systems</li>
              <li>Not attempt to access restricted areas of the Website without authorization</li>
              <li>Not reproduce, copy, or distribute the content of the Website without express authorization</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">4. Services Offered</h2>
            <p className="text-gray-700 mb-4">
              Vektra offers the following professional services:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Web Development</h4>
                <p className="text-sm text-gray-600">Design and development of professional websites, landing pages, and corporate portals</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Online Stores</h4>
                <p className="text-sm text-gray-600">E-commerce with WooCommerce, Shopify, and Tiendanube</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Mobile Apps</h4>
                <p className="text-sm text-gray-600">Development of applications for Android and iOS</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">Digital Marketing</h4>
                <p className="text-sm text-gray-600">Google Ads, Meta Ads, SEO, and web positioning</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">AI Agents and Bots</h4>
                <p className="text-sm text-gray-600">Chatbots, automation, and artificial intelligence solutions</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-black mb-2">SEO and Positioning</h4>
                <p className="text-sm text-gray-600">Search engine optimization and AI positioning</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">5. Contracting Conditions</h2>
            
            <h3 className="text-xl font-semibold text-black mb-3">5.1 Quotes</h3>
            <p className="text-gray-700 mb-6">
              Quotes issued by Vektra are valid for 30 days from their issuance, unless otherwise indicated. Prices indicated do not include VAT unless expressly specified.
            </p>

            <h3 className="text-xl font-semibold text-black mb-3">5.2 Payment Method</h3>
            <p className="text-gray-700 mb-4">
              Payment conditions will be those established in each quote. As a general rule:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>50% at the beginning of the project as a down payment</li>
              <li>Remaining 50% upon project delivery</li>
              <li>For larger projects, split payments may be agreed upon</li>
            </ul>

            <h3 className="text-xl font-semibold text-black mb-3">5.3 Delivery Deadlines</h3>
            <p className="text-gray-700 mb-6">
              Delivery deadlines are indicative and depend on the complexity of the project and client collaboration. Delays due to lack of material or information from the client will not be Vektra&apos;s responsibility.
            </p>

            <h3 className="text-xl font-semibold text-black mb-3">5.4 Client Obligations</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Provide necessary material (texts, images, logos) in a timely manner</li>
              <li>Perform reviews and approvals within agreed deadlines</li>
              <li>Make payments as agreed</li>
              <li>Provide necessary access and credentials for development</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The content of the Website, including but not limited to texts, graphics, images, logos, icons, software, and source code, is protected by intellectual property laws of Argentina (Law 11.723) and Paraguay (Law 1328/98).
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>The client acquires usage rights of the final work once the total price is paid</li>
              <li>Vektra reserves the right to include the work performed in its portfolio</li>
              <li>Third-party elements (plugins, templates, libraries) maintain their original licenses</li>
              <li>Custom-developed source code will be the property of the client after full payment</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">7. Warranties and Support</h2>
            <p className="text-gray-700 mb-4">
              Vektra offers the following warranties:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Functionality Warranty:</strong> 30 days from delivery for correction of development errors</li>
              <li><strong>Technical Support:</strong> Included during the warranty period</li>
              <li><strong>Maintenance:</strong> Available through additional contracting</li>
              <li>The warranty does not cover modifications made by third parties or misuse of the system</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Vektra will not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Damages derived from misuse of contracted services</li>
              <li>Loss of data due to causes beyond our control</li>
              <li>Service interruptions due to force majeure</li>
              <li>Content published by the client on developed sites</li>
              <li>Results of marketing campaigns (subject to multiple variables)</li>
              <li>Changes in third-party algorithms (Google, Meta, etc.)</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">9. Cancellations and Refunds</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>The initial down payment is non-refundable once the project has started</li>
              <li>If the client cancels the project, they must pay for the work done to date</li>
              <li>Vektra reserves the right to cancel projects for non-payment</li>
              <li>Digital marketing services can be canceled with 15 days&apos; notice</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">10. Confidentiality</h2>
            <p className="text-gray-700 mb-8">
              Both parties agree to maintain the confidentiality of information exchanged during the business relationship. This obligation will remain in force even after the contractual relationship has ended.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">11. External Links</h2>
            <p className="text-gray-700 mb-8">
              The Website may contain links to third-party sites. Vektra is not responsible for the content, privacy policies, or practices of these external sites.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">12. Legislation and Jurisdiction</h2>
            <p className="text-gray-700 mb-8">
              These conditions are governed by Argentine and Paraguayan legislation as applicable to the client&apos;s domicile. For the resolution of any dispute, the parties submit to the competent ordinary courts, waiving any other jurisdiction that may correspond to them.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">13. Modifications</h2>
            <p className="text-gray-700 mb-8">
              Vektra reserves the right to modify these terms at any time. Changes will take effect upon their publication on the Website. For ongoing projects, the conditions in force at the time of contracting will apply.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">14. Contact</h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding these terms and conditions:
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
