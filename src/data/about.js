// About page + footer content.

// [name, your role]
export const EXPERIENCE = [
  ['UCI Digital Learning Lab', 'Researcher'],
  ['Dreams for Schools', 'STEAM Instructor'],
  ['Hack at UCI', 'Designer'],
  ["Jaboneria D'Roma", 'Graphic Designer & Web Designer'],
  ['CodePath', 'Advanced Web Development'],
  ['Design @ UCI Project Teams', 'Designer'],
  ['Design @ UCI Project Teams', 'Team Design Lead'],
  ['UC Irvine', 'Informatics, HCI · Class of 2027'],
]

// [group name, [tools]]
export const TOOLBOX = [
  ['Design', ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Prototyping', 'Illustration', 'Branding']],
  ['Development', ['HTML / CSS / JavaScript', 'Java', 'Python', 'React', 'Vite', 'Framer Motion', 'Node / Express', 'Git / GitHub']],
  ['Research', ['User interviews', 'Usability testing', 'Qualitative coding', 'Data visualization']],
]

// [verb, what]
export const OUTSIDE = [
  ['playing', 'Magic: The Gathering, Riftbound'],
  ['drawing', 'coming soon'],
  ['listening', 'to my playlist', 'https://open.spotify.com/playlist/4ifXQgdnknl15Ry98ibCga'],   // 3rd item = optional link
  ['making', 'coming soon'],
]

// Your links. Leave as '' until you have them.
export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/evelyn-rodriguez-r',
  email: 'errodri3@uci.edu',
  github: 'https://github.com/errodri3',
  instagram: '',
  resume: '/Evelyn_Rodriguez_Resume_2026.pdf',
  playlist: 'https://open.spotify.com/playlist/4ifXQgdnknl15Ry98ibCga',
}

// Side panel: quick brief about you
export const SIDEBAR = {
  quote: '"Designing with a purpose, but with a personal touch."',
  roles: [
    ['@UC IRVINE', 'Informatics · HCI'],
    ['@DIGITAL LEARNING LAB', 'Researcher'],
    ['@DREAMS FOR SCHOOLS', 'STEAM Instructor'],
  ],
}
// What your logo says when someone hovers over it in the side panel.
// It shows the next one every time. Add, remove, or reorder freely.
//   t    = the bold line
//   s    = a smaller second line (optional)
//   link = [text, where it goes] (optional). Use a /page or a full https:// link.
export const MASCOT_LINES = [
  { t: 'psst... check ALL my notes', s: 'something cool is hiding in here' },
  { t: 'open to summer 2027 internships!', s: 'UX/UI, product design, front end', link: ['say hi →', '/write'] },
  { t: 'I started drawing on a 3DS', s: 'in Swapnote, when I was seven' },
  { t: 'I also make playlists', link: ['open spotify ↗', LINKS.playlist] },
  { t: 'STEAM instructor by day', s: 'teaching kids to code + build robots' },
  { t: 'Magic: The Gathering player', s: 'ask me about my deck' },
  { t: 'now @ UCI Digital Learning Lab', s: 'designing AI storybooks for kids' },
  { t: 'graduating June 2027,', s: 'next: you?', link: ['see my resume ↗', LINKS.resume] },
]
