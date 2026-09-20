"use client"

import { useEffect, useRef } from "react"
import { FRAG_SOURCE, VERT_SOURCE } from "@/lib/shaders"

export function ShaderDemo() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SOURCE))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SOURCE))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_res")
    const uTime = gl.getUniformLocation(prog, "u_time")

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const start = performance.now()
    const render = (t: number) => {
      gl.uniform1f(uTime, (t - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    if (reduce) {
      gl.uniform1f(uTime, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !raf) raf = requestAnimationFrame(render)
          else if (!e.isIntersecting && raf) {
            cancelAnimationFrame(raf)
            raf = 0
          }
        },
        { threshold: 0 },
      )
      io.observe(canvas)
      return () => {
        if (raf) cancelAnimationFrame(raf)
        io.disconnect()
        ro.disconnect()
      }
    }
    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="block h-full w-full" aria-hidden />
}
