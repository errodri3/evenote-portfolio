import { DEV, clean } from './draft'

// Text that may contain [bracket notes] for yourself.
// Dev: brackets show highlighted in yellow. Live site: brackets are removed.
export default function Ph({ children }) {
  if (!DEV) return clean(children)
  const parts = String(children ?? '').split(/(\[[^\]]+\])/g)
  return parts.map((part, i) =>
    part.startsWith('[') && part.endsWith(']')
      ? <span key={i} className="ph">{part}</span>
      : part
  )
}
