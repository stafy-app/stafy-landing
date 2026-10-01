import { Halo, panel, SectionHead, sectionAlt, wrap } from './ui'
import { vars } from './util'

const RATES = [
  ['Curs de grupă', '90 min', '120 lei/h', 100, 'linear-gradient(90deg,#FFA24A,var(--color-primary))'],
  ['Lecție demo', '30 min', '80 lei', 42, 'linear-gradient(90deg,#8FB6FF,var(--color-info))'],
  ['Recuperare', '60 min', '100 lei/h', 62, 'linear-gradient(90deg,#7BE0A6,var(--color-success))'],
  ['Tabără', 'zi întreagă', '450 lei', 88, 'linear-gradient(90deg,#FFD48A,var(--color-warning))'],
] as const

export default function Rates() {
  return (
    <section id="dece" className={sectionAlt}>
      <Halo tone="a" className="-right-64 -top-40 opacity-70" />
      <div className={`${wrap} grid grid-cols-2 items-center gap-[clamp(28px,4vw,60px)] max-[900px]:grid-cols-1`}>
        <SectionHead flush k="De ce nu un pontaj obișnuit" title="Aplicațiile clasice sunt gândite pentru birouri.">
          <p>Program fix, un singur tarif orar, opt ore pe zi. La voi nu arată așa: un instructor predă patru tipuri de activitate, la patru tarife, în ore care se schimbă săptămânal.</p>
          <p>Tu definești în Stafy tipurile de activitate — curs, demo, recuperare, tabără sau orice altceva aveți — și tariful fiecărui instructor pe fiecare dintre ele. Tariful se fixează în momentul pontajului, așa că o scumpire de azi nu rescrie luna trecută.</p>
        </SectionHead>

        <div className={`${panel} rv p-[30px]`} data-rates>
          <h4 className="mb-5 text-[13px] font-semibold uppercase tracking-[.1em] text-ink-muted">Tarife pe tip de activitate</h4>
          {RATES.map(([name, dur, val, w, bg], i) => (
            <div key={name} className="grid gap-[7px] border-t border-ink/[.07] py-3.5 first-of-type:border-t-0 first-of-type:pt-0">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[15px] font-semibold text-ink">{name}</span>
                <span className="text-[12.5px] text-ink-muted">{dur}</span>
                <span className="ml-auto text-[15px] font-bold tabular-nums text-ink">{val}</span>
              </div>
              <div className="h-[7px] overflow-hidden rounded-full bg-slate-100">
                <div
                  data-w={w}
                  style={vars({ '--i': i, background: bg })}
                  className="h-full w-0 rounded-full transition-[width] duration-[1400ms] ease-soft [transition-delay:calc(var(--i)*120ms)]"
                />
              </div>
            </div>
          ))}
          <p className="mt-5 text-[13px] text-ink-muted">Schimbi un tarif? Pontajele deja făcute rămân la tariful de atunci.</p>
        </div>
      </div>
    </section>
  )
}
