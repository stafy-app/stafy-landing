import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { APP_URL } from '../config'
import { arrow, btnQuiet, btnPrimary, Halo, Reveal, section, wrap } from './ui'

export default function Hero({ children }: { children?: ReactNode }) {
  return (
    <section id="top" className={`${section} !pt-[clamp(48px,6vw,84px)] !pb-[clamp(60px,7vw,96px)]`}>
      <Halo tone="a" par={0.14} className="-right-36 -top-60" />
      <Halo tone="b" par={-0.08} className="-left-52 top-80" />
      <div className={`${wrap} grid grid-cols-[1fr_1.08fr] items-center gap-[clamp(32px,5vw,72px)] max-[900px]:grid-cols-1`}>
        <div>
          <Reveal i={1}>
            <h1 className="mb-6 mt-[26px] text-balance text-[length:clamp(38px,5.4vw,68px)] font-bold leading-[1.03] tracking-[-.035em]">
              Finalul de lună nu mai trebuie să fie <em className="not-italic text-primary">o zi pierdută</em>.
            </h1>
          </Reveal>
          <Reveal i={2}>
            <p className="mb-9 max-w-[560px] text-pretty text-[length:clamp(17px,1.7vw,20.5px)] leading-[1.6] text-ink-soft">
              Instructorii își pontează orele din browser, de pe telefon sau laptop — aleg activitatea, ora de început și ora de final. Nimic de instalat. Stafy aplică tariful fiecărui om pe fiecare activitate, adaugă bonusul și pregătește raportul lunar în PDF. Tu doar îl verifici.
            </p>
          </Reveal>
          <Reveal i={3} className="mb-[26px] flex flex-wrap gap-3">
            <a className={`${btnPrimary} btn-lg`} href={`${APP_URL}/register`}>
              Creează un cont
            </a>
            <button className={`${btnQuiet} btn-lg`} data-open-report>
              Vezi cum arată un raport <ArrowRight size={17} className={arrow} />
            </button>
          </Reveal>
          <Reveal i={4}>
            <p className="max-w-[520px] text-[13.5px] leading-[1.6] text-ink-muted">
              Făcut pentru școli de programare, dans, muzică, arte marțiale, robotică, limbi străine și after-school.
            </p>
          </Reveal>
        </div>

        <Reveal i={2} className="relative">
          {children}
        </Reveal>
      </div>
    </section>
  )
}
