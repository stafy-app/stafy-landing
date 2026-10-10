import { ChevronLeft, ChevronRight, Copy, Lock, PanelLeft, Plus, Share } from 'lucide-react'
import type { ReactNode } from 'react'

// Device chrome shared by the hero, the manager/instructor panel and the step-1 form.
// `BrowserBar` and `MacWindow` rely on an ancestor `@container` for their responsive bits.

interface BarProps {
  url?: string
  tabs?: [string, string]
  /** Index of the selected tab. Tabs are only clickable when `onSelect` is given. */
  active?: 0 | 1
  onSelect?: (i: 0 | 1) => void
  /** Pulses a dot on the inactive tab to invite a click. */
  hint?: boolean
}

/** Safari-style toolbar + tab strip (macOS traffic lights, back/forward, URL pill, share/new tab/tabs). */
export function BrowserBar({ url = 'app.stafy.ro', tabs = ['Dashboard · Stafy', 'Rapoarte · Stafy'], active = 0, onSelect, hint }: BarProps) {
  return (
    <>
      <div className="flex items-center gap-3 bg-base-200 px-4 pb-2.5 pt-3" aria-hidden="true">
        <div className="flex flex-1 basis-0 items-center gap-3.5">
          <span className="flex gap-[7px]">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <i key={c} className="size-[11px] rounded-full shadow-[inset_0_0_0_.5px_rgb(0_0_0/.14)]" style={{ background: c }} />
            ))}
          </span>
          <span className="hidden items-center gap-3 text-ink-muted @sm:flex">
            <PanelLeft size={15} strokeWidth={1.8} />
            <span className="flex items-center gap-1.5">
              <ChevronLeft size={15} strokeWidth={2} />
              <ChevronRight size={15} strokeWidth={2} className="opacity-45" />
            </span>
          </span>
        </div>
        <span className="flex w-[min(52%,300px)] min-w-0 items-center justify-center gap-1.5 rounded-md bg-black/[.045] px-3 py-[3px] text-[11px] font-medium text-ink-soft">
          <Lock size={10} strokeWidth={2.4} className="flex-none text-ink-muted" />
          <span className="truncate">{url}</span>
        </span>
        <div className="hidden flex-1 basis-0 items-center justify-end gap-3.5 text-ink-muted @sm:flex">
          <Share size={14} strokeWidth={1.8} />
          <Plus size={15} strokeWidth={1.8} />
          <Copy size={14} strokeWidth={1.8} />
        </div>
        <div className="flex-1 basis-0 @sm:hidden" />
      </div>

      <div className="hidden items-end gap-1 border-b border-line-soft bg-base-200 px-3 @sm:flex" role={onSelect ? 'tablist' : undefined} aria-hidden={onSelect ? undefined : true}>
        {tabs.map((title, i) => {
          const on = i === active
          const Tag = onSelect ? 'button' : 'span'
          return (
            <Tag
              key={title}
              {...(onSelect ? { type: 'button' as const, role: 'tab', 'aria-selected': on, onClick: () => onSelect(i as 0 | 1) } : {})}
              className={`flex w-[min(40%,176px)] items-center gap-2 rounded-t-lg px-3 text-[11px] transition-colors duration-300 ${
                on ? 'h-[27px] border border-b-0 border-line-soft bg-white font-semibold text-ink' : 'h-[25px] font-medium text-ink-muted'
              } ${onSelect && !on ? 'cursor-pointer hover:bg-black/[.04] hover:text-ink' : ''}`}
            >
              <img src="/assets/stafy_logo.svg" alt="" width={13} height={13} className={`size-[13px] flex-none ${on ? '' : 'opacity-50 grayscale'}`} />
              <span className="truncate">{title}</span>
              {hint && !on && <i className="ml-auto size-[6px] flex-none animate-pulse-ring rounded-full bg-primary" />}
            </Tag>
          )
        })}
      </div>
    </>
  )
}

/** A Safari window on macOS. Content gets the app's grey canvas. */
export function MacWindow({ children, ...bar }: BarProps & { children: ReactNode }) {
  return (
    <div className="@container w-full overflow-hidden rounded-[14px] border border-line bg-white shadow-lg">
      <BrowserBar {...bar} />
      <div className="bg-base-200 p-2.5 @xl:p-3.5">{children}</div>
    </div>
  )
}

const Cellular = () => (
  <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor">
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
    <rect x="10" y="3" width="3" height="9" rx="1" />
    <rect x="15" y="0" width="3" height="12" rx="1" />
  </svg>
)

// iOS Wi-Fi glyph: a 90° fan cut into a wedge and two concentric bands, all centred on (8.5, 11.2).
const WifiIcon = () => (
  <svg width="16" height="11" viewBox="0 1.6 17 10.2" fill="currentColor">
    <path d="M8.5 11.2 6.38 9.08A3 3 0 0 1 10.62 9.08Z" stroke="currentColor" strokeWidth=".8" strokeLinejoin="round" />
    <path d="M4.68 7.38A5.4 5.4 0 0 1 12.32 7.38" fill="none" stroke="currentColor" strokeWidth="1.9" />
    <path d="M2.7 5.4A8.2 8.2 0 0 1 14.3 5.4" fill="none" stroke="currentColor" strokeWidth="1.9" />
  </svg>
)

const Battery = () => (
  <svg width="25" height="12" viewBox="0 0 27 13" fill="currentColor">
    <rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity=".35" />
    <rect x="2" y="2" width="21" height="9" rx="2.5" />
    <path d="M26 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" fillOpacity=".4" />
  </svg>
)

const hw = 'absolute w-[3px] bg-[#2b2e36]'

/**
 * iPhone 16 body: titanium-dark bezel, Dynamic Island, status bar, hardware buttons and home indicator.
 * `cropped` drops the bottom half of the body so only the top of the phone shows (the parent clips it).
 */
export function IPhone({ children, cropped = false, className = '' }: { children: ReactNode; cropped?: boolean; className?: string }) {
  return (
    <div className={`relative mx-auto w-full ${className}`} aria-hidden="true">
      {!cropped && (
        <>
          <i className={`${hw} -left-[2.5px] top-[88px] h-[18px] rounded-l`} />
          <i className={`${hw} -left-[2.5px] top-[124px] h-[34px] rounded-l`} />
          <i className={`${hw} -left-[2.5px] top-[168px] h-[34px] rounded-l`} />
          <i className={`${hw} -right-[2.5px] top-[140px] h-[54px] rounded-r`} />
        </>
      )}
      <div
        className={`bg-[#16181d] p-[7px] shadow-[0_26px_60px_rgb(30_41_59/.3),inset_0_0_0_1.5px_#3c4049] ${
          cropped ? 'rounded-t-[2.9rem] pb-0' : 'rounded-[2.9rem]'
        }`}
      >
        <div className={`relative flex flex-col overflow-hidden bg-base-200 ${cropped ? 'rounded-t-[2.4rem]' : 'aspect-[9/19.3] rounded-[2.4rem]'}`}>
          <i className="absolute left-1/2 top-[8px] z-10 h-[25px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex h-[38px] flex-none items-center justify-between bg-white px-6 pt-1 text-ink">
            <b className="text-[11.5px] font-semibold tracking-[-.01em]">9:41</b>
            <span className="flex items-center gap-[5px]">
              <Cellular />
              <WifiIcon />
              <Battery />
            </span>
          </div>
          {children}
          {!cropped && <i className="pointer-events-none absolute bottom-[6px] left-1/2 h-[4px] w-[92px] -translate-x-1/2 rounded-full bg-ink/80" />}
        </div>
      </div>
    </div>
  )
}
