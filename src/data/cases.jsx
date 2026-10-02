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
    one: 'A daily habit app that helps college students build professional confidence through AI practice rooms, daily challenges, and streaks.',
    year: '2026',
    tags: ['UX/UI Design', 'User Research', 'Mobile'],
    role: 'UX/UI Designer',
    timeline: 'Spring Quarter 2026, 8 weeks',
    tools: 'Figma',
    team: 'Team 7',
    lede: 'Nudge helps college students build confidence in interviews, networking, and professional communication through short daily practice and positive support. I helped shape the idea, designed the hi-fi prototype, and presented our case study at demo day.',
    sections: [
      {
        k: 'context', h: 'Confidence is a skill',
        p: 'We started by asking students how they feel in professional moments. We surveyed 54 people and interviewed 8. The same thing kept coming up: people had the skills, but froze when it came time to talk about them. One student told us, "A lot of it is just overthinking and not knowing how to start." Most also said they wanted progress tracking, personal challenges, and a points or streak system.',
        stats: [['54', 'students surveyed'], ['72.2%', 'avoid social or professional situations because of discomfort'], ['90.7%', 'want to get better at professional speaking']],
      },
      {
        k: 'problem', h: 'No low-stakes place to practice',
        p: 'Students and early-career professionals often struggle to talk about their experience with confidence in interviews, networking events, and presentations. Mock interviews feel intimidating and feedback can feel harsh, so many people avoid practicing at all. Our question became: how can we help students build professional confidence through small, daily practice habits?',
      },
      {
        k: 'process', h: 'From sketches to testing', image: true,
        p: 'We built a persona, Maya, a 21-year-old student applying for her first internship with interview anxiety. Then we moved from lo-fi sketches to mid-fi and hi-fi screens in Figma. We ran 10 moderated usability sessions with college students and early-career users, plus a heuristic evaluation. Testing led to four big changes:',
        decisions: [
          { b: 'Change 1: one focus, not two.', p: '7 of 10 users were confused by having both a Social Hub and a Professional Hub. We removed the Social Hub and grew the Professional Hub with job listings, networking events, and new opportunities.' },
          { b: 'Change 2: a clearer record button.', p: '7 of 10 users tapped "done" without ever recording an answer. We redesigned the mic button with a clearer spot, a label, and a more obvious look.' },
          { b: 'Change 3: XP that means something.', p: '8 of 10 users didn\'t understand XP. Now XP earns profile titles and streak savers, so missing a day doesn\'t feel like a punishment. We also moved the job-interest quiz and resume upload into onboarding.' },
          { b: 'Change 4: redo a single question.', p: '5 of 10 users wanted to retry one question without restarting the whole interview. We added a redo button, which makes practice feel lower stakes.' },
        ],
      },
      {
        k: 'solution', h: 'Three ways to practice', image: true,
        p: 'The final Nudge app is built around three features, each tied to something we heard in research.',
        decisions: [
          { b: 'Daily challenges.', p: 'Practice felt overwhelming, so Nudge gives small challenges that reset every 24 hours. They feel quick and routine instead of high pressure.' },
          { b: 'Mock interviews with AI feedback.', p: 'Students had no safe place to practice out loud. AI practice rooms simulate real interviews and give instant feedback on clarity, confidence, and pace.' },
          { b: 'Friends and progress tracking.', p: 'Practicing alone felt unmotivating. Friend streaks, a social feed, XP levels, and a progress page help users stay on track together.' },
        ],
      },
      {
        k: 'outcome', h: 'What we learned',
        p: 'Many students feel less confident in professional situations than they show, and they want tools that are clear, personal, and simple. Cutting the Social Hub turned Nudge into a focused career and interview prep app. Next, we\'d run more user testing, add more practice rooms to the Professional Hub, and partner with campus career resources.',
        stats: [['10', 'moderated usability sessions'], ['78%', 'task completion'], ['4/5', 'average satisfaction']],
      },
    ],
  },
}

// Order on the Selected Work page, and for "next note" links
export const ORDER = ['c2l', 'ai4all', 'nudge']