"use client"

import { useCallback } from "react"
import { SimCanvas, PALETTE, type CreateSim } from "./sim-canvas"

export function ClothDemo() {
  const create = useCallback<CreateSim>((w, h) => {
    const cols = 14
    const rows = 10
    const gap = Math.min(w / (cols + 3), h / (rows + 3))
    const ox = (w - (cols - 1) * gap) / 2
    const oy = gap * 1.5

    type P = { x: number; y: number; px: number; py: number; pin: boolean }
    const pts: P[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = ox + x * gap
        const py = oy + y * gap
        pts.push({ x: px, y: py, px, py, pin: y === 0 && x % 4 === 0 })
      }
    }
    const idx = (x: number, y: number) => y * cols + x
    const sticks: [number, number][] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (x < cols - 1) sticks.push([idx(x, y), idx(x + 1, y)])
        if (y < rows - 1) sticks.push([idx(x, y), idx(x, y + 1)])
      }
    }

    let t = 0
    return {
      step(ctx, dt) {
        t += dt
        ctx.fillStyle = PALETTE.void
        ctx.fillRect(0, 0, w, h)

        const g = 520 * dt * dt
        const windX = Math.sin(t * 1.3) * 34 * dt * dt
        for (const p of pts) {
          if (p.pin) continue
          const vx = (p.x - p.px) * 0.99
          const vy = (p.y - p.py) * 0.99
          p.px = p.x
          p.py = p.y
          p.x += vx + windX
          p.y += vy + g
        }

        for (let k = 0; k < 6; k++) {
          for (const [a, b] of sticks) {
            const pa = pts[a]
            const pb = pts[b]
            const dx = pb.x - pa.x
            const dy = pb.y - pa.y
            const d = Math.hypot(dx, dy) || 0.0001
            const diff = ((gap - d) / d) * 0.5
            const ox2 = dx * diff
            const oy2 = dy * diff
            if (!pa.pin) {
              pa.x -= ox2
              pa.y -= oy2
            }
            if (!pb.pin) {
              pb.x += ox2
              pb.y += oy2
            }
          }
        }

        ctx.strokeStyle = PALETTE.crimson
        ctx.globalAlpha = 0.75
        ctx.lineWidth = 1
        ctx.beginPath()
        for (const [a, b] of sticks) {
          ctx.moveTo(pts[a].x, pts[a].y)
          ctx.lineTo(pts[b].x, pts[b].y)
        }
        ctx.stroke()
        ctx.globalAlpha = 1

        for (const p of pts) {
          if (!p.pin) continue
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = PALETTE.orange
          ctx.shadowBlur = 8
          ctx.shadowColor = PALETTE.orange
          ctx.fill()
          ctx.shadowBlur = 0
        }
      },
    }
  }, [])

  return <SimCanvas create={create} />
}
