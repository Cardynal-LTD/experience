// Theme management
export function getTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

export function toggleTheme() {
  const current = getTheme()
  setTheme(current === 'dark' ? 'light' : 'dark')
}

// Initialize theme on load
setTheme(getTheme())

// Expose to window for onclick handlers
window.toggleTheme = toggleTheme
