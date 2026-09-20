import Link from "next/link"
import Image from "next/image"
import { Atmosphere } from "@/components/atmosphere"
import { LiveClock } from "@/components/live-clock"
import { LogoTicker } from "@/components/logo-ticker"
import { NAV, SITE } from "@/lib/site"

const SECTIONS = [
  {
    href: "/showcase",
    index: "01",
    title: "3D Generalist",
    blurb: "A fluid gallery of Sketchfab-ready work — characters, environments, hard-surface and sims.",
    accent: "text-neon-orange",
    offset: "md:mt-0",
  },
  {
    href: "/simulations",
    index: "02",
    title: "Simulations",
    blurb: "Running tech demos beside the code and the math that drives them.",
    accent: "text-teal",
    offset: "md:mt-16",
  },
  {
    href: "/engines",
    index: "03",
    title: "Engines & Shaders",
    blurb: "Custom engine architecture and shader breakdowns, laid out sharp.",
    accent: "text-crimson",
    offset: "md:mt-8",
  },
]

export default function LandingPage() {
  return (
    <>
      {/* ---- Welcome banner ---- */}
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-0 pt-24">
        <Image
          src="/showcase/hero-atmosphere.png"
          alt=""
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent" />
        <Atmosphere className="mix-blend-screen opacity-70" />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-12 md:px-8">
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-teal glow-teal">
            <span className="h-px w-10 bg-teal" />
            {SITE.role} · {SITE.location}
          </p>

          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.85] tracking-tight text-bone">
            {SITE.name.split(" ").map((word, i) => (
              <span key={word} className="block">
                {i === 1 ? <span className="text-neon-orange glow-orange">{word}</span> : word}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {SITE.tagline} Real-time rendering, procedural systems, and the low-level
            code that makes pixels move.
          </p>

          <div className="mt-8 flex flex-col gap-6 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
            <LiveClock />
            <Link
              href="/showcase"
              className="group inline-flex w-fit items-center gap-3 border border-neon-orange/50 bg-neon-orange/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-neon-orange transition-colors hover:bg-neon-orange hover:text-void"
            >
              Enter the reel
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Software ticker ---- */}
      <LogoTicker />

      {/* ---- Section index (staggered, non-grid) ---- */}
      <section className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Atmosphere />
        <header className="mb-14 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-bone md:text-3xl">
            Divisions
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {`// select a channel`}
          </span>
        </header>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-6">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative flex-1 border border-border/60 bg-ink/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-current ${s.accent} ${s.offset}`}
            >
              <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">{s.index}</span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-bone group-hover:text-current">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-current opacity-0 transition-opacity group-hover:opacity-100">
                open <span aria-hidden>→</span>
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ink/40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <span className="font-display text-sm font-bold tracking-[0.25em] text-bone">{SITE.name}</span>
        <nav className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-neon-orange">
              {n.label}
            </Link>
          ))}
        </nav>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} — built in the dark
        </span>
      </div>
    </footer>
  )
}
