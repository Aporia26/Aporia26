"use client"

import "katex/dist/katex.min.css"
import { BlockMath } from "react-katex"

export function Formula({ tex }: { tex: string }) {
  return (
    <div className="overflow-x-auto border-l-2 border-teal/50 bg-ink/40 px-4 py-3 text-bone">
      <BlockMath math={tex} />
    </div>
  )
}
