"use client"

import { useEffect, useState } from "react"
import { SITE } from "@/lib/site"

function parts(tz: string) {
  const now = new Date()
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(now)
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: tz,
  }).format(now)
  return { time, date }
}

export function LiveClock() {
  const [mounted, setMounted] = useState(false)
  const [{ time, date }, setNow] = useState(() => parts(SITE.timezone))

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setNow(parts(SITE.timezone)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 bg-teal shadow-[0_0_8px_var(--teal)]" />
        {date}
      </span>
      <span className="flex items-baseline gap-2 text-bone" suppressHydrationWarning>
        <span className="tabular-nums text-base tracking-[0.3em] text-neon-orange glow-orange">
          {mounted ? time : "--:--:--"}
        </span>
        <span className="text-[10px] text-muted-foreground">{SITE.timezone.replace("_", " ")}</span>
      </span>
    </div>
  )
}
