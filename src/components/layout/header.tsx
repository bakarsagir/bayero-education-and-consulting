import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NAVIGATION, SITE_NAME } from '@/lib/constants'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-black/10 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img src="/images/Logo1.png" alt={SITE_NAME} className="h-14 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded p-2.5 text-black hover:text-[#f3cf23] transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {NAVIGATION.slice(0, -1).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-base font-montserrat font-semibold leading-6 text-black hover:text-[#f3cf23] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link 
            to="/signin" 
            className="text-base font-montserrat font-semibold leading-6 bg-[#f3cf23] text-black px-6 py-2 rounded hover:bg-black hover:text-white transition-all duration-200"
          >
            {NAVIGATION[NAVIGATION.length - 1].name}
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-black/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img src="/images/Logo1.png" alt={SITE_NAME} className="h-12 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded p-2.5 text-black hover:text-[#f3cf23] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-black/10">
              <div className="space-y-2 py-6">
                {NAVIGATION.slice(0, -1).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded px-3 py-2 text-base font-montserrat font-semibold leading-7 text-black hover:bg-[#f3cf23]/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/signin"
                  className="block w-full text-center rounded px-3 py-2.5 text-base font-montserrat font-semibold leading-7 bg-[#f3cf23] text-black hover:bg-black hover:text-white transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {NAVIGATION[NAVIGATION.length - 1].name}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}