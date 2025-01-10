import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Your Gateway to Global Education
            </h1>
            <p className="text-xl mb-8">
              Expert guidance for international education and university placements
            </p>
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Educational Consulting',
                description: 'Personalized guidance for your academic journey.'
              },
              {
                title: 'University Admissions',
                description: 'Expert support throughout the application process.'
              },
              {
                title: 'Visa & Settlement',
                description: 'Comprehensive assistance for your transition abroad.'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured University Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((uni) => (
              <div key={uni} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full" />
                <h3 className="font-semibold">University {uni}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Student Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((story) => (
              <div key={story} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
                <h3 className="font-semibold mb-2">Student Name</h3>
                <p className="text-gray-600">
                  "Thanks to Bayero Education, I'm now studying at my dream university!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">News Title {post}</h3>
                  <p className="text-gray-600 mb-4">Short preview of the news article...</p>
                  <Link href="/blog" className="text-blue-600 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Book a free consultation with our education experts</p>
          <Link 
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}