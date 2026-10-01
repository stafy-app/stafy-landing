export default function Brand({ href = '#top', light }: { href?: string; light?: boolean }) {
  return (
    <a href={href} className={`flex items-center gap-2.5 whitespace-nowrap text-lg font-bold tracking-[-.02em] ${light ? 'text-white' : 'text-ink'}`}>
      <img src="/assets/stafy_logo.svg" alt="" width={26} height={26} className="h-[26px] w-auto" />
      <span>Stafy</span>
    </a>
  )
}
