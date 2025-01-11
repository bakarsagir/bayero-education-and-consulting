import axios from 'axios';
import { config } from './config';
import { UniversityData } from './types';
import { supabase } from '@/lib/supabase';

interface RankingData {
  rank: number;
  score: number;
  year: number;
  source: string;
}

export class UniversityRankings {
  static async fetchQSRankings(): Promise<Map<string, RankingData>> {
    const { apiKey, apiSecret } = config.rankings.qs;
    if (!apiKey || !apiSecret) return new Map();

    try {
      const { data } = await axios.get('https://api.qs.com/v1/rankings/world', {
        headers: {
          'X-API-KEY': apiKey,
          'X-API-SECRET': apiSecret
        }
      });

      return new Map(data.universities.map((uni: any) => [
        uni.website,
        {
          rank: uni.rank,
          score: uni.overall_score,
          year: new Date().getFullYear(),
          source: 'QS'
        }
      ]));
    } catch (error) {
      console.error('QS Rankings API error:', error);
      return new Map();
    }
  }

  static async updateUniversityRankings(universities: UniversityData[]) {
    const qsRankings = await this.fetchQSRankings();

    for (const university of universities) {
      if (university.website) {
        const ranking = qsRankings.get(university.website);
        if (ranking) {
          const { error } = await supabase
            .from('universities')
            .update({ 
              ranking: ranking.rank,
              updated_at: new Date().toISOString()
            })
            .eq('website', university.website);

          if (error) {
            console.error('Error updating university ranking:', error);
          }
        }
      }
    }
  }
}