// The notes that float on the home screen wave.
// title  = text under the wave when the note is picked
// dates  = the line under the title (MM/DD/YYYY - MM/DD/YYYY, or "- current").
//          [brackets] = not filled in yet: hidden on the live site.
// to     = the page the note opens
// snip   = the 3 lines on the front of the note
// doodle = heart, bubble, spark, phone, star, or brush (see Thumb.jsx)
// ink/paper = doodle color / note paper color
// secret = this note stays sealed until it's delivered (see components/mail.js)

export const NOTES = [
  { title: "Hi, I'm Eve!", dates: '03/07/2005 - current', to: '/about',
    snip: ["Hi, I'm Eve!", 'designer +', 'web developer'], doodle: 'heart', ink: '#E0627A', paper: '#FFF8E3' },
  { title: 'Converse to Learn', dates: '[MM/DD/YYYY] - current', to: '/work/c2l',
    snip: ['Luna & Leo', 'storybooks', 'in progress 🚧'], doodle: 'bubble', ink: '#467F26', paper: '#F1F8E8' },
  { title: 'Computing and AI for All', dates: '[06/DD/2026] - [08/DD/2026]', to: '/work/ai4all',
    snip: ['AI for All', 'lessons for', 'grades 6-8'], doodle: 'spark', ink: '#7B5CC4', paper: '#F4F0FC' },
  { title: 'Nudge', dates: '03/29/2026 - 06/04/2026', to: '/work/nudge',
    snip: ['Nudge', 'practice makes', 'confident!'], doodle: 'phone', ink: '#6A74E0', paper: '#EEF0FE' },
  { title: 'Playground', dates: '[MM/DD/YYYY] - current', to: '/playground',
    snip: ['Playground', 'art, logos +', 'side projects'], doodle: 'brush', ink: '#D9622B', paper: '#FFF1E8' },
  { title: 'Why Swapnote?', secret: true, dates: '[MM/DD/YYYY] - current', to: '/why',
    snip: ['Why', 'Swapnote?', 'where I started'], doodle: 'star', ink: '#C9921A', paper: '#FFF6DA' },
]

// which note is picked when the home screen opens (0 = first)
export const START_NOTE = 1
