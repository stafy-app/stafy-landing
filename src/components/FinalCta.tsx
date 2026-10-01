import { ArrowRight } from 'lucide-react'
import { CONTACT_EMAIL } from '../config'
import { arrow, btnLight, btnPrimary, section, wrap } from './ui'

export default function FinalCta() {
  return (
    <section id="final" className={`${section} !pb-[clamp(60px,7vw,110px)]`}>
      <div className={wrap}>
        <div className="rv relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#232F42,#161E2C_60%,#1B2434)] p-[clamp(48px,6vw,80px)] shadow-[0_40px_90px_rgb(30_41_59/.28)] before:absolute before:-right-40 before:-top-[300px] before:size-[640px] before:rounded-full before:bg-[radial-gradient(circle,rgb(255_107_0/.34),transparent_66%)] before:blur-[30px] before:content-['']">
          <div className="relative z-[2] max-w-[720px]">
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
          </div>
        </div>
      </div>
    </section>
  )
}
