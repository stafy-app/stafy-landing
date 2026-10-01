import { ArrowRight, Check, X } from 'lucide-react'
import { Halo, SectionHead, sectionAlt, wrap } from './ui'
import { vars } from './util'

const PAIRS = [
  ['Orele adunate din caiet și din WhatsApp', 'Orele se pontează din browser, chiar în ziua cursului'],
  ['Un Excel cu formule pe care le înțelege un singur om', 'Tariful fiecărui om, pe fiecare activitate, stă în aplicație'],
  ['Tarife diferite ținute minte, nu scrise', 'Suma și bonusul se calculează singure, în timp real'],
  ['Recalculat de la zero când cineva întreabă', 'Fiecare corectură rămâne în jurnal, cu cine și când'],
]

const ENTRIES = [
  ['AM', 'Andrei M.', 'Curs · 90 min', '180 lei'],
  ['IP', 'Ioana P.', 'Demo · 45 min', '60 lei'],
  ['MR', 'Mihai R.', 'Recuperare · 60 min', '90 lei'],
]

const row = 'relative grid grid-cols-2 max-[760px]:grid-cols-1 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-line-soft'
const cell = 'flex items-center gap-3 px-[clamp(20px,3vw,34px)] py-[18px]'
const oldCell = 'max-[760px]:bg-[#F4F7FA]'
const label = 'text-[11px] font-bold uppercase tracking-[.14em]'
const pill = 'badge border-0 text-[11.5px] font-semibold'
const bit =
  'absolute whitespace-nowrap rounded-[10px] border border-line bg-white px-[11px] py-2 text-[12.5px] font-semibold text-ink-soft shadow-sm animate-wob [animation-delay:var(--d)] [transform:rotate(var(--r))]'
const bitSmall = 'mb-0.5 block text-[10.5px] font-medium text-ink-muted'
const hand = 'border-[#FDE68A] bg-[#FFFBEB] font-medium italic'
const ent =
  'grid grid-cols-[24px_1fr_auto] items-center gap-2.5 rounded-[10px] border border-line-soft bg-white px-2.5 py-[7px] text-[12.5px] js:-translate-x-3.5 js:opacity-0 transition-[opacity,translate] duration-700 ease-soft [transition-delay:calc(.3s+var(--i)*.16s)] group-[.in]/cmp:translate-x-0 group-[.in]/cmp:opacity-100'
const appear = 'transition-[opacity,translate] duration-500 ease-soft [transition-delay:calc(.95s+var(--i)*.35s)] js:-translate-x-2 js:opacity-0 group-[.in]/cmp:translate-x-0 group-[.in]/cmp:opacity-100'
const marker = 'grid size-6 flex-none place-items-center rounded-full'

export default function Problem() {
  return (
    <section id="problema" className={sectionAlt}>
      <Halo tone="b" className="-bottom-30 -left-60" />
      <div className={wrap}>
        <SectionHead k="Problema" title="Știm cum arată. Caiet, WhatsApp, un Excel cu formule și un pix.">
          <p>Cursurile au un tarif. Demo-urile, altul. Recuperările, altul. Taberele, cu totul altceva. Aduni orele de peste tot, le treci în tabel, le calculezi de mână și speri să nu fi sărit nimic.</p>
          <p>Patru sau cinci ore, în fiecare lună. Și dacă o dată iese greșit, nu pierzi doar timpul — pierzi încrederea unui om care ține la banii lui. Pe bună dreptate.</p>
        </SectionHead>

        <div className="rv group/cmp relative overflow-hidden rounded-[20px] border border-line bg-[linear-gradient(90deg,#F4F7FA_50%,#fff_50%)] shadow-md before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-line max-[760px]:bg-white max-[760px]:before:hidden">
          <div className={`${row} max-[760px]:hidden`}>
            <div className={`${cell} ${oldCell} justify-between pb-5 pt-6`}><span className={`${label} text-ink-muted`}>Cum e acum</span><span className={`${pill} bg-line text-ink-soft`}>Manual</span></div>
            <div className={`${cell} justify-between pb-5 pt-6`}><span className={`${label} text-primary`}>Cu Stafy</span><span className={`${pill} bg-accent text-on-soft`}>Automat</span></div>
          </div>

          <div className={row}>
            <div className={`${cell} ${oldCell} !block !pb-[22px] !pt-1.5`}>
              <div aria-hidden="true" className="relative min-h-[176px] overflow-hidden rounded-[14px] border border-line-soft bg-white bg-[repeating-linear-gradient(transparent_0_27px,#E8EDF3_27px_28px)]">
                <div className={`${bit} ${hand}`} style={vars({ left: '5%', bottom: 8, '--r': '-3deg', '--d': '0s' })}><small className={bitSmall}>Caiet · pag. 14</small>Ioana — marți 3h? sau 2?</div>
                <div className={bit} style={vars({ right: '4%', top: 62, '--r': '3deg', '--d': '-1.2s' })}><small className={bitSmall}>WhatsApp · 23 mesaje noi</small>„Am ținut 2 demo-uri ieri”</div>
                <div className={bit} style={vars({ left: '4%', top: 10, '--r': '2deg', '--d': '-2.4s' })}><small className={bitSmall}>Plată_sept_FINAL2.xlsx</small>=SUMA(C2:C41) <span className="text-error">#REF!</span></div>
                <div className={`${bit} ${hand}`} style={vars({ right: '6%', top: 14, '--r': '-3deg', '--d': '-3.1s' })}>tarif tabără = ??</div>
              </div>
            </div>
            <div className={`${cell} !block !pb-[22px] !pt-1.5 max-[760px]:!pt-[22px]`}>
              <div aria-hidden="true" className="flex min-h-[176px] flex-col gap-1.5 rounded-[14px] border border-primary/[.14] bg-tint p-3">
                {ENTRIES.map(([ini, name, what, val], i) => (
                  <div key={ini} className={ent} style={vars({ '--i': i })}>
                    <span className="grid size-6 place-items-center rounded-full bg-accent text-[10px] font-bold text-on-soft">{ini}</span>
                    <span className="min-w-0 font-semibold text-ink">{name} <span className="font-medium text-ink-muted">· {what}</span></span>
                    <span className="whitespace-nowrap font-semibold tabular-nums text-ink">{val}</span>
                  </div>
                ))}
                <div className={`${ent} !grid-cols-[1fr_auto] !border-primary !bg-primary`} style={vars({ '--i': 3 })}>
                  <span className="font-semibold text-white">Raport septembrie · gata ✓</span>
                  <span className="whitespace-nowrap font-semibold tabular-nums text-white">14.280 lei</span>
                </div>
              </div>
            </div>
          </div>

          {PAIRS.map(([bad, good], i) => (
            <div key={bad} className={`${row} group/pr transition-colors hover:bg-primary/[.035]`} style={vars({ '--i': i })}>
              <div className={`${cell} ${oldCell} text-[15px] leading-[1.45] text-ink-soft transition-colors duration-[400ms] group-[.in]/cmp:text-ink-muted`}>
                <span className={`${marker} bg-error/10 text-error`}><X size={13} strokeWidth={3} /></span>
                <span><span className="strike group-[.in]/cmp:[background-size:100%_1.5px]">{bad}</span></span>
              </div>
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 z-[2] -ml-[15px] -mt-[15px] grid size-[30px] place-items-center rounded-full border border-line bg-white text-primary transition-[scale,opacity,background,color,border-color] duration-500 [transition-delay:calc(.85s+var(--i)*.35s)] js:scale-[.4] js:opacity-0 group-[.in]/cmp:scale-100 group-[.in]/cmp:opacity-100 group-hover/pr:border-primary group-hover/pr:bg-primary group-hover/pr:text-white group-hover/pr:delay-0 group-[.settled]/cmp:delay-0 group-[.settled]/cmp:duration-300 max-[760px]:static max-[760px]:mx-auto max-[760px]:-mb-[15px] max-[760px]:rotate-90"
              >
                <ArrowRight size={14} strokeWidth={2.4} />
              </span>
              <div className={`${cell} text-[15px] leading-[1.45] text-ink`}>
                <span className={`${marker} bg-[#DCFCE7] text-success transition-[scale] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] [transition-delay:calc(1s+var(--i)*.35s)] js:scale-0 group-[.in]/cmp:scale-100`}><Check size={13} strokeWidth={3} /></span>
                <span className={appear}>{good}</span>
              </div>
            </div>
          ))}

          <div className={row}>
            {[
              ['4–5 ore', 'în fiecare lună, la final', '56%', 'bg-[#64748B]', 'text-ink', oldCell],
              ['30 de minute', 'verifici raportul și îl trimiți', '6%', 'bg-primary', 'text-primary', ''],
            ].map(([big, sub, w, bar, tone, bg]) => (
              <div key={big} className={`${cell} ${bg} !block !pb-6 !pt-5`}>
                <div className="mb-3 flex items-baseline gap-2.5">
                  <b className={`text-[26px] tracking-[-.03em] ${tone}`}>{big}</b>
                  <span className="text-[13px] text-ink-muted">{sub}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink/[.08]">
                  <i style={vars({ '--w': w })} className={`block h-full w-[var(--w)] rounded-full ${bar} transition-[width] delay-[600ms] duration-[1600ms] ease-soft js:w-0 group-[.in]/cmp:w-[var(--w)]`} />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-ink-muted"><span>0</span><span>8 ore</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
