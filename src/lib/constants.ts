export const SITE_NAME = 'Bayero Education & Consulting'
export const SITE_DESCRIPTION = 'Expert education consulting and university placement services worldwide'

export const NAVIGATION = [
  { name: 'About', href: '/about' },
  { name: 'Study Abroad', href: '/study-abroad' },
  { name: 'Services', href: '/services' },
  { name: 'Universities', href: '/universities' },
  { name: 'Programs', href: '/programs' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
  { name: 'Sign in', href: '/signin' }
] as const

export const SERVICES = [
  {
    title: 'University Admissions',
    description: 'Get personalized guidance through the entire university application process.',
    features: [
      'University selection guidance',
      'Application assistance',
      'Document preparation',
      'Admission counseling'
    ]
  },
  {
    title: 'Test Preparation',
    description: 'Expert coaching for IELTS, TOEFL, SAT, and other standardized tests.',
    features: [
      'Personalized study plans',
      'Practice tests and materials',
      'One-on-one tutoring',
      'Score improvement strategies'
    ]
  },
  {
    title: 'Visa Services',
    description: 'Comprehensive support for student visa applications and documentation.',
    features: [
      'Visa requirement analysis',
      'Documentation support',
      'Application review',
      'Interview preparation'
    ]
  }
] as const

export const CONTACT_INFO = {
  email: 'info@bayeroeducation.com',
  phone: '+1 (555) 123-4567',
  address: '123 Education Street, Suite 456, City, State 12345'
} as const