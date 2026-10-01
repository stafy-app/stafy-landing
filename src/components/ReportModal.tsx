import { X } from 'lucide-react'
import ReportPaper from './ReportPaper'

/** Native <dialog>: opened by landing.ts (`[data-open-report]`), closed by the forms below / Esc. No React hydration. */
export default function ReportModal() {
  return (
    <dialog id="report-modal" className="modal">
      <div className="modal-box max-h-[90vh] w-full max-w-[720px] rounded-[22px] p-0">
        <div className="sticky top-0 z-[3] flex items-center justify-between border-b border-line-soft bg-white px-[22px] py-4">
          <span className="text-sm font-semibold">Exemplu de raport · PDF</span>
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm border-line" aria-label="Închide"><X size={15} /></button>
          </form>
        </div>

        <div className="bg-slate-200/70 p-[clamp(12px,3vw,32px)]">
          <ReportPaper />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop"><button aria-label="Închide">închide</button></form>
    </dialog>
  )
}
