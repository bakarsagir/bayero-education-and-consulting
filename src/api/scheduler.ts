import { CronJob } from 'cron';
import { startCrawler } from './crawler';
import { UniversitySearchEngine } from './searchEngines';

// List of countries to search for universities
const COUNTRIES = [
  'us', 'uk', 'ca', 'au', 'nz', 'in', 'sg', 'my',
  'de', 'fr', 'es', 'it', 'nl', 'se', 'dk', 'no',
  'jp', 'kr', 'cn', 'hk', 'br', 'mx', 'za'
];

async function discoverAndCrawl() {
  console.log('Starting monthly university discovery and crawl...');
  
  for (const country of COUNTRIES) {
    console.log(`Discovering universities in ${country}...`);
    const universities = await UniversitySearchEngine.searchAll(country);
    console.log(`Found ${universities.length} potential universities in ${country}`);
    
    await startCrawler(universities);
  }
  
  console.log('Monthly crawl completed');
}

// Run on the first day of each month at 2 AM
const crawlerJob = new CronJob('0 2 1 * *', discoverAndCrawl);

export function startScheduler() {
  crawlerJob.start();
  console.log('Crawler scheduler started - Will run monthly');
}