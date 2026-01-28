# MANIFESTE DU PROJET - Experience Blog

> Ce fichier est maintenu par Claude pour suivre l'état du projet et les modifications en cours.
> **Dernière mise à jour:** 2026-01-28

---

## APERCU RAPIDE

| Aspect | Valeur |
|--------|--------|
| **Type** | Landing page Cardynal + Blog multilingue avec admin |
| **Stack** | Vite + Express.js + Supabase (self-hosted) + Tiptap |
| **Déploiement** | Railway |
| **Branche principale** | main |
| **Langues** | English (défaut), Français, עברית (Hebrew) |
| **État** | Production ready |

---

## STRUCTURE DU PROJET

```
experience/
├── src/                      # Sources Vite
│   ├── index.html            # Landing page Cardynal
│   ├── blog.html             # Liste articles blog
│   ├── article.html          # Vue article unique
│   ├── archive.html          # Tous les articles (grid/list toggle)
│   ├── about.html            # Page à propos
│   ├── admin.html            # Interface admin + éditeur Tiptap
│   ├── css/
│   │   ├── main.css          # Point d'entrée CSS blog (imports)
│   │   ├── tokens.css        # Design tokens (couleurs, typo, spacing)
│   │   ├── base.css          # Reset, styles de base, RTL support
│   │   ├── animations.css    # Keyframes et utilitaires
│   │   ├── layout.css        # Header, footer, sidebar, modal
│   │   ├── pages.css         # Styles spécifiques aux pages
│   │   ├── editor.css        # Styles éditeur Tiptap + form fields
│   │   ├── components/
│   │   │   ├── button.css    # Boutons (variants, sizes)
│   │   │   ├── input.css     # Inputs, textarea, select
│   │   │   ├── card.css      # Cards et list items
│   │   │   └── popover.css   # Popover, tooltip, toast
│   │   └── landing/          # CSS modulaire landing page
│   │       ├── index.css     # Point d'entrée (imports)
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
│       ├── theme.js          # Gestion du thème (light/dark)
│       ├── auth.js           # Module auth partagé (JWT)
│       ├── i18n.js           # Module i18n principal (importe les traductions)
│       ├── editor.js         # Module Tiptap + slash commands
│       ├── admin.js          # Logique admin + traductions
│       ├── components/
│       │   ├── header.js     # Header partagé (toutes les pages)
│       │   └── footer.js     # Footer partagé (toutes les pages)
│       └── i18n/
│           ├── index.js      # Export centralisé des traductions
│           ├── en.js         # Traductions anglais (défaut)
│           ├── fr.js         # Traductions français
│           ├── he.js         # Traductions hébreu
│           └── widgets/
│               ├── en.js     # Traductions widgets EN
│               ├── fr.js     # Traductions widgets FR
│               └── he.js     # Traductions widgets HE
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── favicon.svg           # Favicon SVG
│   ├── icon-192.png          # App icon (à créer)
│   ├── icon-512.png          # App icon (à créer)
│   ├── dashboard-light-en.png # Dashboard preview light EN/FR
│   ├── dashboard-light-he.png # Dashboard preview light HE
│   ├── dashboard-dark-en.png  # Dashboard preview dark EN/FR
│   └── dashboard-dark-he.png  # Dashboard preview dark HE
├── server.js                 # Serveur Express + API REST + JWT + SEO
├── vite.config.js            # Configuration Vite (multi-page)
├── package.json              # Dépendances (type: module)
├── dist/                     # Build de production (gitignore)
└── .claude/
    ├── MANIFESTE.md          # Ce fichier
    ├── CLAUDE.md             # Instructions pour Claude
    └── .mcp.json             # Config MCP Supabase
```

---

## INFRASTRUCTURE SUPABASE (Self-hosted Railway)

```
Cardynal Data layer
├── Kong (API Gateway)         → kong-r2vq-cardynal.up.railway.app
├── PostgREST                  → API REST automatique
├── Postgres                   → Base de données principale
├── Postgres Meta              → Métadonnées
├── Supabase Realtime          → WebSockets
├── Supabase Studio            → Interface admin Supabase
├── Supabase Storage + S3      → Stockage fichiers
├── Imgproxy                   → Traitement images
└── Gotrue Auth                → Authentification
```

---

## TECHNOLOGIES

- **Build:** Vite 7.x + vite-express
- **Backend:** Node.js + Express 4.18.2 (ESM)
- **Auth:** JWT (jsonwebtoken) - tokens 24h
- **Base de données:** Supabase self-hosted (PostgreSQL)
- **Frontend:** HTML5 + CSS3 + ES Modules
- **Éditeur:** Tiptap 3.x (WYSIWYG Notion-like)
- **Markdown:** Marked 17.x + Turndown 7.x
- **Thème:** Light/Dark avec toggle + design system
- **i18n:** FR/EN/HE avec support RTL

---

## DESIGN SYSTEM

Architecture CSS modulaire inspirée Notion/Linear:

- **tokens.css** - Variables: couleurs, typographie (ratio 1.25), spacing (base 4px), shadows
- **base.css** - Reset, focus states, scrollbar, typography de base, RTL rules
- **animations.css** - fadeIn, slideUp, scaleIn, pulse, spin
- **layout.css** - Header sticky, footer, modal backdrop, language selector
- **components/** - BEM naming: `.btn--primary`, `.card-list-item__title`

Dark mode: `[data-theme="dark"]` sur `<html>`
RTL mode: `[dir="rtl"]` sur `<html>` (automatique pour Hebrew)

---

## COMMANDES

```bash
npm run dev     # Développement avec HMR
npm run build   # Build production
npm run start   # Production (après build)
```

---

## API REST

### Public
- `GET /api/articles` - Liste des articles (?lang=fr|en|he)
- `GET /api/articles/:slug` - Article par slug
- `GET /api/articles/:slug/translations` - Traductions d'un article
- `GET /api/languages` - Config langues supportées
- `GET /api/images/:id` - Servir image depuis DB
- `GET /rss.xml` - Feed RSS
- `GET /sitemap.xml` - Sitemap avec hreflang
- `GET /robots.txt` - Robots.txt

### Protégé (Authorization: Bearer {JWT_TOKEN})
- `POST /api/login` - Auth → retourne JWT token
- `GET /api/verify` - Vérifie validité du token
- `POST /api/articles` - Créer article
- `PUT /api/articles/:id` - Modifier article
- `DELETE /api/articles/:id` - Supprimer article
- `POST /api/upload` - Upload image (base64 → DB)

### Routes multilingues
- `/` - English (défaut)
- `/fr/` - Français
- `/he/` - Hebrew (RTL)
- `/[lang]/blog.html` - Liste articles
- `/[lang]/archive.html` - Archives
- `/[lang]/about.html` - À propos
- `/[lang]/article/:slug` - Article dans une langue

---

## VARIABLES D'ENVIRONNEMENT

```
SUPABASE_URL=https://kong-r2vq-cardynal.up.railway.app
SUPABASE_ANON_KEY=eyJ...
ADMIN_PASSWORD=
JWT_SECRET=          # Clé secrète pour signer les JWT
SITE_URL=
PORT=3000
```

---

## BASE DE DONNÉES

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

### Table `images`
```sql
id               UUID PRIMARY KEY DEFAULT uuid_generate_v4()
data             TEXT NOT NULL (base64)
content_type     TEXT DEFAULT 'image/jpeg'
created_at       TIMESTAMPTZ DEFAULT NOW()
```

---

## FONCTIONNALITES

### SEO
- Meta tags Open Graph et Twitter Cards (dynamiques)
- JSON-LD Schema (Article, WebSite)
- Sitemap.xml avec hreflang pour les traductions
- Robots.txt
- Canonical URLs
- PWA Manifest avec shortcuts

### Multilingue
- 3 langues: English (défaut), Français, Hebrew
- Support RTL automatique pour Hebrew
- Hreflang tags pour les traductions
- Liaison d'articles entre langues
- Language selector dans le header (select natif)
- Détection langue par URL uniquement (pas de localStorage)
- Traductions modulaires dans `js/i18n/*.js`

### Éditeur (admin.html)
- Toolbar en haut: Publier, Annuler, X
- Banner image avec upload/URL
- Emoji picker pour icône du document
- Slash commands (/) pour blocs
- Bubble menu sur sélection
- Floating menu (+) sur ligne vide
- Sélecteur de langue
- Liaison de traductions
- Champs SEO (meta title, meta description)

### Pages publiques
- Header/footer partagés (composants JS injectés)
- Navigation unifiée: Home, Product, Pricing, Blog
- Toggle grille/liste sur archive
- Cover images avec emoji overlay
- Dark mode persistant (localStorage)
- Language selector (URL-based)

### Sécurité
- JWT tokens (expire 24h)
- Vérification token au chargement
- Logout automatique si token invalide

---

## HISTORIQUE DES SESSIONS

### Session 2026-01-28 (Navigation & i18n Unification)
- **Contexte:** Unification header/footer et correction bugs navigation multilingue
- **Actions:**
  - Header/footer partagés via composants JS (`header.js`, `footer.js`)
  - CSS landing modulaire (split en fichiers séparés dans `css/landing/`)
  - Traductions unifiées: `i18n.js` importe maintenant les fichiers modulaires
  - Fix regex `updateNavLinks()` pour inclure `/fr/`
  - Fix regex `getCurrentLang()` pour matcher URLs `.html`
  - Ajout route serveur `/:lang/blog.html`
  - Suppression fallback localStorage pour détection langue
  - Langue déterminée uniquement par URL (plus de persistence localStorage)
  - DEFAULT_LANG changé de 'fr' à 'en'
- **Bugs corrigés:**
  - Navigation ne préservait pas la langue sur changement de page
  - Changement langue ramenait toujours à la home
  - Traductions manquantes sur blog/archive/article
  - Home page affichait français même avec URL anglaise
- **État:** Production ready

### Session 2026-01-28 (Landing Page Polish + Chatwoot)
- **Contexte:** Finalisation landing page avec copie pro et widget chat
- **Actions:**
  - Copie francaise professionnelle complete (hero, features, FAQ, pricing)
  - Dashboard preview dynamique (4 images: dark/light x en/he)
  - Preview switch automatique selon theme et langue
  - FAQ: couleur reponses corrigee en dark mode
  - FAQ: police questions augmentee a 16px
  - Widget Chatwoot integre avec avatar custom
  - Chatwoot sync theme (dark/light) avec la page
  - Chatwoot sync langue (en/fr/he) avec la page
  - Config Vite publicDir pour servir /public
  - Pricing FR: 99EUR/mois, +25EUR/user, +0.90EUR/resolution
- **Etat:** Production ready

### Session 2026-01-27 (Landing Page Widgets i18n)
- **Contexte:** Traduction des widgets de la landing page
- **Actions:**
  - Ajout WIDGET_TRANSLATIONS pour FR/HE
  - Fonction wt() pour traductions widgets
  - Chat Flow Demo: conversations traduites, systeme en anglais
  - Playbook Widget: descriptions traduites
  - Tree Widget: messages client traduits
  - RAG Widget: question/reponse traduits
  - ROI Calculator: prix par devise (USD/EUR/ILS)
  - Language selector natif (<select>)
  - Routes /fr et /he avec sitemap hreflang
- **Etat:** Production ready

### Session 2026-01-27 (SEO + Multilingue)
- **Contexte:** Optimisation SEO complète + support multilingue
- **Actions:**
  - Meta tags OG/Twitter dynamiques
  - JSON-LD Schema
  - Sitemap.xml avec hreflang
  - Robots.txt
  - Module i18n.js
  - Support 3 langues (FR/EN/HE)
  - RTL pour Hebrew
  - Translation linking entre articles
  - Champs meta_title, meta_description
  - Admin multilingue complet
  - Migration vers Supabase self-hosted Railway
- **État:** Production ready

### Session 2026-01-27 (Upload Images)
- **Contexte:** Upload d'images depuis l'ordinateur
- **Actions:**
  - Table `images` pour stockage base64
  - Endpoint `/api/upload` et `/api/images/:id`
  - Cache 1 an sur les images
- **État:** Fonctionnel

### Session 2026-01-27 (UI/UX Refonte complète)
- **Contexte:** Refonte totale de l'interface
- **Actions:**
  - Nouveau design system CSS modulaire
  - Sécurisation auth avec JWT
  - Toggle grille/liste sur archive
  - Cover images dans les listes
- **État:** Production ready

---

## LANDING PAGE CARDYNAL (index.html)

La landing page est une page marketing standalone avec des widgets interactifs animes.

### Widgets Interactifs
- **Chat Flow Demo** - Simulation de conversations support (hero)
- **Playbook Widget** - Animation du flux de traitement des intents
- **Tree Widget** - Arbre de decision escalation AI → Human
- **RAG Widget** - Demo retrieval-augmented generation
- **Omni Widget** - Visualisation multi-canal (WhatsApp, Instagram, etc.)

### Traductions des Widgets (WIDGET_TRANSLATIONS)
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

### Routes Multilingues Landing
- `/` - English (défaut)
- `/fr/` - Français
- `/he/` - Hebrew (RTL)

### Dashboard Preview
- 4 images: dark/light x en/he
- Switch automatique selon theme et langue de la page
- Images dans `/public/dashboard-*.png`

### Chatwoot Widget
- URL: chat.cardynal.io
- Avatar custom apparait apres 120px de scroll
- Theme sync avec la page (dark/light)
- Langue sync avec la page (en/fr/he)
- Messages de bienvenue configurables dans Chatwoot dashboard

---

## BUGS CONNUS

_Aucun bug identifie_

---

## NOTES IMPORTANTES

1. L'authentification utilise JWT (24h expiry) stocké dans localStorage
2. Le frontend utilise Vite et ES Modules
3. L'éditeur Tiptap est WYSIWYG mais stocke en Markdown
4. Le RSS génère les 20 derniers articles
5. `JWT_SECRET` doit être défini en production
6. Les images sont stockées en base64 dans PostgreSQL
7. Supabase est self-hosted sur Railway (pas Supabase Cloud)
8. RLS désactivé (auth gérée côté serveur)

---

## PROCHAINES AMÉLIORATIONS POSSIBLES

1. ~~Upload d'images vers Supabase Storage~~ (fait en DB)
2. Migrer images vers Supabase Storage (S3)
3. Google Analytics / Search Console
4. Recherche d'articles
5. Catégories/tags filtrable
6. Commentaires
7. Utiliser Imgproxy pour redimensionnement
8. Utiliser Gotrue Auth au lieu du JWT custom
