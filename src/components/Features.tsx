import { ChartPie, CircleDollarSign, Clock, Download, FileText, History, Mail, Pencil, Plus, Tags, Timer, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal, SectionHead, sectionAlt, wrap } from './ui'

const FEATURES: [LucideIcon, string, string][] = [
  [Timer, 'Pontaj din browser', 'Alegi activitatea, ora de început și de final — de pe telefon sau laptop. Nimic de instalat.'],
  [CircleDollarSign, 'Tarif per om, per activitate', 'Fiecare instructor are tariful lui. Se fixează la pontaj — istoricul nu se rescrie.'],
  [Plus, 'Bonus lunar', 'Adaugi un bonus pe instructor, iar el intră automat în total.'],
  [FileText, 'Rapoarte lunare PDF', 'Pe fiecare instructor, cu ore și sume pe activitate. Previzualizare live, înainte de descărcare.'],
  [ChartPie, 'Dashboard de companie', 'Ore pe activități, top instructori și comparație cu luna trecută.'],
  [Users, 'Echipă și export CSV', 'Toți oamenii, cu ore, diferențe și brut estimat. Căutare și export într-un click.'],
  [Pencil, 'Corecturi transparente', 'Editezi start și stop. Instructorul vede „Modificat de …”, deci nu apar discuții.'],
  [History, 'Roluri și jurnal', 'Owner, manageri și instructori, cu invitații pe email. Plus jurnal cu cine a schimbat ce.'],
]

// Named exactly like the app's own navigation and profile tabs.
const BADGES: [LucideIcon, string][] = [
  [Clock, 'Pontaje'],
  [Tags, 'Tarife'],
  [Download, 'Rapoarte'],
  [Users, 'Echipă'],
  [Mail, 'Invitații'],
  [History, 'Istoric lunar'],
]

export default function Features() {
  return (
    <section id="functii" className={sectionAlt}>
      <div className={wrap}>
        <SectionHead k="Funcții" title="Cine a lucrat, cât, la ce tarif." />

        <div className="mb-[clamp(40px,5vw,64px)] grid grid-cols-4 gap-3 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          {FEATURES.map(([Icon, title, text], i) => (
            <Reveal key={title} i={i % 4}>
              <div className="group flex h-full cursor-default flex-col gap-2 rounded-[20px] px-5 py-[22px] transition-[background,box-shadow] duration-700 ease-soft hover:bg-white/70 hover:shadow-xs">
                <span className="mb-1.5 grid size-9 place-items-center rounded-full bg-accent text-on-soft transition-colors duration-500 ease-soft group-hover:text-primary">
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                <h4 className="text-base font-bold tracking-[-.01em] text-ink">{title}</h4>
                <p className="text-sm leading-[1.55] text-ink-soft">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="rv flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-ink px-[26px] py-[22px] text-white">
          <div>
            <b className="block text-[length:clamp(20px,2.2vw,26px)] tracking-[-.02em]">45 de zile gratuit, cu toate funcțiile.</b>
            <p className="mt-1 text-sm text-slate-300">Până la 30 de oameni în echipă. Fără card.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {BADGES.map(([Icon, t]) => (
              <span
                key={t}
                className="inline-flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white/90 transition-[background,color] duration-500 ease-soft hover:bg-white/[.18] hover:text-white"
              >
                <Icon size={13} strokeWidth={2.3} className="text-[#FFB877]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
