import express from 'express'
import ViteExpress from 'vite-express'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const app = express()
const PORT = process.env.PORT || 3000

// Supabase clients
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null
// Client avec service_role pour Storage (bypass RLS)
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null

// Auth config
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'experience-blog-secret-key-change-in-production'
const JWT_EXPIRY = '24h'

// Site config for RSS
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'
const SITE_TITLE = 'Experience Blog'
const SITE_DESCRIPTION = 'Un blog minimaliste pour partager des idees, des reflexions et des experiences.'

// Supported languages
const SUPPORTED_LANGS = ['en', 'fr', 'he']
const DEFAULT_LANG = 'en'
const RTL_LANGS = ['he']

// Language-specific content
const LANG_CONFIG = {
  fr: {
    name: 'Francais',
    locale: 'fr_FR',
    dir: 'ltr',
    title: 'Experience Blog',
    description: 'Un blog minimaliste pour partager des idees, des reflexions et des experiences.'
  },
  en: {
    name: 'English',
    locale: 'en_US',
    dir: 'ltr',
    title: 'Experience Blog',
    description: 'A minimalist blog to share ideas, thoughts and experiences.'
  },
  he: {
    name: 'עברית',
    locale: 'he_IL',
    dir: 'rtl',
    title: 'Experience Blog',
    description: 'בלוג מינימליסטי לשיתוף רעיונות, מחשבות וחוויות.'
  }
}

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

// Upload image to Supabase Storage (protected)
app.post('/api/upload', checkAuth, async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Supabase Storage non configure (SUPABASE_SERVICE_ROLE_KEY manquante)' })
  }

  const { image, filename } = req.body

  if (!image) {
    return res.status(400).json({ error: 'Image requise' })
  }

  try {
    // Extract content type and base64 data
    const matches = image.match(/^data:(.+);base64,(.+)$/)
    if (!matches) {
      return res.status(400).json({ error: 'Format image invalide' })
    }
    const contentType = matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const ext = contentType.split('/')[1] || 'jpg'
    const uniqueFilename = filename || `${Date.now()}-${crypto.randomUUID()}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('images')
      .upload(uniqueFilename, buffer, {
        contentType,
        cacheControl: '31536000',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      return res.status(500).json({ error: 'Erreur upload: ' + error.message })
    }

    // Build public URL manually (avoid internal Railway URL)
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/images/${data.path}`

    res.json({ url: publicUrl })

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

// Get all articles (with optional lang filter)
app.get('/api/articles', async (req, res) => {
  if (!supabase) {
    return res.json([])
  }

  const lang = req.query.lang
  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (lang && SUPPORTED_LANGS.includes(lang)) {
    query = query.eq('lang', lang)
  }

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Get translations of an article
app.get('/api/articles/:slug/translations', async (req, res) => {
  if (!supabase) {
    return res.json([])
  }

  // First get the article to find its translation_group
  const { data: article } = await supabase
    .from('articles')
    .select('translation_group')
    .eq('slug', req.params.slug)
    .single()

  if (!article || !article.translation_group) {
    return res.json([])
  }

  // Get all articles in the same translation group
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, lang, title')
    .eq('translation_group', article.translation_group)

  if (error) {
    return res.json([])
  }

  res.json(data)
})

// Get language config
app.get('/api/languages', (req, res) => {
  res.json({
    supported: SUPPORTED_LANGS,
    default: DEFAULT_LANG,
    config: LANG_CONFIG
  })
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

  const { title, content, slug, tags, emoji, cover_image, lang, meta_title, meta_description, translation_group, translationOf } = req.body

  if (!title || !content || !slug) {
    return res.status(400).json({ error: 'Titre, contenu et slug requis' })
  }

  const articleData = { title, content, slug, tags }
  if (emoji) articleData.emoji = emoji
  if (cover_image) articleData.cover_image = cover_image
  if (lang) articleData.lang = lang
  if (meta_title) articleData.meta_title = meta_title
  if (meta_description) articleData.meta_description = meta_description

  // Handle translation linking
  if (translation_group) {
    articleData.translation_group = translation_group
  } else if (translationOf) {
    // Link to existing article - get or create translation_group
    const { data: linkedArticle } = await supabase
      .from('articles')
      .select('id, translation_group')
      .eq('id', translationOf)
      .single()

    if (linkedArticle) {
      if (linkedArticle.translation_group) {
        articleData.translation_group = linkedArticle.translation_group
      } else {
        // Create new translation_group and update the original article
        const newGroup = crypto.randomUUID()
        await supabase
          .from('articles')
          .update({ translation_group: newGroup })
          .eq('id', linkedArticle.id)
        articleData.translation_group = newGroup
      }
    }
  }

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

  const { title, content, slug, tags, emoji, cover_image, lang, meta_title, meta_description, translation_group } = req.body

  const updateData = { title, content, slug, tags, updated_at: new Date().toISOString() }
  if (emoji !== undefined) updateData.emoji = emoji
  if (cover_image !== undefined) updateData.cover_image = cover_image
  if (lang !== undefined) updateData.lang = lang
  if (meta_title !== undefined) updateData.meta_title = meta_title
  if (meta_description !== undefined) updateData.meta_description = meta_description
  if (translation_group !== undefined) updateData.translation_group = translation_group

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

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Block admin
Disallow: /admin.html
Disallow: /admin
`)
})

// Sitemap XML with hreflang
app.get('/sitemap.xml', async (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')

  // Static pages with all language variants
  const staticPagesBase = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/blog.html', priority: '0.9', changefreq: 'daily' },
    { path: '/archive.html', priority: '0.8', changefreq: 'daily' },
    { path: '/about.html', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy.html', priority: '0.4', changefreq: 'monthly' },
    { path: '/terms.html', priority: '0.4', changefreq: 'monthly' },
    { path: '/ai-transparency.html', priority: '0.4', changefreq: 'monthly' },
    { path: '/security.html', priority: '0.4', changefreq: 'monthly' }
  ]

  // Generate URLs grouped by language
  const staticPages = []
  SUPPORTED_LANGS.forEach(lang => {
    const langPrefix = lang === DEFAULT_LANG ? '' : `/${lang}`
    staticPagesBase.forEach(page => {
      staticPages.push({
        loc: `${langPrefix}${page.path}`,
        priority: page.priority,
        changefreq: page.changefreq,
        lang: lang,
        basePath: page.path
      })
    })
  })

  let articles = []
  if (supabase) {
    const { data } = await supabase
      .from('articles')
      .select('slug, lang, translation_group, updated_at, created_at')
      .order('lang', { ascending: true })
      .order('created_at', { ascending: false })
    articles = data || []
  }

  const today = new Date().toISOString().split('T')[0]

  // Group articles by translation_group
  const translationGroups = {}
  articles.forEach(article => {
    if (article.translation_group) {
      if (!translationGroups[article.translation_group]) {
        translationGroups[article.translation_group] = []
      }
      translationGroups[article.translation_group].push(article)
    }
  })

  const urls = staticPages.map(page => {
    // Generate hreflang tags for all language variants of this page
    const hreflangTags = SUPPORTED_LANGS.map(lang => {
      const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`
      return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${prefix}${page.basePath}"/>`
    }).join('\n')

    return `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${hreflangTags}
  </url>`
  }).join('')

  const articleUrls = articles.map(article => {
    const langPrefix = article.lang === DEFAULT_LANG ? '' : `/${article.lang}`
    const translations = translationGroups[article.translation_group] || [article]

    const hreflangTags = translations.map(t => {
      const tPrefix = t.lang === DEFAULT_LANG ? '' : `/${t.lang}`
      return `    <xhtml:link rel="alternate" hreflang="${t.lang}" href="${SITE_URL}${tPrefix}/article/${t.slug}"/>`
    }).join('\n')

    return `
  <url>
    <loc>${SITE_URL}${langPrefix}/article/${article.slug}</loc>
    <lastmod>${(article.updated_at || article.created_at).split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
${hreflangTags}
  </url>`
  }).join('')

  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
${articleUrls}
</urlset>`)
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
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
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

// Language-prefixed routes (en, he)
app.get('/:lang', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('index.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/article/:slug', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('article.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/archive.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('archive.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/blog.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('blog.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/about.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('about.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/privacy.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('privacy.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/terms.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('terms.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/ai-transparency.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('ai-transparency.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.get('/:lang/security.html', (req, res, next) => {
  const lang = req.params.lang
  if (SUPPORTED_LANGS.includes(lang) && lang !== DEFAULT_LANG) {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('security.html', { root: './dist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Initialize Storage bucket
async function initStorage() {
  if (!supabaseAdmin) {
    console.log('Warning: SUPABASE_SERVICE_ROLE_KEY not set. Image upload will not work.')
    return
  }

  try {
    // Check if bucket exists
    const { data: buckets } = await supabaseAdmin.storage.listBuckets()
    const imagesBucket = buckets?.find(b => b.name === 'images')

    if (!imagesBucket) {
      // Create the bucket
      const { error } = await supabaseAdmin.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      })

      if (error) {
        console.error('Failed to create images bucket:', error.message)
      } else {
        console.log('Created images bucket in Supabase Storage')
      }
    }
  } catch (err) {
    console.error('Storage init error:', err.message)
  }
}

// Start server with ViteExpress
ViteExpress.listen(app, PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  if (!supabase) {
    console.log('Warning: Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.')
  }
  await initStorage()
})
