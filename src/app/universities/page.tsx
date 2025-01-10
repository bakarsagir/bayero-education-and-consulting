'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'
import Script from 'next/script'
import SearchBar from './SearchBar'
import UniversityCard from './UniversityCard'
import UniversityFilters from './UniversityFilters'

type University = Database['public']['Tables']['universities']['Row']
type Program = Database['public']['Tables']['programs']['Row']

export default function Universities() {
  const [universities, setUniversities] = useState<University[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    country: '',
    program: '',
    level: '',
    maxTuition: '',
    minTuition: '',
    duration: '',
    hasScholarship: false
  })

  useEffect(() => {
    fetchUniversities()
    fetchPrograms()
  }, [])

  async function fetchUniversities() {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
    
    if (error) {
      console.error('Error fetching universities:', error)
      return
    }

    setUniversities(data)
  }

  async function fetchPrograms() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
    
    if (error) {
      console.error('Error fetching programs:', error)
      return
    }

    setPrograms(data)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Universities Database</h1>

        <div className="mb-8">
          <Script async src="https://cse.google.com/cse.js?cx=a5dd1a5bcae444579" />
          <div className="gcse-search" />
        </div>

        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search universities by name, country, or courses..."
        />

        <UniversityFilters
          programs={programs}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university) => (
            <UniversityCard
              key={university.id}
              university={university}
            />
          ))}
        </div>
      </div>
    </div>
  )
}