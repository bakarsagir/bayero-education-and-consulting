import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-gray-900">
            Bayero Education
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
            <Link href="/universities" className="text-gray-700 hover:text-gray-900">Universities</Link>
            <Link href="/resources" className="text-gray-700 hover:text-gray-900">Resources</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}