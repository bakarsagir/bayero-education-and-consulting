import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/study-abroad', label: 'Study Abroad' },
    { path: '/services', label: 'Services' },
    { path: '/universities', label: 'Universities' },
    { path: '/programs', label: 'Programs' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo variant="dark" size="md" />
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`${
                  isActive(path)
                    ? 'text-[#f3cf23] font-semibold'
                    : 'text-gray-700 hover:text-black'
                } transition-colors font-montserrat`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/signin"
              className="bg-[#f3cf23] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#e3bf13] transition-colors font-montserrat"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}