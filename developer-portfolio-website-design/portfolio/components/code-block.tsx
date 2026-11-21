import { cn } from "@/lib/utils"

export function CodeBlock({
  filename,
  lang = "glsl",
  code,
  className,
}: {
  filename: string
  lang?: string
  code: string
  className?: string
}) {
  const lines = code.replace(/\n$/, "").split("\n")

  return (
    <figure className={cn("overflow-hidden border border-border/60 bg-[oklch(0.12_0.012_250)]", className)}>
      <figcaption className="flex items-center justify-between border-b border-border/60 bg-ink/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-crimson/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-orange/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/80" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">{filename}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">{lang}</span>
      </figcaption>
      <pre className="scanlines overflow-x-auto p-4 text-xs leading-relaxed md:text-[13px]">
        <code className="font-mono">
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[2ch_1fr] gap-4">
              <span className="select-none text-right text-muted-foreground/40">{i + 1}</span>
              <Line text={line} />
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}

const KEYWORDS = new Set([
  "const", "let", "var", "function", "fn", "return", "for", "while", "if", "else",
  "struct", "class", "void", "float", "int", "bool", "vec2", "vec3", "vec4",
  "mat3", "mat4", "uniform", "in", "out", "import", "from", "def", "new", "self",
  "impl", "pub", "mut", "double",
])

/**
 * Single-pass tokenizer that builds React nodes directly (no markup injection),
 * so it can't corrupt itself. Tuned for the cinematic palette.
 */
function Line({ text }: { text: string }) {
  if (text.length === 0) return <span>{"\u00A0"}</span>

  const trimmed = text.trimStart()
  if (trimmed.startsWith("//") || trimmed.startsWith("#") || trimmed.startsWith("*") || trimmed.startsWith("/*")) {
    return <span className="italic text-muted-foreground/60">{text}</span>
  }

  const token = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*(?:e-?\d+)?f?\b)|([A-Za-z_]\w*)/g
  const nodes: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let key = 0

  while ((m = token.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    const [full, comment, str, num, word] = m
    if (comment) nodes.push(<span key={key++} className="italic text-muted-foreground/60">{comment}</span>)
    else if (str) nodes.push(<span key={key++} className="text-teal">{str}</span>)
    else if (num) nodes.push(<span key={key++} className="text-crimson">{num}</span>)
    else if (word && KEYWORDS.has(word)) nodes.push(<span key={key++} className="text-neon-orange">{word}</span>)
    else nodes.push(full)
    last = m.index + full.length
  }
  if (last < text.length) nodes.push(text.slice(last))

  return <span>{nodes}</span>
}
