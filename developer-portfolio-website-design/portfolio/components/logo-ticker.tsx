import { SOFTWARE } from "@/lib/site"

function Row() {
  return (
    <div className="ticker-track">
      {[0, 1].map((dup) => (
        <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
          {SOFTWARE.map((s) => (
            <li
              key={`${dup}-${s.slug}`}
              className="group flex shrink-0 items-center gap-3 border-r border-border/40 px-8 py-5"
              title={s.name}
            >
              <span
                className="logo-mask h-7 w-7 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                style={{
                  color: s.tint,
                  WebkitMaskImage: `url(/logos/${s.slug}.svg)`,
                  maskImage: `url(/logos/${s.slug}.svg)`,
                  filter: "drop-shadow(0 0 8px currentColor)",
                }}
              />
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-bone">
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export function LogoTicker() {
  return (
    <section
      aria-label="Software toolkit"
      className="relative overflow-hidden border-y border-border/60 bg-ink/40"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
      <Row />
    </section>
  )
}
