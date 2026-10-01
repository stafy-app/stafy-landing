// "Raport de activitate" page, rebuilt after the real PDF the app exports (stafy-web-app ReportDocument).
// Everything is sized in em and the root font-size follows the container width (cqw), so the same page
// scales from a phone to the modal. The caller provides the width; the page keeps A4 proportions.
// Figures match the rest of the landing: 43 h, 4.790 lei, 28 pontaje for Andrei Mihalache.

const BREAKDOWN = [
  ['Curs Scratch', '18.00h', '120,00 lei', '2.160,00 lei'],
  ['Curs Python', '12.00h', '130,00 lei', '1.560,00 lei'],
  ['Tabără de vară', '6.00h', '75,00 lei', '450,00 lei'],
  ['Recuperări', '3.00h', '100,00 lei', '300,00 lei'],
  ['Lecții demo', '4.00h', '80,00 lei', '320,00 lei'],
]

const ENTRIES = [
  ['30 sept. 2026', '16:30–18:30', 'Curs Scratch', '2.00h', '120,00 lei', '240,00 lei'],
  ['29 sept. 2026', '17:20–18:20', 'Lecții demo', '1.00h', '80,00 lei', '80,00 lei'],
  ['28 sept. 2026', '16:45–17:45', 'Recuperări', '1.00h', '100,00 lei', '100,00 lei'],
  ['25 sept. 2026', '10:00–12:00', 'Curs Python', '2.00h', '130,00 lei', '260,00 lei'],
  ['24 sept. 2026', '16:30–18:00', 'Curs Scratch', '1.50h', '120,00 lei', '180,00 lei'],
]

const th = 'pb-[.5em] text-[.78em] font-semibold uppercase tracking-[.08em] text-slate-500'
const mono = 'font-mono tabular-nums'
const rule = 'border-b border-slate-200'

export default function ReportPaper() {
  return (
    <div className="@container w-full">
      <div
        className="relative aspect-[1/1.414] w-full overflow-hidden bg-white text-[#1e293b] shadow-[0_8px_30px_rgb(15_23_42/.18)]"
        style={{ fontSize: '1.68cqw' }}
      >
        <div className="px-[4.6em] pt-[4.2em]">
          <div className="flex items-start justify-between gap-[2em] border-b-[.2em] border-[#1e293b] pb-[1.4em]">
            <div className="space-y-[1.1em]">
              <div className="text-[1.7em] font-bold tracking-[-.01em]">Școala de Cod Delta</div>
              <div className="text-[.95em]"><b>Adresă:</b> Str. Exemplu 1</div>
              <div className="text-[.95em]">
                <b>Angajat:</b> Andrei Mihalache
                <div className="text-[.8em] text-slate-500">andrei@scoala-delta.ro</div>
              </div>
              <div className="text-[.95em]"><b>Funcție:</b> Instructor</div>
            </div>
            <div className="space-y-[1.1em] text-right">
              <div className="text-[1.7em] font-bold uppercase tracking-[.01em]">Raport de activitate</div>
              <div className="text-[.95em]"><b>Perioadă:</b> 1 sept. 2026 – 30 sept. 2026</div>
              <div className="text-[.95em]">
                <b>Generat de:</b> Maria Dumitrescu
                <div className="text-[.8em] text-slate-500">maria@scoala-delta.ro</div>
              </div>
              <div className="text-[.95em]"><b>Generat în data:</b> 1 oct. 2026, ora 08:12</div>
            </div>
          </div>

          <div className="mt-[2em] grid grid-cols-2 gap-[2em] rounded-[.4em] bg-slate-100 px-[2em] py-[1.6em]">
            <div>
              <div className="text-[.78em] font-semibold uppercase tracking-[.1em] text-slate-500">Total ore</div>
              <div className={`${mono} mt-[.5em] text-[2.2em] font-bold`}>43.00h</div>
            </div>
            <div>
              <div className="text-[.78em] font-semibold uppercase tracking-[.1em] text-slate-500">Total de plată</div>
              <div className={`${mono} mt-[.5em] text-[2.2em] font-bold`}>4.790,00 lei</div>
            </div>
          </div>

          <div className="mt-[2.2em] text-[1.05em] font-bold">Defalcare pe activități</div>
          <table className="mt-[.8em] w-full text-left text-[.95em]">
            <thead>
              <tr className={rule}>
                <th className={th}>Activitate</th>
                {['Ore', 'Tarif', 'Total'].map((h) => <th key={h} className={`${th} text-right`}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {BREAKDOWN.map(([a, ...rest]) => (
                <tr key={a} className={rule}>
                  <td className="py-[.6em]">{a}</td>
                  {rest.map((c, i) => <td key={i} className={`${mono} py-[.6em] text-right text-[.92em] ${i < 2 ? 'text-slate-500' : ''}`}>{c}</td>)}
                </tr>
              ))}
              <tr className="border-t-[.1em] border-[#1e293b] font-bold">
                <td className="pt-[.8em]" colSpan={3}>Total general</td>
                <td className={`${mono} pt-[.8em] text-right text-[.92em]`}>4.790,00 lei</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-[2.2em] text-[1.05em] font-bold">Listă pontaje</div>
          <table className="mt-[.8em] w-full text-left text-[.95em]">
            <thead>
              <tr className={rule}>
                {['Dată', 'Interval', 'Activitate'].map((h) => <th key={h} className={th}>{h}</th>)}
                {['Durată', 'Tarif', 'Sumă'].map((h) => <th key={h} className={`${th} text-right`}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {ENTRIES.map(([d, i, a, ...rest]) => (
                <tr key={d} className={rule}>
                  <td className="py-[.6em]">{d}</td>
                  <td className={`${mono} py-[.6em] text-[.92em] text-slate-500`}>{i}</td>
                  <td className="py-[.6em]">{a}</td>
                  {rest.map((c, j) => <td key={j} className={`${mono} py-[.6em] text-right text-[.92em] ${j === 1 ? 'text-slate-500' : ''}`}>{c}</td>)}
                </tr>
              ))}
              <tr className={rule}>
                <td colSpan={6} className="py-[.6em] text-center text-[.85em] text-slate-400">· · ·  încă 23 de pontaje  · · ·</td>
              </tr>
              <tr className="font-bold">
                <td className="pt-[.8em]" colSpan={3}>Total</td>
                <td className={`${mono} pt-[.8em] text-right text-[.92em]`}>43.00h</td>
                <td />
                <td className={`${mono} pt-[.8em] text-right text-[.92em]`}>4.790,00 lei</td>
              </tr>
            </tbody>
          </table>

          <div className="ml-auto mt-[4em] w-[44%] border-t border-[#1e293b] pt-[.6em] text-right text-[.78em] font-semibold uppercase tracking-[.1em] text-slate-500">
            Semnătura manager
          </div>
        </div>

        <div className="absolute inset-x-[4.6em] bottom-[2.4em] flex items-end justify-between border-t border-slate-200 pt-[1em] text-[.78em] text-slate-400">
          <span>
            Confidențial — conține date cu caracter personal
            <br />
            Document generat automat de stafy.ro · Format v1.0 · Ref: RA-3-20261001-0812
          </span>
          <span>Pagina 1 / 1</span>
        </div>
      </div>
    </div>
  )
}
