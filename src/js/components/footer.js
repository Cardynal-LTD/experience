// Shared Footer Component for all pages

export function renderFooter() {
  const year = new Date().getFullYear()

  return `
  <footer class="landing-footer">
    <div class="landing-footer__content">
      <div class="landing-footer__brand">
        <a href="/" class="landing-footer__logo">
          <img src="/logo-cardynal.png" alt="Cardynal" class="landing-footer__logo-img">
          <span>Cardynal</span>
        </a>
        <p data-i18n="footer.tagline">Human + AI Customer Support<br>Fully managed, from day one.</p>
      </div>
      <div class="landing-footer__links">
        <div class="landing-footer__column">
          <h4 data-i18n="footer.product">Product</h4>
          <a href="/#features" data-i18n="nav.features">Features</a>
          <a href="/#pricing" data-i18n="nav.pricing">Pricing</a>
          <a href="/#faq" data-i18n="nav.faq">FAQ</a>
        </div>
        <div class="landing-footer__column">
          <h4 data-i18n="footer.company">Company</h4>
          <a href="/blog.html" data-i18n="nav.blog">Blog</a>
          <a href="/about.html" data-i18n="nav.about">About</a>
          <a href="mailto:contact@cardynal.io" data-i18n="footer.contact">Contact</a>
        </div>
        <div class="landing-footer__column">
          <h4 data-i18n="footer.legal">Legal</h4>
          <a href="/privacy.html" data-i18n="footer.privacy">Privacy</a>
          <a href="/terms.html" data-i18n="footer.terms">Terms</a>
          <a href="/ai-transparency.html" data-i18n="footer.aiTransparency">AI Transparency</a>
          <a href="/security.html" data-i18n="footer.security">Security</a>
        </div>
      </div>
      <div class="landing-footer__contact">
        <h4 data-i18n="footer.getInTouch">Get In Touch</h4>
        <p>Email: contact@cardynal.io</p>
      </div>
    </div>
    <div class="landing-footer__bottom">
      <p>&copy; ${year} Cardynal. All rights reserved.</p>
    </div>
  </footer>
  `
}
