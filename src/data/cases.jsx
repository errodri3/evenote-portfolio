// Case studies. Anything in [brackets] shows highlighted as a reminder to fill it in.
//
// Each section:
//   k = label ("context", "problem"...)   h = heading   p = paragraph
//   optional: image: true      → shows an image slot
//             decisions: [{ b, p }]  → decision cards
//             stats: [[number, label]] → number tiles

export const CASES = {
  c2l: {
    title: 'Bilingual AI storybooks for young scientists',
    short: 'Converse to Learn',
    one: 'Reviewing 12 family-made AI story decks for bias, then designing one consistent family of characters to use across all of them.',
    year: '2026',
    tags: ['Research', 'Illustration', 'AI & Bias'],
    role: 'Researcher, Visual Designer',
    timeline: '2026 - 2027',
    tools: 'Figma, VSCode: HTML/CSS, JS, Adobe Photoshop',
    team: 'UCI Digital Learning Lab, with University of Michigan and Harvard',
    lede: 'Converse to Learn makes conversational-agent books and videos that talk with young children to build dialogic learning. I design and illustrate the visual assets for the platform. Most recently, I reviewed 12 story decks that families made with AI image tools and turned them into one shared family of characters.',
    sections: [
      { k: 'context', h: 'Stories made by families', p: "The project is a collaboration between UCI's Digital Learning Lab, the University of Michigan Marshall Family School of Education, and the Harvard Graduate School of Education. Families created story decks with AI image generation, about things like kids visiting grandparents, going back to their homeland, and tech versus tradition." },
      { k: 'problem', h: 'Twelve stories, twelve casts', p: 'Every deck had its own characters, and AI-generated images brought their own bias along with them. There was no shared set of characters or backgrounds the team could reuse from story to story.' },
      {
        k: 'process', h: 'Catalog, compare, combine', image: true,
        p: 'I cataloged all 12 decks (7 from UCI and 5 from Michigan) and looked for common characters, story patterns, and signs of AI bias.',
        decisions: [
          { b: 'Decision 1: one family, not twelve.', p: 'The team agreed to analyze all 12 stories together and build one coherent family that could appear in any of them.' },
          { b: 'Decision 2: design for who was missing.', p: 'I added characters and storylines from underrepresented countries, plus identity themes like colorism, so the set reflects more kids.' },
          { b: 'Decision 3: consistency first.', p: 'I planned reusable home and school backgrounds so the same family can be placed across many stories and still look like themselves.' },
        ],
      },
      { k: 'solution', h: 'A family of ten', image: true, p: 'Mateo, Sofia, Elena, Andres, Jose, Mercedes, Diego, Valentina, Miguel, and Rosa: siblings, parents, grandparents, cousins, an aunt, and an uncle. [Add character sheets and backgrounds here.]' },
      { k: 'outcome', h: 'Where it landed', p: '[What the team did with the family next, and what you learned.]', stats: [['12', 'story decks reviewed'], ['10', 'family members designed'], ['3', 'universities collaborating']] },
    ],
  },

  ai4all: {
    title: 'Computing and AI for All: A Teacher-First AI Curriculum',
    short: 'Computing and AI for All',
    one: 'Building AI literacy lessons for 6th to 8th graders, with one shared structure that makes every lesson easy for teachers to run.',
    year: 'Summer 2026',
    tags: ['Curriculum Design', 'AI Literacy', 'Education'],
    role: 'Curriculum Designer [confirm]',
    timeline: 'June 2026 - August 2026',
    tools: '-',
    team: 'UCI Digital Learning Lab, led by Prof. Mark Warschauer',
    lede: 'Computing and AI for All is an initiative at UCI that teaches AI literacy to middle schoolers in Orange County school districts. Students build with AI on the CreatiCode platform. I design the teacher guides, slide decks, student workbooks, and rubrics.',
    sections: [
      { k: 'context', h: 'Middle schoolers building with AI', p: 'Lessons cover prompt engineering, AI image ethics, chatbots, and tool use, and they range from a single 40-minute class to multi-day group projects.' },
      { k: 'problem', h: 'Every lesson looked different', p: 'Guides used different formats, and rubrics reused the same generic categories. Teachers had to relearn how to read each lesson before they could teach it.' },
      {
        k: 'process', h: 'One structure for every lesson', image: true,
        p: 'I rebuilt lessons around a single template, keeping the teacher in the center of every decision.',
        decisions: [
          { b: 'Decision 1: a shared label system.', p: 'Every guide uses the same four labels: Explain, Try It, Teacher Tip, and click cues. Explain moments include example lines written the way a teacher would say them out loud.' },
          { b: 'Decision 2: rubrics that scale with time.', p: 'Rubrics use lesson-specific categories and even point values, and they grow with lesson length: 10 points for 40 minutes, 14 for 60, and 18 for 80.' },
          { b: 'Decision 3: rubrics as their own files.', p: 'Rubrics live in standalone files so teachers can attach them straight to Google Classroom, with a comments row for feedback.' },
        ],
      },
      { k: 'solution', h: 'Guides teachers can pick up and run', image: true, p: 'A consistent set of teacher guides, slides, workbooks, and rubrics, plus reusable templates for revising the next lesson. [Add example spreads here.]' },
      { k: 'outcome', h: 'What changed', p: '[Teacher feedback, classrooms reached, or what you learned.]', stats: [['6–8', 'grade levels'], ['4', 'shared guide labels'], ['3', 'rubric sizes by lesson length']] },
    ],
  },

  nudge: {
    title: 'Nudge: Practice for Professional Confidence',
    short: 'Nudge',
    one: 'A Duolingo-style app that helps college students practice interviews, networking, and professional communication.',
    year: '2026',
    tags: ['UX/UI Design', 'User Research', 'Mobile'],
    role: 'UX/UI Designer',
    timeline: 'Spring Quarter 2026, 8 weeks',
    tools: 'Figma',
    team: 'Team 7: Crystal, Christina, Evelyn, Hanin, Samina, Sergio',
    lede: 'Nudge helps college students build confidence in interviews, networking, and professional communication through short guided practice and positive support. I assisted in ideation of the project, designed the hi-fi prototype, and presented the case study at demo day.',
    sections: [
      { k: 'context', h: 'Confidence is a skill', p: '' },
      { k: 'problem', h: 'No low-stakes place to practice', p: 'Students and early-career professionals often struggle to communicate their experiences confidently in interviews, networking events, presentations, and workplace conversations.' },
      {
        k: 'process', h: 'Narrowing the scope', image: true,
        p: 'The first version covered both social and professional confidence. User testing showed students wanted a sharper focus, so we narrowed Nudge to professional skills only.',
        decisions: [
          { b: 'Decision 1: professional only.', p: 'Cutting the social side made the practice paths clearer and easier to test.' },
          { b: 'Decision 2: bite-sized practice.', p: '[Why short, Duolingo-style lessons fit how students actually prepare.]' },
          { b: 'Decision 3: [your third decision].', p: '[What you changed after another round of testing.]' },
        ],
      },
      { k: 'solution', h: 'The hi-fi prototype', image: true, p: '[Key screens and flows. Add Figma frames here.]' },
      { k: 'outcome', h: 'Demo day', p: '[Results, feedback from demo day, and what you would do next.]', stats: [['[#]', 'rounds of iteration'], ['[#]', 'user tests'], ['20', 'slide case study']] },
    ],
  },
}

// Order on the Selected Work page, and for "next note" links
export const ORDER = ['c2l', 'ai4all', 'nudge']