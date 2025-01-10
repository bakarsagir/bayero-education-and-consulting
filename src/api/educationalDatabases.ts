import axios from 'axios';
import { config } from './config';
import { UniversityData } from './crawler';

interface EducationalDBResult {
  name: string;
  country: string;
  website: string;
  accreditation?: string;
  established?: number;
  type?: string;
}

export class EducationalDatabases {
  static async fetchWHEDData(): Promise<EducationalDBResult[]> {
    const { apiKey } = config.education.whed;
    if (!apiKey) return [];

    try {
      const { data } = await axios.get('https://www.whed.net/api/v1/institutions', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      return data.institutions.map((inst: any) => ({
        name: inst.name,
        country: inst.country,
        website: inst.website,
        accreditation: inst.accreditation_status,
        established: inst.year_established,
        type: inst.institution_type
      }));
    } catch (error) {
      console.error('WHED API error:', error);
      return [];
    }
  }

  static async fetchIAUData(): Promise<EducationalDBResult[]> {
    const { apiKey } = config.education.iau;
    if (!apiKey) return [];

    try {
      const { data } = await axios.get('https://www.iau-aiu.net/api/v1/members', {
        headers: { 'X-API-Key': apiKey }
      });

      return data.members.map((member: any) => ({
        name: member.institution_name,
        country: member.country,
        website: member.website,
        accreditation: member.accreditation,
        established: member.founded_year,
        type: member.institution_type
      }));
    } catch (error) {
      console.error('IAU API error:', error);
      return [];
    }
  }

  static async enrichUniversityData(universities: UniversityData[]) {
    const [whedData, iauData] = await Promise.all([
      this.fetchWHEDData(),
      this.fetchIAUData()
    ]);

    const combinedData = new Map<string, EducationalDBResult>();
    
    // Combine data from both sources, preferring WHED data
    [...whedData, ...iauData].forEach(inst => {
      if (!combinedData.has(inst.website)) {
        combinedData.set(inst.website, inst);
      }
    });

    // Enrich university data
    for (const university of universities) {
      const enrichmentData = combinedData.get(university.website);
      if (enrichmentData) {
        const { error } = await supabase
          .from('universities')
          .update({
            accreditation: enrichmentData.accreditation,
            established_year: enrichmentData.established,
            institution_type: enrichmentData.type
          })
          .eq('website', university.website);

        if (error) {
          console.error('Error updating university enrichment data:', error);
        }
      }
    }
  }
}