import type { Metadata } from "next"
import { PageBanner } from "@/components/page-banner"
import { MasonryGallery, type Piece } from "@/components/masonry-gallery"

export const metadata: Metadata = {
  title: "3D Generalist — Showcase",
  description: "A fluid gallery of 3D work: characters, environments, hard-surface, and simulation stills.",
}

const PIECES: Piece[] = [
  {
    src: "/showcase/piece-01.png",
    title: "Neon Warden",
    desc: "Hard-surface character bust. Sculpted in ZBrush, retopo in Blender, textured in Substance. Real-time PBR shading pass.",
    tags: ["Character"],
    polys: "84k tris",
    href: "https://sketchfab.com",
    span: "tall",
  },
  {
    src: "/showcase/piece-05.png",
    title: "Viscous Study",
    desc: "FLIP fluid solve exported as VDB, rendered with a thin-film iridescence shader. A single frozen frame of a 240-substep sim.",
    tags: ["Simulation"],
    polys: "VDB",
    href: "https://sketchfab.com",
    span: "wide",
  },
  {
    src: "/showcase/piece-02.png",
    title: "Ashfall Corridor",
    desc: "Modular environment kit lit with volumetric fog. Trim-sheet workflow, 4 materials driving the entire corridor.",
    tags: ["Environment"],
    polys: "210k tris",
    href: "https://sketchfab.com",
    span: "short",
  },
  {
    src: "/showcase/piece-04.png",
    title: "Xeno Sculpt",
    desc: "Organic creature with subsurface translucency and animated emissive veins. Displacement baked from a 12M-poly sculpt.",
    tags: ["Creature"],
    polys: "1.2M sculpt",
    href: "https://sketchfab.com",
    span: "tall",
  },
  {
    src: "/showcase/piece-06.png",
    title: "Hover — MK.III",
    desc: "Concept vehicle, hard-surface subd modeling. Wet-floor studio lighting with raytraced reflections and crimson underglow.",
    tags: ["Hard-surface"],
    polys: "156k tris",
    href: "https://sketchfab.com",
    span: "wide",
  },
  {
    src: "/showcase/piece-03.png",
    title: "Signal Totem",
    desc: "Stylized prop set with hand-painted normals. Optimized to a single 2K atlas for mobile real-time delivery.",
    tags: ["Prop"],
    polys: "18k tris",
    href: "https://sketchfab.com",
    span: "short",
  },
]

export default function ShowcasePage() {
  return (
    <>
      <PageBanner index="01" title="3D Generalist" accent="orange">
        Modeling, sculpting, look-dev and lighting. Everything below is uploaded to
        Sketchfab as an interactive, turntable-ready asset — click any frame to open it.
      </PageBanner>
      <MasonryGallery pieces={PIECES} />
    </>
  )
}
