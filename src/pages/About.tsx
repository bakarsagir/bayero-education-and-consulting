import { Link } from 'react-router-dom'

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#f3cf23] text-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-montserrat font-bold mb-6 leading-tight">
              Shaping Global Education Dreams
            </h1>
            <p className="text-2xl font-montserrat mb-8 text-black/80">
              Since our establishment, we've helped thousands of students achieve their international education goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Students Placed' },
              { number: '50+', label: 'Partner Universities' },
              { number: '15+', label: 'Countries' },
              { number: '95%', label: 'Success Rate' }
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl font-montserrat font-bold mb-2 group-hover:text-[#f3cf23] transition-colors">
                  {stat.number}
                </div>
                <div className="text-black/70 font-helvetica">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-montserrat font-bold">Our Mission</h2>
              <p className="text-lg font-helvetica text-white/80">
                To empower students with personalized guidance and support, enabling them to access world-class education opportunities and achieve their academic aspirations.
              </p>
              <ul className="space-y-4">
                {[
                  'Personalized Education Consulting',
                  'Expert University Placement',
                  'Comprehensive Student Support',
                  'Global Education Access'
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <span className="text-[#f3cf23]">✦</span>
                    <span className="font-helvetica">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-montserrat font-bold">Our Vision</h2>
              <p className="text-lg font-helvetica text-white/80">
                To be the leading force in transforming global education access, creating pathways for students to realize their full potential through international education opportunities.
              </p>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-[#f3cf23] font-montserrat font-semibold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Expert Education Consultants',
                    'Proven Track Record',
                    'End-to-End Support',
                    'Global University Network'
                  ].map((item) => (
                    <li key={item} className="flex items-center space-x-3 text-white/80">
                      <span className="text-[#f3cf23]">→</span>
                      <span className="font-helvetica">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-16">Our Expert Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Education Director',
                expertise: '15+ years in international education'
              },
              {
                name: 'Michael Chen',
                role: 'University Relations',
                expertise: 'Former University Admissions Officer'
              },
              {
                name: 'Emma Williams',
                role: 'Student Success Manager',
                expertise: 'Specialized in student mentoring'
              }
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="bg-black/5 aspect-square rounded-lg mb-6 overflow-hidden group-hover:bg-[#f3cf23]/20 transition-all duration-300"></div>
                <h3 className="text-xl font-montserrat font-semibold mb-2">{member.name}</h3>
                <p className="text-[#f3cf23] font-montserrat mb-2">{member.role}</p>
                <p className="text-black/60 font-helvetica">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#f3cf23] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-montserrat font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl font-montserrat mb-12 text-black/80 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their international education dreams with our guidance.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-black text-white px-10 py-4 rounded font-montserrat font-semibold hover:bg-black/90 transition-all duration-200"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}