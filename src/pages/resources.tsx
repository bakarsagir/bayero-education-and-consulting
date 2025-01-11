export function Resources() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Resources</h1>

        {/* Guides & Downloads */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Guides & Downloads</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'University Application Guide',
              'Visa Application Checklist',
              'Scholarship Guide',
              'Student Life Abroad'
            ].map((guide) => (
              <div key={guide} className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600">📄</span>
                </div>
                <div>
                  <h3 className="font-semibold">{guide}</h3>
                  <button className="text-blue-600 hover:underline mt-2">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I choose the right university?',
                a: 'We help you evaluate factors like academic programs, location, costs, and career opportunities.'
              },
              {
                q: 'What services do you provide?',
                a: 'We offer comprehensive education consulting, including university selection, application assistance, and visa support.'
              },
              {
                q: 'How long does the application process take?',
                a: 'The timeline varies by country and university, typically ranging from 2-6 months.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}