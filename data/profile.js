export const profile = {
  name: 'Justin Wang',
  role: 'Software Engineer',
  company: 'Sigma',
  location: 'San Diego, California',
  tagline:
    'Software engineer building data governance at Sigma. I care about systems that are correct, fast, and pleasant to use.',
  about: [
    'I am a software engineer on the Data Governance team at Sigma in San Francisco, where I work on the permissions, policies, and tooling that let teams trust and share their data.',
    'Before that I studied Computer Science at UC San Diego, taught algorithms to a lecture hall of four hundred students, and built backend systems for platform intelligence at JD.COM in Beijing and a custom cryptographic CPU at ChipEasy in Shanghai.',
    'Outside of work I build small products for my friends and myself: a ranking journal for hikes, an expense splitter for group trips, and a LeetCode dashboard.',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/justinyjwang',
    github: 'https://github.com/jw11142002',
  },
};

export const experience = [
  {
    company: 'Sigma',
    role: 'Software Engineer',
    type: 'Full-time',
    start: 'Jul 2026',
    end: 'Present',
    location: 'San Francisco, CA',
    team: 'Data Governance',
    bullets: [
      'Working on data governance for Sigma’s analytics platform: the permissions and policies that let teams trust and share their data.',
    ],
    skills: ['TypeScript', 'Snowflake', 'React', 'SQL'],
  },
  {
    company: 'Sigma',
    role: 'Software Engineer Intern',
    type: 'Internship',
    start: 'Jun 2025',
    end: 'Sep 2025',
    location: 'San Francisco, CA',
    team: 'Data Governance',
    bullets: [
      'Shipped data governance features end to end, from Snowflake-backed services to the TypeScript front end.',
      'Returned full-time to the same team after graduation.',
    ],
    skills: ['Snowflake', 'TypeScript', 'React', 'SQL', 'Node.js'],
  },
  {
    company: 'JD.COM',
    role: 'Backend Software Engineer Intern',
    type: 'Internship',
    start: 'Aug 2024',
    end: 'Dec 2024',
    location: 'Beijing, China',
    team: 'Platform Intelligence',
    bullets: [
      'Built backend services for the Platform Intelligence group at one of the world’s largest e-commerce companies.',
      'Worked across Java and Python services on high-volume platform data.',
    ],
    skills: ['Java', 'Python', 'Backend Services'],
  },
  {
    company: 'UC San Diego Jacobs School of Engineering',
    role: 'Undergraduate Instructional Assistant',
    type: 'Part-time',
    start: 'Mar 2024',
    end: 'Jun 2024',
    location: 'San Diego, CA',
    team: 'CSE 101: Design and Analysis of Algorithms',
    bullets: [
      'Primary lecture assistant for a class of roughly 400 students: answered questions during lecture, wrote class summaries, and proctored exams.',
      'Held office hours and one-on-one meetings on graph traversal, greedy, divide-and-conquer, and dynamic programming algorithms, as well as proof strategies.',
    ],
    skills: ['Algorithms', 'University Teaching'],
  },
  {
    company: 'ChipEasy',
    role: 'Software Engineer Intern',
    type: 'Full-time',
    start: 'Jun 2023',
    end: 'Aug 2023',
    location: 'Shanghai, China',
    team: 'Hardware Tooling',
    bullets: [
      'Created an internal documentation tool in C and JavaScript, adopted by 90% of developers, for retrieving custom ISA configurations.',
      'Designed a custom CPU in C to accelerate cryptographic encryption algorithms (AES, 3DES), improving encryption speeds by 30%.',
    ],
    skills: ['C', 'JavaScript', 'APIs', 'Computer Architecture', 'Cryptography'],
  },
];

export const education = [
  {
    school: 'UC San Diego',
    degree: 'Master of Science, Computer Science',
    start: '2025',
    end: 'Jun 2026',
    note: 'Jacobs School of Engineering',
  },
  {
    school: 'UC San Diego',
    degree: 'Bachelor of Science, Computer Science',
    start: 'Sep 2021',
    end: 'Jun 2025',
    note: 'Jacobs School of Engineering',
  },
];

export const projects = [
  {
    slug: 'traili',
    name: 'traili',
    tagline: 'Beli for trails.',
    description:
      'A friends-only hiking journal where you rank every hike you have done instead of rating it. Log a hike, answer a few head-to-head comparisons against hikes of similar effort, and it lands in your list with a score. Includes per-visit logs, a friends-only feed, and search across any trail on OpenStreetMap.',
    highlights: [
      'Pairwise ranking engine with fixed score bands',
      'Drag-to-reorder lists with score nudging',
      'OpenStreetMap search via Nominatim and Overpass',
      'Google OAuth, invite links, mutual friendships',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4', 'Prisma', 'Supabase', 'Vercel'],
    repo: 'https://github.com/jw11142002/traili',
    status: 'Live',
    glyph: 'terrain',
  },
  {
    slug: 'splith',
    name: 'splith',
    tagline: 'Split any bill, or a whole trip.',
    description:
      'An expense splitter for individual bills and group trips. Scan a receipt, confirm what the model read, assign items to people (including shared items with even or custom splits), and get a summary of who owes whom with tax and tip split proportionally.',
    highlights: [
      'Receipt scanning with AI-assisted itemization',
      'Shared items with proportional tax and tip',
      'Trips that accumulate multiple receipts',
      'Venmo request generation from a summary',
    ],
    stack: ['Receipt OCR', 'OAuth', 'Venmo requests', 'Mobile-first'],
    repo: 'https://github.com/jw11142002/splith',
    status: 'In design',
    glyph: 'split',
  },
  {
    slug: 'leet-assist',
    name: 'leet-assist',
    tagline: 'Your LeetCode progress, at a glance.',
    description:
      'A dashboard that pulls a LeetCode profile and turns it into something readable: solved counts by difficulty, ranking, contribution points, a submission calendar, and recent submissions with acceptance status.',
    highlights: [
      'Typed LeetCode stats model',
      'Difficulty breakdown and submission history',
      'API proxy in front of LeetCode',
    ],
    stack: ['React', 'TypeScript', 'Tailwind', 'Axios', 'REST API'],
    repo: 'https://github.com/jw11142002/leet-assist',
    status: 'Prototype',
    glyph: 'stack',
  },
];

export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C', 'SQL'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'three.js'] },
  { group: 'Backend & Data', items: ['Node.js', 'PostgreSQL', 'Snowflake', 'Prisma', 'Supabase'] },
  { group: 'Foundations', items: ['Algorithms', 'Data Governance', 'Computer Architecture', 'Cryptography'] },
];

export const skillCloud = skills.flatMap((s) => s.items);
