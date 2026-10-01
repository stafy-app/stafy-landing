import { LOGIN_URL, REGISTER_URL } from '../config'
import Brand from './Brand'
import { btnPrimary, btnQuiet, wrap } from './ui'

const LINKS = [
  ['#problema', 'Problema'],
  ['#cum', 'Cum merge'],
  ['#manager', 'Pentru tine'],
  ['#functii', 'Funcții'],
  ['#preturi', 'Prețuri'],
  ['#intrebari', 'Întrebări'],
]

const link =
  'relative whitespace-nowrap text-sm font-medium text-ink-soft hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:right-full after:h-[1.5px] after:bg-primary after:transition-[right] after:duration-[450ms] after:ease-soft hover:after:right-0'

export default function Nav() {
  return (
    <nav
      id="nav"
      className="sticky top-0 z-[60] border-b border-transparent bg-warm/70 backdrop-blur-[20px] backdrop-saturate-[1.8] transition-[background,border-color,box-shadow] duration-[400ms] ease-soft [&.stuck]:border-ink/[.07] [&.stuck]:bg-white/70 [&.stuck]:shadow-[0_1px_20px_rgb(30_41_59/.05)]"
    >
      <div className={`${wrap} flex h-[74px] items-center justify-between gap-6`}>
        <Brand />
        <div className="flex gap-[30px] max-[1040px]:hidden">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className={link}>{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <a className={`${btnQuiet} btn-md`} href={LOGIN_URL}>Intră în cont</a>
          <a className={`${btnPrimary} btn-md`} href={REGISTER_URL}>Creează un cont</a>
        </div>
      </div>
    </nav>
  )
}
