import { CONTACT_EMAIL, LOGIN_URL } from '../config'
import Brand from './Brand'
import { wrap } from './ui'

const COLS = [
  ['Produs', [['#cum', 'Cum merge'], ['#manager', 'Pentru manageri'], ['#functii', 'Funcții'], ['#preturi', 'Prețuri'], ['#intrebari', 'Întrebări frecvente'], [LOGIN_URL, 'Intră în cont']]],
  ['Companie', [['#final', 'Program pilot'], [`mailto:${CONTACT_EMAIL}`, 'Contact']]],
  ['Legal', [['#', 'Termeni și condiții'], ['#', 'Politica de confidențialitate'], ['#', 'Politica de cookies'], ['#', 'Acord de prelucrare date (DPA)'], ['#', 'Drepturile tale GDPR']]],
] as const

const anpc =
  'whitespace-nowrap rounded-lg bg-white/[.07] px-[11px] py-1.5 text-[11.5px] font-semibold text-white/70 transition-colors hover:bg-white/[.14] hover:text-white'

export default function Footer() {
  return (
    <footer className="relative z-[2] bg-[linear-gradient(180deg,#1d2739,#141b28)] pb-8 pt-[clamp(56px,6vw,80px)] text-white">
      <div className={wrap}>
        <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-x-8 gap-y-10 pb-12 max-[860px]:grid-cols-2">
          <div className="max-[860px]:col-span-full">
            <Brand light />
            <p className="my-4 max-w-[320px] text-[14.5px] leading-[1.6] text-white/60">
              Pontaj pe oră pentru școli și centre cu instructori. Tarife pe om și pe activitate, rapoarte gata la final de lună.
            </p>
            <a className="text-[14.5px] font-semibold text-white hover:text-[#FFB877]" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          {COLS.map(([title, links]) => (
            <div key={title}>
              <h5 className="mb-4 text-xs font-bold uppercase tracking-[.12em] text-[#FFB877]">{title}</h5>
              <ul className="flex flex-col gap-[11px]">
                {links.map(([href, label]) => (
                  <li key={label}><a href={href} {...(label === 'Contact' ? { 'data-open-contact': '' } : {})} className="text-[14.5px] text-white/65 transition-colors hover:text-white">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4 border-t border-white/10 pt-6 text-[12.5px] text-white/45">
          <div className="flex min-w-0 flex-1 flex-wrap gap-x-3.5 gap-y-1.5 [&>span]:whitespace-nowrap">
            <span>© 2026 Stafy</span><span>[Denumire firmă SRL]</span><span>CUI [—]</span><span>Reg. Com. [—]</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a className={anpc} href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener">ANPC · SAL</a>
            <a className={anpc} href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">SOL · litigii online</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
