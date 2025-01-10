import Link from 'next/link'

export default function Resources() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Resources</h1>

        {/* Blog/News Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Article Title {post}</h3>
                  <p className="text-gray-600 mb-4">Preview of the article content...</p>
                  <Link href={`/blog/post-${post}`} className="text-blue-600 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

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
        <section className="mb-16">
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

        {/* Events Calendar */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'University Fair 2024',
                date: 'March 15, 2024',
                location: 'Virtual Event'
              },
              {
                title: 'Study Abroad Seminar',
                date: 'April 2, 2024',
                location: 'Main Office'
              }
            ].map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">Date: {event.date}</p>
                <p className="text-gray-600">Location: {event.location}</p>
                <button className="mt-4 text-blue-600 hover:underline">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}