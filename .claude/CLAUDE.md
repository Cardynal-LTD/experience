# Instructions pour Claude

## Apercu

| Aspect | Valeur |
|--------|--------|
| **Type** | Landing page Cardynal + Blog multilingue avec admin |
| **Stack** | Vite + Express.js + Supabase (self-hosted) + Tiptap |
| **Deploiement** | Railway |
| **Branche principale** | main |
| **Langues** | English (defaut), Francais, Hebrew |
| **Etat** | Production ready |

## Conventions

- **Langue du code:** anglais
- **Langue des commentaires/UI:** francais
- **Frontend:** Vanilla JS uniquement, pas de framework. Fonctions courtes, noms clairs.
- **CSS:** Variables CSS pour le theming (light/dark). Mobile-first.
- **Backend:** Express simple, pas de sur-engineering.
- Pas d'emojis dans le code sauf demande explicite
- Garder le style existant (indentation, quotes, etc.)

## Structure du projet

```
experience/
├── src/                      # Sources Vite
│   ├── index.html            # Landing page Cardynal
│   ├── blog.html             # Liste articles blog
│   ├── article.html          # Vue article unique
│   ├── archive.html          # Tous les articles (grid/list toggle)
│   ├── about.html            # Page a propos
│   ├── privacy.html          # Privacy Policy
│   ├── terms.html            # Terms of Service
│   ├── ai-transparency.html  # AI Transparency
│   ├── security.html         # Security
│   ├── admin.html            # Interface admin + editeur Tiptap
│   ├── css/
│   │   ├── main.css          # Point d'entree CSS blog (imports)
│   │   ├── tokens.css        # Design tokens (couleurs, typo, spacing)
│   │   ├── base.css          # Reset, styles de base, RTL support
│   │   ├── animations.css    # Keyframes et utilitaires
│   │   ├── layout.css        # Header, footer, sidebar, modal
│   │   ├── pages.css         # Styles specifiques aux pages
│   │   ├── admin.css         # Dashboard analytics
│   │   ├── editor.css        # Styles editeur Tiptap + form fields
│   │   ├── legal.css         # Styles pages legales
│   │   ├── components/
│   │   │   ├── button.css    # Boutons (variants, sizes)
│   │   │   ├── input.css     # Inputs, textarea, select
│   │   │   ├── card.css      # Cards et list items
│   │   │   └── popover.css   # Popover, tooltip, toast
│   │   └── landing/          # CSS modulaire landing page
│   │       ├── index.css     # Point d'entree (imports)
│   │       ├── variables.css # Variables landing
│   │       ├── header.css    # Header landing
│   │       ├── hero.css      # Hero section
│   │       ├── sections.css  # Sections communes
│   │       ├── features.css  # Features section
│   │       ├── pricing.css   # Pricing section
│   │       ├── faq.css       # FAQ section
│   │       ├── footer.css    # Footer landing
│   │       ├── widgets.css   # Widgets interactifs
│   │       ├── roi.css       # ROI calculator
│   │       ├── pages.css     # Blog/archive/article pages
│   │       └── rtl.css       # Support RTL Hebrew
│   └── js/
│       ├── theme.js          # Gestion du theme (light/dark)
│       ├── auth.js           # Module auth partage (JWT)
│       ├── i18n.js           # Module i18n principal (importe les traductions)
│       ├── editor.js         # Module Tiptap + slash commands
│       ├── admin.js          # Logique admin + analytics dashboard
│       ├── tracking.js       # Module tracking visiteurs (cookie-based)
│       ├── components/
│       │   ├── header.js     # Header partage (toutes les pages)
│       │   └── footer.js     # Footer partage (toutes les pages)
│       └── i18n/
│           ├── index.js      # Export centralise des traductions
│           ├── en.js         # Traductions anglais (defaut)
│           ├── fr.js         # Traductions francais
│           ├── he.js         # Traductions hebreu
│           └── widgets/
│               ├── en.js     # Traductions widgets EN
│               ├── fr.js     # Traductions widgets FR
│               └── he.js     # Traductions widgets HE
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── favicon.svg           # Favicon SVG
│   ├── icon-192.png          # App icon
│   ├── icon-512.png          # App icon
│   ├── dashboard-light-en.png # Dashboard preview light EN/FR
│   ├── dashboard-light-he.png # Dashboard preview light HE
│   ├── dashboard-dark-en.png  # Dashboard preview dark EN/FR
│   └── dashboard-dark-he.png  # Dashboard preview dark HE
├── server.js                 # Serveur Express + API REST + JWT + SEO
├── vite.config.js            # Configuration Vite (multi-page)
├── package.json              # Dependances (type: module)
├── railway.toml              # Config Railway (Node 20)
├── dist/                     # Build de production (gitignore)
└── .claude/
    ├── CLAUDE.md             # Ce fichier
    └── HISTORY.md            # Historique des sessions
```

## Technologies

- **Build:** Vite 7.x + vite-express
- **Backend:** Node.js + Express 4.18.2 (ESM)
- **Auth:** JWT (jsonwebtoken) - tokens 24h
- **Base de donnees:** Supabase self-hosted (PostgreSQL)
- **Frontend:** HTML5 + CSS3 + ES Modules
- **Editeur:** Tiptap 3.x (WYSIWYG Notion-like)
- **Markdown:** Marked 17.x + Turndown 7.x
- **Theme:** Light/Dark avec toggle + design system
- **i18n:** FR/EN/HE avec support RTL

## Commandes

```bash
npm run dev     # Developpement avec HMR
npm run build   # Build production
npm run start   # Production (apres build)
```

## Infrastructure Supabase (Self-hosted Railway)

```
Cardynal Data layer
├── Kong (API Gateway)         → kong-r2vq-cardynal.up.railway.app
├── PostgREST                  → API REST automatique
├── Postgres                   → Base de donnees principale
├── Postgres Meta              → Metadonnees
├── Supabase Realtime          → WebSockets
├── Supabase Studio            → Interface admin Supabase
├── Supabase Storage + S3      → Stockage fichiers
├── Imgproxy                   → Traitement images
└── Gotrue Auth                → Authentification
```

## Base de donnees

### Table `articles`
```sql
id               SERIAL PRIMARY KEY
title            TEXT NOT NULL
content          TEXT NOT NULL (Markdown)
slug             TEXT NOT NULL UNIQUE
tags             TEXT
emoji            TEXT DEFAULT '📄'
cover_image      TEXT (URL)
lang             TEXT DEFAULT 'fr' CHECK (lang IN ('fr', 'en', 'he'))
translation_group UUID
meta_title       TEXT
meta_description TEXT
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ
```

### Table `page_views`
```sql
id               SERIAL PRIMARY KEY
path             TEXT NOT NULL
article_id       INTEGER REFERENCES articles(id) ON DELETE CASCADE
viewed_at        TIMESTAMPTZ DEFAULT NOW()
referrer         TEXT
visitor_id       TEXT
session_id       TEXT
device_type      TEXT
browser          TEXT
screen_width     INTEGER
screen_height    INTEGER
timezone         TEXT
language         TEXT
scroll_depth     INTEGER
time_on_page     INTEGER
utm_source       TEXT
utm_medium       TEXT
utm_campaign     TEXT
country          TEXT
city             TEXT
```

### Table `images`
```sql
id               UUID PRIMARY KEY DEFAULT uuid_generate_v4()
data             TEXT NOT NULL (base64)
content_type     TEXT DEFAULT 'image/jpeg'
created_at       TIMESTAMPTZ DEFAULT NOW()
```

## API REST

### Public
- `GET /api/articles` - Liste des articles (?lang=fr|en|he)
- `GET /api/articles/:slug` - Article par slug
- `GET /api/articles/:slug/translations` - Traductions d'un article
- `GET /api/languages` - Config langues supportees
- `GET /api/images/:id` - Servir image depuis DB
- `GET /rss.xml` - Feed RSS
- `GET /sitemap.xml` - Sitemap avec hreflang
- `GET /robots.txt` - Robots.txt

### Tracking (public)
- `POST /api/track` - Enregistrer page view (visitor_id, session, device, UTM...)
- `POST /api/track/update` - Mettre a jour scroll depth et time on page

### Protege (Authorization: Bearer {JWT_TOKEN})
- `POST /api/login` - Auth → retourne JWT token
- `GET /api/verify` - Verifie validite du token
- `POST /api/articles` - Creer article
- `PUT /api/articles/:id` - Modifier article
- `DELETE /api/articles/:id` - Supprimer article
- `POST /api/upload` - Upload image (base64 → DB)
- `GET /api/stats` - Statistiques analytics completes

### Routes multilingues
- `/` - English (defaut)
- `/fr/` - Francais
- `/he/` - Hebrew (RTL)
- `/[lang]/blog.html` - Liste articles
- `/[lang]/archive.html` - Archives
- `/[lang]/about.html` - A propos
- `/[lang]/privacy.html` - Privacy Policy
- `/[lang]/terms.html` - Terms of Service
- `/[lang]/ai-transparency.html` - AI Transparency
- `/[lang]/security.html` - Security
- `/[lang]/article/:slug` - Article dans une langue

## Variables d'environnement

```
SUPABASE_URL=https://kong-r2vq-cardynal.up.railway.app
SUPABASE_ANON_KEY=eyJ...
ADMIN_PASSWORD=
JWT_SECRET=          # Cle secrete pour signer les JWT
SITE_URL=
PORT=3000
```

## Design system

Architecture CSS modulaire inspiree Notion/Linear:

- **tokens.css** - Variables: couleurs, typographie (ratio 1.25), spacing (base 4px), shadows
- **base.css** - Reset, focus states, scrollbar, typography de base, RTL rules
- **animations.css** - fadeIn, slideUp, scaleIn, pulse, spin
- **layout.css** - Header sticky, footer, modal backdrop, language selector
- **components/** - BEM naming: `.btn--primary`, `.card-list-item__title`

Dark mode: `[data-theme="dark"]` sur `<html>`
RTL mode: `[dir="rtl"]` sur `<html>` (automatique pour Hebrew)

## Fonctionnalites

### SEO
- Meta tags Open Graph et Twitter Cards (dynamiques)
- JSON-LD Schema (Article, WebSite)
- Sitemap.xml avec hreflang pour les traductions
- Robots.txt
- Canonical URLs
- PWA Manifest avec shortcuts

### Multilingue
- 3 langues: English (defaut), Francais, Hebrew
- Support RTL automatique pour Hebrew
- Hreflang tags pour les traductions
- Liaison d'articles entre langues
- Language selector dans le header (select natif)
- Detection langue par URL uniquement (pas de localStorage)
- Traductions modulaires dans `js/i18n/*.js`

### Editeur (admin.html)
- Toolbar en haut: Publier, Annuler, X
- Banner image avec upload/URL
- Emoji picker pour icone du document
- Slash commands (/) pour blocs
- Bubble menu sur selection
- Floating menu (+) sur ligne vide
- Selecteur de langue
- Liaison de traductions
- Champs SEO (meta title, meta description)

### Pages publiques
- Header/footer partages (composants JS injectes)
- Navigation unifiee: Home, Product, Pricing, Blog
- Toggle grille/liste sur archive
- Cover images avec emoji overlay
- Dark mode persistant (localStorage)
- Language selector (URL-based)

### Analytics (admin.html, onglet Analytics)
- Dashboard moderne avec metric cards, charts, data tables
- Tracking cookie-based (visitor_id 2 ans, session_id par session)
- Metriques: vues, visiteurs uniques, bounce rate, temps moyen, scroll depth
- Graphique vues par jour (14 jours)
- Repartition appareils (desktop/mobile/tablet)
- Sources de trafic (referrers)
- Campagnes UTM
- Top articles les plus vus
- Module tracking.js inclus sur toutes les pages
- Mise a jour scroll/time via sendBeacon (beforeunload)

### Securite
- JWT tokens (expire 24h)
- Verification token au chargement
- Logout automatique si token invalide

## Landing page Cardynal (index.html)

La landing page est une page marketing standalone avec des widgets interactifs animes.

### Widgets interactifs
- **Chat Flow Demo** - Simulation de conversations support (hero)
- **Playbook Widget** - Animation du flux de traitement des intents
- **Tree Widget** - Arbre de decision escalation AI → Human
- **RAG Widget** - Demo retrieval-augmented generation
- **Omni Widget** - Visualisation multi-canal (WhatsApp, Instagram, etc.)

### Traductions des widgets (WIDGET_TRANSLATIONS)
Systeme de traduction specifique aux widgets:
- **Systeme reste en anglais:** Intent labels, tool calls, status, noms de fichiers
- **Conversations traduites:** Messages client, reponses AI, messages humain

```javascript
wt('chat.billing.c1')  // → Message client traduit
wt('playbook.step1')   // → Description etape traduite
wt('tree.step1')       // → Message conversation traduit
wt('rag.userQuestion') // → Question utilisateur traduite
```

### ROI Calculator
- Modal avec slider pour taux de resolution AI
- Prix adaptes par langue (USD/EUR/ILS)
- Calcul automatique des economies

### Dashboard Preview
- 4 images: dark/light x en/he
- Switch automatique selon theme et langue de la page
- Images dans `/public/dashboard-*.png`

### Chatwoot Widget
- URL: chat.cardynal.io
- Avatar custom apparait apres 120px de scroll
- Theme sync avec la page (dark/light)
- Langue sync avec la page (en/fr/he)

## Outils MCP

### Supabase (PostgREST)
- `postgrestRequest` - Requetes REST vers Supabase
- `sqlToRest` - Convertir SQL en requete PostgREST

### Postgres
- `query` - Requetes SQL directes (lecture seule)

### n8n (n8n-workflow-builder)
- `search_workflows` - Chercher des workflows
- `get_workflow_details` - Details d'un workflow
- `execute_workflow` - Executer un workflow

## Ce qu'il faut eviter

- Ajouter des dependances npm sans necessite
- Sur-abstraire le code existant
- Modifier le design system etabli
- Ajouter des fonctionnalites non demandees

## Bugs connus / Notes

1. L'authentification utilise JWT (24h expiry) stocke dans localStorage
2. Le frontend utilise Vite et ES Modules
3. L'editeur Tiptap est WYSIWYG mais stocke en Markdown
4. Le RSS genere les 20 derniers articles
5. `JWT_SECRET` doit etre defini en production
6. Les images sont stockees en base64 dans PostgreSQL
7. Supabase est self-hosted sur Railway (pas Supabase Cloud)
8. RLS desactive (auth geree cote serveur)
