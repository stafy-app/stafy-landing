import { CalendarDays, Check, Tags, ChevronLeft, ChevronRight, Clock, Download, House, Mail, Settings, Users, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import ActivityDonut from './ActivityDonut'
import ReportPaper from './ReportPaper'
import { BrowserBar } from './Frames'
import { useMotionOk, useTweens } from './motion'
import { vars } from './util'

// Mirrors stafy-web-app's company Dashboard (period bar, KPI strip, activity donut) with school data.
// The ring uses the same palette/geometry as the app's ActivityDonut.

interface Slice {
  name: string
  hours: number
  color: string
}

interface Ev {
  act: number
  who: string
  sub: string
  mins: number
  pay: number
  rate: string
}

const SLICES: Slice[] = [
  { name: 'Curs Scratch', hours: 120, color: '#2a78d6' },
  { name: 'Curs Robotică', hours: 86, color: '#008300' },
  { name: 'Recuperare', hours: 54, color: '#e87ba4' },
  { name: 'Lecții demo', hours: 32, color: '#eda100' },
  { name: 'Altele', hours: 20, color: '#94a3b8' },
]
const BASE_HOURS = SLICES.reduce((s, x) => s + x.hours, 0) // 312
const BASE_PAY = 14280

// One simulated timesheet arriving at a time; the loop cycles through them, then resets.
const EVENTS: Ev[] = [
  { act: 0, who: 'Andrei M.', sub: 'Curs Scratch', mins: 90, pay: 180, rate: '120 lei/h' },
  { act: 1, who: 'Dana S.', sub: 'Curs Robotică', mins: 120, pay: 200, rate: '100 lei/h' },
  { act: 2, who: 'Mihai P.', sub: 'Recuperare', mins: 60, pay: 100, rate: '100 lei/h' },
  { act: 3, who: 'Ioana R.', sub: 'Lecție demo', mins: 30, pay: 80, rate: '80 lei/sesiune' },
]

const NAV: [LucideIcon, string][] = [[House, 'Acasă'], [Users, 'Echipă'], [Mail, 'Invitații'], [Download, 'Rapoarte'], [Settings, 'Setări']]

const fmtMoney = (n: number) => Math.round(n).toLocaleString('ro-RO') + ' lei'

const floatChip =
  'absolute z-[3] flex items-center gap-[11px] whitespace-nowrap rounded-2xl border border-line-soft bg-white px-4 py-[13px] text-[13px] font-semibold text-ink shadow-md animate-bob max-[1040px]:hidden'
const chipIcon = 'grid size-[30px] flex-none place-items-center rounded-[9px] bg-accent text-on-soft'
const chipSub = 'block text-[11.5px] font-medium text-ink-muted'

const card = 'rounded-xl bg-white shadow-sm'
const kpiLabel = 'pr-7 text-[8.5px] font-semibold uppercase leading-tight tracking-[.08em] text-ink-muted @xl:text-[9.5px]'
const kpiIcon = 'absolute right-2.5 top-2.5 grid size-[22px] place-items-center rounded-md bg-accent text-primary @xl:right-3 @xl:top-3 @xl:size-6'
const kpiValue = 'mt-2 whitespace-nowrap text-[length:clamp(16px,5vw,22px)] font-bold tracking-[-.02em] tabular-nums text-ink @xl:text-[22px]'

export default function HeroApp() {
  const motionOk = useMotionOk()
  const [started, setStarted] = useState(false)
  const [ev, setEv] = useState(0)
  const [dur, setDur] = useState(0)
  const [hot, setHot] = useState<Ev | null>(null)
  const [page, setPage] = useState<0 | 1>(0)
  const [picked, setPicked] = useState(false)
  const [grabbing, setGrabbing] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y: number; top: number } | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  // 'armed' = JS is up and motion is allowed but the intro hasn't played yet (everything starts empty).
  const armed = motionOk && !started

  const targets = useMemo(() => {
    if (armed) return [...SLICES.map(() => 0), 0]
    const applied = EVENTS.slice(0, ev)
    return [
      ...SLICES.map((s, i) => s.hours + applied.filter((e) => e.act === i).reduce((a, e) => a + e.mins / 60, 0)),
      BASE_PAY + applied.reduce((a, e) => a + e.pay, 0),
    ]
  }, [armed, ev])
  const vals = useTweens(targets, dur)

  useEffect(() => {
    if (!motionOk) return
    let timer: ReturnType<typeof setTimeout> | undefined
    let n = 0

    const tick = () => {
      n = (n + 1) % (EVENTS.length + 1)
      setDur(n === 0 ? 700 : 900)
      setEv(n)
      setHot(n === 0 ? null : EVENTS[n - 1])
      timer = setTimeout(tick, n === 0 ? 2400 : 3400)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        clearTimeout(timer)
        timer = undefined
        if (!e.isIntersecting) return
        const first = !startedRef.current
        if (first) {
          startedRef.current = true
          setDur(1300)
          setStarted(true)
        }
        timer = setTimeout(tick, first ? 3400 : 1800)
      },
      { threshold: 0.25 },
    )
    if (rootRef.current) io.observe(rootRef.current)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [motionOk])

  // Opening the report glides it down to show the rest of the page; any wheel/touch/drag hands control to the user.
  useEffect(() => {
    const el = reportRef.current
    if (page !== 1 || !motionOk || !el) return
    el.scrollTop = 0
    let raf = 0
    let stopped = false
    const t0 = performance.now() + 1200
    const step = (t: number) => {
      if (stopped) return
      const p = Math.min(1, Math.max(0, (t - t0) / 9000))
      const k = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      el.scrollTop = (el.scrollHeight - el.clientHeight) * 0.45 * k
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    const stop = () => {
      stopped = true
      cancelAnimationFrame(raf)
    }
    el.addEventListener('wheel', stop, { passive: true })
    el.addEventListener('pointerdown', stop)
    el.addEventListener('touchstart', stop, { passive: true })
    return () => {
      stop()
      el.removeEventListener('wheel', stop)
      el.removeEventListener('pointerdown', stop)
      el.removeEventListener('touchstart', stop)
    }
  }, [page, motionOk])

  const hours = vals.slice(0, SLICES.length)
  const pay = vals[SLICES.length]
  const sum = hours.reduce((a, b) => a + b, 0)
  const denom = Math.max(sum, BASE_HOURS) // keeps the ring sweeping open during the intro

  const enter = (i: number) => ({
    className: armed ? 'opacity-0' : motionOk ? 'animate-slidein [animation-delay:calc(var(--i)*110ms)] [animation-fill-mode:backwards]' : '',
    style: vars({ '--i': i }),
  })


  const chips = (
    <>
      <div className={`${floatChip} -left-[30px] -top-[40px]`}>
        <span className={chipIcon}><Check size={15} strokeWidth={2.6} /></span>
        <span key={hot?.who ?? 'rest'} className={`flex flex-col gap-0.5 ${hot ? 'animate-slidein' : ''}`}>
          Pontat acum<span className={chipSub}>{hot ? `${hot.who} · ${hot.sub}` : 'Andrei M. · Curs Scratch'}</span>
        </span>
      </div>
      <div className={`${floatChip} -bottom-6 -right-[26px] [animation-delay:-2s] [animation-duration:8.4s]`}>
        <span className={chipIcon}><Tags size={15} strokeWidth={2.4} /></span>
        <span key={ev} className={`flex flex-col gap-0.5 ${hot ? 'animate-slidein' : ''}`}>
          Tarif aplicat<span className={chipSub}>{hot ? `${hot.rate} · ${hot.sub}` : '120 lei/h · Curs Scratch'}</span>
        </span>
      </div>
    </>
  )

  return (
    <>
    {chips}
    <div id="app" ref={rootRef} className="@container overflow-hidden rounded-[22px] border border-line-soft bg-white shadow-lg will-change-transform">
      <BrowserBar
        active={page}
        hint={!picked}
        onSelect={(i) => {
          setPage(i)
          setPicked(true)
        }}
      />

      <div className="relative">
      <div className={`flex bg-base-200 transition-opacity duration-500 ease-soft ${page === 1 ? 'invisible opacity-0' : ''}`}>
        <aside className="hidden w-[52px] flex-none flex-col items-center gap-1.5 border-r border-line-soft bg-white py-3 @sm:flex">
          <img src="/assets/stafy_logo.svg" alt="" width={24} height={24} className="mb-2.5 size-6" />
          {NAV.map(([Icon, label], i) => (
            <span key={label} title={label} className={`grid size-8 place-items-center rounded-lg ${i === 0 ? 'bg-accent text-primary' : 'text-ink-soft'}`}>
              <Icon size={15} strokeWidth={2} />
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 border-b border-line-soft bg-white px-3.5 py-3 @xl:px-[18px]">
            <div className="min-w-0">
              <div className="text-[15px] font-bold leading-tight tracking-[-.01em] text-ink">Dashboard</div>
              <div className="truncate text-[11px] text-ink-muted">Prezentare generală a echipei tale</div>
            </div>
            <div className="hidden h-7 min-w-0 items-center @lg:flex">
              {hot && (
                <span key={ev} className="flex animate-slidein items-center gap-1.5 truncate rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[10.5px] font-semibold text-success">
                  <i className="size-[5px] flex-none animate-pulse-ring rounded-full bg-success [--ring:rgb(22_163_74/.45)]" />
                  <span className="truncate">{hot.who} a pontat {hot.mins} min · {hot.sub}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 p-2.5 @xl:gap-3 @xl:p-3.5">
            <div className={`${card} flex items-center gap-2.5 px-3 py-2.5 ${enter(0).className}`} style={enter(0).style}>
              <span className="grid size-8 flex-none place-items-center rounded-lg bg-accent text-primary"><CalendarDays size={15} strokeWidth={2} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[8.5px] font-semibold uppercase tracking-[.1em] text-ink-muted">Perioadă</span>
                <span className="block truncate text-[15px] font-bold leading-tight tracking-[-.01em] text-ink">Septembrie 2026</span>
              </span>
              <span className="flex flex-none items-center gap-1.5">
                {[ChevronLeft, ChevronRight].map((Icon, i) => (
                  <span key={i} className="grid size-6 place-items-center rounded-md border border-line text-ink-soft"><Icon size={13} /></span>
                ))}
                <span className="hidden whitespace-nowrap rounded-full border border-primary px-2.5 py-[3px] text-[10px] font-semibold text-primary @lg:block">Sări la luna curentă</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 @xl:grid-cols-4">
              <div className={`${card} relative px-3 py-2.5 ${enter(1).className}`} style={enter(1).style}>
                <div className={kpiLabel}>Angajați activi</div>
                <span className={kpiIcon}><Users size={13} /></span>
                <div className={kpiValue}>9</div>
              </div>
              <div className={`${card} relative px-3 py-2.5 ${enter(2).className}`} style={enter(2).style}>
                <div className={kpiLabel}>Total ore</div>
                <span className={kpiIcon}><Clock size={13} /></span>
                <div className={kpiValue}>{sum.toFixed(1)}h</div>
              </div>
              <div
                className={`${card} relative px-3 py-2.5 transition-shadow duration-700 ease-soft ${enter(3).className} ${hot ? 'shadow-[0_0_0_1.5px_rgb(255_107_0/.45),0_10px_24px_rgb(255_107_0/.14)]' : ''}`}
                style={enter(3).style}
              >
                <div className={kpiLabel}>Total plată</div>
                <span className={kpiIcon}><Wallet size={13} /></span>
                <div className={`${kpiValue} ${hot ? 'text-primary' : ''} transition-colors duration-700`}>{fmtMoney(pay)}</div>
              </div>
              <div className={`${card} relative px-3 py-2.5 ${enter(4).className}`} style={enter(4).style}>
                <div className={kpiLabel}>Invitații</div>
                <span className={kpiIcon}><Mail size={13} /></span>
                <div className={kpiValue}>0</div>
              </div>
            </div>

            <div className={`${card} p-3 @xl:p-3.5 ${enter(5).className}`} style={enter(5).style}>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-bold tracking-[-.01em] text-ink">Distribuția activităților</span>
                <span className="text-[10px] text-ink-muted">septembrie 2026</span>
              </div>
              <div className="grid items-center gap-3 @md:grid-cols-[150px_1fr] @md:gap-4">
                <div className="mx-auto w-full max-w-[150px]">
                  <ActivityDonut hours={hours} colors={SLICES.map((x) => x.color)} denom={denom} label="Distribuția orelor pe activități">
                    <span className="text-[24px] font-bold leading-none tabular-nums text-ink">{Math.round(sum)}</span>
                    <span className="mt-1 text-[10px] text-ink-muted">total ore</span>
                  </ActivityDonut>
                </div>

                <div className="flex flex-col gap-1.5">
                  {SLICES.map((s, i) => (
                    <div
                      key={s.name}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors duration-700 ease-soft ${hot?.act === i ? 'bg-accent' : 'bg-base-200'}`}
                    >
                      <span className="size-2 flex-none rounded-full" style={{ background: s.color }} />
                      <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink">{s.name}</span>
                      <span className="text-[11.5px] font-semibold tabular-nums text-ink">{hours[i].toFixed(1)}h</span>
                      <span className="w-8 flex-none text-right text-[10.5px] tabular-nums text-ink-muted">{Math.round((hours[i] / denom) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={reportRef}
        aria-hidden={page === 0}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') return
          drag.current = { y: e.clientY, top: e.currentTarget.scrollTop }
          e.currentTarget.setPointerCapture(e.pointerId)
          setGrabbing(true)
        }}
        onPointerMove={(e) => {
          if (drag.current) e.currentTarget.scrollTop = drag.current.top - (e.clientY - drag.current.y)
        }}
        onPointerUp={() => {
          drag.current = null
          setGrabbing(false)
        }}
        onPointerCancel={() => {
          drag.current = null
          setGrabbing(false)
        }}
        className={`absolute inset-0 select-none overflow-y-auto bg-[#dde1e7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-500 ease-soft ${
          grabbing ? 'cursor-grabbing' : 'cursor-grab'
        } ${page === 1 ? '' : 'pointer-events-none opacity-0'}`}
      >
        <div className="mx-auto my-4 w-[min(78%,420px)]">
          <ReportPaper />
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
