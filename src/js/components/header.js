// Shared Header Component for all pages
import { getCurrentLang, LANG_NAMES, setLang } from '../i18n.js'

export function renderHeader(options = {}) {
  const { activePage = 'home', showLandingNav = false } = options

  const currentLang = getCurrentLang()

  // Navigation items based on page type
  const landingNav = `
    <a href="/" data-i18n="nav.home">Home</a>
    <a href="#features" data-i18n="nav.features">Features</a>
    <a href="#pricing" data-i18n="nav.pricing">Pricing</a>
    <a href="#faq" data-i18n="nav.faq">FAQ</a>
  `

  const siteNav = `
    <a href="/" data-i18n="nav.home" ${activePage === 'home' ? 'class="is-active"' : ''}>Home</a>
    <a href="/blog.html" data-i18n="nav.blog" ${activePage === 'blog' ? 'class="is-active"' : ''}>Blog</a>
    <a href="/archive.html" data-i18n="nav.archive" ${activePage === 'archive' ? 'class="is-active"' : ''}>Archive</a>
    <a href="/about.html" data-i18n="nav.about" ${activePage === 'about' ? 'class="is-active"' : ''}>About</a>
  `

  // Language options
  const langOptions = Object.entries(LANG_NAMES)
    .map(([code, name]) => `<option value="${code}" ${code === currentLang ? 'selected' : ''}>${name}</option>`)
    .join('')

  return `
  <header class="landing-header">
    <div class="landing-header__content">
      <a href="/" class="landing-header__logo">
        <img src="/logo-cardynal.png" alt="Cardynal" class="landing-header__logo-img">
        <span>Cardynal</span>
      </a>
      <nav class="landing-header__nav" id="mainNav">
        ${showLandingNav ? landingNav : siteNav}
      </nav>
      <div class="landing-header__actions">
        <select class="lang-select" id="langSelect" onchange="window.setLang ? window.setLang(this.value) : null">
          ${langOptions}
        </select>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <a href="https://cal.com/cardynal.io/30min" class="btn btn--primary" data-i18n="nav.contact">Contact Us</a>
      </div>
      <button class="landing-header__menu-btn" id="menuBtn" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>
  </header>
  `
}

export function initHeader() {
  // Header scroll effect
  const header = document.querySelector('.landing-header')
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 50)
    })
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn')
  const mainNav = document.getElementById('mainNav')
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('is-open')
    })
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const body = document.body
      body.classList.toggle('light-mode')
      const isLight = body.classList.contains('light-mode')
      localStorage.setItem('theme', isLight ? 'light' : 'dark')
    })
  }
}
