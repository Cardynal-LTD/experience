const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Admin password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Site config for RSS
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const SITE_TITLE = 'Experience Blog';
const SITE_DESCRIPTION = 'Un blog minimaliste pour partager des idees, des reflexions et des experiences.';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Auth middleware
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  next();
};

// API Routes

// Login verification
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Mot de passe incorrect' });
  }
});

// Get all articles
app.get('/api/articles', async (req, res) => {
  if (!supabase) {
    return res.json([]);
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Get single article by slug
app.get('/api/articles/:slug', async (req, res) => {
  if (!supabase) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', req.params.slug)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }

  res.json(data);
});

// Create article (protected)
app.post('/api/articles', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configuré' });
  }

  const { title, content, slug, tags } = req.body;

  if (!title || !content || !slug) {
    return res.status(400).json({ error: 'Titre, contenu et slug requis' });
  }

  const { data, error } = await supabase
    .from('articles')
    .insert([{ title, content, slug, tags }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Update article (protected)
app.put('/api/articles/:id', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configuré' });
  }

  const { title, content, slug, tags } = req.body;

  const { data, error } = await supabase
    .from('articles')
    .update({ title, content, slug, tags, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Delete article (protected)
app.delete('/api/articles/:id', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configuré' });
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', req.params.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

// RSS Feed
app.get('/rss.xml', async (req, res) => {
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');

  if (!supabase) {
    return res.send(generateRSS([]));
  }

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  res.send(generateRSS(articles || []));
});

function generateRSS(articles) {
  const escapeXml = (str) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const items = articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/article/${article.slug}</link>
      <guid>${SITE_URL}/article/${article.slug}</guid>
      <pubDate>${new Date(article.created_at).toUTCString()}</pubDate>
      <description>${escapeXml(article.content.substring(0, 300))}...</description>
      ${article.tags ? `<category>${escapeXml(article.tags)}</category>` : ''}
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

// Article page route
app.get('/article/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'article.html'));
});

// Admin route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!supabase) {
    console.log('Warning: Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }
});
