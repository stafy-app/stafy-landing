import { CalendarDays, Check, ChevronDown } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { viz } from './ui'

// "Pontaj nou" form of the employee app, filled in step by step. Pure CSS: it plays once when the
// enclosing `.rv` (group/step) gets `.in` from landing.ts, so Steps.tsx stays free of client JS.
// Without JS (or before it runs) the finished state is shown.

const at = (s: number): CSSProperties => ({ transitionDelay: `${s}s` })

/** Crossfades a placeholder into the final value at `delay` seconds. */
function Swap({ from, to, delay, className = '' }: { from: ReactNode; to: ReactNode; delay: number; className?: string }) {
  return (
    <span className={`grid ${className}`}>
      <span style={at(delay)} className="hidden [grid-area:1/1] transition-opacity duration-300 js:block group-[.in]/step:opacity-0">{from}</span>
      <span style={at(delay)} className="[grid-area:1/1] transition-opacity duration-300 js:opacity-0 group-[.in]/step:opacity-100">{to}</span>
    </span>
  )
}

const label = 'mb-1 text-[9px] font-semibold uppercase tracking-[.1em] text-ink-muted'
const field = 'flex items-center justify-between rounded-lg border border-line bg-white px-2.5 py-[7px] text-[12px] text-ink'

export default function TimesheetPhone() {
  return (
    <div className={`${viz} !gap-0`}>
      <div className="mb-2.5 text-[12px] font-bold text-ink">Pontaj nou</div>

      <div className={label}>Activitate</div>
      <div className={field}>
        <Swap from={<span className="text-ink-muted">Selectează activitatea…</span>} to={<span className="font-medium">Curs Scratch</span>} delay={0.9} />
        <ChevronDown size={12} className="text-ink-soft" />
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div>
          <div className={label}>Start</div>
          <div className={field}>
            <Swap from={<span className="text-ink-muted">––:––</span>} to={<span className="tabular-nums">16:30</span>} delay={1.6} />
            <CalendarDays size={11} className="text-ink-soft" />
          </div>
        </div>
        <div>
          <div className={label}>Stop</div>
          <div className={field}>
            <Swap from={<span className="text-ink-muted">––:––</span>} to={<span className="tabular-nums">18:00</span>} delay={2.3} />
            <CalendarDays size={11} className="text-ink-soft" />
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3">
        <div className="text-[11px] text-ink-soft">
          Durată:{' '}
          <b className="inline-grid font-bold tabular-nums text-ink">
            <span style={at(2.5)} className="hidden [grid-area:1/1] transition-opacity duration-300 js:inline group-[.in]/step:opacity-0">0h 0m</span>
            <span style={at(2.5)} className="[grid-area:1/1] transition-opacity duration-300 js:opacity-0 group-[.in]/step:opacity-100">1h 30m</span>
          </b>
        </div>
        <div
          style={at(3.3)}
          className="grid min-w-[118px] place-items-center rounded-lg bg-success px-3 py-[7px] text-[11.5px] font-bold text-white transition-[background-color,scale] duration-300 js:bg-primary js:group-[.in]/step:scale-[.97] group-[.in]/step:bg-success"
        >
          <Swap
            delay={3.3}
            from="Salvează pontaj"
            to={<span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Salvat</span>}
            className="place-items-center"
          />
        </div>
      </div>
    </div>
  )
}
