import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-[#f3cf23] text-black min-h-[calc(100vh-5rem)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl font-montserrat font-bold mb-6 leading-tight">
              Your Gateway to Global Education
            </h1>
            <p className="text-2xl font-montserrat mb-12 text-black/80">
              Expert guidance for international education and university placements
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-black text-white px-10 py-4 rounded hover:bg-black/90 transition-all duration-200 text-lg font-montserrat font-semibold"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-black">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <div 
                key={index} 
                className="group bg-white border border-black/10 p-8 rounded hover:border-[#f3cf23] hover:shadow-[0_0_20px_rgba(243,207,35,0.2)] transition-all duration-300"
              >
                <h3 className="text-2xl font-montserrat font-semibold mb-4 text-black group-hover:text-[#f3cf23]">
                  {service.title}
                </h3>
                <p className="text-lg text-black/70 font-helvetica">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-montserrat font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-2xl font-montserrat mb-12">Book a free consultation with our education experts</p>
          <Link 
            to="/contact"
            className="inline-block bg-[#f3cf23] text-black px-10 py-4 rounded hover:bg-[#f3cf23]/90 transition-all duration-200 text-lg font-montserrat font-semibold"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}