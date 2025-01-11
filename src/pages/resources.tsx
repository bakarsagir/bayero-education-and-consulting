import { Link } from 'react-router-dom'

export function Resources() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-16">Resources</h1>

        {/* Study Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-montserrat font-bold mb-8">Study Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['IELTS Preparation', 'University Applications', 'Visa Guide'].map((guide) => (
              <div key={guide} className="flex items-start bg-white p-6 rounded shadow-lg border border-black/10 hover:border-[#f3cf23] transition-all duration-200">
                <div className="w-12 h-12 bg-[#f3cf23]/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-[#f3cf23]">📄</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold mb-2">{guide}</h3>
                  <button className="text-[#f3cf23] hover:text-black transition-colors mt-2 font-montserrat">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-montserrat font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: 'What are the general requirements for studying abroad?',
                answer: 'Requirements typically include academic transcripts, language proficiency tests, letters of recommendation, and a valid passport.'
              },
              {
                question: 'How long does the visa process take?',
                answer: 'Visa processing times vary by country, but generally take 2-8 weeks. We recommend starting the process at least 3 months before your intended travel date.'
              },
              {
                question: 'What financial documents do I need?',
                answer: 'You\'ll need bank statements, proof of funding or scholarships, and sometimes a sponsor letter. Specific requirements vary by destination country.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded shadow-lg border border-black/10">
                <h3 className="font-montserrat font-semibold mb-2">{faq.question}</h3>
                <p className="text-black/70 font-helvetica">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}