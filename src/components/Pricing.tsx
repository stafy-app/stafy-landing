import { ArrowRight, Check } from 'lucide-react'
import { CONTACT_EMAIL } from '../config'
import { Reveal, SectionHead, sectionIntoBand, wrap } from './ui'

const ALL = ['Toate cele 8 funcții', 'Manageri și instructori']

interface Plan {
  name: string
  seats: string
  desc: string
  price?: string
  items: readonly string[]
  /** 0-100: how much of the 30-seat ceiling the plan covers (drives the bar) */
  cap: number
  featured?: boolean
  xl?: boolean
}

const PLANS: Plan[] = [
  { name: 'Solo', seats: '0', desc: 'Doar tu. Îți pontezi propriile ore.', price: 'Gratuit', cap: 4, items: ['Pontaj și rapoarte pentru tine'] },
  { name: 'Mic', seats: '5', desc: 'O școală mică, cu câțiva instructori.', cap: 17, items: ALL },
  { name: 'Standard', seats: '15', desc: 'O școală în creștere, cu mai multe tipuri de cursuri.', cap: 50, items: ALL, featured: true },
  { name: 'Mare', seats: '30', desc: 'Echipe mari, cu mai mulți manageri.', cap: 100, items: ALL },
  { name: 'Pe măsură', seats: '30+', desc: 'Rețele de școli sau echipe mari.', price: 'Vorbim', cap: 100, items: [], xl: true },
]

export default function Pricing() {
  return (
    <section id="pricing" className={`${sectionIntoBand} !pb-[clamp(56px,6vw,88px)]`}>
      <div className={wrap}>
        <SectionHead k="Prețuri" title="Toate funcțiile, în fiecare plan. Alegi doar câți oameni are echipa." />

        <div className="rv mb-14 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-[clamp(20px,3vw,40px)] border-y border-line py-8 max-[600px]:grid-cols-1">
          <div className="whitespace-nowrap text-[length:clamp(48px,6vw,76px)] font-bold leading-none tracking-[-.05em] text-primary">
            0 lei<small className="ml-1.5 text-[.32em] font-semibold tracking-normal text-ink-muted">pentru tine</small>
          </div>
          <div>
            <b className="block text-[length:clamp(20px,2.2vw,26px)] leading-tight tracking-[-.02em] text-ink">Tu, ca owner, nu ocupi niciun loc și îți poți ponta și tu orele.</b>
            <p className="mt-2 max-w-[620px] text-[15.5px] leading-[1.55] text-ink-soft">Plătești doar pentru echipă. Dacă predai și tu, îți pontezi cursurile ca orice instructor, cu tariful tău pe oră.</p>
          </div>
        </div>

        <div className="rv mb-2.5 flex flex-wrap items-baseline justify-between gap-4 text-[13px] font-semibold uppercase tracking-[.12em] text-ink-muted">
          Alege mărimea echipei<span className="font-medium normal-case tracking-normal">Prețurile se anunță în curând · fără TVA</span>
        </div>
        <div className="grid grid-cols-5 gap-3.5 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2 max-[480px]:grid-cols-1">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} i={i}>
              <div
                data-bars
                className={`group relative flex h-full flex-col gap-1.5 overflow-hidden rounded-[22px] px-6 pb-7 pt-8 shadow-xs ring-1 transition-shadow duration-700 ease-soft hover:shadow-md before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-700 before:ease-soft before:content-[''] before:bg-[radial-gradient(120%_70%_at_50%_0%,rgb(255_107_0/.11),transparent_70%)] hover:before:opacity-100 ${
                  p.featured
                    ? 'bg-[linear-gradient(170deg,#fff,#fff8f1_60%,#fff3e8)] ring-primary/[.09]'
                    : 'bg-[linear-gradient(180deg,#fff,#fbf8f5)] ring-ink/[.04]'
                }`}
              >
                {p.featured && <span className="badge badge-primary badge-sm absolute left-6 top-2.5 whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[.1em]">Cel mai des ales</span>}
                <div className="relative text-base font-bold tracking-[-.01em]">{p.name}</div>
                <div className="relative mt-3 flex items-baseline gap-1.5">
                  <b
                    className={`text-[52px] font-bold leading-none tracking-[-.05em] transition-colors duration-500 ${
                      p.xl ? 'text-ink-muted' : 'text-ink group-hover:text-primary'
                    }`}
                  >
                    {p.seats}
                  </b>
                  <span className="text-sm text-ink-muted">locuri</span>
                </div>
                <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-ink/[.06]" aria-hidden="true">
                  <i
                    data-w={p.cap}
                    className={`block h-full w-0 rounded-full transition-[width,filter] duration-[1300ms] ease-soft group-hover:brightness-110 ${
                      p.xl ? 'bg-[linear-gradient(90deg,#FFC48F,rgb(255_107_0/.15))]' : 'bg-[linear-gradient(90deg,#FFC48F,var(--color-primary))]'
                    }`}
                  />
                </div>
                <div className="relative mt-2 min-h-[42px] text-[13.5px] leading-[1.5] text-ink-soft">{p.desc}</div>
                {p.price ? (
                  <div className="relative mt-2.5 text-[22px] font-bold tracking-[-.02em] text-ink">{p.price}</div>
                ) : (
                  <span className={`badge badge-lg relative mt-2.5 self-start border-0 text-[15px] font-semibold ${p.featured ? 'bg-white/80 text-on-soft' : 'bg-slate-100 text-ink-muted'}`}>În curând</span>
                )}
                {p.items.length > 0 && (
                  <ul className="relative mt-3.5 flex flex-col gap-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-[9px] text-[13.5px] leading-[1.45] text-ink-soft">
                        <Check size={13} strokeWidth={3} className="mt-[3px] flex-none text-success" />{it}
                      </li>
                    ))}
                  </ul>
                )}
                {p.xl && (
                  <a className="relative mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-primary" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Echipă peste 30')}`}>
                    Scrie-ne <ArrowRight size={15} className="transition-transform duration-[450ms] ease-soft group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="rv mt-7 max-w-[760px] text-[13.5px] leading-[1.65] text-ink-muted">
          Toate prețurile sunt fără TVA. Un loc = un instructor sau manager activ; un membru suspendat eliberează locul.
        </p>
      </div>
    </section>
  )
}
