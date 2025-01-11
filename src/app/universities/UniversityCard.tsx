import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Database } from '@/lib/database.types'
import AdminEditModal from './AdminEditModal'

type University = Database['public']['Tables']['universities']['Row']

type UniversityCardProps = {
  university: University
  isAdmin?: boolean
  onDelete?: (id: string) => void
  onUpdate?: (id: string, data: Partial<University>) => Promise<void>
}

export default function UniversityCard({ 
  university, 
  isAdmin, 
  onDelete,
  onUpdate 
}: UniversityCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{university.name}</h2>
            {isAdmin && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this university?')) {
                      onDelete?.(university.id)
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-4">{university.country}</p>
          
          {university.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {university.description}
            </p>
          )}

          {university.ranking && (
            <p className="text-sm text-gray-500 mb-4">
              World Ranking: #{university.ranking}
            </p>
          )}

          <div className="flex justify-between items-center">
            {university.website && (
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            )}
            
            <Link
              to={`/universities/${university.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {isAdmin && onUpdate && (
        <AdminEditModal
          university={university}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (data) => {
            await onUpdate(university.id, data)
            setIsEditModalOpen(false)
          }}
        />
      )}
    </>
  )
}