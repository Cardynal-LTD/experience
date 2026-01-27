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
| **État** | En développement (migration Vite) |

---

## STRUCTURE DU PROJET

```
experience/
├── src/                      # Sources Vite
│   ├── index.html            # Page d'accueil
│   ├── article.html          # Vue article unique
│   ├── admin.html            # Interface admin + éditeur Tiptap
│   ├── archive.html          # Tous les articles par année
│   ├── about.html            # Page à propos
│   ├── css/
│   │   ├── style.css         # Styles principaux (light/dark)
│   │   └── editor.css        # Styles éditeur Tiptap
│   └── js/
│       ├── theme.js          # Gestion du thème (partagé)
│       ├── editor.js         # Module Tiptap
│       └── admin.js          # Logique admin
├── server.js                 # Serveur Express + API REST + ViteExpress
├── vite.config.js            # Configuration Vite (multi-page)
├── package.json              # Dépendances (type: module)
├── .env.example              # Template variables d'environnement
├── dist/                     # Build de production (gitignore)
└── .claude/
    ├── MANIFESTE.md          # Ce fichier
    └── CLAUDE.md             # Instructions pour Claude
```

---

## TECHNOLOGIES

- **Build:** Vite 7.x + vite-express
- **Backend:** Node.js + Express 4.18.2 (ESM)
- **Base de données:** Supabase (PostgreSQL)
- **Frontend:** HTML5 + CSS3 + ES Modules
- **Éditeur:** Tiptap 3.x (WYSIWYG)
- **Markdown:** Marked 17.x + Turndown 7.x
- **Thème:** Light/Dark avec toggle

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

### Protégé (Authorization: Bearer {password})
- `POST /api/login` - Authentification
- `POST /api/articles` - Créer article
- `PUT /api/articles/:id` - Modifier article
- `DELETE /api/articles/:id` - Supprimer article

---

## VARIABLES D'ENVIRONNEMENT

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
ADMIN_PASSWORD=
SITE_URL=
PORT=3000
```

---

## HISTORIQUE DES SESSIONS

### Session 2026-01-27 (Design Notion)
- **Contexte:** Amelioration editeur style Notion
- **Actions:**
  - Slash commands avec categories (Basique, Listes, Media, Blocs)
  - Bubble menu avec icones SVG (selection de texte)
  - Floating menu avec bouton + (ligne vide)
  - Support images (drag & drop, paste, URL)
  - Emoji dans les commandes slash
  - CSS completement refait style Notion
  - Extensions ajoutees: Image, Dropcursor, Gapcursor
- **Etat:** Editeur Notion-like complet

### Session 2026-01-27 (Suite)
- **Contexte:** Migration vers Vite + Tiptap
- **Actions:**
  - Setup Vite + vite-express
  - Migration ES Modules (package.json type: module)
  - Nouvelle structure src/ pour les sources
  - Integration Tiptap comme editeur WYSIWYG
  - Conversion Markdown <-> HTML (marked + turndown)
  - Refactoring admin.html avec toolbar dynamique
- **Etat:** Migration complete

### Session 2026-01-27
- **Contexte:** Première exploration du projet
- **Actions:**
  - Exploration complète du projet
  - Création du manifeste
  - Configuration MCP Supabase (`.mcp.json`)
  - Ajout `.mcp.json` au `.gitignore`
  - Outils MCP Supabase opérationnels
- **État:** Projet stable, MCP fonctionnel

---

## TACHES EN COURS

_Aucune tâche en cours_

---

## PROCHAINES MODIFICATIONS PREVUES

1. Tester l'éditeur Tiptap en conditions réelles
2. Vérifier le build de production
3. Mettre à jour le déploiement Railway

---

## BUGS CONNUS

_Aucun bug identifié_

---

## NOTES IMPORTANTES

1. L'authentification admin utilise un simple mot de passe en Bearer token
2. Le frontend utilise maintenant Vite et ES Modules
3. L'éditeur Tiptap est WYSIWYG mais stocke en Markdown dans Supabase
4. Le RSS génère les 20 derniers articles
5. Les fichiers .claude/ sont privés (gitignore)

---

## COMMENT UTILISER CE MANIFESTE

Au début de chaque session, Claude devrait:
1. Lire ce fichier pour comprendre l'état actuel
2. Mettre à jour la section "HISTORIQUE DES SESSIONS"
3. Mettre à jour "TACHES EN COURS" pendant le travail
4. Noter les bugs découverts dans "BUGS CONNUS"
5. Mettre à jour "PROCHAINES MODIFICATIONS" si pertinent

Cela permet de reprendre le contexte rapidement entre les sessions.
