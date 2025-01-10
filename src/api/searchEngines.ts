import axios from 'axios';
import { config } from './config';

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

export class UniversitySearchEngine {
  static async searchGoogle(query: string): Promise<SearchResult[]> {
    const { apiKey, searchEngineId } = config.search.google;
    if (!apiKey || !searchEngineId) return [];

    try {
      // Use Google Custom Search API
      const { data } = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=a5dd1a5bcae444579&q=${encodeURIComponent(query)}`
      );
      
      return data.items.map((item: any) => ({
        url: item.link,
        title: item.title,
        description: item.snippet
      }));
    } catch (error) {
      console.error('Google search error:', error);
      return [];
    }
  }

  static async searchAll(country: string): Promise<string[]> {
    const queries = [
      `site:.edu university ${country}`,
      `site:.ac.${country} university official`,
      `list of universities in ${country} official website`
    ];

    const results = new Set<string>();

    for (const query of queries) {
      const googleResults = await this.searchGoogle(query);
      googleResults.forEach(result => results.add(result.url));
    }

    return Array.from(results);
  }
}