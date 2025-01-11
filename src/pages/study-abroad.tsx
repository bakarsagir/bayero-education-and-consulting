import { usePageTitle } from '@/lib/hooks/usePageTitle'

const DESTINATIONS = [
  {
    country: 'United States',
    description: 'Home to many of the world\'s top-ranked universities.',
    features: ['Diverse academic programs', 'Cutting-edge research facilities', 'Vibrant campus life'],
    imageUrl: '/images/usa.jpg'
  },
  {
    country: 'United Kingdom',
    description: 'Rich academic heritage with prestigious institutions.',
    features: ['Historic universities', 'Quality education', 'Multicultural environment'],
    imageUrl: '/images/uk.jpg'
  },
  {
    country: 'Canada',
    description: 'High quality of life and excellent education system.',
    features: ['Affordable education', 'Work opportunities', 'Safe environment'],
    imageUrl: '/images/canada.jpg'
  },
  {
    country: 'Australia',
    description: 'World-class education in a beautiful setting.',
    features: ['Top universities', 'Great lifestyle', 'Post-study work options'],
    imageUrl: '/images/australia.jpg'
  }
]

const STUDY_LEVELS = [
  {
    title: 'Undergraduate',
    description: 'Bachelor\'s degrees across various disciplines',
    duration: '3-4 years',
    requirements: ['High school diploma', 'English proficiency test', 'Letters of recommendation']
  },
  {
    title: 'Postgraduate',
    description: 'Master\'s and doctoral programs',
    duration: '1-5 years',
    requirements: ['Bachelor\'s degree', 'GRE/GMAT scores', 'Research proposal']
  },
  {
    title: 'Language Programs',
    description: 'Intensive English language courses',
    duration: '2-12 months',
    requirements: ['Basic English skills', 'Valid passport', 'Study commitment']
  }
]

export function StudyAbroad() {
  usePageTitle('Study Abroad')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Study Abroad</h1>
            <p className="text-xl mb-8">
              Transform your future with an international education experience. Explore top universities
              worldwide and find the perfect program for your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DESTINATIONS.map((destination) => (
              <div key={destination.country} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destination.country}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <ul className="space-y-2">
                    {destination.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-blue-600 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Levels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Study Levels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STUDY_LEVELS.map((level) => (
              <div key={level.title} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{level.title}</h3>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-500">Duration:</span>
                  <span className="ml-2 text-gray-600">{level.duration}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {level.requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-blue-600 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: '1. Research & Consultation',
                  description: 'Explore universities and programs with our expert guidance.'
                },
                {
                  step: '2. Document Preparation',
                  description: 'Get help with application materials and requirements.'
                },
                {
                  step: '3. Application Submission',
                  description: 'Submit applications to your chosen institutions.'
                },
                {
                  step: '4. Visa Assistance',
                  description: 'Receive support for student visa applications.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.step}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on studying abroad. Book a consultation with our education advisors.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Book a Consultation
          </button>
        </div>
      </section>
    </div>
  )
}