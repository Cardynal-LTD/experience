// Theme management
export function getTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
  updateThemeIcons(theme)
}

export function toggleTheme() {
  const current = getTheme()
  setTheme(current === 'dark' ? 'light' : 'dark')
}

function updateThemeIcons(theme) {
  const sunIcons = document.querySelectorAll('.sun')
  const moonIcons = document.querySelectorAll('.moon')

  sunIcons.forEach(icon => {
    icon.style.display = theme === 'dark' ? 'none' : 'block'
  })

  moonIcons.forEach(icon => {
    icon.style.display = theme === 'dark' ? 'block' : 'none'
  })
}

// Initialize theme on load
const initialTheme = getTheme()
setTheme(initialTheme)

// Update icons when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => updateThemeIcons(initialTheme))
} else {
  updateThemeIcons(initialTheme)
}

// Expose to window for onclick handlers
window.toggleTheme = toggleTheme
