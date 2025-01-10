'use client'

import type { Database } from '@/lib/database.types'

type Program = Database['public']['Tables']['programs']['Row']

type Filters = {
  country: string
  program: string
  level: string
  maxTuition: string
  minTuition: string
  duration: string
  hasScholarship: boolean
}

type FiltersProps = {
  programs: Program[]
  filters: Filters
  setFilters: (filters: Filters) => void
}

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore'
]

const levels = ['Bachelors', 'Masters', 'PhD']
const durations = ['12', '24', '36', '48']

export default function UniversityFilters({ programs, filters, setFilters }: FiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program
          </label>
          <select
            value={filters.program}
            onChange={(e) => setFilters({ ...filters, program: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">All Programs</option>
            {programs.map((program) => (
              <option key={program.id} value={program.name}>
                {program.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (months)
          </label>
          <select
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Any Duration</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration} months
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Tuition (USD/year)
          </label>
          <input
            type="number"
            value={filters.minTuition}
            onChange={(e) => setFilters({ ...filters, minTuition: e.target.value })}
            placeholder="Enter amount"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Tuition (USD/year)
          </label>
          <input
            type="number"
            value={filters.maxTuition}
            onChange={(e) => setFilters({ ...filters, maxTuition: e.target.value })}
            placeholder="Enter amount"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasScholarship}
              onChange={(e) => setFilters({ ...filters, hasScholarship: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Has Scholarships</span>
          </label>
        </div>
      </div>
    </div>
  )
}