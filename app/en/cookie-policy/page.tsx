
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | Vektra - Digital Agency",
  description: "Vektra's cookie policy. Information on the use of cookies and similar technologies on our website.",
  robots: "noindex, follow",
}

export default function CookiePolicyPage() {
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
            Cookie Policy
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
            
            <h2 className="text-2xl font-bold text-black mb-4">1. What are Cookies</h2>
            <p className="text-gray-700 mb-8">
              Cookies are small text files that websites store on your device (computer, tablet, mobile phone) when you visit them. These cookies allow the website to remember your actions and preferences (such as language, font size, and other display preferences) over a period of time, so you don&apos;t have to keep re-entering them whenever you come back to the site or browse from one page to another.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">2. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-black mb-3">2.1 By Purpose</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Technical Cookies (Necessary)
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  They are essential for the functioning of the website. Without them, the site would not work properly.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Maintain user session</li>
                  <li>Remember configuration preferences</li>
                  <li>Ensure site security</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Analytical Cookies
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  They allow us to analyze user behavior to improve our website.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Number of visitors</li>
                  <li>Most visited pages</li>
                  <li>Time spent</li>
                  <li>Traffic source</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  Marketing Cookies
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  They are used to show relevant ads and measure the effectiveness of advertising campaigns.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Remarketing and retargeting</li>
                  <li>Conversion measurement</li>
                  <li>Ad personalization</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-black mb-3">2.2 By Duration</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Session cookies:</strong> They are deleted when the browser is closed</li>
              <li><strong>Persistent cookies:</strong> They remain on your device for a specific period or until you manually delete them</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">3. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use third-party services that may install their own cookies:
            </p>
            
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Provider</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Purpose</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Type</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">More info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Google Analytics</td>
                    <td className="border border-gray-200 px-4 py-3">Web traffic analysis</td>
                    <td className="border border-gray-200 px-4 py-3">Analytics</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Google Policy
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Google Ads</td>
                    <td className="border border-gray-200 px-4 py-3">Remarketing and conversions</td>
                    <td className="border border-gray-200 px-4 py-3">Marketing</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Google Policy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Meta Pixel</td>
                    <td className="border border-gray-200 px-4 py-3">Facebook/Instagram conversion tracking</td>
                    <td className="border border-gray-200 px-4 py-3">Marketing</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Meta Policy
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Vercel Analytics</td>
                    <td className="border border-gray-200 px-4 py-3">Site performance</td>
                    <td className="border border-gray-200 px-4 py-3">Analytics</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#00DEC7] hover:underline">
                        Vercel Policy
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">4. How to Manage Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can configure your browser to accept or reject cookies. Here is how to do it in the most common browsers:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Google Chrome</h4>
                <p className="text-sm text-[#00DEC7]">View instructions →</p>
              </a>
              <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Mozilla Firefox</h4>
                <p className="text-sm text-[#00DEC7]">View instructions →</p>
              </a>
              <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Safari</h4>
                <p className="text-sm text-[#00DEC7]">View instructions →</p>
              </a>
              <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-black mb-1">Microsoft Edge</h4>
                <p className="text-sm text-[#00DEC7]">View instructions →</p>
              </a>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-amber-800 mb-2">Important</h4>
              <p className="text-sm text-amber-700">
                If you disable cookies, some website functionalities may not work properly or your browsing experience may be affected.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">5. Analytics Opt-out</h2>
            <p className="text-gray-700 mb-4">
              You can opt out of being tracked by Google Analytics by installing the following browser add-on:
            </p>
            <a 
              href="https://tools.google.com/dlpage/gaoptout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors mb-8"
            >
              Download Google Analytics Opt-out Add-on
            </a>

            <h2 className="text-2xl font-bold text-black mb-4">6. Legal Framework</h2>
            <p className="text-gray-700 mb-4">
              This cookie policy is governed by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li><strong>Argentina:</strong> Law 25.326 on Personal Data Protection and AAIP provisions on informed consent, applicable as the legislation of Vektra's domicile</li>
              <li>For clients in other countries, we additionally apply relevant international consent and online privacy standards</li>
              <li>Additionally, we follow international best practices based on the European GDPR</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">7. Updates</h2>
            <p className="text-gray-700 mb-8">
              This cookie policy may be updated periodically to reflect changes in our practices or for legal reasons. We recommend reviewing this page regularly to stay informed about how we use cookies.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">8. Contact</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our cookie policy, you can contact us:
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
