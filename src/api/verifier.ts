import { load, CheerioAPI } from 'cheerio';
import natural from 'natural';

interface VerificationResult {
  isUniversity: boolean;
  confidence: number;
  reasons: string[];
}

// Common university-related keywords
const UNIVERSITY_KEYWORDS = [
  'university', 'college', 'academic', 'admissions', 'campus',
  'faculty', 'research', 'programs', 'courses', 'students',
  'undergraduate', 'graduate', 'doctorate', 'phd', 'bachelor',
  'master', 'department', 'school', 'institute'
];

// Common university page patterns
const PAGE_PATTERNS = [
  '/about', '/admissions', '/academics', '/research',
  '/faculty', '/students', '/programs', '/courses',
  '/departments', '/contact'
];

export class UniversityVerifier {
  static async verify(html: string, url: string): Promise<VerificationResult> {
    const $ = load(html);
    const reasons: string[] = [];
    let score = 0;

    // Check domain TLD
    if (this.hasEducationalDomain(url)) {
      score += 30;
      reasons.push('Educational domain detected');
    }

    // Check meta tags
    const metaScore = this.checkMetaTags($);
    score += metaScore.score;
    reasons.push(...metaScore.reasons);

    // Check content keywords
    const keywordScore = this.checkKeywords($);
    score += keywordScore.score;
    reasons.push(...keywordScore.reasons);

    // Check page structure
    const structureScore = this.checkPageStructure($);
    score += structureScore.score;
    reasons.push(...structureScore.reasons);

    // Check for accreditation mentions
    const accreditationScore = this.checkAccreditation($);
    score += accreditationScore.score;
    reasons.push(...accreditationScore.reasons);

    const confidence = Math.min(score / 100, 1);
    
    return {
      isUniversity: confidence > 0.7,
      confidence,
      reasons
    };
  }

  private static hasEducationalDomain(url: string): boolean {
    const domain = new URL(url).hostname;
    return domain.endsWith('.edu') || 
           /\.ac\.[a-z]{2}$/.test(domain) ||
           /\.edu\.[a-z]{2}$/.test(domain);
  }

  private static checkMetaTags($: CheerioAPI) {
    let score = 0;
    const reasons: string[] = [];
    
    const description = $('meta[name="description"]').attr('content')?.toLowerCase() || '';
    const keywords = $('meta[name="keywords"]').attr('content')?.toLowerCase() || '';
    
    if (UNIVERSITY_KEYWORDS.some(keyword => description.includes(keyword))) {
      score += 15;
      reasons.push('Educational keywords found in meta description');
    }

    if (UNIVERSITY_KEYWORDS.some(keyword => keywords.includes(keyword))) {
      score += 10;
      reasons.push('Educational keywords found in meta keywords');
    }

    return { score, reasons };
  }

  private static checkKeywords($: CheerioAPI) {
    let score = 0;
    const reasons: string[] = [];
    
    const bodyText = $('body').text().toLowerCase();
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(bodyText) || [];
    
    const keywordCount = UNIVERSITY_KEYWORDS.reduce((count, keyword) => {
      return count + tokens.filter(token => token.toLowerCase() === keyword).length;
    }, 0);

    if (keywordCount > 20) {
      score += 25;
      reasons.push('High density of educational keywords found');
    } else if (keywordCount > 10) {
      score += 15;
      reasons.push('Moderate density of educational keywords found');
    }

    return { score, reasons };
  }

  private static checkPageStructure($: CheerioAPI) {
    let score = 0;
    const reasons: string[] = [];
    
    const links = $('a').map((_, el) => $(el).attr('href')).get();
    
    const matchingPatterns = PAGE_PATTERNS.filter(pattern => 
      links.some(link => link?.includes(pattern))
    );

    if (matchingPatterns.length >= 5) {
      score += 25;
      reasons.push('Common university page structure detected');
    } else if (matchingPatterns.length >= 3) {
      score += 15;
      reasons.push('Partial university page structure detected');
    }

    return { score, reasons };
  }

  private static checkAccreditation($: CheerioAPI) {
    let score = 0;
    const reasons: string[] = [];
    
    const bodyText = $('body').text().toLowerCase();
    
    if (bodyText.includes('accredited') || 
        bodyText.includes('accreditation') ||
        bodyText.includes('recognized institution')) {
      score += 15;
      reasons.push('Accreditation information found');
    }

    return { score, reasons };
  }
}