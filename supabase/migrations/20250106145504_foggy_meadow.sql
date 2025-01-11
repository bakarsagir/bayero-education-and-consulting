/*
  # University Database Schema

  1. New Tables
    - universities
      - Basic university information
    - courses
      - Course details with university relationship
    - programs
      - Program offerings
    - tuition_fees
      - Fee structures linked to courses
    - scholarships
      - Scholarship opportunities
    
  2. Security
    - Enable RLS on all tables
    - Public read access
    - Admin-only write access
*/

-- Universities table
CREATE TABLE IF NOT EXISTS universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  website text,
  ranking integer,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Programs table (e.g., "Computer Science", "Business Administration")
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  level text NOT NULL, -- 'Bachelors', 'Masters', 'PhD'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table (specific implementations of programs at universities)
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id uuid REFERENCES universities(id),
  program_id uuid REFERENCES programs(id),
  name text NOT NULL,
  duration_months integer NOT NULL,
  language text NOT NULL DEFAULT 'English',
  description text,
  admission_requirements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tuition fees table
CREATE TABLE IF NOT EXISTS tuition_fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id),
  amount decimal NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  period text NOT NULL, -- 'per_semester', 'per_year', 'total'
  student_type text NOT NULL, -- 'domestic', 'international'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Scholarships table
CREATE TABLE IF NOT EXISTS scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id uuid REFERENCES universities(id),
  name text NOT NULL,
  description text,
  amount decimal,
  currency text DEFAULT 'USD',
  requirements text,
  deadline date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tuition_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for universities"
  ON universities FOR SELECT TO public USING (true);

CREATE POLICY "Public read access for programs"
  ON programs FOR SELECT TO public USING (true);

CREATE POLICY "Public read access for courses"
  ON courses FOR SELECT TO public USING (true);

CREATE POLICY "Public read access for tuition_fees"
  ON tuition_fees FOR SELECT TO public USING (true);

CREATE POLICY "Public read access for scholarships"
  ON scholarships FOR SELECT TO public USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS universities_country_idx ON universities(country);
CREATE INDEX IF NOT EXISTS courses_university_id_idx ON courses(university_id);
CREATE INDEX IF NOT EXISTS courses_program_id_idx ON courses(program_id);
CREATE INDEX IF NOT EXISTS tuition_fees_course_id_idx ON tuition_fees(course_id);
CREATE INDEX IF NOT EXISTS scholarships_university_id_idx ON scholarships(university_id);

-- Add full-text search capabilities
ALTER TABLE universities ADD COLUMN IF NOT EXISTS fts tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) STORED;

CREATE INDEX IF NOT EXISTS universities_fts_idx ON universities USING GIN (fts);