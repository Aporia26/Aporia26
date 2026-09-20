import { Atmosphere } from "@/components/atmosphere"

export function PageBanner({
  index,
  title,
  accent,
  children,
}: {
  index: string
  title: string
  accent: "orange" | "teal" | "crimson"
  children?: React.ReactNode
}) {
  const accentClass =
    accent === "orange" ? "text-neon-orange glow-orange" : accent === "teal" ? "text-teal glow-teal" : "text-crimson"

  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-28 pb-14 md:pt-36 md:pb-20">
      <Atmosphere />
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="text-teal">{index}</span> — division
        </p>
        <h1 className={`font-display text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase leading-[0.9] tracking-tight ${accentClass}`}>
          {title}
        </h1>
        {children && (
          <div className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
