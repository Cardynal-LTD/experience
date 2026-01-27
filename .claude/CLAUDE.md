# Instructions pour Claude

## Projet
Blog personnel minimaliste avec interface admin. Stack: Express.js + Supabase + Vanilla JS.

## Style de code
- **Frontend**: Vanilla JS uniquement, pas de framework. Fonctions courtes, noms clairs.
- **CSS**: Variables CSS pour le theming (light/dark). Mobile-first.
- **Backend**: Express simple, pas de sur-engineering.

## Base de donnees
Table `articles`:
- `id` (int, auto)
- `title` (text)
- `content` (text, Markdown)
- `slug` (text, unique)
- `tags` (text, comma-separated)
- `created_at`, `updated_at` (timestamp)

## Conventions
- Langue du code: anglais
- Langue des commentaires/UI: francais
- Pas d'emojis dans le code sauf demande explicite
- Garder le style existant (indentation, quotes, etc.)

## Acces Supabase
Utiliser les outils MCP `postgrestRequest` et `sqlToRest` pour interagir avec la DB.

## Ce qu'il faut eviter
- Ajouter des dependances npm sans necessite
- Sur-abstraire le code existant
- Modifier le design system etabli
- Ajouter des fonctionnalites non demandees
