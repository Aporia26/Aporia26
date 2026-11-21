import { cn } from "@/lib/utils"

/**
 * Moody, non-grid atmospheric backdrop: drifting neon light pools over black.
 * Purely decorative.
 */
export function Atmosphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute -left-[10%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-neon-orange/20 blur-[120px] drift-slow" />
      <div className="absolute right-[-8%] top-[20%] h-[48vh] w-[48vh] rounded-full bg-crimson/25 blur-[130px] drift-slower" />
      <div className="absolute bottom-[-15%] left-[30%] h-[50vh] w-[50vh] rounded-full bg-teal/18 blur-[140px] drift-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--void)_92%)]" />
    </div>
  )
}
