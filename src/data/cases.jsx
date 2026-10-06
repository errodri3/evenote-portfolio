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
    owned: ['Designed and illustrated visual assets for the platform', 'Cataloged and reviewed all 12 family story decks for bias', 'Designed one shared family of 10 characters'],
    hero: { src: '/work/converse-to-learn/images/hero.png', caption: 'The family of characters' },
    notes: [
      { short: 'Context', k: 'context', h: 'Stories made by families', body: [
        { p: "The project is a collaboration between UCI's Digital Learning Lab, the University of Michigan Marshall Family School of Education, and the Harvard Graduate School of Education. Families created story decks with AI image generation, about things like kids visiting grandparents, going back to their homeland, and tech versus tradition." },
      ] },
      { short: 'Problem', k: 'problem', h: 'Twelve stories, twelve casts', body: [
        { p: 'Every deck had its own characters, and AI-generated images brought their own bias along with them. There was no shared set of characters or backgrounds the team could reuse from story to story.' },
      ] },
      { short: 'Process', k: 'process', h: 'Catalog, compare, combine', body: [
        { p: 'I cataloged all 12 decks (7 from UCI and 5 from Michigan) and looked for common characters, story patterns, and signs of AI bias.' },
        { decision: { b: 'One family, not twelve.', p: 'The team agreed to analyze all 12 stories together and build one coherent family that could appear in any of them.' } },
        { decision: { b: 'Design for who was missing.', p: 'I added characters and storylines from underrepresented countries, plus identity themes like colorism, so the set reflects more kids.' } },
        { decision: { b: 'Consistency first.', p: 'I planned reusable home and school backgrounds so the same family can be placed across many stories and still look like themselves.' } },
        { img: { src: '/work/converse-to-learn/images/catalog.png', caption: 'Story deck catalog' } },
      ] },
      { short: 'Solution', k: 'solution', h: 'A family of ten', body: [
        { p: 'Mateo, Sofia, Elena, Andres, Jose, Mercedes, Diego, Valentina, Miguel, and Rosa: siblings, parents, grandparents, cousins, an aunt, and an uncle.' },
        { img: { src: '/work/converse-to-learn/images/family.png', caption: 'Character sheets' } },
      ] },
      { short: 'Outcome', k: 'outcome', h: 'Where it landed', body: [
        { p: '[What the team did with the family next, and what you learned.]' },
        { stats: [['12', 'story decks reviewed'], ['10', 'family members designed'], ['3', 'universities collaborating']] },
      ] },
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
    owned: ['Teacher guides, slide decks, and student workbooks', 'Rubrics for every project lesson', 'The shared template every lesson now follows'],
    hero: { src: '/work/AI-for-all/images/hero.png', caption: 'A teacher guide and slide spread' },
    notes: [
      { short: 'Context', k: 'context', h: 'Middle schoolers building with AI', body: [
        { p: 'Lessons cover prompt engineering, AI image ethics, chatbots, and tool use, and they range from a single 40-minute class to multi-day group projects.' },
      ] },
      { short: 'Problem', k: 'problem', h: 'Every lesson looked different', body: [
        { p: 'Guides used different formats, and rubrics reused the same generic categories. Teachers had to relearn how to read each lesson before they could teach it.' },
      ] },
      { short: 'Process', k: 'process', h: 'One structure for every lesson', body: [
        { p: 'I rebuilt lessons around a single template, keeping the teacher in the center of every decision.' },
        { decision: { b: 'A shared label system.', p: 'Every guide uses the same four labels: Explain, Try It, Teacher Tip, and click cues. Explain moments include example lines written the way a teacher would say them out loud.' } },
        { decision: { b: 'Rubrics that scale with time.', p: 'Rubrics use lesson-specific categories and even point values, and they grow with lesson length: 10 points for 40 minutes, 14 for 60, and 18 for 80.' } },
        { decision: { b: 'Rubrics as their own files.', p: 'Rubrics live in standalone files so teachers can attach them straight to Google Classroom, with a comments row for feedback.' } },
        { img: { src: '/work/AI-for-all/images/template.png', caption: 'The lesson template' } },
      ] },
      { short: 'Solution', k: 'solution', h: 'Guides teachers can pick up and run', body: [
        { p: 'A consistent set of teacher guides, slides, workbooks, and rubrics, plus reusable templates for revising the next lesson.' },
        { img: { src: '/work/AI-for-all/images/spreads.png', caption: 'Example spreads' } },
      ] },
      { short: 'Outcome', k: 'outcome', h: 'What changed', body: [
        { p: '[Teacher feedback, classrooms reached, or what you learned.]' },
        { stats: [['6–8', 'grade levels'], ['4', 'shared guide labels'], ['3', 'rubric sizes by lesson length']] },
      ] },
    ],
  },

  nudge: {
    title: 'Nudge: Practice for Professional Confidence',
    short: 'Nudge',
    one: 'A daily habit app that helps college students build professional confidence through AI practice rooms, daily challenges, and streaks.',
    year: 'Spring 2026',
    tags: ['UX/UI Design', 'User Research', 'Mobile'],
    role: 'UX/UI Designer',
    timeline: 'Spring 2026 · 8 weeks',
    tools: 'Figma',
    team: 'Team 7 · 6 people',
    lede: 'A mobile app that turns career prep into a daily habit: small challenges, AI mock interviews, and streaks with friends. Built by a team of six in 8 weeks for [course name].',
    owned: [
      'Helped shape the idea and narrow the scope during ideation',
      'Designed the hi-fi prototype in Figma [which flows/screens were yours]',
      'Presented our case study at demo day',
      '[anything else: testing sessions you ran, visual system, mascot…]',
    ],
    hero: { src: '/work/nudge/images/hero.png', caption: 'Final screens' },
    attachments: {
      slides: { folder: '/work/nudge/slides/', count: 26, ext: 'jpg' },
      video: { src: '/work/nudge/demo.mp4', poster: '/work/nudge/slides/01.jpg', length: '2:11' },
      pdf: '/work/nudge/nudge-case-study.pdf',
    },
    notes: [
      { short: 'Context', k: 'context', h: "The skills were there. The confidence wasn't.", body: [
        { p: 'We started broad: why do students avoid networking events, freeze in interviews, or undersell themselves? Our survey of 54 people and 8 follow-up interviews pointed to the same pattern. People usually had the experience to talk about. What they lacked was practice saying it out loud, and a way to start without feeling judged.' },
        { stats: [['54', 'people surveyed'], ['72.2%', 'avoid social or professional situations because of discomfort'], ['90.7%', 'want to improve how they speak professionally']] },
        { quote: '"I would use something that gives me clear actions and tells me how to improve."' },
        { p: "That quote shaped a lot of what came next: users didn't want more advice. They wanted clear next steps and a way to see themselves getting better." },
        { pair: [
          { src: '/work/nudge/images/survey.png', caption: 'Survey results' },
          { src: '/work/nudge/images/affinity-map.png', caption: 'Interview affinity map' },
        ] },
      ] },
      { short: 'Problem', k: 'problem', h: 'Practice only happens right before it matters', body: [
        { p: 'Most students prepare in bursts: the night before an interview or the hour before a career fair. Mock interviews exist, but they feel intimidating, and the feedback can feel harsh. So people skip practice entirely and walk in nervous.' },
        { p: '[1–2 lines on your competitive analysis: what Duolingo, mock-interview tools, or career sites do well, and the gap you saw]' },
        { hmw: 'help students build professional confidence through small, daily practice habits that prepare them for real career moments?' },
        { img: { src: '/work/nudge/images/competitive.png', caption: 'Competitive analysis' } },
      ] },
      { short: 'Persona', k: 'who we designed for', h: 'Meet Maya', body: [
        { p: 'Maya is 21 and applying for her first internship. She wants to practice interview answers and get better at networking, but surprise questions make her nervous and mock interviews feel unrealistic. When feedback does come, it feels harsh instead of helpful.' },
        { p: "Designing for Maya meant every feature had to pass one test: does this feel low-pressure enough that she'd actually open it tomorrow?" },
        { img: { src: '/work/nudge/images/persona.png', caption: 'Persona' } },
      ] },
      { short: 'Process', k: 'process', h: 'From sketches to screens', body: [
        { p: 'We set the look early: a friendly mascot, soft purples and mint, and rounded type, so practicing felt more like a game than a test. Then we moved from paper sketches to mid-fi wireframes to a full hi-fi prototype.' },
        { decision: { b: 'Borrow the habit loop from language apps.', p: 'Confidence grows with repetition, not one big session. Short daily challenges and streaks turn practice into a small routine instead of a scary event.' } },
        { decision: { b: 'Make feedback private first.', p: "Maya's biggest fear was judgment. AI practice rooms let users rehearse alone and get feedback on clarity, confidence, and pace before facing a real person." } },
        { img: { src: '/work/nudge/images/ideation.png', caption: 'Ideation: mascot, logo, colors, type' } },
        { pair: [
          { src: '/work/nudge/images/lofi.png', caption: 'Lo-fi sketches' },
          { src: '/work/nudge/images/midfi.png', caption: 'Mid-fi wireframes' },
        ] },
      ] },
      { short: 'Testing', k: 'testing', h: '10 sessions, 4 changes', body: [
        { p: 'We ran 10 moderated usability sessions with college students and early-career users, plus a heuristic evaluation. Each change below started with something we watched people struggle with.' },
        { stats: [['10', 'participants'], ['78%', 'task completion'], ['4/5', 'satisfaction']] },
        { decision: { tag: '7/10 confused', b: 'by Social vs. Professional hubs', p: "We cut the Social Hub and expanded the Professional Hub with job listings and networking events. Fewer choices made the app's purpose obvious." } },
        { img: { src: '/work/nudge/images/hub-before-after.png', caption: 'Before / after: hubs' } },
        { decision: { tag: '7/10 skipped recording', b: 'and tapped "done"', p: "The mic button didn't look tappable. We gave it a clearer spot, a label, and stronger contrast." } },
        { decision: { tag: '8/10 lost on XP', b: '', p: "XP now earns profile titles and streak savers, and setup moved into onboarding, so points mean something from day one and missing a day doesn't feel like failing." } },
        { decision: { tag: '5/10 wanted to retry', b: 'one question', p: 'We added a redo button so users can re-answer a single question without restarting the whole interview.' } },
      ] },
      { short: 'Solution', k: 'solution', h: 'Three ways to practice, every day', body: [
        { h3: 'Daily challenges' },
        { p: 'Small prompts that reset every 24 hours. Low effort, so it\'s easy to keep a streak.' },
        { img: { src: '/work/nudge/images/feature-challenges.png', caption: 'Daily challenges' } },
        { h3: 'AI mock interviews' },
        { p: 'Practice rooms that simulate real interviews and give instant feedback on clarity, confidence, and pace, with a redo button for any question.' },
        { img: { src: '/work/nudge/images/feature-interview.png', caption: 'Mock interview flow' } },
        { h3: 'Friends + progress' },
        { p: 'Friend streaks, a feed, and an XP progress page give the accountability users said they were missing when practicing alone.' },
        { img: { src: '/work/nudge/images/feature-progress.png', caption: 'Progress + friends' } },
      ] },
      { short: 'Outcome', k: 'outcome', h: 'A focused career-prep app', body: [
        { p: 'Cutting the Social Hub was the turning point. Nudge went from "confidence for everything" to a clear tool for interview prep and career discovery, and testing got smoother because of it.' },
        { p: '[Demo day: how it went, the feedback you got, and what changed because of it]' },
        { h3: 'Next steps' },
        { p: 'More user testing, more practice rooms in the Professional Hub, and partnering with campus career centers.' },
      ] },
      { short: 'Reflection', k: 'reflection', h: "What I'd do differently", body: [
        { p: '[In your words: one thing you would change about your process. Would you test the scope earlier? Test the mic button in lo-fi? What did demo day teach you?]' },
        { p: '[One thing you learned about designing for nervous users that you will bring to your next project.]' },
      ] },
    ],
  },
}

// Order on the Selected Work page, and for "next note" links
export const ORDER = ['c2l', 'ai4all', 'nudge']