"use client"

import { useCallback } from "react"
import { SimCanvas, PALETTE, type CreateSim } from "./sim-canvas"

export function GravityDemo() {
  const create = useCallback<CreateSim>((w, h) => {
    const cx = w / 2
    const cy = h / 2
    const G = 9000
    const colors = [PALETTE.orange, PALETTE.teal, PALETTE.crimson, PALETTE.bone]

    type Body = { x: number; y: number; vx: number; vy: number; c: string }
    const bodies: Body[] = Array.from({ length: 26 }, (_, i) => {
      const r = 40 + Math.random() * (Math.min(w, h) / 2 - 40)
      const a = Math.random() * Math.PI * 2
      const speed = Math.sqrt(G / r)
      return {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        vx: -Math.sin(a) * speed,
        vy: Math.cos(a) * speed,
        c: colors[i % colors.length],
      }
    })

    return {
      step(ctx, dt) {
        // fade previous frame for motion trails
        ctx.fillStyle = "rgba(10,10,13,0.22)"
        ctx.fillRect(0, 0, w, h)

        // attractor
        ctx.beginPath()
        ctx.arc(cx, cy, 6, 0, Math.PI * 2)
        ctx.fillStyle = PALETTE.bone
        ctx.shadowBlur = 24
        ctx.shadowColor = PALETTE.orange
        ctx.fill()
        ctx.shadowBlur = 0

        const sub = 2
        const h2 = dt / sub
        for (const b of bodies) {
          for (let s = 0; s < sub; s++) {
            const dx = cx - b.x
            const dy = cy - b.y
            const d2 = dx * dx + dy * dy + 400
            const inv = 1 / Math.sqrt(d2)
            const a = G / d2
            b.vx += a * dx * inv * h2
            b.vy += a * dy * inv * h2
            b.x += b.vx * h2
            b.y += b.vy * h2
          }
          ctx.beginPath()
          ctx.arc(b.x, b.y, 2.4, 0, Math.PI * 2)
          ctx.fillStyle = b.c
          ctx.shadowBlur = 10
          ctx.shadowColor = b.c
          ctx.fill()
          ctx.shadowBlur = 0
        }
      },
    }
  }, [])

  return <SimCanvas create={create} />
}
