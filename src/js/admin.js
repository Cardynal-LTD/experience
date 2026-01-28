import './theme.js'
import {
  createEditor,
  markdownToHtml,
  htmlToMarkdown
} from './editor.js'

// State
let authToken = localStorage.getItem('authToken')
let articles = []
let editor = null
let currentEmoji = '📄'
let currentCover = ''
let currentLang = 'fr'
let currentTranslationGroup = null

// Common emojis for document icons
const docEmojis = [
  '📄', '📝', '📋', '📌', '📎', '📁', '📂', '🗂️',
  '✏️', '🖊️', '🖋️', '✒️', '📖', '📚', '📕', '📗',
  '💡', '⭐', '🎯', '🚀', '💻', '🔧', '⚙️', '🎨',
  '🎬', '🎵', '🎮', '📷', '🔍', '🔗', '💬', '💭',
  '❤️', '🔥', '⚡', '✨', '🌟', '🌈', '☀️', '🌙',
  '🏠', '🏢', '🌍', '🗺️', '📍', '🎁', '🏆', '🎖️',
  '✅', '❌', '⚠️', '❓', '❗', '💯', '🔴', '🟢'
]

// DOM helpers
const $ = s => document.querySelector(s)

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init)

function init() {
  // Login form
  $('#loginForm').addEventListener('submit', handleLogin)

  // Admin section
  $('#newArticleBtn').addEventListener('click', () => openModal())
  $('#logoutBtn').addEventListener('click', logout)

  // Modal
  $('#articleForm').addEventListener('submit', handleArticleSubmit)
  $('#closeModalBtn').addEventListener('click', closeModal)
  $('#cancelBtn').addEventListener('click', closeModal)
  $('#articleModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal()
  })

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal()
  })

  // Auto slug generation
  $('#title').addEventListener('input', e => {
    if (!$('#articleId').value) {
      $('#slug').value = e.target.value.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
  })

  // Update translation dropdown when language changes
  $('#lang').addEventListener('change', () => {
    const currentArticleId = $('#articleId').value
    const currentArticle = currentArticleId ? articles.find(a => a.id === parseInt(currentArticleId)) : null
    populateTranslationDropdown(currentArticle)
  })

  // Document icon click - open emoji picker
  $('#docIcon').addEventListener('click', (e) => {
    e.stopPropagation()
    const modal = $('#emojiModal')
    const rect = e.currentTarget.getBoundingClientRect()
    modal.style.left = `${rect.left}px`
    modal.style.top = `${rect.bottom + 8}px`
    renderEmojiPicker()
    modal.classList.add('is-visible')
  })

  // Banner/Cover actions
  $('#bannerPlaceholder').addEventListener('click', openCoverModal)
  $('#docBanner').addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.closest('.doc__banner-placeholder')) {
      openCoverModal()
    }
  })
  $('#changeCoverBtn').addEventListener('click', openCoverModal)
  $('#removeCoverBtn').addEventListener('click', () => {
    currentCover = ''
    updateCoverDisplay()
  })

  // Cover modal tabs
  document.querySelectorAll('.cover-modal__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab
      // Update active tab
      document.querySelectorAll('.cover-modal__tab').forEach(t => t.classList.remove('is-active'))
      tab.classList.add('is-active')
      // Update active panel
      document.querySelectorAll('.cover-modal__panel').forEach(p => p.classList.remove('is-active'))
      document.querySelector(`.cover-modal__panel[data-panel="${tabName}"]`).classList.add('is-active')
    })
  })

  // Cover file upload
  $('#coverFile').addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image trop lourde (max 5 Mo)')
      return
    }

    // Show loading state
    const uploadLabel = $('.cover-modal__upload span')
    const originalText = uploadLabel.textContent
    uploadLabel.textContent = 'Upload en cours...'

    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64 = event.target.result

      try {
        // Upload to Supabase Storage
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({
            image: base64,
            filename: `cover-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`
          })
        })

        if (res.ok) {
          const data = await res.json()
          currentCover = data.url
          updateCoverDisplay()
          $('#coverModal').classList.remove('is-visible')
        } else {
          const err = await res.json()
          alert(err.error || 'Erreur upload')
        }
      } catch (err) {
        alert('Erreur de connexion')
      }

      uploadLabel.textContent = originalText
    }
    reader.readAsDataURL(file)
    e.target.value = '' // Reset input
  })

  // Cover URL modal
  $('#coverUrlBtn').addEventListener('click', () => {
    const url = $('#coverUrl').value.trim()
    if (url) {
      currentCover = url
      updateCoverDisplay()
      $('#coverModal').classList.remove('is-visible')
      $('#coverUrl').value = ''
    }
  })

  // Close modals on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#emojiModal') && !e.target.closest('#docIcon')) {
      $('#emojiModal').classList.remove('is-visible')
    }
    if (!e.target.closest('#coverModal') && !e.target.closest('.doc__banner-btn') && !e.target.closest('#docBanner')) {
      $('#coverModal').classList.remove('is-visible')
    }
  })

  // Show admin if already logged in (verify token first)
  if (authToken) verifyAndShowAdmin()
}

async function verifyAndShowAdmin() {
  try {
    const r = await fetch('/api/verify', {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    if (r.ok) {
      showAdmin()
    } else {
      logout()
    }
  } catch (err) {
    logout()
  }
}

function openCoverModal() {
  const modal = $('#coverModal')
  const banner = $('#docBanner')
  const rect = banner.getBoundingClientRect()
  modal.style.left = `${Math.max(10, rect.left + rect.width / 2 - 170)}px`
  modal.style.top = `${rect.bottom + 8}px`
  modal.classList.add('is-visible')
  // Reset to upload tab
  document.querySelectorAll('.cover-modal__tab').forEach(t => t.classList.remove('is-active'))
  document.querySelectorAll('.cover-modal__panel').forEach(p => p.classList.remove('is-active'))
  $('.cover-modal__tab[data-tab="upload"]').classList.add('is-active')
  $('.cover-modal__panel[data-panel="upload"]').classList.add('is-active')
}

function renderEmojiPicker() {
  const list = $('#emojiList')
  list.innerHTML = docEmojis.map(e =>
    `<div class="emoji-item" data-emoji="${e}">${e}</div>`
  ).join('')

  list.onclick = (e) => {
    const item = e.target.closest('.emoji-item')
    if (item) {
      currentEmoji = item.dataset.emoji
      updateEmojiDisplay()
      $('#emojiModal').classList.remove('is-visible')
    }
  }
}

function updateEmojiDisplay() {
  $('#docIcon').innerHTML = `<span class="icon-emoji">${currentEmoji}</span>`
}

function updateCoverDisplay() {
  const banner = $('#docBanner')
  const img = $('#coverImage')

  if (currentCover) {
    img.src = currentCover
    banner.classList.add('has-image')
  } else {
    img.src = ''
    banner.classList.remove('has-image')
  }
}

// Login handler
async function handleLogin(e) {
  e.preventDefault()
  const pwd = $('#password').value

  try {
    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd })
    })

    if (r.ok) {
      const data = await r.json()
      authToken = data.token
      localStorage.setItem('authToken', authToken)
      showAdmin()
    } else {
      $('#loginError').textContent = 'Mot de passe incorrect'
      $('#loginError').style.display = 'block'
    }
  } catch (err) {
    $('#loginError').textContent = 'Erreur de connexion'
    $('#loginError').style.display = 'block'
  }
}

// Article submit handler
async function handleArticleSubmit(e) {
  e.preventDefault()

  const id = $('#articleId').value
  const content = editor ? htmlToMarkdown(editor.getHTML()) : ''
  const translationOf = $('#translationOf').value

  const data = {
    title: $('#title').value,
    slug: $('#slug').value,
    tags: $('#tags').value,
    content,
    emoji: currentEmoji,
    cover_image: currentCover || null,
    lang: $('#lang').value,
    meta_title: $('#metaTitle').value || null,
    meta_description: $('#metaDescription').value || null,
    translation_group: currentTranslationGroup
  }

  // For new articles, send translationOf to backend for proper handling
  if (!id && translationOf) {
    data.translationOf = parseInt(translationOf)
  }

  try {
    const r = await fetch(id ? `/api/articles/${id}` : '/api/articles', {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(data)
    })

    if (r.ok) {
      closeModal()
      loadArticles()
    } else {
      const err = await r.json()
      alert(err.error || 'Erreur')
    }
  } catch (err) {
    alert('Erreur de connexion')
  }
}

function showAdmin() {
  $('#loginSection').style.display = 'none'
  $('#adminSection').style.display = 'block'
  loadArticles()
  initTabs()
}

// Tab switching
function initTabs() {
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab

      // Update active tab
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('is-active'))
      tab.classList.add('is-active')

      // Update active panel
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('is-active'))
      document.querySelector(`.admin-panel[data-panel="${tabName}"]`).classList.add('is-active')

      // Load analytics when switching to that tab
      if (tabName === 'analytics') {
        loadStats()
      }
    })
  })
}

// Load and display analytics
async function loadStats() {
  try {
    const r = await fetch('/api/stats', {
      headers: { Authorization: `Bearer ${authToken}` }
    })

    if (!r.ok) throw new Error('Failed to load stats')

    const stats = await r.json()
    renderStats(stats)
  } catch (err) {
    console.error('Error loading stats:', err)
  }
}

function renderStats(stats) {
  // Update stat cards
  $('#statTotalArticles').textContent = stats.articles.total
  $('#statTotalViews').textContent = formatNumber(stats.pageViews.total)
  $('#statTodayViews').textContent = formatNumber(stats.pageViews.today)
  $('#statWeekViews').textContent = formatNumber(stats.pageViews.thisWeek)

  // Hide setup instructions (table is created)
  const setupCard = $('#analyticsSetup')
  if (setupCard) {
    setupCard.style.display = 'none'
  }

  // Render views chart
  renderViewsChart(stats.pageViews.byDay)

  // Render language stats
  renderLangStats(stats.articles.byLang, stats.articles.total)

  // Render top articles
  renderTopArticles(stats.pageViews.byArticle)
}

function renderViewsChart(byDay) {
  const container = $('#viewsChart')

  if (!byDay || byDay.length === 0) {
    container.innerHTML = '<div class="analytics-empty"><div class="analytics-empty__icon">📊</div>Aucune donnee</div>'
    return
  }

  const maxViews = Math.max(...byDay.map(d => d.views), 1)

  container.innerHTML = byDay.map(d => {
    const height = Math.max((d.views / maxViews) * 100, 4)
    const date = new Date(d.date)
    const label = `${date.getDate()}/${date.getMonth() + 1}`

    return `
      <div class="chart-bar" style="height: ${height}%" data-value="${d.views}">
        <span class="chart-bar-label">${label}</span>
      </div>
    `
  }).join('')
}

function renderLangStats(byLang, total) {
  const container = $('#langStats')
  const maxCount = Math.max(...Object.values(byLang), 1)

  const langInfo = {
    en: { flag: '🇬🇧', name: 'English' },
    fr: { flag: '🇫🇷', name: 'Francais' },
    he: { flag: '🇮🇱', name: 'Hebrew' }
  }

  container.innerHTML = Object.entries(byLang).map(([lang, count]) => {
    const info = langInfo[lang] || { flag: '🌐', name: lang }
    const percent = (count / maxCount) * 100

    return `
      <div class="lang-stat">
        <span class="lang-stat__flag">${info.flag}</span>
        <span class="lang-stat__name">${info.name}</span>
        <div class="lang-stat__bar">
          <div class="lang-stat__fill" style="width: ${percent}%"></div>
        </div>
        <span class="lang-stat__count">${count}</span>
      </div>
    `
  }).join('')
}

function renderTopArticles(byArticle) {
  const container = $('#topArticles')

  if (!byArticle || byArticle.length === 0) {
    container.innerHTML = `
      <div class="analytics-empty">
        <div class="analytics-empty__icon">📈</div>
        Les articles les plus vus apparaitront ici
      </div>
    `
    return
  }

  container.innerHTML = byArticle.map((article, index) => `
    <div class="top-article">
      <span class="top-article__rank">${index + 1}</span>
      <span class="top-article__emoji">${article.emoji}</span>
      <span class="top-article__title">${escapeHtml(article.title)}</span>
      <span class="top-article__views">${formatNumber(article.views)} vues</span>
    </div>
  `).join('')
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

function logout() {
  localStorage.removeItem('authToken')
  authToken = null
  $('#loginSection').style.display = 'block'
  $('#adminSection').style.display = 'none'
  $('#password').value = ''
}

async function loadArticles() {
  try {
    const r = await fetch('/api/articles')
    articles = await r.json()
    const el = $('#articlesList')

    if (!articles.length) {
      el.innerHTML = '<div class="empty-state">Aucun article. Creez votre premier article !</div>'
      return
    }

    // Group articles by translation_group to show translation indicators
    const translationGroups = {}
    articles.forEach(a => {
      if (a.translation_group) {
        if (!translationGroups[a.translation_group]) {
          translationGroups[a.translation_group] = []
        }
        translationGroups[a.translation_group].push(a)
      }
    })

    el.innerHTML = articles.map(a => {
      const translations = a.translation_group ? translationGroups[a.translation_group].filter(t => t.id !== a.id) : []
      const translationBadges = translations.map(t => t.lang.toUpperCase()).join(', ')

      return `
        <div class="card-list-item">
          <div class="card-list-item__content">
            <div class="card-list-item__title">
              <span class="card-list-item__emoji">${a.emoji || '📄'}</span>
              ${escapeHtml(a.title)}
              <span class="card-list-item__lang">${(a.lang || 'fr').toUpperCase()}</span>
              ${translations.length ? `<span class="card-list-item__translations" title="Traductions: ${translationBadges}">🔗 ${translationBadges}</span>` : ''}
            </div>
            <div class="card-list-item__meta">/${a.slug} · ${formatDate(a.created_at)}${a.tags ? ' · ' + a.tags : ''}</div>
          </div>
          <div class="card-list-item__actions">
            <a href="${a.lang && a.lang !== 'fr' ? '/' + a.lang : ''}/article/${a.slug}" target="_blank" class="btn btn--ghost btn--sm">Voir</a>
            <button class="btn btn--ghost btn--sm" data-edit="${a.id}">Editer</button>
            <button class="btn btn--danger btn--sm" data-delete="${a.id}">Supprimer</button>
          </div>
        </div>
      `
    }).join('')

    // Attach event listeners
    el.querySelectorAll('[data-edit]').forEach(btn => {
      btn.onclick = () => editArticle(parseInt(btn.dataset.edit))
    })
    el.querySelectorAll('[data-delete]').forEach(btn => {
      btn.onclick = () => deleteArticle(parseInt(btn.dataset.delete))
    })

  } catch (err) {
    $('#articlesList').innerHTML = '<div class="empty-state">Erreur de chargement</div>'
  }
}

function openModal(article = null) {
  // Reset state
  currentEmoji = article?.emoji || '📄'
  currentCover = article?.cover_image || ''
  currentLang = article?.lang || 'fr'
  currentTranslationGroup = article?.translation_group || null

  // Update displays
  updateEmojiDisplay()
  updateCoverDisplay()

  // Fill form
  $('#articleId').value = article?.id || ''
  $('#title').value = article?.title || ''
  $('#slug').value = article?.slug || ''
  $('#tags').value = article?.tags || ''
  $('#lang').value = article?.lang || 'fr'
  $('#metaTitle').value = article?.meta_title || ''
  $('#metaDescription').value = article?.meta_description || ''

  // Populate translation dropdown
  populateTranslationDropdown(article)

  // Initialize or reset editor
  if (editor) {
    if (editor.menuCleanup) editor.menuCleanup()
    editor.destroy()
  }

  const editorElement = $('#editor')
  editorElement.innerHTML = ''

  const content = article?.content ? markdownToHtml(article.content) : ''

  editor = createEditor(editorElement, {
    content,
    placeholder: "Appuyez sur '/' pour les commandes...",
    onUpdate: () => {}
  })

  $('#articleModal').classList.add('is-open')

  // Focus title after a small delay
  setTimeout(() => $('#title').focus(), 100)
}

function populateTranslationDropdown(currentArticle) {
  const select = $('#translationOf')
  const currentLang = $('#lang').value

  // Filter articles that could be translations (different language, not same article)
  const otherLangArticles = articles.filter(a => {
    if (currentArticle && a.id === currentArticle.id) return false
    if (currentArticle && a.translation_group === currentArticle.translation_group && currentArticle.translation_group) return false
    return a.lang !== currentLang
  })

  select.innerHTML = `
    <option value="">-- Aucune (nouvel article) --</option>
    ${otherLangArticles.map(a => `
      <option value="${a.id}" ${currentArticle?.translation_group && a.translation_group === currentArticle.translation_group ? 'selected' : ''}>
        [${a.lang.toUpperCase()}] ${a.title}
      </option>
    `).join('')}
  `
}

function closeModal() {
  $('#articleModal').classList.remove('is-open')
  $('#articleForm').reset()
  $('#emojiModal').classList.remove('is-visible')
  $('#coverModal').classList.remove('is-visible')
  if (editor) {
    if (editor.menuCleanup) editor.menuCleanup()
    editor.destroy()
    editor = null
  }
}

function editArticle(id) {
  const a = articles.find(x => x.id === id)
  if (a) openModal(a)
}

async function deleteArticle(id) {
  if (!confirm('Supprimer cet article ?')) return

  try {
    const r = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` }
    })

    if (r.ok) {
      loadArticles()
    } else {
      alert('Erreur')
    }
  } catch (err) {
    alert('Erreur')
  }
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
