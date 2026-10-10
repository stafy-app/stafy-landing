import type { ReactNode } from 'react'
import { vars } from './util'

export const wrap = 'relative z-[2] mx-auto w-full max-w-[1680px] px-[clamp(20px,4vw,80px)]'
/** Section shell. Bands never end in a hard edge: alt sections fade in and out of the page background. */
export const section = 'relative overflow-x-clip py-[clamp(72px,9vw,132px)]'
/** Alternate band: slightly cooler background that melts into its neighbours instead of ending in a line. */
export const sectionAlt = `${section} bg-[linear-gradient(to_bottom,transparent,var(--color-band)_clamp(96px,14vw,200px),var(--color-band)_calc(100%-clamp(96px,14vw,200px)),transparent)]`
/** Plain section whose background melts into the band colour at its bottom edge; the next section starts on that band. */
export const sectionIntoBand = `${section} bg-[linear-gradient(to_bottom,transparent_calc(100%-clamp(96px,14vw,200px)),var(--color-band))]`
/** Band section that starts already on the band colour (no fade in) and fades out at the bottom. */
export const sectionFromBand = `${section} bg-[linear-gradient(to_bottom,var(--color-band)_calc(100%-clamp(96px,14vw,200px)),transparent)]`
/** Illustration box of a "Cum merge" step: one fixed height so the three cards line up. */
export const viz = 'mt-auto flex h-[252px] flex-col justify-center gap-2.5 rounded-[14px] border border-ink/[.07] bg-white/70 p-4'
export const panel = 'card rounded-[20px] border border-line-soft bg-white shadow-md'

const btnBase = 'btn group rounded-full font-semibold shadow-none whitespace-nowrap'
export const btnPrimary = `${btnBase} btn-primary hover:-translate-y-px`
export const btnLight = `${btnBase} border-transparent bg-white text-ink shadow-sm hover:-translate-y-px hover:shadow-md`
export const btnQuiet = `${btnBase} btn-ghost text-ink-soft hover:text-ink`
export const arrow = 'transition-transform duration-[450ms] ease-soft group-hover:translate-x-1'

/** Scroll-reveal wrapper. Keep hover/transform effects on the child, not here. */
export function Reveal({ i = 0, className = '', children }: { i?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`rv rv-s ${className}`} style={vars({ '--i': i })}>
      {children}
    </div>
  )
}

const TONES = {
  a: 'size-[640px] bg-[radial-gradient(circle,rgb(255_107_0/.22),transparent_68%)]',
  b: 'size-[520px] bg-[radial-gradient(circle,rgb(255_160_60/.18),transparent_70%)]',
  c: 'size-[720px] bg-[radial-gradient(circle,rgb(255_107_0/.10),transparent_70%)]',
}

export function Halo({ tone, className = '', par }: { tone: keyof typeof TONES; className?: string; par?: number }) {
  return (
    <div
      aria-hidden="true"
      data-par={par}
      className={`pointer-events-none absolute z-0 rounded-full blur-[80px] ${TONES[tone]} ${className}`}
    />
  )
}

export function SectionHead({ k, title, flush, children }: { k: string; title: string; flush?: boolean; children?: ReactNode }) {
  return (
    <div className={`rv max-w-[760px] ${flush ? '' : 'mb-[clamp(40px,5vw,64px)]'}`}>
      <div className="mb-[18px] text-xs font-semibold uppercase tracking-[.14em] text-primary">{k}</div>
      <h2 className="mb-5 text-balance text-[length:clamp(28px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-.028em]">{title}</h2>
      <div className="space-y-4 text-pretty text-[length:clamp(16.5px,1.5vw,19px)] leading-[1.62] text-ink-soft">{children}</div>
    </div>
  )
}
