import express from 'express'
import ViteExpress from 'vite-express'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = process.env.PORT || 3000

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Auth config
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'experience-blog-secret-key-change-in-production'
const JWT_EXPIRY = '24h'

// Site config for RSS
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'
const SITE_TITLE = 'Experience Blog'
const SITE_DESCRIPTION = 'Un blog minimaliste pour partager des idees, des reflexions et des experiences.'

// Middleware
app.use(express.json({ limit: '10mb' }))

// Auth middleware
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorise' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expire' })
  }
}

// API Routes

// Login - returns JWT token
app.post('/api/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    res.json({ success: true, token })
  } else {
    res.status(401).json({ error: 'Mot de passe incorrect' })
  }
})

// Verify token validity
app.get('/api/verify', checkAuth, (req, res) => {
  res.json({ valid: true, user: req.user })
})

// Upload image to Supabase images table (protected)
app.post('/api/upload', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configure' })
  }

  const { image } = req.body

  if (!image) {
    return res.status(400).json({ error: 'Image requise' })
  }

  try {
    // Extract content type from base64
    const matches = image.match(/^data:(.+);base64,/)
    const contentType = matches ? matches[1] : 'image/jpeg'

    // Store in database
    const { data, error } = await supabase
      .from('images')
      .insert([{ data: image, content_type: contentType }])
      .select('id')
      .single()

    if (error) {
      console.error('Upload error:', error)
      return res.status(500).json({ error: 'Erreur upload: ' + error.message })
    }

    // Return URL to our image endpoint
    res.json({ url: `/api/images/${data.id}` })

  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Serve image from database
app.get('/api/images/:id', async (req, res) => {
  if (!supabase) {
    return res.status(404).send('Not found')
  }

  const { data, error } = await supabase
    .from('images')
    .select('data, content_type')
    .eq('id', req.params.id)
    .single()

  if (error || !data) {
    return res.status(404).send('Image non trouvee')
  }

  // Extract base64 data and convert to buffer
  const base64Data = data.data.replace(/^data:.+;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')

  res.setHeader('Content-Type', data.content_type)
  res.setHeader('Cache-Control', 'public, max-age=31536000') // Cache 1 year
  res.send(buffer)
})

// Get all articles
app.get('/api/articles', async (req, res) => {
  if (!supabase) {
    return res.json([])
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Get single article by slug
app.get('/api/articles/:slug', async (req, res) => {
  if (!supabase) {
    return res.status(404).json({ error: 'Article non trouve' })
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', req.params.slug)
    .single()

  if (error) {
    return res.status(404).json({ error: 'Article non trouve' })
  }

  res.json(data)
})

// Create article (protected)
app.post('/api/articles', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configure' })
  }

  const { title, content, slug, tags, emoji, cover_image } = req.body

  if (!title || !content || !slug) {
    return res.status(400).json({ error: 'Titre, contenu et slug requis' })
  }

  const articleData = { title, content, slug, tags }
  if (emoji) articleData.emoji = emoji
  if (cover_image) articleData.cover_image = cover_image

  const { data, error } = await supabase
    .from('articles')
    .insert([articleData])
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Update article (protected)
app.put('/api/articles/:id', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configure' })
  }

  const { title, content, slug, tags, emoji, cover_image } = req.body

  const updateData = { title, content, slug, tags, updated_at: new Date().toISOString() }
  if (emoji !== undefined) updateData.emoji = emoji
  if (cover_image !== undefined) updateData.cover_image = cover_image

  const { data, error } = await supabase
    .from('articles')
    .update(updateData)
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Delete article (protected)
app.delete('/api/articles/:id', checkAuth, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configure' })
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', req.params.id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ success: true })
})

// RSS Feed
app.get('/rss.xml', async (req, res) => {
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')

  if (!supabase) {
    return res.send(generateRSS([]))
  }

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  res.send(generateRSS(articles || []))
})

function generateRSS(articles) {
  const escapeXml = (str) => {
    if (!str) return ''
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const items = articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/article/${article.slug}</link>
      <guid>${SITE_URL}/article/${article.slug}</guid>
      <pubDate>${new Date(article.created_at).toUTCString()}</pubDate>
      <description>${escapeXml(article.content.substring(0, 300))}...</description>
      ${article.tags ? `<category>${escapeXml(article.tags)}</category>` : ''}
    </item>
  `).join('')

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
</rss>`
}

// Serve article page for /article/:slug routes (must be before ViteExpress)
app.get('/article/:slug', (req, res, next) => {
  // In production, serve the built article.html
  // In dev, ViteExpress handles it
  if (process.env.NODE_ENV === 'production') {
    res.sendFile('article.html', { root: './dist' })
  } else {
    next()
  }
})

// Start server with ViteExpress
ViteExpress.listen(app, PORT, () => {
  console.log(`Server running on port ${PORT}`)
  if (!supabase) {
    console.log('Warning: Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.')
  }
})
