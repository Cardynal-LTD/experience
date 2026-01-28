// Internationalization module

const SUPPORTED_LANGS = ['en', 'fr', 'he']
const DEFAULT_LANG = 'en'
const RTL_LANGS = ['he']

const LANG_NAMES = {
  fr: 'FR',
  en: 'EN',
  he: 'עב'
}

const LANG_FULL_NAMES = {
  fr: 'Francais',
  en: 'English',
  he: 'עברית'
}

// Translations dictionary
const TRANSLATIONS = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.archive': 'Archive',
    'nav.about': 'A propos',
    'nav.rss': 'RSS',

    // Home page
    'home.title': 'Experience',
    'home.recentArticles': 'Articles recents',
    'home.viewAll': 'Voir tous les articles',

    // Archive page
    'archive.title': 'Archive',
    'archive.description': 'Tous les articles',

    // About page
    'about.title': 'A propos',
    'about.subtitle': 'En savoir plus sur ce blog et son auteur',

    // Article page
    'article.backToArchive': 'Retour aux archives',
    'article.notFound': 'Article non trouve',
    'article.notFoundDesc': 'Cet article n\'existe pas ou a ete supprime.',

    // Empty states
    'empty.noArticles': 'Aucun article',
    'empty.noArticlesDesc': 'Aucun article pour le moment.',
    'empty.error': 'Erreur',
    'empty.errorDesc': 'Erreur de chargement.',

    // Misc
    'lang.change': 'Changer de langue'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.archive': 'Archive',
    'nav.about': 'About',
    'nav.rss': 'RSS',

    // Home page
    'home.title': 'Experience',
    'home.recentArticles': 'Recent articles',
    'home.viewAll': 'View all articles',

    // Archive page
    'archive.title': 'Archive',
    'archive.description': 'All articles',

    // About page
    'about.title': 'About',
    'about.subtitle': 'Learn more about this blog and its author',

    // Article page
    'article.backToArchive': 'Back to archive',
    'article.notFound': 'Article not found',
    'article.notFoundDesc': 'This article does not exist or has been deleted.',

    // Empty states
    'empty.noArticles': 'No articles',
    'empty.noArticlesDesc': 'No articles yet.',
    'empty.error': 'Error',
    'empty.errorDesc': 'Loading error.',

    // Misc
    'lang.change': 'Change language'
  },
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.archive': 'ארכיון',
    'nav.about': 'אודות',
    'nav.rss': 'RSS',

    // Home page
    'home.title': 'Experience',
    'home.recentArticles': 'מאמרים אחרונים',
    'home.viewAll': 'לכל המאמרים',

    // Archive page
    'archive.title': 'ארכיון',
    'archive.description': 'כל המאמרים',

    // About page
    'about.title': 'אודות',
    'about.subtitle': 'למידע נוסף על הבלוג והכותב',

    // Article page
    'article.backToArchive': 'חזרה לארכיון',
    'article.notFound': 'המאמר לא נמצא',
    'article.notFoundDesc': 'המאמר הזה לא קיים או נמחק.',

    // Empty states
    'empty.noArticles': 'אין מאמרים',
    'empty.noArticlesDesc': 'אין מאמרים כרגע.',
    'empty.error': 'שגיאה',
    'empty.errorDesc': 'שגיאת טעינה.',

    // Misc
    'lang.change': 'החלף שפה'
  }
}

// Get translation for a key
export function t(key) {
  const lang = getCurrentLang()
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS[DEFAULT_LANG]?.[key] || key
}

// Translate all elements with data-i18n attribute
export function translatePage() {
  const lang = getCurrentLang()

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const translation = t(key)
    if (translation) {
      el.textContent = translation
    }
  })

  // Update document title if needed
  const titleEl = document.querySelector('title[data-i18n]')
  if (titleEl) {
    titleEl.textContent = t(titleEl.getAttribute('data-i18n'))
  }
}

// Detect current language from URL
export function getCurrentLang() {
  const path = window.location.pathname
  const match = path.match(/^\/(en|fr|he)(\/|$)/)
  return match ? match[1] : DEFAULT_LANG
}

// Get language prefix for URLs
export function getLangPrefix(lang) {
  return lang === DEFAULT_LANG ? '' : `/${lang}`
}

// Set language and redirect
export function setLang(lang) {
  const url = buildLangUrl(lang)
  window.location.href = url
}

// Build URL for a different language
export function buildLangUrl(targetLang, currentPath) {
  const currentLang = getCurrentLang()
  let path = currentPath || window.location.pathname

  // Remove current lang prefix if exists
  if (currentLang !== DEFAULT_LANG) {
    path = path.replace(new RegExp(`^/${currentLang}`), '')
  }

  // Add target lang prefix if not default
  if (targetLang !== DEFAULT_LANG) {
    path = `/${targetLang}${path}`
  }

  return path || '/'
}

// Set document direction based on language
export function setDocumentDirection(lang) {
  const dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lang)
}

// Update all navigation links to preserve current language
export function updateNavLinks() {
  const currentLang = getCurrentLang()
  if (currentLang === DEFAULT_LANG) return // No prefix needed for default lang

  const prefix = `/${currentLang}`

  // Update all internal links
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const href = link.getAttribute('href')
    // Skip if already has lang prefix or is an API/admin link
    if (href.match(/^\/(en|fr|he)(\/|$)/) || href.startsWith('/api') || href.startsWith('/admin')) return
    link.setAttribute('href', prefix + href)
  })
}

// Initialize language selector in header
export function initLangSelector() {
  const currentLang = getCurrentLang()
  setDocumentDirection(currentLang)
  translatePage()
  updateNavLinks()

  // Find or create lang selector container
  const headerActions = document.querySelector('.header__actions')
  if (!headerActions) return

  // Create language selector
  const selector = document.createElement('div')
  selector.className = 'lang-selector'
  selector.innerHTML = `
    <button class="lang-selector__btn" aria-label="${t('lang.change')}">
      <span>${LANG_NAMES[currentLang]}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="lang-selector__dropdown">
      ${SUPPORTED_LANGS.map(lang => `
        <a href="${buildLangUrl(lang)}"
           class="lang-selector__option ${lang === currentLang ? 'is-active' : ''}"
           ${RTL_LANGS.includes(lang) ? 'dir="rtl"' : ''}>
          ${LANG_FULL_NAMES[lang]}
        </a>
      `).join('')}
    </div>
  `

  // Insert before theme toggle
  const themeBtn = headerActions.querySelector('.btn--icon')
  if (themeBtn) {
    headerActions.insertBefore(selector, themeBtn)
  } else {
    headerActions.appendChild(selector)
  }

  // Toggle dropdown on click
  const btn = selector.querySelector('.lang-selector__btn')
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    selector.classList.toggle('is-open')
  })

  // Close on outside click
  document.addEventListener('click', () => {
    selector.classList.remove('is-open')
  })
}

// Add hreflang meta tags for SEO
export function addHreflangTags(translations) {
  // Remove existing hreflang tags
  document.querySelectorAll('link[hreflang]').forEach(el => el.remove())

  const head = document.head
  const baseUrl = window.location.origin

  // If we have translations, use them
  if (translations && translations.length > 0) {
    translations.forEach(t => {
      const prefix = t.lang === DEFAULT_LANG ? '' : `/${t.lang}`
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = t.lang
      link.href = `${baseUrl}${prefix}/article/${t.slug}`
      head.appendChild(link)
    })

    // Add x-default (pointing to default language version)
    const defaultTranslation = translations.find(t => t.lang === DEFAULT_LANG)
    if (defaultTranslation) {
      const xDefault = document.createElement('link')
      xDefault.rel = 'alternate'
      xDefault.hreflang = 'x-default'
      xDefault.href = `${baseUrl}/article/${defaultTranslation.slug}`
      head.appendChild(xDefault)
    }
  } else {
    // For static pages, add hreflang for each supported language
    const currentPath = window.location.pathname
    SUPPORTED_LANGS.forEach(lang => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = lang
      link.href = `${baseUrl}${buildLangUrl(lang, currentPath)}`
      head.appendChild(link)
    })
  }
}

export { SUPPORTED_LANGS, DEFAULT_LANG, RTL_LANGS, LANG_NAMES, LANG_FULL_NAMES, TRANSLATIONS }
