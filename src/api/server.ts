import express from 'express';
import cors from 'cors';
import { getUniversities, getPrograms, supabase } from './supabaseClient';

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

// Existing endpoints...
app.get('/api/universities', async (req, res) => {
  try {
    const { page = 1, limit = 10, country } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let query = supabase
      .from('universities')
      .select('*');
    
    if (country) {
      query = query.eq('country', String(country));
    }
    
    const { data, error, count } = await query
      .range(offset, offset + Number(limit) - 1)
      .order('name');

    if (error) throw error;

    res.json({
      data,
      page: Number(page),
      total: count,
      totalPages: Math.ceil(count / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
});

app.get('/api/programs', async (req, res) => {
  try {
    const { page = 1, limit = 10, level } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let query = supabase
      .from('programs')
      .select('*');
    
    if (level) {
      query = query.eq('level', String(level));
    }
    
    const { data, error, count } = await query
      .range(offset, offset + Number(limit) - 1)
      .order('name');

    if (error) throw error;

    res.json({
      data,
      page: Number(page),
      total: count,
      totalPages: Math.ceil(count / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});