"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { NAV, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-border/60 bg-void/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 md:px-8">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="h-2 w-2 shrink-0 translate-y-[-1px] bg-crimson shadow-[0_0_12px_var(--crimson)]" />
            <span className="font-display text-sm font-bold tracking-[0.25em] text-bone">
              {SITE.name}
            </span>
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center border border-border text-bone md:hidden"
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors",
                      active ? "text-neon-orange" : "text-muted-foreground hover:text-bone",
                    )}
                  >
                    <span className="text-[10px] text-teal/70">{item.index}</span>
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-left transition-transform",
                        active
                          ? "scale-x-100 bg-neon-orange shadow-[0_0_10px_var(--neon-orange)]"
                          : "scale-x-0 bg-bone group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {open && (
          <ul className="flex flex-col gap-px border-t border-border/60 bg-void/95 px-5 py-2 md:hidden">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 py-2 text-sm uppercase tracking-[0.18em]",
                      active ? "text-neon-orange" : "text-muted-foreground",
                    )}
                  >
                    <span className="text-[10px] text-teal/70">{item.index}</span>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </header>
  )
}
