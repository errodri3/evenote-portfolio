// The notes that float on the home screen wave.
// title/sub = text under the wave when the note is picked
// to        = the page the note opens
// tip       = what the mascot says in the speech bubble
// snip      = the 3 lines on the front of the note
// doodle    = heart, bubble, spark, phone, or star (see Thumb.jsx)
// ink/paper = doodle color / note paper color

export const NOTES = [
  { title: "Hi, I'm Eve!", sub: 'About me', to: '/about', tip: "That's me! Open it to learn who I am.",
    snip: ["Hi, I'm Eve!", 'designer +', 'web developer'], doodle: 'heart', ink: '#E0627A', paper: '#FFF8E3' },
  { title: 'Converse to Learn', sub: 'Selected work · Research + Illustration', to: '/work/c2l', tip: 'Bilingual science storybooks. In progress!', snip: ['Luna & Leo', 'storybooks', 'in progress 🚧'], doodle: 'bubble', ink: '#467F26', paper: '#F1F8E8' },
  { title: 'Computing and AI for All', sub: 'Selected work · Curriculum Design', to: '/work/ai4all', tip: 'AI lessons for middle schoolers.',
    snip: ['AI for All', 'lessons for', 'grades 6-8'], doodle: 'spark', ink: '#7B5CC4', paper: '#F4F0FC' },
  { title: 'Nudge', sub: 'Selected work · UX/UI Design', to: '/work/nudge', tip: 'My app for professional confidence.',
    snip: ['Nudge', 'practice makes', 'confident!'], doodle: 'phone', ink: '#6A74E0', paper: '#EEF0FE' },
  { title: 'Why Swapnote?', sub: 'About this site', to: '/why', tip: 'Why my portfolio looks like a note app.',
    snip: ['Why', 'Swapnote?', 'where I started'], doodle: 'star', ink: '#C9921A', paper: '#FFF6DA' },
]

// which note is picked when the home screen opens (0 = first)
export const START_NOTE = 1