import { useState, useEffect } from 'react'
import { usePageTitle } from '@/lib/hooks/usePageTitle'
import { supabase } from '@/lib/supabase'
import type { University } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoadingSpinner from '@/components/LoadingSpinner'

const REGIONS = [
  'North America',
  'Europe',
  'Asia',
  'Australia & Pacific',
  'Middle East',
  'Africa',
  'Latin America'
] as const

const RANKING_RANGES = [
  { label: 'Top 100', value: '1-100' },
  { label: 'Top 101-500', value: '101-500' },
  { label: 'Top 501-1000', value: '501-1000' },
  { label: 'All Rankings', value: '' }
] as const

export function Universities() {
  usePageTitle('Universities')

  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedRankingRange, setSelectedRankingRange] = useState('')
  const [hasScholarships, setHasScholarships] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    fetchUniversities()
  }, [page, searchTerm, selectedRegion, selectedRankingRange, hasScholarships])

  async function fetchUniversities() {
    try {
      setLoading(true)
      
      let query = supabase
        .from('universities')
        .select('*, scholarships(*)', { count: 'exact' })
        .order('ranking', { ascending: true })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)

      // Apply filters
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%`)
      }
      
      if (selectedRegion) {
        query = query.eq('region', selectedRegion)
      }
      
      if (selectedRankingRange) {
        const [min, max] = selectedRankingRange.split('-').map(Number)
        query = query.gte('ranking', min).lte('ranking', max)
      }

      if (hasScholarships) {
        query = query.not('scholarships', 'is', null)
      }

      const { data, error, count } = await query
      
      if (error) throw error
      
      setUniversities(data || [])
      setTotalPages(Math.ceil((count || 0) / itemsPerPage))
    } catch (error) {
      console.error('Error fetching universities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page when searching
    fetchUniversities()
  }

  const handleReset = () => {
    setSearchTerm('')
    setSelectedRegion('')
    setSelectedRankingRange('')
    setHasScholarships(false)
    setPage(1)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Find Universities</h1>

        {/* Search and Filters */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Universities
              </label>
              <Input
                type="text"
                placeholder="Search by name or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2.5"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ranking
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2.5"
                value={selectedRankingRange}
                onChange={(e) => setSelectedRankingRange(e.target.value)}
              >
                <option value="">All Rankings</option>
                {RANKING_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasScholarships}
                  onChange={(e) => setHasScholarships(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Has Scholarships</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
            <Button type="submit">
              Search Universities
            </Button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <LoadingSpinner />
        ) : universities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No universities found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.map((university) => (
                <div key={university.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{university.name}</h2>
                    <p className="text-gray-600 mb-4">{university.country}</p>
                    
                    {university.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {university.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {university.ranking && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Rank #{university.ranking}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      {university.website && (
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Visit Website
                        </a>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 py-2 text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}