# MANIFESTE DU PROJET - Experience Blog

> Ce fichier est maintenu par Claude pour suivre l'état du projet et les modifications en cours.
> **Dernière mise à jour:** 2026-01-27

---

## APERCU RAPIDE

| Aspect | Valeur |
|--------|--------|
| **Type** | Blog personnel avec admin |
| **Stack** | Vite + Express.js + Supabase + Tiptap |
| **Déploiement** | Railway |
| **Branche principale** | main |
| **État** | Production ready |

---

## STRUCTURE DU PROJET

```
experience/
├── src/                      # Sources Vite
│   ├── index.html            # Page d'accueil
│   ├── article.html          # Vue article unique
│   ├── admin.html            # Interface admin + éditeur Tiptap
│   ├── archive.html          # Tous les articles (grid/list toggle)
│   ├── about.html            # Page à propos
│   ├── css/
│   │   ├── main.css          # Point d'entrée CSS (imports)
│   │   ├── tokens.css        # Design tokens (couleurs, typo, spacing)
│   │   ├── base.css          # Reset et styles de base
│   │   ├── animations.css    # Keyframes et utilitaires
│   │   ├── layout.css        # Header, footer, sidebar, modal
│   │   ├── pages.css         # Styles spécifiques aux pages
│   │   ├── editor.css        # Styles éditeur Tiptap
│   │   └── components/
│   │       ├── button.css    # Boutons (variants, sizes)
│   │       ├── input.css     # Inputs, textarea, select
│   │       ├── card.css      # Cards et list items
│   │       └── popover.css   # Popover, tooltip, toast
│   └── js/
│       ├── theme.js          # Gestion du thème (light/dark)
│       ├── auth.js           # Module auth partagé (JWT)
│       ├── editor.js         # Module Tiptap + slash commands
│       └── admin.js          # Logique admin
├── server.js                 # Serveur Express + API REST + JWT
├── vite.config.js            # Configuration Vite (multi-page)
├── package.json              # Dépendances (type: module)
├── dist/                     # Build de production (gitignore)
└── .claude/
    ├── MANIFESTE.md          # Ce fichier
    └── CLAUDE.md             # Instructions pour Claude
```

---

## TECHNOLOGIES

- **Build:** Vite 7.x + vite-express
- **Backend:** Node.js + Express 4.18.2 (ESM)
- **Auth:** JWT (jsonwebtoken) - tokens 24h
- **Base de données:** Supabase (PostgreSQL)
- **Frontend:** HTML5 + CSS3 + ES Modules
- **Éditeur:** Tiptap 3.x (WYSIWYG Notion-like)
- **Markdown:** Marked 17.x + Turndown 7.x
- **Thème:** Light/Dark avec toggle + design system

---

## DESIGN SYSTEM

Architecture CSS modulaire inspirée Notion/Linear:

- **tokens.css** - Variables: couleurs, typographie (ratio 1.25), spacing (base 4px), shadows
- **base.css** - Reset, focus states, scrollbar, typography de base
- **animations.css** - fadeIn, slideUp, scaleIn, pulse, spin
- **layout.css** - Header sticky, footer, modal backdrop
- **components/** - BEM naming: `.btn--primary`, `.card-list-item__title`

Dark mode: `[data-theme="dark"]` sur `<html>`

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
- `GET /api/articles` - Liste des articles
- `GET /api/articles/:slug` - Article par slug
- `GET /rss.xml` - Feed RSS

### Protégé (Authorization: Bearer {JWT_TOKEN})
- `POST /api/login` - Auth → retourne JWT token
- `GET /api/verify` - Vérifie validité du token
- `POST /api/articles` - Créer article
- `PUT /api/articles/:id` - Modifier article
- `DELETE /api/articles/:id` - Supprimer article

---

## VARIABLES D'ENVIRONNEMENT

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
ADMIN_PASSWORD=
JWT_SECRET=          # Clé secrète pour signer les JWT
SITE_URL=
PORT=3000
```

---

## FONCTIONNALITES

### Éditeur (admin.html)
- Toolbar en haut (60px): Publier, Annuler, X
- Banner image avec placeholder "Ajouter une image de couverture"
- Emoji picker pour icône du document
- Slash commands (/) pour blocs: Texte, H1-H3, Listes, Image, Citation, Code
- Bubble menu sur sélection: Bold, Italic, Strike, Code, Link
- Floating menu (+) sur ligne vide
- Drag & drop / paste d'images

### Pages publiques
- Header avec bouton Admin (si connecté)
- Toggle grille/liste sur archive
- Cover images affichées dans les listes (60x60)
- Dark mode persistant

### Sécurité
- JWT tokens (expire 24h)
- Vérification token au chargement des pages
- Logout automatique si token invalide

---

## BASE DE DONNÉES

Table `articles`:
- `id` (int, auto)
- `title` (text)
- `content` (text, Markdown)
- `slug` (text, unique)
- `tags` (text, comma-separated)
- `emoji` (text, nullable)
- `cover_image` (text, URL, nullable)
- `created_at`, `updated_at` (timestamp)

---

## HISTORIQUE DES SESSIONS

### Session 2026-01-27 (UI/UX Refonte complète)
- **Contexte:** Refonte totale de l'interface
- **Actions:**
  - Nouveau design system CSS modulaire (tokens, components, BEM)
  - Sécurisation auth avec JWT (jsonwebtoken)
  - Bouton Admin dans header quand connecté
  - Toggle grille/liste sur archive
  - Éditeur: toolbar en haut, banner image avec placeholder
  - Cover images dans les listes (home, archive)
  - Slash menu compact (liste, icônes SVG)
  - Fix outlines bleus, underlines sur hover
- **État:** Production ready

### Session 2026-01-27 (Design Notion)
- **Contexte:** Amélioration éditeur style Notion
- **Actions:**
  - Slash commands avec catégories
  - Bubble menu, Floating menu
  - Support images (drag & drop, paste)
  - CSS refait style Notion
- **État:** Éditeur Notion-like complet

### Session 2026-01-27 (Migration Vite)
- **Contexte:** Migration vers Vite + Tiptap
- **Actions:**
  - Setup Vite + vite-express
  - Migration ES Modules
  - Intégration Tiptap WYSIWYG
- **État:** Migration complète

---

## BUGS CONNUS

_Aucun bug identifié_

---

## NOTES IMPORTANTES

1. L'authentification utilise JWT (24h expiry) stocké dans localStorage
2. Le frontend utilise Vite et ES Modules
3. L'éditeur Tiptap est WYSIWYG mais stocke en Markdown
4. Le RSS génère les 20 derniers articles
5. `JWT_SECRET` doit être défini en production (Railway)
6. Les fichiers .claude/ sont dans .gitignore

---

## PROCHAINES AMÉLIORATIONS POSSIBLES

1. Upload d'images vers Supabase Storage
2. Recherche d'articles
3. Catégories/tags filtrable
4. Commentaires
5. Analytics simples
