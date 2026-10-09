// Placeholders: anything in [brackets] is a note to yourself.
// On your computer (npm run dev) you see it highlighted in yellow.
// On the live site it's removed, and anything left empty is hidden.

export const DEV = import.meta.env.DEV

// remove [bracket notes] and tidy the spaces they leave behind
export function clean(text) {
  return String(text ?? '')
    .replace(/\s*\[[^\]]*\]/g, '')
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

// should this text show up at all?
export const shows = (text) => DEV || clean(text) !== ''

// a date line like "[MM/DD/YYYY] - current": on the live site, hide it until it's filled in
export const dateLine = (d) => (DEV || !/\[/.test(d ?? '') ? d : '')
