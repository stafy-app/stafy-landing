import { MessageCircle } from 'lucide-react'

// Discreet edge tab: only the icon strip peeks in from the right edge (after the hero, and not next to the
// final contact section); on hover it slides out and shows the label. Toggled by landing.ts (`.on` / `.off`).
export default function ContactTab() {
  return (
    <button
      id="contact-tab"
      type="button"
      data-open-contact
      aria-label="Contactează-ne"
      className="group fixed right-0 max-[640px]:hidden top-[58%] z-[40] flex translate-x-[calc(100%-46px)] items-center gap-2.5 rounded-l-2xl bg-[linear-gradient(135deg,#232F42,#161E2C)] py-3 pl-3.5 pr-5 text-[13px] font-semibold text-white opacity-0 shadow-[-10px_10px_30px_rgb(30_41_59/.22)] transition-[translate,opacity,box-shadow] duration-500 ease-soft pointer-events-none hover:translate-x-0 hover:shadow-[-14px_12px_36px_rgb(30_41_59/.3)] focus-visible:translate-x-0 [&.on]:pointer-events-auto [&.on]:opacity-100 [&.off]:pointer-events-none [&.off]:opacity-0"
    >
      <span className="relative grid size-[22px] flex-none place-items-center rounded-full bg-primary text-white">
        <MessageCircle size={13} strokeWidth={2.4} />
      </span>
      <span className="whitespace-nowrap">Contactează-ne</span>
    </button>
  )
}
