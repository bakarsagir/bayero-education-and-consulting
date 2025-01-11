import { useState } from 'react'
import { usePageTitle } from '@/lib/hooks/usePageTitle'
import { supabase } from '@/lib/supabase'
import type { Program } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PROGRAM_LEVELS = ['Bachelors', 'Masters', 'PhD'] as const
const STUDY_AREAS = [
  'Business & Management',
  'Engineering & Technology',
  'Arts & Humanities',
  'Sciences',
  'Social Sciences',
  'Medicine & Health',
  'Law'
] as const

export function Programs() {
  usePageTitle('Programs')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    try {
      setLoading(true)
      let query = supabase.from('programs').select('*')

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }
      if (selectedLevel) {
        query = query.eq('level', selectedLevel)
      }
      // Note: This assumes we've added a 'study_area' column to the programs table
      if (selectedArea) {
        query = query.eq('study_area', selectedArea)
      }

      const { data, error } = await query
      if (error) throw error
      setPrograms(data || [])
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Academic Programs</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Programs
              </label>
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Level
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2.5"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                {PROGRAM_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Area
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2.5"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">All Areas</option>
                {STUDY_AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Searching...' : 'Search Programs'}
              </Button>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{program.name}</h3>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  {program.level}
                </span>
              </div>
              {program.description && (
                <p className="text-gray-600 mb-4">{program.description}</p>
              )}
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </div>
          ))}
        </div>

        {programs.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No programs found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}