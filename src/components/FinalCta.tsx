import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { API_URL, CONTACT_EMAIL, SHOW_PILOT_PROGRAM } from '../config'
import { arrow, btnLight, btnPrimary, section, wrap } from './ui'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited'

const field =
  'w-full rounded-full bg-white/[.1] px-5 py-3 text-[15px] text-white outline-none ring-1 ring-white/[.12] transition-[box-shadow,background] duration-300 ease-soft placeholder:text-white/45 focus:bg-white/[.16] focus:ring-primary/60'

// "Notify me at launch": reuses the public contact endpoint (same rate limit, honeypot and consent rules)
// with a fixed marker message, so it lands in the same inbox as the contact form.
function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function submit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Listă de așteptare',
          email: f.get('email'),
          organization: 'Listă de așteptare',
          team_size: '1-5',
          phone: null,
          message: '[Listă de așteptare] Anunțați-mă când se lansează aplicația.',
          consent: f.get('consent') === 'on',
          website: f.get('website') || null,
        }),
      })
      setStatus(res.ok ? 'sent' : res.status === 429 ? 'limited' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="mb-[34px] flex items-center gap-2.5 text-[length:clamp(16px,1.6vw,18.5px)] font-semibold text-white">
        <span className="grid size-7 flex-none place-items-center rounded-full bg-success/20 text-[#7BE0A6]">
          <Check size={16} strokeWidth={3} />
        </span>
        Mulțumim! Îți scriem când se lansează.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="mb-8 max-w-[520px]">
      <div className="flex flex-wrap gap-2.5">
        <input name="email" type="email" required autoComplete="email" placeholder="email@scoala.ro" aria-label="Email" className={`${field} min-w-0 flex-1 basis-56`} />
        {/* Honeypot: off-screen, not focusable, ignored by people. */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <button type="submit" disabled={status === 'sending'} className={`${btnPrimary} btn-lg disabled:opacity-70`}>
          {status === 'sending' && <Loader2 size={17} className="animate-spin" />}
          Anunță-mă la lansare
        </button>
      </div>
      <label className="mt-3.5 flex cursor-pointer items-start gap-2.5 text-[13px] leading-[1.5] text-white/60">
        <input name="consent" type="checkbox" required className="mt-0.5 size-4 flex-none accent-primary" />
        <span>Sunt de acord să primesc un email când se lansează Stafy.</span>
      </label>
      {(status === 'error' || status === 'limited') && (
        <p role="alert" className="mt-3.5 text-[13.5px] leading-[1.5] text-[#FFB4B4]">
          {status === 'limited' ? 'Prea multe încercări. Mai încearcă puțin mai târziu sau scrie-ne la' : 'Nu am putut salva adresa. Scrie-ne direct la'}{' '}
          <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}
    </form>
  )
}

export default function FinalCta() {
  return (
    <section id="final" className={`${section} !pb-[clamp(60px,7vw,110px)]`}>
      <div className={wrap}>
        <div className="rv relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#232F42,#161E2C_60%,#1B2434)] p-[clamp(28px,6vw,80px)] shadow-[0_40px_90px_rgb(30_41_59/.28)] before:absolute before:-right-40 before:-top-[300px] before:size-[640px] before:rounded-full before:bg-[radial-gradient(circle,rgb(255_107_0/.34),transparent_66%)] before:blur-[30px] before:content-['']">
          <div className="relative z-[2] max-w-[720px]">
            {SHOW_PILOT_PROGRAM ? (
              <>
                <div className="mb-[18px] text-xs font-semibold uppercase tracking-[.14em] text-[#FFB877]">Program pentru primele școli</div>
                <h2 className="mb-[22px] text-balance text-[length:clamp(26px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-.03em] text-white">
                  Stafy e la început. Căutăm cinci școli care să-l ducă la capăt cu noi.
                </h2>
                <div className="mb-[30px] flex gap-2">
                  {[true, false, false, false, false].map((on, i) => (
                    <span key={i} className={`h-[5px] w-[42px] rounded-full ${on ? 'bg-primary' : 'bg-white/[.18]'}`} />
                  ))}
                </div>
                <p className="mb-3.5 text-[length:clamp(16px,1.6vw,18.5px)] leading-[1.62] text-white/[.76]">
                  Primele cinci școli primesc <b className="text-white">3 luni de pilot gratuit</b>, cu toate funcțiile și locuri nelimitate. Apoi, <b className="text-white">50% reducere</b> la orice plan aleg. Configurarea o facem împreună. În schimb, ne spuneți sincer ce merge și ce nu.
                </p>
                <p className="mb-[34px] text-sm text-white/55">Fără card, fără contract, vă opriți când vreți.</p>
              </>
            ) : (
              <>
                <div className="mb-[18px] text-xs font-semibold uppercase tracking-[.14em] text-[#FFB877]">Fii printre primii</div>
                <h2 className="mb-[22px] text-balance text-[length:clamp(26px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-.03em] text-white">
                  Stafy se lansează în curând. Lasă-ți emailul și te anunțăm.
                </h2>
                <p className="mb-[30px] text-[length:clamp(16px,1.6vw,18.5px)] leading-[1.62] text-white/[.76]">
                  Îți scriem o singură dată, în ziua în care aplicația se deschide. Fără spam.
                </p>
                <WaitlistForm />
              </>
            )}
            {SHOW_PILOT_PROGRAM ? (
              <div className="flex flex-wrap gap-3">
                <a className={`${btnPrimary} btn-lg`} href={`mailto:${CONTACT_EMAIL}`} data-open-contact>
                  Contactează-ne
                </a>
                <button className={`${btnLight} btn-lg bg-white/[.12] text-white shadow-none hover:bg-white/[.2] hover:shadow-none`} data-open-report>
                  Vezi un raport <ArrowRight size={17} className={arrow} />
                </button>
              </div>
            ) : (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/10 pt-5 text-sm text-white/55">
                Ai întrebări?
                <a className="font-semibold text-white/85 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-primary" href={`mailto:${CONTACT_EMAIL}`} data-open-contact>
                  Contactează-ne
                </a>
                <span aria-hidden="true">·</span>
                <button type="button" className="group inline-flex items-center gap-1 font-semibold text-white/85 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-primary" data-open-report>
                  Vezi un raport <ArrowRight size={14} className={arrow} />
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
