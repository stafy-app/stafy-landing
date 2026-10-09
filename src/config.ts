export const APP_URL = import.meta.env.PUBLIC_APP_URL ?? 'https://app.stafy.ro'
export const LOGIN_URL = `${APP_URL}/login`
export const REGISTER_URL = `${APP_URL}/register`
export const CONTACT_EMAIL = 'salut@stafy.ro'
/** Page shown for links that have no content yet (legal documents etc.). */
export const UNDER_CONSTRUCTION_URL = '/under-construction'
/** Company details in the footer; set to true once the real values are filled in Footer.tsx. */
export const SHOW_COMPANY_INFO = false
/** Early-schools pilot offer in the final section; when false, the "notify me at launch" email form is shown instead. */
export const SHOW_PILOT_PROGRAM = false
export const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://127.0.0.1:8000'
