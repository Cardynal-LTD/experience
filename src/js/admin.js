import './theme.js'
import {
  createEditor,
  markdownToHtml,
  htmlToMarkdown
} from './editor.js'

// State
let authToken = localStorage.getItem('adminToken')
let articles = []
let editor = null
let currentEmoji = '📄'
let currentCover = ''

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

  // Document icon click - open emoji picker
  $('#docIcon').addEventListener('click', (e) => {
    e.stopPropagation()
    const modal = $('#emojiModal')
    const rect = e.currentTarget.getBoundingClientRect()
    modal.style.left = `${rect.left}px`
    modal.style.top = `${rect.bottom + 8}px`
    renderEmojiPicker()
    modal.classList.add('visible')
  })

  // Cover actions
  $('#coverPlaceholder').addEventListener('click', openCoverModal)
  $('#changeCoverBtn').addEventListener('click', openCoverModal)
  $('#removeCoverBtn').addEventListener('click', () => {
    currentCover = ''
    updateCoverDisplay()
  })

  // Cover URL modal
  $('#coverUrlBtn').addEventListener('click', () => {
    const url = $('#coverUrl').value.trim()
    if (url) {
      currentCover = url
      updateCoverDisplay()
      $('#coverModal').classList.remove('visible')
      $('#coverUrl').value = ''
    }
  })

  // Close modals on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#emojiModal') && !e.target.closest('#docIcon')) {
      $('#emojiModal').classList.remove('visible')
    }
    if (!e.target.closest('#coverModal') && !e.target.closest('.cover-btn') && !e.target.closest('#coverPlaceholder')) {
      $('#coverModal').classList.remove('visible')
    }
  })

  // Show admin if already logged in
  if (authToken) showAdmin()
}

function openCoverModal() {
  const modal = $('#coverModal')
  const cover = $('#docCover')
  const rect = cover.getBoundingClientRect()
  modal.style.left = `${Math.max(10, rect.left + rect.width / 2 - 170)}px`
  modal.style.top = `${rect.bottom + 8}px`
  modal.classList.add('visible')
  $('#coverUrl').focus()
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
      $('#emojiModal').classList.remove('visible')
    }
  }
}

function updateEmojiDisplay() {
  $('#docIcon').innerHTML = `<span class="icon-emoji">${currentEmoji}</span>`
}

function updateCoverDisplay() {
  const cover = $('#docCover')
  const img = $('#coverImage')

  if (currentCover) {
    img.src = currentCover
    cover.classList.add('has-cover')
  } else {
    img.src = ''
    cover.classList.remove('has-cover')
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
      authToken = pwd
      localStorage.setItem('adminToken', pwd)
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

  const data = {
    title: $('#title').value,
    slug: $('#slug').value,
    tags: $('#tags').value,
    content,
    emoji: currentEmoji,
    cover_image: currentCover || null
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
}

function logout() {
  localStorage.removeItem('adminToken')
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

    el.innerHTML = articles.map(a => `
      <div class="article-row">
        <div class="info">
          <div class="title">
            <span class="article-emoji">${a.emoji || '📄'}</span>
            ${escapeHtml(a.title)}
          </div>
          <div class="meta">/${a.slug} · ${formatDate(a.created_at)}${a.tags ? ' · ' + a.tags : ''}</div>
        </div>
        <div class="actions">
          <a href="/article/${a.slug}" target="_blank" class="btn btn-outline btn-sm">Voir</a>
          <button class="btn btn-outline btn-sm" data-edit="${a.id}">Editer</button>
          <button class="btn btn-danger btn-sm" data-delete="${a.id}">Supprimer</button>
        </div>
      </div>
    `).join('')

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

  // Update displays
  updateEmojiDisplay()
  updateCoverDisplay()

  // Fill form
  $('#articleId').value = article?.id || ''
  $('#title').value = article?.title || ''
  $('#slug').value = article?.slug || ''
  $('#tags').value = article?.tags || ''

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

  $('#articleModal').classList.add('active')

  // Focus title after a small delay
  setTimeout(() => $('#title').focus(), 100)
}

function closeModal() {
  $('#articleModal').classList.remove('active')
  $('#articleForm').reset()
  $('#emojiModal').classList.remove('visible')
  $('#coverModal').classList.remove('visible')
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
