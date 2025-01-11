export interface Country {
  id: string;
  name: string;
  code: string;
  region?: string;
  language?: string;
}

export interface CountryStats {
  id: string;
  country_id: string;
  gdp_per_capita?: number;
  population?: number;
  literacy_rate?: number;
}

export interface UniversityData {
  id: string;
  name: string;
  country: string;
  website?: string;
  ranking?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}