export function Contact() {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-12">Contact Us</h1>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-montserrat font-semibold text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded border-black/10 shadow-sm focus:border-[#f3cf23] focus:ring-[#f3cf23]"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-montserrat font-semibold text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded border-black/10 shadow-sm focus:border-[#f3cf23] focus:ring-[#f3cf23]"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-montserrat font-semibold text-black">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded border-black/10 shadow-sm focus:border-[#f3cf23] focus:ring-[#f3cf23]"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#f3cf23] text-black px-6 py-3 rounded font-montserrat font-semibold hover:bg-black hover:text-white transition-all duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-16">
          <h2 className="text-2xl font-montserrat font-bold mb-8">Contact Information</h2>
          <div className="space-y-4 text-black/80">
            <p>Email: info@bayeroeducation.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Education Street, Suite 456, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  )
}