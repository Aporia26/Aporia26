import type { Metadata } from "next"
import { PageBanner } from "@/components/page-banner"
import { CodeBlock } from "@/components/code-block"
import { ShaderDemo } from "@/components/demos/shader-demo"
import { FRAG_SOURCE } from "@/lib/shaders"

export const metadata: Metadata = {
  title: "Engines & Shaders — Technical",
  description: "Custom engine architecture and shader breakdowns.",
}

const LAYERS: { tier: string; color: string; blocks: string[] }[] = [
  { tier: "Platform", color: "border-teal/50 text-teal", blocks: ["Win32 / Cocoa", "Vulkan · Metal", "Input · Audio", "Job System"] },
  { tier: "Core", color: "border-neon-orange/50 text-neon-orange", blocks: ["ECS Registry", "Memory Arenas", "Event Bus", "Reflection"] },
  { tier: "Runtime", color: "border-crimson/50 text-crimson", blocks: ["Scene Graph", "Physics Step", "Animation", "Scripting VM"] },
  { tier: "Render Graph", color: "border-bone/40 text-bone", blocks: ["Culling", "GBuffer", "Lighting", "Post FX"] },
]

const RENDER_LOOP = `// frame graph — declarative pass scheduling
FrameGraph fg;
auto gbuffer = fg.add_pass("gbuffer", [&](Builder& b){
    b.write(albedo); b.write(normal); b.write(depth);
    return [=](CommandList& cmd){ draw_opaque(cmd, view); };
});
auto lighting = fg.add_pass("lighting", [&](Builder& b){
    b.read(gbuffer.albedo); b.read(gbuffer.depth);
    b.write(hdr);
    return [=](CommandList& cmd){ deferred_shade(cmd, lights); };
});
fg.compile();   // cull unused passes, alias transient memory
fg.execute(swapchain);`

const STATS: { k: string; v: string }[] = [
  { k: "Language", v: "C++20 / GLSL" },
  { k: "Backend", v: "Vulkan 1.3" },
  { k: "Arch", v: "Data-oriented ECS" },
  { k: "Frame", v: "Frame graph" },
  { k: "Threading", v: "Fiber job system" },
  { k: "Build", v: "CMake · Ninja" },
]

export default function EnginesPage() {
  return (
    <>
      <PageBanner index="03" title="Engines & Shaders" accent="crimson">
        Systems programming for real-time rendering — a custom C++ engine with a Vulkan
        frame graph, and the GLSL that runs at the end of the pipe.
      </PageBanner>

      <div className="mx-auto max-w-[1400px] space-y-24 px-5 py-16 md:px-8 md:py-24">
        {/* ARCHITECTURE — sharp, technical, right-angled */}
        <section>
          <SectionHead index="a" title="Engine Architecture" />
          <div className="grid gap-px border border-border/60 bg-border/60 md:grid-cols-[140px_1fr]">
            {LAYERS.map((layer) => (
              <div key={layer.tier} className="contents">
                <div className="flex items-center bg-void px-4 py-5">
                  <span className={`font-mono text-xs uppercase tracking-[0.25em] ${layer.color.split(" ")[1]}`}>
                    {layer.tier}
                  </span>
                </div>
                <div className="flex flex-wrap gap-px bg-border/60">
                  {layer.blocks.map((b) => (
                    <div
                      key={b}
                      className={`flex flex-1 items-center justify-center border-l-2 bg-ink/70 px-4 py-5 text-center font-mono text-xs text-bone ${layer.color.split(" ")[0]}`}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-px grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <CodeBlock filename="frame_graph.cpp" lang="c++" code={RENDER_LOOP} />
            <dl className="grid grid-cols-2 gap-px border border-border/60 bg-border/60">
              {STATS.map((s) => (
                <div key={s.k} className="bg-void p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.k}</dt>
                  <dd className="mt-1 font-display text-sm font-bold uppercase text-teal">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SHADER BREAKDOWN — live WebGL beside its source */}
        <section>
          <SectionHead index="b" title="Shader Breakdown — Domain-Warped FBM" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden border border-border/60 bg-void">
              <div className="absolute left-3 top-3 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
                fragment · webgl
              </div>
              <div className="aspect-square w-full lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <ShaderDemo />
              </div>
            </div>
            <CodeBlock filename="warp.frag" lang="glsl" code={FRAG_SOURCE} className="h-full" />
          </div>

          <div className="mt-6 grid gap-px border border-border/60 bg-border/60 md:grid-cols-3">
            {[
              {
                t: "01 — Value Noise",
                d: "A hash on the integer lattice, bilinearly interpolated with a smoothstep fade. Cheap, tileable, and the foundation of everything above it.",
              },
              {
                t: "02 — fBM",
                d: "Five octaves of noise summed at halving amplitude and doubling frequency. Produces the cloud-like detail across scales.",
              },
              {
                t: "03 — Domain Warp",
                d: "Sample coordinates are displaced by a second fBM field before the final lookup, giving the flowing, marbled motion.",
              },
            ].map((c) => (
              <div key={c.t} className="bg-void p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neon-orange">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-sm text-crimson">{index}/</span>
      <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bone md:text-3xl">{title}</h2>
    </div>
  )
}
