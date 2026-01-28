// ============================================
// Analytics Tracking Module
// ============================================

// Generate unique ID
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Cookie helpers
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
  return null
}

// Get or create visitor ID (persists 2 years)
function getVisitorId() {
  let visitorId = getCookie('_vid')
  if (!visitorId) {
    visitorId = generateId()
    setCookie('_vid', visitorId, 730) // 2 years
  }
  return visitorId
}

// Get or create session ID (persists for session)
function getSessionId() {
  let sessionId = sessionStorage.getItem('_sid')
  if (!sessionId) {
    sessionId = generateId()
    sessionStorage.setItem('_sid', sessionId)
  }
  return sessionId
}

// Get UTM parameters from URL
function getUtmParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign')
  }
}

// Get page load time
function getPageLoadTime() {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing
    return timing.loadEventEnd - timing.navigationStart
  }
  return null
}

// Track scroll depth
let maxScrollDepth = 0
function trackScrollDepth() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)
    maxScrollDepth = Math.max(maxScrollDepth, Math.min(scrollPercent, 100))
  }
}

// Track time on page
const pageLoadTime = Date.now()
function getTimeOnPage() {
  return Math.round((Date.now() - pageLoadTime) / 1000)
}

// Send tracking data
async function track(articleId = null) {
  const visitorId = getVisitorId()
  const sessionId = getSessionId()
  const utmParams = getUtmParams()

  const data = {
    path: window.location.pathname,
    article_id: articleId,
    referrer: document.referrer || null,
    visitor_id: visitorId,
    session_id: sessionId,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language || navigator.userLanguage,
    page_load_time: getPageLoadTime(),
    ...utmParams
  }

  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (e) {
    // Fail silently
  }
}

// Update tracking data on page exit
async function updateTrack() {
  const sessionId = sessionStorage.getItem('_sid')
  if (!sessionId) return

  const data = {
    session_id: sessionId,
    path: window.location.pathname,
    time_on_page: getTimeOnPage(),
    scroll_depth: maxScrollDepth,
    is_exit: true
  }

  // Use sendBeacon for reliable delivery on page exit
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track/update', JSON.stringify(data))
  } else {
    try {
      await fetch('/api/track/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      })
    } catch (e) {
      // Fail silently
    }
  }
}

// Initialize tracking
export function initTracking(articleId = null) {
  // Track page view
  track(articleId)

  // Track scroll depth
  window.addEventListener('scroll', trackScrollDepth, { passive: true })

  // Update on page exit
  window.addEventListener('beforeunload', updateTrack)
  window.addEventListener('pagehide', updateTrack)

  // Also update when visibility changes (mobile tab switching)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      updateTrack()
    }
  })
}

// Export for manual tracking
export { track, updateTrack, getVisitorId, getSessionId }
