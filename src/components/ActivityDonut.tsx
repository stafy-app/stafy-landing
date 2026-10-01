import type { ReactNode } from 'react'

// Same palette and geometry as stafy-web-app's ActivityDonut.
export const DONUT_COLORS = ['#2a78d6', '#008300', '#e87ba4', '#eda100', '#94a3b8']

const SIZE = 260
const STROKE = 34
const RADIUS = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * RADIUS

interface Props {
  hours: number[]
  colors: string[]
  /** Value that maps to a full ring; keep it >= the sum so the ring never overflows. */
  denom: number
  label: string
  children: ReactNode
}

export default function ActivityDonut({ hours, colors, denom, label, children }: Props) {
  const dashes = hours.map((h) => (h / denom) * CIRC)
  const offsets = dashes.map((_, i) => dashes.slice(0, i).reduce((a, b) => a + b, 0))
  return (
    <div className="relative mx-auto aspect-square w-full">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full -rotate-90" role="img" aria-label={label}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--color-line-soft)" strokeWidth={STROKE} />
        {dashes.map((dash, i) => (
          <circle
            key={i}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={colors[i]}
            strokeWidth={STROKE}
            strokeDasharray={`${dash} ${CIRC - dash}`}
            strokeDashoffset={-offsets[i]}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
