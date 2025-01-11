export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      universities: {
        Row: {
          id: string
          name: string
          country: string
          website: string | null
          ranking: number | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          country: string
          website?: string | null
          ranking?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string
          website?: string | null
          ranking?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string | null
          level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          level: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          level?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          university_id: string
          program_id: string
          name: string
          duration_months: number
          language: string
          description: string | null
          admission_requirements: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          university_id: string
          program_id: string
          name: string
          duration_months: number
          language?: string
          description?: string | null
          admission_requirements?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          university_id?: string
          program_id?: string
          name?: string
          duration_months?: number
          language?: string
          description?: string | null
          admission_requirements?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tuition_fees: {
        Row: {
          id: string
          course_id: string
          amount: number
          currency: string
          period: string
          student_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          amount: number
          currency?: string
          period: string
          student_type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          amount?: number
          currency?: string
          period?: string
          student_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      scholarships: {
        Row: {
          id: string
          university_id: string
          name: string
          description: string | null
          amount: number | null
          currency: string | null
          requirements: string | null
          deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          university_id: string
          name: string
          description?: string | null
          amount?: number | null
          currency?: string | null
          requirements?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          university_id?: string
          name?: string
          description?: string | null
          amount?: number | null
          currency?: string | null
          requirements?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}