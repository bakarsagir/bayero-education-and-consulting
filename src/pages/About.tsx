export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">About Bayero Education</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Bayero Education & Consulting is dedicated to helping students achieve their educational goals
            through expert guidance and personalized consulting services.
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To empower students worldwide by connecting them with quality education opportunities
                and providing expert guidance throughout their academic journey.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the leading education consulting service, known for excellence,
                integrity, and successful student placements worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}