import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { API_URL, CONTACT_EMAIL, PRIVACY_URL, REGISTER_URL, SHOW_PILOT_PROGRAM } from '../config'
import { arrow, btnLight, btnPrimary, section, wrap } from './ui'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited'

const field =
  'w-full rounded-full bg-white/[.1] px-5 py-3 text-[15px] text-white outline-none ring-1 ring-white/[.12] transition-[box-shadow,background] duration-300 ease-soft placeholder:text-white/45 focus:bg-white/[.16] focus:ring-primary/60'

// Updates list: reuses the public contact endpoint (same rate limit, honeypot and consent rules)
// with a fixed marker message, so it lands in the same inbox as the contact form.
function UpdatesForm() {
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
          name: 'Noutăți',
          email: f.get('email'),
          organization: 'Noutăți',
          team_size: '1-5',
          phone: null,
          message: '[Noutăți] Vreau să fiu anunțat despre noutăți.',
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
      <p className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
        <span className="grid size-7 flex-none place-items-center rounded-full bg-success/20 text-[#7BE0A6]">
          <Check size={16} strokeWidth={3} />
        </span>
        Mulțumim! Îți scriem doar când avem ceva important.
      </p>
    )
  }

  return (
    <form onSubmit={submit}>
      <div className="flex flex-wrap gap-2">
        <input name="email" type="email" required autoComplete="email" placeholder="email@scoala.ro" aria-label="Email" className={`${field} min-w-0 flex-1 basis-52 !py-2.5 !text-sm`} />
        {/* Honeypot: off-screen, not focusable, ignored by people. */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <button type="submit" disabled={status === 'sending'} className={`${btnLight} bg-white/[.12] text-white shadow-none hover:bg-white/[.2] hover:shadow-none disabled:opacity-70`}>
          {status === 'sending' && <Loader2 size={15} className="animate-spin" />}
          Trimite
        </button>
      </div>
      <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs leading-[1.5] text-white/50">
        <input name="consent" type="checkbox" required className="mt-px size-3.5 flex-none accent-primary" />
        <span>
          Sunt de acord să primesc emailuri despre noutățile Stafy. Poți renunța oricând răspunzând cu STOP.{' '}
          <a href={PRIVACY_URL} className="underline decoration-white/30 underline-offset-2 hover:text-white/80">Confidențialitate</a>
        </span>
      </label>
      {(status === 'error' || status === 'limited') && (
        <p role="alert" className="mt-3 text-[13px] leading-[1.5] text-[#FFB4B4]">
          {status === 'limited' ? 'Prea multe încercări. Mai încearcă puțin mai târziu sau scrie-ne la' : 'Nu am putut salva adresa. Scrie-ne direct la'}{' '}
          <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}
    </form>
  )
}

export default function FinalCta() {
  return (
    <section id="final" className={`${section} !pb-[clamp(48px,5vw,80px)]`}>
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
                <div className="flex flex-wrap gap-3">
                  <a className={`${btnPrimary} btn-lg`} href={`mailto:${CONTACT_EMAIL}`} data-open-contact>
                    Contactează-ne
                  </a>
                  <button className={`${btnLight} btn-lg bg-white/[.12] text-white shadow-none hover:bg-white/[.2] hover:shadow-none`} data-open-report>
                    Vezi un raport <ArrowRight size={17} className={arrow} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-[18px] text-xs font-semibold uppercase tracking-[.14em] text-[#FFB877]">Versiune de test</div>
                <h2 className="mb-3 text-balance text-[length:clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-[-.03em] text-white">
                  Încearcă Stafy gratuit.
                </h2>
                <p className="mb-[30px] text-[length:clamp(16px,1.6vw,18.5px)] text-white/[.76]">Toate funcțiile, fără card.</p>
                <a className={`${btnPrimary} btn-lg`} href={REGISTER_URL}>
                  Creează cont gratuit <ArrowRight size={17} className={arrow} />
                </a>
                <div className="mt-10 max-w-[480px] border-t border-white/10 pt-6">
                  <p className="mb-3 text-sm text-white/70">Nu ești gata? Primește noutățile pe email.</p>
                  <UpdatesForm />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
