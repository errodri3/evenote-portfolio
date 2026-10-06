export const CASES = {
  c2l: {
    title: 'The Science Adventures of Luna and Leo',
    short: 'Converse to Learn',
    one: 'Bilingual AI storybooks that introduce science to kids ages 4 to 7. I built and launched the project website, and I keep designing for the team as the work continues.',
    year: '2026',
    status: 'In progress',
    lab: 'UCI Digital Learning Lab',
    link: { href: 'https://lunaandleo.org', label: 'Visit lunaandleo.org' },
    tags: ['Web Design', 'Illustration', 'Research'],
    role: 'Designer, Web Developer',
    timeline: '2026 - now',
    tools: 'Figma, HTML/CSS, JS, Photoshop',
    team: 'Converse to Learn · UC Irvine, University of Michigan, Harvard',
    lede: 'Converse to Learn makes bilingual storybooks where an AI partner talks with young children about science. This project is still in the works, so this note covers what has shipped so far and what I am working on now.',
    owned: [
      'Designed and built lunaandleo.org, the public launch site for the project',
      '[one or two other things you have finished, if you want to add them]',
    ],
    hero: { src: '/work/converse-to-learn/images/hero.png', caption: 'lunaandleo.org' },
    notes: [
      { short: 'Launch', k: 'shipped', h: 'lunaandleo.org', body: [
        { p: '[2–3 sentences: what the site needed to do, who it is for (families, teachers, researchers), and the decisions you made designing and building it.]' },
        { img: { src: '/work/converse-to-learn/images/site.png', caption: 'The launch site' } },
      ] },
      { short: 'Now', k: 'in the works', h: "What I'm working on", body: [
        { p: "The storybooks are still being developed, so I'm not writing up results yet. Right now I'm helping with:" },
        { list: ['[for example: illustrating characters for the storybooks]', '[another small project with the team]'] },
      ] },
    ],
  },

  ai4all: {
    title: 'Computing and AI for All: A Teacher-First AI Curriculum',
    short: 'Computing and AI for All',
    one: 'AI literacy lessons for 6th to 8th graders: lesson structure, slides, plans, and workbooks, plus design feedback and testing for the CreatiCode platform.',
    year: 'Summer 2026',
    lab: 'UCI Digital Learning Lab',
    tags: ['Curriculum Design', 'Research', 'Platform Testing'],
    role: 'Curriculum Designer, Researcher',
    timeline: 'June 2026 - August 2026',
    tools: '[tools you used]',
    team: 'Computing and AI for All · led by Prof. Mark Warschauer',
    lede: 'Computing and AI for All teaches AI literacy to middle schoolers in Orange County school districts. Students build with AI on the CreatiCode platform. I designed the lesson structure and materials, and I helped the team improve the platform itself through design feedback and testing.',
    owned: [
      'Lesson structure, lesson plans, slide decks, and student workbooks',
      'Rubrics for every project lesson',
      'Design feedback and testing for the CreatiCode platform',
      'Research that shaped the curriculum',
    ],
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
      { short: 'Platform', k: 'platform', h: 'Helping shape CreatiCode', body: [
        { p: '[2–3 sentences: what you tested on CreatiCode, the design feedback you gave, and anything that changed because of it.]' },
        { img: { src: '/work/AI-for-all/images/platform.png', caption: 'CreatiCode' } },
      ] },
      { short: 'Solution', k: 'solution', h: 'Lessons teachers can pick up and run', body: [
        { p: 'A consistent set of lesson plans, slides, workbooks, and rubrics, plus reusable templates for the next round of lessons.' },
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