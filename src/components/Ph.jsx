// Highlights any [bracketed text] in yellow so unfinished copy is easy to spot.
export default function Ph({ children }) {
  const parts = String(children ?? '').split(/(\[[^\]]+\])/g)
  return parts.map((part, i) =>
    part.startsWith('[') && part.endsWith(']')
      ? <span key={i} className="ph">{part}</span>
      : part
  )
}