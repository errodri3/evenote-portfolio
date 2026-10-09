// Playground: things you make outside of work (art, graphics, logos, websites...).
//
// To add a piece:
//   1. Put the image in public/play/  (example: public/play/sunset-poster.png)
//   2. Add a line below with the same file name.
//
//   title: name of the piece
//   kind:  one of the KINDS below (this is what the filter buttons use)
//   year:  when you made it
//   src:   the image file
//   about: one short line about it (optional)
//   link:  a website link, for live sites (optional)
//
// Pieces with [brackets] or a missing image only show on your computer,
// so the live site never shows empty boxes.

export const KINDS = ['Illustration', 'Graphics', 'Logos', 'Websites']

export const PIECES = [
  { title: '[Illustration title]', kind: 'Illustration', year: '2026', src: '/play/illustration-1.png', about: '[one line about it]' },
  { title: '[Poster or graphic]', kind: 'Graphics', year: '2026', src: '/play/graphic-1.png', about: '[one line about it]' },
  { title: '[Logo name]', kind: 'Logos', year: '2026', src: '/play/logo-1.png', about: '[who it was for]' },
  { title: '[Website name]', kind: 'Websites', year: '2026', src: '/play/site-1.png', about: '[what it is]', link: '' },
]
