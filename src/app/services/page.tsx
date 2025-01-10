export default function Services() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Our Services</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'University Placement',
              description: 'Expert assistance in selecting and applying to universities worldwide.',
              features: [
                'University selection guidance',
                'Application assistance',
                'Document preparation',
                'Admission counseling'
              ]
            },
            {
              title: 'Visa Assistance',
              description: 'Comprehensive support for student visa applications.',
              features: [
                'Visa requirement analysis',
                'Documentation support',
                'Application review',
                'Interview preparation'
              ]
            },
            {
              title: 'Career Counseling',
              description: 'Professional guidance for career planning and development.',
              features: [
                'Career assessment',
                'Course selection advice',
                'Industry insights',
                'Career path planning'
              ]
            },
            {
              title: 'Test Preparation',
              description: 'Preparation courses for international exams.',
              features: [
                'IELTS preparation',
                'TOEFL coaching',
                'GRE/GMAT guidance',
                'Practice tests'
              ]
            },
            {
              title: 'Scholarship Guidance',
              description: 'Support in finding and applying for scholarships.',
              features: [
                'Scholarship search',
                'Application assistance',
                'Essay writing help',
                'Interview preparation'
              ]
            },
            {
              title: 'Post-Arrival Support',
              description: 'Assistance after reaching your destination.',
              features: [
                'Accommodation guidance',
                'Local orientation',
                'Bank account setup',
                'Emergency support'
              ]
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-blue-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}