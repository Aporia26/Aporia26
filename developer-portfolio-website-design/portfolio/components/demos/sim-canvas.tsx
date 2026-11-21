"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export type Sim = { step: (ctx: CanvasRenderingContext2D, dt: number, time: number) => void }
export type CreateSim = (width: number, height: number) => Sim

export const PALETTE = {
  orange: "#ff7a1a",
  crimson: "#e0293a",
  teal: "#23c4b8",
  bone: "#eae6dc",
  void: "#0a0a0d",
}

export function SimCanvas({
  create,
  className,
}: {
  create: CreateSim
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let sim: Sim | null = null
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sim = create(w, h)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let last = performance.now()

    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.04)
      last = t
      sim?.step(ctx, dt, t / 1000)
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) {
          sim?.step(ctx, 0.016, 0)
          return
        }
        if (entry.isIntersecting && !raf) {
          last = performance.now()
          raf = requestAnimationFrame(loop)
        } else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [create])

  return <canvas ref={ref} className={cn("block h-full w-full", className)} aria-hidden />
}
