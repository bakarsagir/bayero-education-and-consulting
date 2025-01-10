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