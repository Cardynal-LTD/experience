// Auth utilities - shared across all pages

export function getToken() {
  return localStorage.getItem('authToken')
}

export function isLoggedIn() {
  return !!getToken()
}

export function logout() {
  localStorage.removeItem('authToken')
  window.location.reload()
}

// Check token validity and update UI
export async function initAuth() {
  const token = getToken()
  if (!token) {
    updateHeaderUI(false)
    return false
  }

  try {
    const r = await fetch('/api/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const valid = r.ok
    updateHeaderUI(valid)
    if (!valid) {
      localStorage.removeItem('authToken')
    }
    return valid
  } catch (err) {
    updateHeaderUI(false)
    return false
  }
}

function updateHeaderUI(isAdmin) {
  const nav = document.querySelector('.header__nav')
  if (!nav) return

  // Remove existing admin button if any
  const existingBtn = nav.querySelector('.header__admin-btn')
  if (existingBtn) existingBtn.remove()

  if (isAdmin) {
    const adminBtn = document.createElement('a')
    adminBtn.href = '/admin.html'
    adminBtn.className = 'btn btn--primary btn--sm header__admin-btn'
    adminBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
      Admin
    `
    nav.appendChild(adminBtn)
  }
}
