import express from 'express';
import cors from 'cors';
import { supabase } from './supabaseClient';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.WORDPRESS_URL || '*',
  methods: ['GET'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Enhanced recommendation endpoint
app.get('/api/recommendations', async (req, res) => {
  try {
    const { level, country, maxTuition, coursePreference } = req.query;
    
    let query = supabase
      .from('courses')
      .select(`
        *,
        universities!inner(*),
        programs!inner(*),
        tuition_fees!inner(*)
      `);
    
    if (level) {
      query = query.eq('programs.level', String(level));
    }
    if (country) {
      query = query.eq('universities.country', String(country));
    }
    if (maxTuition) {
      query = query.lte('tuition_fees.amount', Number(maxTuition));
    }
    if (coursePreference) {
      query = query.ilike('name', `%${String(coursePreference)}%`);
    }
    
    const { data, error } = await query
      .limit(9)
      .order('universities.ranking', { ascending: true });

    if (error) throw error;

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});