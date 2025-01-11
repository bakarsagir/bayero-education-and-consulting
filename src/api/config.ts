import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    url: process.env.VITE_SUPABASE_URL,
    key: process.env.VITE_SUPABASE_ANON_KEY
  },
  search: {
    google: {
      apiKey: process.env.GOOGLE_CUSTOM_SEARCH_API_KEY,
      searchEngineId: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID
    },
    bing: {
      apiKey: process.env.BING_SEARCH_API_KEY
    },
    duckduckgo: {
      apiKey: process.env.DUCKDUCKGO_API_KEY
    }
  },
  rankings: {
    qs: {
      apiKey: process.env.QS_API_KEY,
      apiSecret: process.env.QS_API_SECRET
    },
    the: {
      apiKey: process.env.THE_API_KEY,
      apiSecret: process.env.THE_API_SECRET
    },
    topuniversities: {
      apiKey: process.env.TOPUNIVERSITIES_API_KEY
    }
  },
  education: {
    whed: {
      apiKey: process.env.WHED_API_KEY
    },
    iau: {
      apiKey: process.env.IAU_API_KEY
    }
  },
  proxy: {
    username: process.env.PROXY_USERNAME,
    password: process.env.PROXY_PASSWORD,
    servers: JSON.parse(process.env.PROXY_SERVER_LIST || '[]')
  },
  rateLimiting: {
    maxRequestsPerSecond: parseInt(process.env.MAX_REQUESTS_PER_SECOND || '2', 10),
    crawlDelayMs: parseInt(process.env.CRAWL_DELAY_MS || '500', 10)
  }
};