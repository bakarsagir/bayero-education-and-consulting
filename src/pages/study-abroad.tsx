import { Link } from 'react-router-dom'

export function StudyAbroad() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#f3cf23] text-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-montserrat font-bold mb-6 leading-tight">
              Study Abroad with Confidence
            </h1>
            <p className="text-2xl font-montserrat mb-8 text-black/80">
              Your journey to international education starts here. Let us guide you through every step.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: 'Destination Countries',
                features: [
                  'United States',
                  'United Kingdom',
                  'Canada',
                  'Australia',
                  'New Zealand',
                  'Europe'
                ]
              },
              {
                title: 'Our Services',
                features: [
                  'University Selection',
                  'Application Assistance',
                  'Visa Guidance',
                  'Pre-departure Support',
                  'Accommodation Help',
                  'Career Counseling'
                ]
              }
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-2xl font-montserrat font-bold mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.features.map((feature) => (
                    <li key={feature} className="flex items-center text-lg font-helvetica">
                      <span className="text-[#f3cf23] mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-6">Start Your International Education Journey</h2>
          <p className="text-xl font-montserrat mb-8">Book a consultation with our education experts</p>
          <Link 
            to="/contact"
            className="inline-block bg-[#f3cf23] text-black px-8 py-3 rounded font-montserrat font-semibold hover:bg-[#f3cf23]/90 transition-all duration-200"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}