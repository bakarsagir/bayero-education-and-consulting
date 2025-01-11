'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type UniversityDetails = Database['public']['Tables']['universities']['Row'] & {
  courses: Array<
    Database['public']['Tables']['courses']['Row'] & {
      tuition_fees: Database['public']['Tables']['tuition_fees']['Row'][]
    }
  >
  scholarships: Database['public']['Tables']['scholarships']['Row'][]
}

export default function UniversityDetails({ params }: { params: { id: string } }) {
  const [university, setUniversity] = useState<UniversityDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUniversityDetails()
  }, [params.id])

  async function fetchUniversityDetails() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          courses (
            *,
            tuition_fees (*)
          ),
          scholarships (*)
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error
      setUniversity(data as UniversityDetails)
    } catch (error) {
      console.error('Error fetching university details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!university) return <div className="text-center py-12">University not found</div>

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{university.name}</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-4">{university.description}</p>
              
              {university.website && (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit University Website
                </a>
              )}
            </div>

            {/* Courses */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Available Programs</h2>
              <div className="space-y-6">
                {university.courses?.map((course) => (
                  <div key={course.id} className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Details</h4>
                        <ul className="text-gray-600">
                          <li>Duration: {course.duration_months} months</li>
                          <li>Language: {course.language}</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Tuition Fees</h4>
                        <ul className="text-gray-600">
                          {course.tuition_fees?.map((fee) => (
                            <li key={fee.id}>
                              {fee.student_type}: {fee.amount} {fee.currency}/{fee.period}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Facts */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
              <ul className="space-y-3 text-gray-600">
                <li>Location: {university.country}</li>
                {university.ranking && <li>World Ranking: #{university.ranking}</li>}
              </ul>
            </div>

            {/* Scholarships */}
            {university.scholarships?.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Available Scholarships</h2>
                <div className="space-y-4">
                  {university.scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="border-b pb-4">
                      <h3 className="font-semibold mb-2">{scholarship.name}</h3>
                      <p className="text-gray-600 mb-2">{scholarship.description}</p>
                      {scholarship.amount && (
                        <p className="text-gray-600">
                          Amount: {scholarship.amount} {scholarship.currency}
                        </p>
                      )}
                      {scholarship.deadline && (
                        <p className="text-gray-600">
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}