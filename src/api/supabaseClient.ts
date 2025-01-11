import { createClient } from '@supabase/supabase-js';
import type { Country, CountryStats } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type University = {
  id: string;
  name: string;
  country: string;
  website?: string;
  ranking?: number;
  description?: string;
};

export type Program = {
  id: string;
  name: string;
  description?: string;
  level: 'Bachelors' | 'Masters' | 'PhD';
};

export async function getUniversities() {
  const { data, error } = await supabase
    .from('universities')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getPrograms() {
  const { data, error } = await supabase
    .from('programs')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getCountries() {
  const { data, error } = await supabase
    .from('countries')
    .select('*, country_stats(*)');
  
  if (error) throw error;
  return data;
}

// Re-export existing types
export type { Country, CountryStats };