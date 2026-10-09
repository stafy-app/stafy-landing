import { Reveal, SectionHead, sectionFromBand, wrap } from './ui'

const ITEMS = [
  ['Cât durează până pornim?', 'Cam o oră. Stabilim împreună tipurile de activitate și tarifele, iar apoi vă invitați echipa.'],
  ['O vor folosi instructorii?', 'Da, și nu au nimic de instalat: pontează din browser, de pe telefon, în 60 de secunde. Câștigă și ei, pentru că își văd orele și istoricul oricând, fără să mai întrebe pe nimeni.'],
  ['Dacă cineva greșește ora la pontaj?', 'Managerul corectează ora de start sau de stop. Instructorul vede marcajul „Modificat de …”, iar schimbarea rămâne în jurnal.'],
  ['Ce se întâmplă dacă schimbăm un tarif?', 'Tariful nou se aplică de acum înainte. Pontajele deja făcute rămân la tariful de atunci, deci rapoartele vechi nu se schimbă.'],
  ['Ce se întâmplă după cele 45 de zile gratuite?', 'Alegeți un plan. Dacă nu, contul trece în modul doar-citire: pontajul merge în continuare, iar rapoartele rămân deschise. Nu se pierde nicio oră.'],
  ['Noi nu suntem școală de programare. Merge și la noi?', 'Da, dacă vă plătiți oamenii pe oră, cu tarife diferite pe tip de activitate. Scrieți-ne și vă spunem sincer dacă vi se potrivește.'],
]

export default function Faq() {
  return (
    <section id="faq" className={`${sectionFromBand} !pt-[clamp(8px,2vw,24px)]`}>
      <div className={wrap}>
        <SectionHead k="Ce ne întrebați cel mai des" title="Întrebările care apar la primul apel." />
        <div className="max-w-[820px]">
          {ITEMS.map(([q, a], i) => (
            <Reveal key={q} i={i}>
              {/* DaisyUI collapse: radio inputs = CSS-only accordion, no JS */}
              <div className="collapse collapse-plus rounded-none border-b border-ink/[.09]">
                <input type="radio" name="faq" aria-label={q} />
                <div className="collapse-title px-0.5 py-6 text-[length:clamp(16px,1.6vw,18.5px)] font-semibold tracking-[-.015em] text-ink">{q}</div>
                <div className="collapse-content px-0.5 text-base leading-[1.65] text-ink-soft">
                  <p>{a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
