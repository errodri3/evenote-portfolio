// The landscape preview on the front of each note.

const DOODLES = {
  heart: <path d="M50 82S18 62 18 38a16 16 0 0 1 32-6 16 16 0 0 1 32 6c0 24-32 44-32 44z" />,
  bubble: <><path d="M14 20h72v44H44L26 80V64H14z" /><path d="M30 36h40M30 48h26" /></>,
  spark: <><path d="M50 12l8 24 24 8-24 8-8 24-8-24-24-8 24-8z" /><path d="M80 10v14M73 17h14" /></>,
  phone: <><rect x="30" y="10" width="40" height="80" rx="10" /><path d="M44 78h12" /><path d="M40 30h20M40 42h14" /></>,
  brush: <><path d="M74 14L40 52" /><path d="M40 52c-10-2-18 4-18 14 0 8-6 12-10 14 14 4 32 0 34-14 1-6-2-11-6-14z" /><path d="M66 22l8 8" /></>,
  star: <path d="M50 12l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z" />,
}

export default function Thumb({ note }) {
  return (
    <span className="thumb">
      <span className="thumb-in" style={{ backgroundColor: note.paper }}>
        <span className="thumb-txt">
          <span className="thumb-t">{note.snip[0]}</span>
          <span className="thumb-l">{note.snip[1]}</span>
          <span className="thumb-l">{note.snip[2]}</span>
        </span>
        <span className="thumb-d">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <g fill="none" stroke={note.ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              {DOODLES[note.doodle]}
            </g>
          </svg>
        </span>
      </span>
    </span>
  )
}