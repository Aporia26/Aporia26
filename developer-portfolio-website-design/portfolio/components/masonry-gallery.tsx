import Image from "next/image"

export type Piece = {
  src: string
  title: string
  desc: string
  tags: string[]
  polys: string
  href: string
  // relative visual weight so the masonry feels fluid, not gridded
  span: "tall" | "short" | "wide"
}

const ASPECT: Record<Piece["span"], string> = {
  tall: "aspect-[3/4]",
  short: "aspect-[4/5]",
  wide: "aspect-[16/11]",
}

export function MasonryGallery({ pieces }: { pieces: Piece[] }) {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {pieces.map((p, i) => (
          <article
            key={p.title}
            className="group break-inside-avoid"
            style={{ transform: `translateY(${(i % 3) * 6}px)` }}
          >
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="relative block overflow-hidden border border-border/60 bg-ink/40"
            >
              <div className={`relative ${ASPECT[p.span]} w-full`}>
                <Image
                  src={p.src || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-40" />
                <span className="absolute right-3 top-3 border border-teal/40 bg-void/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-teal backdrop-blur-sm">
                  {p.polys}
                </span>
                <span className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone opacity-0 transition-opacity group-hover:opacity-100">
                  view on sketchfab <span aria-hidden>↗</span>
                </span>
              </div>
            </a>

            {/* description below each item */}
            <div className="mt-3 px-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-bone">
                  {p.title}
                </h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-orange">
                  {p.tags[0]}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
