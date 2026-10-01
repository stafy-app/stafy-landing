import { ArrowUp, CalendarDays, ChartPie, ChevronDown, ChevronLeft, ChevronRight, Clock, Eye, History, House, MoreVertical, Pencil, Plus, Tags, User, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ActivityDonut, { DONUT_COLORS } from './ActivityDonut'
import { IPhone, MacWindow } from './Frames'
import { useMotionOk, useTweens } from './motion'
import { SectionHead, section, wrap } from './ui'
import { vars } from './util'

// Right-hand panel: one instructor, seen by the manager (profile + Pontaje tab) and by the instructor
// (personal "Pontajul meu" screen). Figures match ReportModal: 28 sessions, 43 h, 4.790 lei.

const BULLETS: [LucideIcon, string][] = [
  [ChartPie, 'Ore, sume și activități pe fiecare om, comparate cu luna trecută'],
  [Pencil, 'Corectezi orice pontaj — instructorul vede „Modificat de …”'],
  [Plus, 'Bonus lunar pe instructor, inclus automat în total'],
  [Eye, 'Instructorul își vede singur orele și câștigurile, deci mai puține întrebări la final de lună'],
  [History, 'Jurnal de modificări: cine a schimbat tarife, bonusuri sau pontaje, și când'],
]

// Rates: Curs Scratch 120 lei/h, Curs Python 130, Recuperări 100, Lecții demo 80, Tabără de vară 75. Same figures as ReportPaper.
interface Row {
  date: string
  from: string
  to: string
  toFixed?: string
  act: string
  /** lei per hour */
  rate: number
  h: number
  hFixed?: number
  edit?: boolean
}

const ROWS: Row[] = [
  { date: 'mie., 30 sept.', from: '16:30', to: '18:00', toFixed: '18:30', act: 'Curs Scratch', rate: 120, h: 1.5, hFixed: 2, edit: true },
  { date: 'mar., 29 sept.', from: '17:20', to: '18:20', act: 'Lecții demo', rate: 80, h: 1 },
  { date: 'lun., 28 sept.', from: '16:45', to: '17:45', act: 'Recuperări', rate: 100, h: 1 },
  { date: 'vin., 25 sept.', from: '10:00', to: '12:00', act: 'Curs Python', rate: 130, h: 2 },
  { date: 'joi., 24 sept.', from: '16:30', to: '18:00', act: 'Curs Scratch', rate: 120, h: 1.5 },
]

const DONUT = [
  { name: 'Curs Scratch', hours: 18 },
  { name: 'Curs Python', hours: 12 },
  { name: 'Tabără de vară', hours: 6 },
  { name: 'Lecții demo', hours: 4 },
  { name: 'Altele', hours: 3 },
]

const TABS = ['Pontaje', 'Tarife', 'Istoric lunar']
const NAV: [LucideIcon, string][] = [[House, 'Acasă'], [Clock, 'Pontaj'], [History, 'Istoric'], [Tags, 'Tarife'], [User, 'Profil']]

const money = (n: number) => Math.round(n).toLocaleString('ro-RO')
const th = 'pb-1.5 pr-3 text-[9px] font-semibold uppercase tracking-[.06em] text-ink-muted'
const stagger = (i: number) => ({ style: vars({ '--i': i }), className: 'animate-slidein [animation-delay:calc(var(--i)*70ms)] [animation-fill-mode:backwards]' })

type View = 'manager' | 'instructor'

function ManagerView({ stage }: { stage: number }) {
  const fixed = stage === 2
  const targets = useMemo(() => [fixed ? 43 : 42.5, fixed ? 4790 : 4730], [fixed])
  const [hours, pay] = useTweens(targets, 900)
  const card = 'rounded-xl bg-white shadow-sm'

  return (
    <div className="flex flex-col gap-2.5">
      <div {...stagger(0)}>
        <div className="flex items-center gap-1.5 text-[10px] text-ink-muted">Echipă <ChevronRight size={10} /> Profil angajat</div>
        <div className="text-[17px] font-bold leading-tight tracking-[-.01em] text-ink">Profil angajat</div>
      </div>

      <div {...stagger(1)} className={`${card} ${stagger(1).className} flex flex-wrap items-center gap-x-4 gap-y-3 p-3.5`}>
        <span className="grid size-11 flex-none place-items-center rounded-full bg-accent text-[15px] font-bold text-on-soft">AM</span>
        <span className="min-w-0 flex-1 basis-40">
          <span className="flex flex-wrap items-center gap-1.5">
            <b className="text-[16px] tracking-[-.01em] text-ink">Andrei Mihalache</b>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success"><i className="size-1.5 rounded-full bg-success" />Activ</span>
          </span>
          <span className="block truncate text-[10.5px] text-ink-muted">andrei@scoala-delta.ro</span>
          <span className="block truncate text-[10.5px] text-ink-muted">Membru din 3 septembrie 2025</span>
        </span>
        <span className="flex items-center gap-4 border-l border-line-soft pl-4">
          <span>
            <span className="block text-[8.5px] font-semibold uppercase tracking-[.06em] text-ink-muted">Ore luna curentă</span>
            <span className="flex items-baseline gap-1.5">
              <b className="text-[16px] tabular-nums text-ink">{hours.toFixed(1)}h</b>
              <span className="inline-flex items-center text-[10px] font-semibold text-success"><ArrowUp size={10} />6.0h</span>
            </span>
          </span>
          <span>
            <span className="block text-[8.5px] font-semibold uppercase tracking-[.06em] text-ink-muted">Estimat de plată</span>
            <b className="block whitespace-nowrap text-[16px] tabular-nums text-ink">{money(pay)} RON</b>
          </span>
          <MoreVertical size={15} className="text-ink-soft" />
        </span>
      </div>

      <div {...stagger(2)} className={`${stagger(2).className} flex gap-1 border-b border-line-soft text-[12px] font-semibold`}>
        {TABS.map((t, i) => (
          <span key={t} className={`-mb-px border-b-2 px-3 py-2 ${i === 0 ? 'border-primary text-ink' : 'border-transparent text-ink-muted'}`}>{t}</span>
        ))}
      </div>

      <div {...stagger(3)} className={`${stagger(3).className} grid gap-2.5 @lg:grid-cols-[1fr_190px]`}>
        <div className={`${card} flex items-center gap-2.5 px-3 py-2.5`}>
          <span className="grid size-8 flex-none place-items-center rounded-lg bg-accent text-primary"><CalendarDays size={15} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[8.5px] font-semibold uppercase tracking-[.1em] text-ink-muted">Perioadă</span>
            <b className="block truncate text-[14px] leading-tight text-ink">Septembrie 2026</b>
          </span>
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <span key={i} className="grid size-6 flex-none place-items-center rounded-md border border-line text-ink-soft"><Icon size={13} /></span>
          ))}
        </div>
        <div className={`${card} hidden p-2.5 @lg:block`}>
          <div className="mb-1.5 text-[8.5px] font-semibold uppercase tracking-[.1em] text-ink-muted">Bonus</div>
          <div className="mb-1.5 rounded-md border border-line px-2 py-1 text-right text-[10px] text-ink-muted">0</div>
          <div className="mb-1.5 flex gap-1">
            {['+100', '+250', '+500'].map((c) => <span key={c} className="flex-1 rounded-full border border-ink/80 py-0.5 text-center text-[9px] font-semibold text-ink">{c}</span>)}
          </div>
          <div className="rounded-md bg-line-soft py-1 text-center text-[9.5px] font-semibold text-ink-muted">Salvează bonus</div>
        </div>
      </div>

      <div {...stagger(4)} className={`${card} ${stagger(4).className} overflow-hidden p-3`}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <span>
            <b className="block text-[14px] text-ink">Pontaje</b>
            <span className="block text-[10.5px] tabular-nums text-ink-muted">28 înregistrări · {hours.toFixed(1)}h total</span>
          </span>
          <span className="hidden items-center gap-6 rounded-lg border border-line px-2.5 py-1 text-[10.5px] text-ink @sm:flex">Toate activitățile <ChevronDown size={11} /></span>
        </div>
        <table className="w-full text-left text-[11.5px] tabular-nums">
          <thead>
            <tr>
              <th className={th}>Dată</th>
              <th className={th}>Interval</th>
              <th className={`${th} hidden @md:table-cell`}>Activitate</th>
              <th className={`${th} hidden text-right @sm:table-cell`}>Durată</th>
              <th className={`${th} hidden text-right @lg:table-cell`}>Tarif</th>
              <th className={`${th} text-right`}>Sumă</th>
              <th className={`${th} !pr-0 text-right`} />
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const edited = !!r.edit
              const done = edited && fixed
              const editing = edited && stage === 1
              const h = (done && r.hFixed) || r.h
              return (
                <tr key={r.date} className={`border-t border-line-soft transition-colors duration-700 ${edited && stage > 0 ? 'bg-tint' : ''}`}>
                  <td className="py-2 pr-3 align-top">
                    <span className="block whitespace-nowrap text-ink">{r.date}</span>
                    {edited && (
                      <span className={`block whitespace-nowrap text-[9px] text-ink-muted transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}>Modificat de Maria</span>
                    )}
                  </td>
                  <td className="py-2 pr-3 align-top text-ink">
                    {editing ? (
                      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-primary bg-white px-1.5 py-0.5 shadow-[0_0_0_3px_rgb(255_107_0/.12)]">
                        {r.from}–{r.to}<i className="h-3 w-px animate-pulse bg-primary" />
                      </span>
                    ) : (
                      <span className="whitespace-nowrap">{r.from}–{done ? (r.toFixed ?? r.to) : r.to}</span>
                    )}
                  </td>
                  <td className="hidden py-2 pr-3 align-top @md:table-cell"><span className="whitespace-nowrap rounded-md bg-base-200 px-1.5 py-0.5 text-[10px] text-ink-soft">{r.act}</span></td>
                  <td className="hidden py-2 pr-3 text-right align-top text-ink @sm:table-cell">{h.toFixed(1)}h</td>
                  <td className="hidden py-2 pr-3 text-right align-top text-ink-muted @lg:table-cell">{r.rate},00 lei</td>
                  <td className={`py-2 pr-3 text-right align-top font-bold transition-colors duration-700 ${done ? 'text-primary' : 'text-ink'}`}>{money(h * r.rate)} lei</td>
                  <td className="py-2 text-right align-top"><Pencil size={12} className={`ml-auto transition-colors duration-500 ${stage === 1 && edited ? 'text-primary' : 'text-ink-muted'}`} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="border-t border-line-soft pt-2 text-center text-[10px] text-ink-muted">încă 23 de pontaje în septembrie 2026</p>
      </div>
    </div>
  )
}

function InstructorView() {
  const total = DONUT.reduce((a, d) => a + d.hours, 0)
  const motionOk = useMotionOk()
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 250)
    return () => clearTimeout(t)
  }, [])
  // Rings sweep open from empty once mounted; reduced motion / server render shows them filled.
  const targets = useMemo(() => DONUT.map((d) => (go || !motionOk ? d.hours : 0)), [go, motionOk])
  const hours = useTweens(targets, 1100)
  const tile = 'rounded-xl bg-white p-3 shadow-sm'
  const k = 'text-[8.5px] font-semibold uppercase tracking-[.08em] text-ink-muted'
  const v = 'mt-1.5 text-[19px] font-bold tabular-nums tracking-[-.02em] text-ink'

  return (
    <IPhone className="max-w-[290px]">
      <div className="flex items-center justify-between bg-white px-3.5 pb-2.5 pt-1">
        <span>
          <b className="block text-[14px] leading-tight text-ink">Pontajul meu</b>
          <span className="block text-[9.5px] text-ink-muted">Orele și câștigurile tale luna aceasta</span>
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-accent text-[9.5px] font-bold text-on-soft">AM</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="grid grid-cols-2 gap-2">
          <div {...stagger(0)} className={`${tile} relative ${stagger(0).className}`}>
            <div className={k}>Total ore</div>
            <span className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-md bg-accent text-primary"><Clock size={11} /></span>
            <div className={v}>{total.toFixed(1)}h</div>
          </div>
          <div {...stagger(1)} className={`${tile} relative ${stagger(1).className}`}>
            <div className={k}>Total de plată</div>
            <span className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-md bg-accent text-primary"><Wallet size={11} /></span>
            <div className={v}>4.790 lei</div>
          </div>
          <div {...stagger(2)} className={`${tile} relative ${stagger(2).className}`}>
            <div className={k}>Tarif mediu</div>
            <span className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-md bg-accent text-primary"><Wallet size={11} /></span>
            <div className={v}>111 lei/h</div>
          </div>
        </div>

        <div {...stagger(3)} className={`${tile} ${stagger(3).className}`}>
          <div className="mb-2 flex items-baseline justify-between">
            <b className="text-[11.5px] text-ink">Distribuția activităților</b>
            <span className="text-[9px] text-ink-muted">septembrie 2026</span>
          </div>
          <div className="grid grid-cols-[88px_1fr] items-center gap-3">
            <ActivityDonut hours={hours} colors={DONUT_COLORS} denom={total} label="Distribuția orelor pe activități">
              <span className="text-[17px] font-bold leading-none tabular-nums text-ink">{Math.round(hours.reduce((a, b) => a + b, 0))}</span>
              <span className="mt-0.5 text-[8px] text-ink-muted">total ore</span>
            </ActivityDonut>
            <div className="flex flex-col gap-1">
              {DONUT.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1.5 text-[10px]">
                  <i className="size-1.5 flex-none rounded-full" style={{ background: DONUT_COLORS[i] }} />
                  <span className="min-w-0 flex-1 truncate text-ink">{d.name}</span>
                  <b className="tabular-nums text-ink">{hours[i].toFixed(0)}h</b>
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="px-1 text-[9px] leading-snug text-ink-muted">Pontajele tale apar și în statisticile școlii, la fel ca ale oricărui instructor.</p>
      </div>

      <div className="flex justify-around border-t border-line-soft bg-white pb-5 pt-2">
        {NAV.map(([Icon, name], i) => (
          <span key={name} className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold ${i === 0 ? 'text-primary' : 'text-ink-muted'}`}>
            <Icon size={15} strokeWidth={2} />
            {name}
          </span>
        ))}
      </div>
    </IPhone>
  )
}

export default function Manager() {
  const motionOk = useMotionOk()
  const [view, setView] = useState<View>('manager')
  const [step, setStep] = useState(0)
  // Reduced motion / server render: show the corrected end state.
  const stage = motionOk ? step : 2

  useEffect(() => {
    if (!motionOk || view !== 'manager') return
    const t1 = setTimeout(() => setStep(1), 1800)
    const t2 = setTimeout(() => setStep(2), 3300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [motionOk, view])

  const pick = (next: View) => {
    setView(next)
    setStep(0)
  }

  return (
    <section id="manager" className={section}>
      <div className={`${wrap} grid grid-cols-2 items-center gap-[clamp(28px,4vw,60px)] max-[900px]:grid-cols-1`}>
        <div className="rv min-[901px]:order-2">
          <div className="mb-4 flex justify-center">
            <div role="tablist" aria-label="Vedere" className="relative inline-grid grid-cols-2 rounded-full bg-base-200 p-1 text-[12.5px] font-semibold">
              <i
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-500 ease-soft ${view === 'instructor' ? 'translate-x-full' : ''}`}
              />
              {([['manager', 'Managerul vede'], ['instructor', 'Instructorul vede']] as const).map(([key, text]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={view === key}
                  onClick={() => pick(key)}
                  className={`relative z-[1] whitespace-nowrap rounded-full px-4 py-1.5 transition-colors ${view === key ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
          <div key={view} className="flex min-h-[640px] items-center justify-center max-[900px]:min-h-0">
            {view === 'manager' ? (
              <MacWindow tabs={['Profil angajat · Stafy', 'Echipă · Stafy']}>
                <ManagerView stage={stage} />
              </MacWindow>
            ) : (
              <InstructorView />
            )}
          </div>
        </div>

        <SectionHead flush k="Ce vezi ca manager" title="Luna e deschisă în față, nu strânsă la final.">
          <div className="mt-2 divide-y divide-ink/[.07]">
            {BULLETS.map(([Icon, text]) => (
              <div key={text} className="flex items-start gap-3.5 py-[18px]">
                <span className="mt-px grid size-[26px] flex-none place-items-center rounded-lg bg-accent text-on-soft"><Icon size={14} strokeWidth={2.4} /></span>
                <p className="text-base leading-[1.55] text-ink">{text}</p>
              </div>
            ))}
          </div>
        </SectionHead>
      </div>
    </section>
  )
}
