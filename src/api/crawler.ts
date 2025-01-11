import { ProxyManager } from './proxyManager';
import { RateLimiter } from './rateLimiter';
import { UniversityVerifier } from './verifier';
import { UniversityData } from './types';
import { supabase } from '@/lib/supabase';
import { UniversityRankings } from './rankings';
import { EducationalDatabases } from './educationalDatabases';
import axios from 'axios';

export async function startCrawler(universities: string[]) {
  const discoveredUniversities: UniversityData[] = [];
  const rateLimiter = new RateLimiter();

  for (const url of universities) {
    try {
      const proxy = ProxyManager.getNextProxy();
      await rateLimiter.wait();

      const { data: html } = await axios.get(url, {
        httpsAgent: proxy,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; UniversityBot/1.0; +http://example.com/bot)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        }
      });

      const verificationResult = await UniversityVerifier.verify(html, url);

      if (verificationResult.isUniversity) {
        const universityData: UniversityData = {
          id: crypto.randomUUID(),
          name: '',
          country: '',
          website: url,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        discoveredUniversities.push(universityData);
        
        const { error: uniError } = await supabase
          .from('universities')
          .upsert([universityData], { onConflict: 'website' });
        
        if (uniError) {
          console.error('Error inserting university:', uniError);
          continue;
        }
      }

    } catch (error) {
      console.error(`Error processing ${url}:`, error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  await Promise.all([
    UniversityRankings.updateUniversityRankings(discoveredUniversities),
    EducationalDatabases.enrichUniversityData(discoveredUniversities)
  ]);
}