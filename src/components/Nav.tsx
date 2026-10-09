import { ArrowRight, LogIn, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LOGIN_URL, REGISTER_URL } from '../config'
import Brand from './Brand'
import { btnPrimary, btnQuiet, wrap } from './ui'
import { vars } from './util'

const LINKS = [
  ['#problem', 'Problema'],
  ['#how-it-works', 'Cum merge'],
  ['#manager', 'Pentru tine'],
  ['#features', 'Funcții'],
  ['#pricing', 'Prețuri'],
  ['#faq', 'Întrebări'],
]

const link =
  'relative whitespace-nowrap text-sm font-medium text-ink-soft hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:right-full after:h-[1.5px] after:bg-primary after:transition-[right] after:duration-[450ms] after:ease-soft hover:after:right-0'

// Mobile menu items slide up one after another when the panel opens; on close they leave together (no delay).
const item = (open: boolean) =>
  `transition-[opacity,translate] duration-500 ease-soft ${
    open ? 'translate-y-0 opacity-100 [transition-delay:calc(var(--i)*55ms+140ms)]' : 'translate-y-4 opacity-0'
  }`

const bar = 'absolute left-0 h-[2px] w-[22px] rounded-full bg-ink transition-[translate,rotate,opacity] duration-500 ease-soft'

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Esc closes; page scroll is locked while the panel is open; growing past the mobile breakpoint closes it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = matchMedia('(min-width: 1041px)')
    const onMq = () => mq.matches && setOpen(false)
    document.documentElement.style.overflow = 'hidden'
    addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.documentElement.style.overflow = ''
      removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  return (
    <nav
      id="nav"
      className="sticky top-0 z-[60] border-b border-transparent bg-warm/70 backdrop-blur-[20px] backdrop-saturate-[1.8] transition-[background,border-color,box-shadow] duration-[400ms] ease-soft [&.stuck]:border-ink/[.07] [&.stuck]:bg-white/70 [&.stuck]:shadow-[0_1px_20px_rgb(30_41_59/.05)]"
    >
      <div className={`${wrap} flex h-[64px] items-center justify-between gap-4 min-[1041px]:h-[74px] min-[1041px]:gap-6`}>
        <Brand />
        <div className="flex gap-[30px] max-[1040px]:hidden">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className={link}>{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 min-[1041px]:gap-2.5">
          <a className={`${btnQuiet} btn-md max-[640px]:hidden`} href={LOGIN_URL}>Intră în cont</a>
          <a className={`${btnPrimary} btn-md max-[640px]:hidden`} href={REGISTER_URL}>Creează un cont</a>
          <a className={`${btnPrimary} btn-md min-[641px]:hidden`} href={LOGIN_URL}>Intră în cont</a>
          <button
            type="button"
            aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative -mr-2 grid size-11 flex-none place-items-center rounded-full text-ink transition-colors hover:bg-ink/[.06] min-[1041px]:hidden"
          >
            <span aria-hidden="true" className="relative block h-[14px] w-[22px]">
              <i className={`${bar} top-0 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <i className={`${bar} top-[6px] ${open ? 'opacity-0' : ''}`} />
              <i className={`${bar} top-[12px] ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel: sits right under the bar, drops in softly, items follow one by one. */}
      <div
        id="mobile-menu"
        onClick={(e) => (e.target as Element).closest('a, button') && setOpen(false)}
        className={`absolute inset-x-0 top-full min-[1041px]:hidden ${open ? 'visible' : 'pointer-events-none invisible delay-500'}`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={`fixed inset-x-0 top-[64px] -z-10 h-dvh w-full cursor-default bg-ink/30 backdrop-blur-[3px] transition-opacity duration-500 ease-soft ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`max-h-[calc(100dvh-64px)] overflow-y-auto rounded-b-[28px] border-b border-ink/[.07] bg-white px-[clamp(20px,4vw,80px)] pb-7 pt-3 shadow-[0_30px_60px_rgb(30_41_59/.18)] transition-[opacity,translate] duration-500 ease-soft ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <ul className="divide-y divide-ink/[.07]">
            {LINKS.map(([href, label], i) => (
              <li key={href} style={vars({ '--i': i })} className={item(open)}>
                <a href={href} className="flex items-center justify-between py-4 text-[19px] font-semibold tracking-[-.015em] text-ink active:text-primary">
                  {label}
                  <ArrowRight size={18} className="text-ink-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div style={vars({ '--i': LINKS.length })} className={`mt-5 grid gap-2.5 ${item(open)}`}>
            <a className={`${btnPrimary} btn-lg w-full`} href={REGISTER_URL}>Creează un cont</a>
            <a className={`${btnQuiet} btn-lg w-full border border-ink/[.1]`} href={LOGIN_URL}>
              <LogIn size={17} /> Intră în cont
            </a>
            <button type="button" data-open-contact className="mt-1 inline-flex items-center justify-center gap-2 py-2 text-[15px] font-semibold text-ink-soft">
              <MessageCircle size={16} /> Contactează-ne
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
