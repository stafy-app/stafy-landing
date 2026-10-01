import { Check, Loader2, Send, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { API_URL, CONTACT_EMAIL } from '../config'
import { vars } from './util'

// Right-hand slide-over, opened by any `[data-open-contact]` element (see landing.ts).
// A native <dialog>: focus trap, Esc and inert background come for free. Submits to stafy-backend
// `POST /api/v1/contact`; the hidden `website` field is the honeypot.

const SIZES = ['1-5', '6-15', '16-30', '30+'] as const
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited'

const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[.1em] text-ink-muted'
const input =
  'w-full rounded-xl bg-base-200 px-3.5 py-2.5 text-[15px] text-ink outline-none ring-1 ring-transparent transition-[box-shadow,background] duration-300 ease-soft placeholder:text-ink-muted focus:bg-white focus:ring-primary/40 focus:shadow-[0_0_0_4px_rgb(255_107_0/.08)]'
const rise = 'animate-slidein [animation-delay:calc(var(--i)*70ms+120ms)] [animation-fill-mode:backwards]'

export default function ContactDrawer() {
  const ref = useRef<HTMLDialogElement>(null)
  const [size, setSize] = useState<(typeof SIZES)[number]>('6-15')
  const [status, setStatus] = useState<Status>('idle')
  const [closing, setClosing] = useState(false)

  const close = () => {
    const el = ref.current
    if (!el || closing) return
    setClosing(true)
    setTimeout(() => {
      el.close()
      setClosing(false)
      // Fresh form next time, unless a message is on its way.
      setStatus((s) => (s === 'sending' ? s : 'idle'))
    }, 280)
  }

  async function submit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          organization: f.get('organization'),
          team_size: size,
          phone: String(f.get('phone') ?? '').trim() || null,
          message: f.get('message'),
          consent: f.get('consent') === 'on',
          website: f.get('website') || null,
        }),
      })
      setStatus(res.ok ? 'sent' : res.status === 429 ? 'limited' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <dialog
      id="contact-drawer"
      ref={ref}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClick={(e) => e.target === ref.current && close()}
      className={`m-0 ml-auto h-dvh max-h-none w-[min(468px,100vw)] max-w-none overflow-hidden rounded-l-[28px] bg-white p-0 text-ink shadow-[-30px_0_80px_rgb(30_41_59/.22)] backdrop:bg-ink/40 backdrop:backdrop-blur-[3px] open:animate-[drawerin_.5s_var(--ease-soft)] open:backdrop:animate-[fadein_.4s_ease] max-[520px]:rounded-none ${
        closing ? '!animate-[drawerout_.28s_ease-in_forwards] backdrop:!animate-[fadeout_.28s_ease-in_forwards]' : ''
      }`}
    >
      <div className="relative flex h-full flex-col">
        <div className="pointer-events-none absolute -right-24 -top-32 size-[320px] rounded-full bg-[radial-gradient(circle,rgb(255_107_0/.16),transparent_68%)] blur-[24px]" />

        <header className="relative flex items-start justify-between gap-4 px-7 pb-4 pt-7">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[.14em] text-primary">Contact</div>
            <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-.03em]">Contactează-ne</h2>
            <p className="mt-2 max-w-[330px] text-[14.5px] leading-[1.55] text-ink-soft">Spune-ne câteva lucruri despre școala ta și îți răspundem pe email.</p>
          </div>
          <button type="button" onClick={close} aria-label="Închide" className="grid size-9 flex-none place-items-center rounded-full text-ink-soft transition-colors hover:bg-base-200 hover:text-ink">
            <X size={18} />
          </button>
        </header>

        {status === 'sent' ? (
          <div className="relative flex flex-1 flex-col items-center justify-center px-9 pb-16 text-center">
            <span className="mb-6 grid size-[72px] animate-slidein place-items-center rounded-full bg-success/10 text-success">
              <Check size={34} strokeWidth={2.6} />
            </span>
            <h3 className="text-[22px] font-bold tracking-[-.02em]">Mulțumim, am primit mesajul.</h3>
            <p className="mt-2 max-w-[320px] text-[15px] leading-[1.6] text-ink-soft">Îți răspundem pe adresa de email pe care ai completat-o.</p>
            <button type="button" onClick={close} className="btn btn-primary mt-8 rounded-full px-7 font-semibold shadow-none">Gata</button>
          </div>
        ) : (
          <form onSubmit={submit} className="relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-7 pb-7 pt-2">
            <div style={vars({ '--i': 0 })} className={rise}>
              <label className={label} htmlFor="c-name">Nume</label>
              <input id="c-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Maria Ionescu" className={input} />
            </div>
            <div style={vars({ '--i': 1 })} className={rise}>
              <label className={label} htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="maria@scoala.ro" className={input} />
            </div>
            <div style={vars({ '--i': 2 })} className={rise}>
              <label className={label} htmlFor="c-org">Școală / organizație</label>
              <input id="c-org" name="organization" required minLength={2} maxLength={150} autoComplete="organization" placeholder="Școala de Cod Delta" className={input} />
            </div>
            <div style={vars({ '--i': 3 })} className={rise}>
              <span className={label}>Câți instructori aveți?</span>
              <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-base-200 p-1" role="radiogroup" aria-label="Număr de instructori">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={size === s}
                    onClick={() => setSize(s)}
                    className={`rounded-lg py-2 text-[13.5px] font-semibold tabular-nums transition-[background,box-shadow,color] duration-300 ease-soft ${
                      size === s ? 'bg-white text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {s.replace('-', '–')}
                  </button>
                ))}
              </div>
            </div>
            <div style={vars({ '--i': 4 })} className={rise}>
              <label className={label} htmlFor="c-phone">Telefon <span className="font-medium normal-case tracking-normal">(opțional)</span></label>
              <input id="c-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="07xx xxx xxx" className={input} />
            </div>
            <div style={vars({ '--i': 5 })} className={rise}>
              <label className={label} htmlFor="c-msg">Mesaj</label>
              <textarea id="c-msg" name="message" required minLength={5} maxLength={2000} rows={4} placeholder="Cu ce te putem ajuta?" className={`${input} resize-none`} />
            </div>

            {/* Honeypot: off-screen, not focusable, ignored by people. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <label style={vars({ '--i': 6 })} className={`${rise} flex cursor-pointer items-start gap-2.5 text-[13px] leading-[1.5] text-ink-soft`}>
              <input name="consent" type="checkbox" required className="mt-0.5 size-4 flex-none accent-primary" />
              <span>Sunt de acord să fiu contactat în legătură cu această solicitare.</span>
            </label>

            {(status === 'error' || status === 'limited') && (
              <p role="alert" className="rounded-xl bg-error/10 px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-error">
                {status === 'limited' ? 'Prea multe încercări. Mai încearcă puțin mai târziu sau scrie-ne direct la ' : 'Nu am putut trimite mesajul. Scrie-ne direct la '}
                <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={vars({ '--i': 7 })}
              className={`${rise} btn btn-primary btn-lg mt-auto w-full rounded-full font-semibold shadow-none transition-transform duration-300 hover:-translate-y-px disabled:opacity-70`}
            >
              {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
              {status === 'sending' ? 'Se trimite…' : 'Trimite mesajul'}
            </button>
          </form>
        )}
      </div>
    </dialog>
  )
}
