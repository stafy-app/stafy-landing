import type { CSSProperties } from 'react'

/** Typed helper for inline CSS custom properties (e.g. `--i`, `--r`). */
export const vars = (o: Record<string, string | number>) => o as CSSProperties
