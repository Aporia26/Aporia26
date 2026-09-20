"use client"

import { useCallback } from "react"
import { SimCanvas, PALETTE, type CreateSim } from "./sim-canvas"

export function BoidsDemo() {
  const create = useCallback<CreateSim>((w, h) => {
    const N = 90
    const R = 46
    const maxSpeed = 90
    type B = { x: number; y: number; vx: number; vy: number }
    const boids: B[] = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(a) * maxSpeed,
        vy: Math.sin(a) * maxSpeed,
      }
    })

    return {
      step(ctx, dt) {
        ctx.fillStyle = PALETTE.void
        ctx.fillRect(0, 0, w, h)

        for (const b of boids) {
          let ax = 0
          let ay = 0
          let cx = 0
          let cy = 0
          let sx = 0
          let sy = 0
          let n = 0
          for (const o of boids) {
            if (o === b) continue
            const dx = o.x - b.x
            const dy = o.y - b.y
            const d = Math.hypot(dx, dy)
            if (d > 0 && d < R) {
              ax += o.vx
              ay += o.vy
              cx += o.x
              cy += o.y
              sx -= dx / d
              sy -= dy / d
              n++
            }
          }
          if (n > 0) {
            b.vx += ((ax / n - b.vx) * 0.04) + (cx / n - b.x) * 0.0008 + sx * 1.4
            b.vy += ((ay / n - b.vy) * 0.04) + (cy / n - b.y) * 0.0008 + sy * 1.4
          }
          // soft wrap
          const speed = Math.hypot(b.vx, b.vy) || 1
          b.vx = (b.vx / speed) * maxSpeed
          b.vy = (b.vy / speed) * maxSpeed
          b.x += b.vx * dt
          b.y += b.vy * dt
          if (b.x < 0) b.x += w
          if (b.x > w) b.x -= w
          if (b.y < 0) b.y += h
          if (b.y > h) b.y -= h

          const ang = Math.atan2(b.vy, b.vx)
          ctx.save()
          ctx.translate(b.x, b.y)
          ctx.rotate(ang)
          ctx.beginPath()
          ctx.moveTo(7, 0)
          ctx.lineTo(-5, 3.2)
          ctx.lineTo(-5, -3.2)
          ctx.closePath()
          ctx.fillStyle = PALETTE.teal
          ctx.shadowBlur = 6
          ctx.shadowColor = PALETTE.teal
          ctx.fill()
          ctx.restore()
        }
        ctx.shadowBlur = 0
      },
    }
  }, [])

  return <SimCanvas create={create} />
}
