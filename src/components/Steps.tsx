import PontajPhone from './PontajPhone'
import { panel, Reveal, SectionHead, section, wrap } from './ui'

const BARS = [
  ['Curs', 82, '180 lei'],
  ['Demo', 36, '80 lei'],
  ['Recuperare', 45, '100 lei'],
] as const

const DOC_ROWS = [
  ['Curs Scratch · 12', '2.160 lei'],
  ['Demo · 4', '320 lei'],
  ['Recuperare · 3', '300 lei'],
]

const viz = 'mt-auto flex min-h-[132px] flex-col justify-center gap-2.5 rounded-[14px] border border-ink/[.07] bg-white/70 p-4'

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
    <section id="cum" className={section}>
      <div className={wrap}>
        <SectionHead k="Cum merge" title="Trei pași, și raportul e gata." />
        <div className="grid grid-cols-3 gap-[clamp(20px,2.4vw,26px)] max-[900px]:grid-cols-1">
          <Step i={1} title="Instructorul pontează. 60 de secunde." text="Din browser, de pe telefon sau laptop. Alege activitatea, ora de început și ora de final. Durata se calculează singură. Nimic de instalat.">
            <PontajPhone />
          </Step>

          <Step i={2} title="Stafy calculează." text="Fiecare instructor are tariful lui pe fiecare activitate. Durata, suma și bonusul lunar ies singure, corect.">
            <div className={viz} data-bars>
              {BARS.map(([label, w, val]) => (
                <div key={label} className="flex items-center gap-2.5 text-[12.5px]">
                  <span className="w-[74px] flex-none text-ink-soft">{label}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span data-w={w} className="block h-full w-0 rounded-full bg-[linear-gradient(90deg,#FFA24A,var(--color-primary))] transition-[width] duration-[1300ms] ease-soft" />
                  </span>
                  <span className="w-[62px] flex-none text-right font-semibold tabular-nums text-ink">{val}</span>
                </div>
              ))}
            </div>
          </Step>

          <Step i={3} title="Tu primești raportul." text="Un raport pe fiecare instructor, cu ore și sume pe activitate, plus bonus. Îl previzualizezi, apoi descarci PDF-ul.">
            <div className={viz}>
              <div className="rounded-[10px] border border-line-soft bg-white p-3 text-[10.5px] text-ink-soft shadow-sm">
                <div className="mb-[7px] flex items-center justify-between border-b border-line-soft pb-[7px]">
                  <b className="text-[11px] text-ink">Raport · Septembrie</b><span>Andrei M.</span>
                </div>
                {DOC_ROWS.map(([a, b]) => (
                  <div key={a} className="flex justify-between py-[3px]"><span>{a}</span><span>{b}</span></div>
                ))}
                <div className="mt-[7px] flex justify-between border-t border-line-soft pt-[7px] text-[11.5px] font-bold text-ink"><span>Total</span><span>2.780 lei</span></div>
              </div>
            </div>
          </Step>
        </div>
      </div>
    </section>
  )
}
