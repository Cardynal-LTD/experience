// Internationalization module

const SUPPORTED_LANGS = ['fr', 'en', 'he']
const DEFAULT_LANG = 'fr'
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

// Detect current language from URL
export function getCurrentLang() {
  const path = window.location.pathname
  const match = path.match(/^\/(en|he)(\/|$)/)
  return match ? match[1] : DEFAULT_LANG
}

// Get language prefix for URLs
export function getLangPrefix(lang) {
  return lang === DEFAULT_LANG ? '' : `/${lang}`
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
    if (href.match(/^\/(en|he)\//) || href.startsWith('/api') || href.startsWith('/admin')) return
    link.setAttribute('href', prefix + href)
  })
}

// Initialize language selector in header
export function initLangSelector() {
  const currentLang = getCurrentLang()
  setDocumentDirection(currentLang)
  updateNavLinks()

  // Find or create lang selector container
  const headerActions = document.querySelector('.header__actions')
  if (!headerActions) return

  // Create language selector
  const selector = document.createElement('div')
  selector.className = 'lang-selector'
  selector.innerHTML = `
    <button class="lang-selector__btn" aria-label="Changer de langue">
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

export { SUPPORTED_LANGS, DEFAULT_LANG, RTL_LANGS, LANG_NAMES, LANG_FULL_NAMES }
