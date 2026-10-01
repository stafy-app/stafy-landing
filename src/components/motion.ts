import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const reduceQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (cb: () => void) => {
  const mq = matchMedia(reduceQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/** False on the server and when the user prefers reduced motion — both render the final state statically. */
export const useMotionOk = () =>
  useSyncExternalStore(subscribeMotion, () => !matchMedia(reduceQuery).matches, () => false)

/** Eases every value toward its target over `ms` (0 = snap). Starts from whatever is currently shown. `targets` must be memoized. */
export function useTweens(targets: number[], ms: number) {
  const [vals, setVals] = useState(targets)
  const cur = useRef(targets)
  useEffect(() => {
    const from = cur.current
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const p = ms <= 0 ? 1 : Math.min(1, (t - t0) / ms)
      const k = 1 - Math.pow(1 - p, 3)
      cur.current = targets.map((v, i) => from[i] + (v - from[i]) * k)
      setVals(cur.current)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [targets, ms])
  return vals
}
