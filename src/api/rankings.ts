import axios from 'axios';
import { config } from './config';
import { UniversityData } from './crawler';

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

  static async fetchTHERankings(): Promise<Map<string, RankingData>> {
    const { apiKey, apiSecret } = config.rankings.the;
    if (!apiKey || !apiSecret) return new Map();

    try {
      const { data } = await axios.get('https://api.timeshighereducation.com/v1/rankings/world', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Secret': apiSecret
        }
      });

      return new Map(data.institutions.map((uni: any) => [
        uni.website,
        {
          rank: uni.rank,
          score: uni.overall_score,
          year: new Date().getFullYear(),
          source: 'THE'
        }
      ]));
    } catch (error) {
      console.error('THE Rankings API error:', error);
      return new Map();
    }
  }

  static async fetchTopUniversitiesRankings(): Promise<Map<string, RankingData>> {
    const { apiKey } = config.rankings.topuniversities;
    if (!apiKey) return new Map();

    try {
      const { data } = await axios.get('https://api.topuniversities.com/rankings', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      return new Map(data.universities.map((uni: any) => [
        uni.website,
        {
          rank: uni.world_rank,
          score: uni.total_score,
          year: new Date().getFullYear(),
          source: 'TopUniversities'
        }
      ]));
    } catch (error) {
      console.error('TopUniversities API error:', error);
      return new Map();
    }
  }

  static async updateUniversityRankings(universities: UniversityData[]) {
    const [qsRankings, theRankings, topUniRankings] = await Promise.all([
      this.fetchQSRankings(),
      this.fetchTHERankings(),
      this.fetchTopUniversitiesRankings()
    ]);

    for (const university of universities) {
      const rankings = [
        qsRankings.get(university.website),
        theRankings.get(university.website),
        topUniRankings.get(university.website)
      ].filter(Boolean);

      if (rankings.length > 0) {
        // Use the best ranking available
        const bestRanking = rankings.reduce((best, current) => 
          (current && (!best || current.rank < best.rank)) ? current : best
        );

        if (bestRanking) {
          const { error } = await supabase
            .from('universities')
            .update({ 
              ranking: bestRanking.rank,
              ranking_score: bestRanking.score,
              ranking_year: bestRanking.year,
              ranking_source: bestRanking.source
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