/*
  # Add country-related tables

  1. New Tables
    - `countries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `code` (text, ISO code)
      - `region` (text)
      - `language` (text)
    - `country_stats`
      - `id` (uuid, primary key)
      - `country_id` (uuid, foreign key)
      - `gdp_per_capita` (decimal)
      - `population` (integer)
      - `literacy_rate` (decimal)
      
  2. Security
    - Enable RLS on both tables
    - Add public read access policies
*/

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  region text,
  language text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Country statistics table
CREATE TABLE IF NOT EXISTS country_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid REFERENCES countries(id),
  gdp_per_capita decimal,
  population integer,
  literacy_rate decimal,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for countries"
  ON countries FOR SELECT TO public USING (true);

CREATE POLICY "Public read access for country stats"
  ON country_stats FOR SELECT TO public USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS countries_code_idx ON countries(code);
CREATE INDEX IF NOT EXISTS country_stats_country_id_idx ON country_stats(country_id);