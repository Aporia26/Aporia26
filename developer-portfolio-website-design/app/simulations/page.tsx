import type { Metadata } from "next"
import { PageBanner } from "@/components/page-banner"
import { CodeBlock } from "@/components/code-block"
import { Formula } from "@/components/math"
import { GravityDemo } from "@/components/demos/gravity-demo"
import { BoidsDemo } from "@/components/demos/boids-demo"
import { ClothDemo } from "@/components/demos/cloth-demo"

export const metadata: Metadata = {
  title: "Simulations — Physics & Code",
  description: "Live real-time tech demos paired with the code and the math that drives them.",
}

const GRAVITY_CODE = `// semi-implicit Euler, softened N-body attraction
for (const b of bodies) {
  const dx = cx - b.x, dy = cy - b.y;
  const d2 = dx*dx + dy*dy + softening;
  const a  = G / d2;              // |a| = G·M / r²
  const inv = 1.0 / Math.sqrt(d2);
  b.vx += a * dx * inv * dt;      // integrate velocity
  b.vy += a * dy * inv * dt;
  b.x  += b.vx * dt;             // then position
  b.y  += b.vy * dt;
}`

const BOIDS_CODE = `// Reynolds: alignment + cohesion + separation
for (const o of neighbors(b, radius)) {
  align  += o.velocity;          // match heading
  center += o.position;          // steer to local mean
  sep    -= (o.position - b.position).norm();
}
b.velocity += align.avg()  * wAlign
            + (center.avg() - b.pos) * wCohesion
            + sep * wSeparation;
b.velocity = b.velocity.clampSpeed(maxSpeed);`

const CLOTH_CODE = `// Verlet integration + distance constraints
p.next = p.pos + (p.pos - p.prev) * damping + gravity*dt*dt;
p.prev = p.pos; p.pos = p.next;

// relax constraints over N iterations
for (let k = 0; k < iterations; k++)
  for (const [a, b] of sticks) {
    const d = b.pos - a.pos;
    const c = (rest - d.length) / d.length * 0.5;
    a.pos -= d * c;  b.pos += d * c;   // keep rest length
  }`

type Sim = {
  index: string
  title: string
  blurb: string
  code: string
  filename: string
  lang: string
  demo: React.ReactNode
  math: string
  mathNote: string
  flip?: boolean
}

const SIMS: Sim[] = [
  {
    index: "a",
    title: "Softened N-Body Gravity",
    blurb:
      "Each particle is pulled toward a central mass. A softening term keeps the force finite as r → 0, so integration stays stable at close approach.",
    code: GRAVITY_CODE,
    filename: "gravity.ts",
    lang: "typescript",
    demo: <GravityDemo />,
    math: "\\vec{F} = G\\frac{m_1 m_2}{r^2 + \\varepsilon^2}\\,\\hat{r}",
    mathNote:
      "Newtonian attraction with softening length ε. Sub-stepping the integrator (h = dt / n) reduces energy drift on eccentric orbits.",
  },
  {
    index: "b",
    title: "Boids — Emergent Flocking",
    blurb:
      "No boid knows the flock. Three local steering rules — alignment, cohesion, separation — evaluated per neighbor produce global murmuration.",
    code: BOIDS_CODE,
    filename: "boids.ts",
    lang: "typescript",
    demo: <BoidsDemo />,
    math: "\\vec{v}_i' = \\vec{v}_i + w_a\\vec{a}_i + w_c\\vec{c}_i + w_s\\vec{s}_i",
    mathNote:
      "Weighted sum of the three steering vectors, then clamped to a maximum speed. Neighborhood radius controls how tightly the flock coheres.",
    flip: true,
  },
  {
    index: "c",
    title: "Verlet Cloth",
    blurb:
      "Position-based dynamics: points store their previous position instead of velocity. Distance constraints are relaxed iteratively until the mesh holds its rest shape under gravity and wind.",
    code: CLOTH_CODE,
    filename: "cloth.ts",
    lang: "typescript",
    demo: <ClothDemo />,
    math: "\\vec{x}_{t+1} = 2\\vec{x}_t - \\vec{x}_{t-1} + \\vec{a}\\,\\Delta t^2",
    mathNote:
      "Verlet integration is velocity-free and unconditionally stable for stiff constraints, which is why it dominates real-time cloth and rope.",
  },
]

export default function SimulationsPage() {
  return (
    <>
      <PageBanner index="02" title="Simulations" accent="teal">
        Real-time physics running in your browser on a 2D canvas — each demo pauses when
        off-screen and respects reduced-motion. The code beside it is the actual solver;
        the math below is what it discretizes.
      </PageBanner>

      <div className="mx-auto max-w-[1400px] space-y-24 px-5 py-16 md:px-8 md:py-24">
        {SIMS.map((s) => (
          <section key={s.title} className="scroll-mt-24">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-sm text-teal">{s.index}/</span>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bone md:text-3xl">
                {s.title}
              </h2>
            </div>

            <div className={`flex flex-col gap-6 lg:flex-row ${s.flip ? "lg:flex-row-reverse" : ""}`}>
              <div className="lg:w-1/2">
                <CodeBlock filename={s.filename} lang={s.lang} code={s.code} className="h-full" />
              </div>
              <div className="relative min-h-[300px] overflow-hidden border border-border/60 bg-void lg:min-h-0 lg:w-1/2">
                <div className="absolute left-3 top-3 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
                  live · running
                </div>
                <div className="aspect-[4/3] w-full lg:h-full">{s.demo}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center">
              <Formula tex={s.math} />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="mb-1 block text-bone">{s.blurb}</span>
                {s.mathNote}
              </p>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
