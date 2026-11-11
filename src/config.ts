export const APP_URL = import.meta.env.PUBLIC_APP_URL ?? 'https://app.stafy.ro'
export const LOGIN_URL = `${APP_URL}/login`
export const REGISTER_URL = `${APP_URL}/register`
export const CONTACT_EMAIL = 'salut@stafy.ro'
/** Page shown for links that have no content yet (legal documents etc.). */
export const UNDER_CONSTRUCTION_URL = '/under-construction'
/** Privacy notice page (src/pages/confidentialitate.astro); `#cookies` and `#drepturi` anchor its sections. */
export const PRIVACY_URL = '/confidentialitate'
/** Terms of service page (src/pages/termeni.astro). */
export const TERMS_URL = '/termeni'
/** Company details in the footer; set to true once the real values are filled in Footer.tsx. */
export const SHOW_COMPANY_INFO = false
/** Early-schools pilot offer in the final section; when false, the free-test CTA with an optional updates email form is shown instead. */
export const SHOW_PILOT_PROGRAM = false
/** Paid-plan marketing (pricing cards, VAT notes, ANPC SAL/SOL badges, DPA link). false = free test phase copy. */
export const COMMERCIAL_MODE = false
export const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://127.0.0.1:8000'
