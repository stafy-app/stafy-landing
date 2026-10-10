import { Download } from 'lucide-react'
import TimesheetPhone from './TimesheetPhone'
import { panel, Reveal, SectionHead, section, viz, wrap } from './ui'

const BARS = [
  ['Curs', '2 h × 90 lei', 82, '180 lei'],
  ['Demo', '1 h × 80 lei', 36, '80 lei'],
  ['Recuperare', '1 h × 100 lei', 45, '100 lei'],
] as const

const DOC_ROWS = [
  ['Curs Scratch · 12 h', '2.160 lei'],
  ['Demo · 4 h', '320 lei'],
  ['Recuperare · 3 h', '300 lei'],
  ['Bonus lunar', '+ 100 lei'],
]

function Step({ i, title, text, children }: { i: number; title: string; text: string; children: React.ReactNode }) {
  return (
    <Reveal i={i - 1} className="group/step">
      <div className={`${panel} h-full transition-[translate,box-shadow] duration-[600ms] ease-soft hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgb(30_41_59/.1)]`}>
        <div className="card-body h-full gap-4 p-7">
          <span className="grid size-[34px] place-items-center rounded-[11px] bg-ink text-sm font-bold text-white">{i}</span>
          <h3 className="text-xl font-bold tracking-[-.02em]">{title}</h3>
          <p className="text-[15px] leading-[1.6] text-ink-soft">{text}</p>
          {children}
        </div>
      </div>
    </Reveal>
  )
}

export default function Steps() {
  return (
    <section id="how-it-works" className={section}>
      <div className={wrap}>
        <SectionHead k="Cum merge" title="Trei pași, și raportul e gata." />
        <div className="grid grid-cols-3 gap-[clamp(20px,2.4vw,26px)] max-[900px]:grid-cols-1">
          <Step i={1} title="Instructorul pontează. 60 de secunde." text="Din browser, de pe telefon sau laptop. Alege activitatea, ora de început și ora de final. Durata se calculează singură. Nimic de instalat.">
            <TimesheetPhone />
          </Step>

          <Step i={2} title="Stafy calculează." text="Fiecare instructor are tariful lui pe fiecare activitate. Durata, suma și bonusul lunar se calculează automat.">
            <div className={viz} data-bars>
              {BARS.map(([label, calc, w, val]) => (
                <div key={label} className="text-[12.5px]">
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="font-medium text-ink">{label} <span className="ml-1 text-[11px] font-normal text-ink-muted">{calc}</span></span>
                    <span className="font-semibold tabular-nums text-ink">{val}</span>
                  </div>
                  <span className="block h-2 overflow-hidden rounded-full bg-slate-100">
                    <span data-w={w} className="block h-full w-0 rounded-full bg-[linear-gradient(90deg,#FFA24A,var(--color-primary))] transition-[width] duration-[1300ms] ease-soft" />
                  </span>
                </div>
              ))}
              <div className="mt-1 flex justify-between border-t border-line-soft pt-2.5 text-[12.5px]">
                <span className="text-ink-soft">Total + bonus</span><b className="tabular-nums text-ink">460 lei</b>
              </div>
            </div>
          </Step>

          <Step i={3} title="Tu primești raportul." text="Un raport pe fiecare instructor, cu ore și sume pe activitate, plus bonus. Îl previzualizezi, apoi descarci PDF-ul.">
            <div className={viz}>
              <div className="rounded-[10px] border border-line-soft bg-white p-3 text-[11.5px] text-ink-soft shadow-sm">
                <div className="mb-2 flex items-center justify-between border-b border-line-soft pb-2">
                  <b className="text-[12px] text-ink">Raport · Septembrie</b><span>Andrei M.</span>
                </div>
                {DOC_ROWS.map(([a, b]) => (
                  <div key={a} className="flex justify-between py-[3px]"><span>{a}</span><span className="tabular-nums">{b}</span></div>
                ))}
                <div className="mt-2 flex justify-between border-t border-line-soft pt-2 text-[12.5px] font-bold text-ink"><span>Total</span><span className="tabular-nums">2.880 lei</span></div>
              </div>
              <div className="flex items-center justify-center gap-1.5 rounded-lg bg-ink py-2 text-[12px] font-semibold text-white"><Download size={13} /> Descarcă PDF</div>
            </div>
          </Step>
        </div>
      </div>
    </section>
  )
}
