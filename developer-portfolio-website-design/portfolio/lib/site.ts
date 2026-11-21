// Edit these to personalize the site.
export const SITE = {
  name: "ABHINEET CHAKRABORTY",
  role: "Graphics Programmer / Engine & Simulation Dev",
  location: "India",
  timezone: "Asia/Kolkata",
  tagline: "Building Custom Game Engine and exploring real-time Rendering, Graphics, and low-level systems. \n Building worlds in geometry, light, and code.",
}

export const NAV = [
  { href: "/", label: "Index", index: "00" },
  { href: "/showcase", label: "3D Generalist", index: "01" },
  { href: "/simulations", label: "Simulations", index: "02" },
  { href: "/engines", label: "Engines & Shaders", index: "03" },
] as const

export type SoftwareLogo = { slug: string; name: string; tint: string }

// tint uses the theme color utility classes via inline style vars
export const SOFTWARE: SoftwareLogo[] = [
  { slug: "vulkan", name: "Vulkan", tint: "var(--crimson)" },
  { slug: "opengl", name: "OpenGL", tint: "var(--bone)" },
  { slug: "glsl", name: "GLSL", tint: "var(--bone)" },
  { slug: "cplusplus", name: "C++", tint: "var(--teal)" },
  { slug: "rust", name: "Rust", tint: "var(--crimson)" },
  { slug: "webgl", name: "WebGL", tint: "var(--neon-orange)" },
  { slug: "blender", name: "Blender", tint: "var(--neon-orange)" },
  { slug: "python", name: "Python", tint: "var(--neon-orange)" },
  { slug: "unreal-engine", name: "Unreal Engine", tint: "var(--bone)" },
  { slug: "unity", name: "Unity", tint: "var(--teal)" },
  { slug: "houdini", name: "Houdini", tint: "var(--neon-orange)" },
  { slug: "substance-3d-painter", name: "Substance 3D", tint: "var(--crimson)" },
  { slug: "maya", name: "Maya", tint: "var(--teal)" },
  //{ slug: "cinema-4d", name: "Cinema 4D", tint: "var(--bone)" },
  //{ slug: "threedsmax", name: "3ds Max", tint: "var(--teal)" },
  //{ slug: "nuke", name: "Nuke", tint: "var(--neon-orange)" },
  { slug: "davinci-resolve", name: "DaVinci Resolve", tint: "var(--crimson)" },
  { slug: "godot", name: "Godot", tint: "var(--teal)" },  
  //{ slug: "threejs", name: "Three.js", tint: "var(--bone)" },
  
  
  
]
