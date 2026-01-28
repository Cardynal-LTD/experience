// i18n - Centralized translations
import en from './en.js';
import fr from './fr.js';
import he from './he.js';
import widgetsEn from './widgets/en.js';
import widgetsFr from './widgets/fr.js';
import widgetsHe from './widgets/he.js';

export const TRANSLATIONS = { en, fr, he };

export const WIDGET_TRANSLATIONS = {
  en: widgetsEn,
  fr: widgetsFr,
  he: widgetsHe
};

// Helper to get translation
export function t(key, lang = 'en') {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
}

// Helper to get widget translation
export function wt(path, lang = 'en') {
  const parts = path.split('.');
  let value = WIDGET_TRANSLATIONS[lang];
  for (const part of parts) {
    value = value?.[part];
  }
  return value || wt(path, 'en') || path;
}

export default { TRANSLATIONS, WIDGET_TRANSLATIONS, t, wt };
