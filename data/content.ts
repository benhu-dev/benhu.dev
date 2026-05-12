import type { About, Contact, ExperienceEntry, Personal, Project, Seo, Skills } from './types';

export const personal: Personal = {
  name: 'Ben Hu',
  nameSlug: 'ben-hu',
  domain: 'benhu.dev',
  siteUrl: 'https://benhu.dev',
  title: 'Full Stack Engineer',
  tagline: 'building things end-to-end',
  status: 'Open to work — remote-friendly',
};

export const about: About = {
  headline: 'engineer who actually ships.',
  paragraphs: [
    `I build full-stack products end-to-end. Lately that means a lot of React and Next.js on the frontend, with AI integrations underneath. I take LLM and video APIs and turn them into tools real people use every day.`,
    `I'm equally comfortable shipping a polished UI and racking a server in a server room. I like small teams where one person can own a whole problem. And I'd rather ship something rough that works than something perfect that doesn't.`,
    `Off the keyboard: home server tinkering, side projects I swear I'll finish, and reading about how other engineers structure things. Based in California, open to remote roles, and open to interesting opportunities anywhere else too.`,
  ],
};

export const skills: Skills = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind',
    'JavaScript',
    'Zustand',
    'TanStack Query',
    'Framer Motion',
    'React Native',
  ],
  backend: [
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'Prisma',
    'GraphQL',
    'Express.js',
    'Zod',
    'RESTful APIs',
  ],
  ai: [
    'AWS',
    'CI/CD',
    'OpenAI API',
    'Claude SDK',
    'Prompt Engineering',
    'AI Agents',
    'LLM Integration',
    'DevOps / Infra',
  ],
};

// Stack-tag colour tokens. Map to the project's Tailwind theme variables so
// switching the palette in one place updates every project tag.
const BLUE = 'var(--syntax-function)';
const PURPLE = 'var(--syntax-keyword)';
const ORANGE = 'var(--syntax-number)';

export const projects: Project[] = [
  {
    id: 'ai-flow',
    title: 'Dramabox/AI-flow',
    tagline: 'Internal AI video studio — Seedance-powered generation with a multi-track editor',
    stats: [
      { icon: '🏬', label: 'Daily production tool' },
      { icon: '🎬', label: 'AI generation workflow & multi-track editor' },
    ],
    stack: [
      { name: 'Next.js', color: BLUE },
      { name: 'Node.js', color: PURPLE },
      { name: 'PostgreSQL', color: PURPLE },
      { name: 'Zustand', color: PURPLE },
      { name: 'Seedance API', color: ORANGE },
    ],
    image: '/images/projects/aiflow-bg.png',
    imageAlt:
      'AI Flow dashboard. Projects sidebar, prompt input, and a grid of AI-generated video cards',
    internalLabel: 'internal app',
    liveUrl: '',
    codeUrl: '',
  },
  {
    id: 'tactic-fitness',
    title: 'Tactic Fitness',
    tagline:
      'Online gym for a Canada-based fitness brand. Squarespace marketing site + members-only Next.js workout app, designed and built end-to-end',
    stats: [
      { icon: '🌍', label: '2k+ active members worldwide' },
      { icon: '🏋️', label: 'Daily workouts, tracking, community' },
    ],
    stack: [
      { name: 'Next.js', color: BLUE },
      { name: 'TypeScript', color: BLUE },
      { name: 'Supabase', color: PURPLE },
      { name: 'Prisma', color: PURPLE },
      { name: 'PWA', color: ORANGE },
    ],
    image: '/images/projects/tactic-img.png',
    imageAlt:
      'Tactic Fitness marketing site homepage. Power your potential hero with workout imagery',
    liveUrl: 'https://www.tacticworksout.com/',
    codeUrl: '',
  },
  {
    id: 'doug-mcintyre',
    title: 'Doug McIntyre Site',
    tagline:
      'Personal brand redesign for a veteran broadcaster & novelist — morning-paper aesthetic, custom palette pulled from his portrait, multi-career content archive',
    stats: [
      { icon: '🎨', label: 'Custom personal-brand redesign' },
      { icon: '📰', label: 'Multi-career content archive' },
    ],
    stack: [
      { name: 'HTML5', color: BLUE },
      { name: 'CSS', color: BLUE },
      { name: 'JavaScript', color: BLUE },
      { name: 'Squarespace', color: ORANGE },
    ],
    image: '/images/projects/doug-site.png',
    imageAlt: `Doug McIntyre personal website. Morning-paper layout featuring his novel Frank's Shadow and broadcasting credits`,
    liveUrl: 'https://www.dougmcintyre.com/',
    codeUrl: '',
  },
  {
    id: 'gearhub',
    title: 'GearHub',
    tagline:
      'E-commerce site with an early GPT-powered shopping assistant — chat with AI to help pick products. 3-person team project; led architecture and team direction.',
    stats: [
      { icon: '🛒', label: 'Stripe checkout + JWT auth' },
      { icon: '💬', label: 'AI shopping assistant via OpenAI' },
    ],
    stack: [
      { name: 'React', color: BLUE },
      { name: 'Node.js', color: BLUE },
      { name: 'GraphQL', color: PURPLE },
      { name: 'MongoDB', color: PURPLE },
      { name: 'Stripe', color: ORANGE },
    ],
    image: '/images/projects/gearhub.png',
    imageAlt: 'GearHub e-commerce site — product browse and AI shopping assistant chat',
    liveUrl: '',
    codeUrl: 'https://github.com/benhu-dev/GearHub',
  },
  {
    id: 'churn-insight',
    title: 'churn-insight',
    tagline:
      'Subscription churn analytics with ML predictions + GPT-4o insight reports. Side project; backend retired after Supabase free tier expired.',
    stats: [
      { icon: '🤖', label: 'scikit-learn predictions + GPT-4o insights' },
      { icon: '🏗️', label: 'Full-stack: Next.js + FastAPI' },
    ],
    stack: [
      { name: 'Next.js', color: BLUE },
      { name: 'SvelteKit', color: BLUE },
      { name: 'FastAPI', color: PURPLE },
      { name: 'scikit-learn', color: ORANGE },
      { name: 'OpenAI', color: ORANGE },
    ],
    image: '/images/projects/churn.png',
    imageAlt:
      'Churn analytics dashboard — KPI cards, churn trend chart, customer segment breakdown',
    liveUrl: '',
    codeUrl: 'https://github.com/benhu-dev/subscription-dashboard',
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: 'DramaBox',
    role: 'Software Engineer & IT Specialist',
    period: '2025 - Present',
    isCurrent: true,
    stack: ['Infra', 'Scripting', 'OpenAI API', 'Next.js', 'TypeScript', 'Node.js'],
    description: `The IT department of one. I run networking, servers, and security across our LA offices, including the New York setup I built from scratch. On the product side, designed and shipped Drama AI Flow, an internal AI workflow platform that replaced the team's daily juggle between five separate AI tools.`,
  },
  {
    company: 'Boldly Fine',
    role: 'Full-Stack Engineer',
    period: '2023 — Present',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'GraphQL', 'PostgreSQL', 'Supabase', 'Zustand'],
    isCurrent: true,
    description: `Full-stack engineer running the full client cycle, from scoping calls and design through development and ongoing maintenance. Ship and maintain a rotating set of production web apps, with the most visible being a fitness platform now serving 2,000+ active users.`,
  },
  {
    company: 'Freelance',
    role: 'Frontend Developer',
    period: '2021 — 2023',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'RWD'],
    isCurrent: false,
    description: `Took on small web projects for friends and referrals while teaching myself to code. Built sites on Weebly and Wix, plus the occasional hand-coded landing page.`,
  },
  {
    company: 'TheraPeds',
    role: 'Coordinator',
    period: '2017 — 2025',
    stack: ['Team Leadership', 'Cross-functional', 'Office IT'],
    isCurrent: false,
    description: `Eight years coordinating across departments and managing office IT before transitioning into software.`,
  },
];

export const contact: Contact = {
  email: 'waynehu.dev@gmail.com',
  github: 'https://github.com/benhu-dev',
  githubHandle: 'benhu-dev',
  linkedin: 'https://www.linkedin.com/in/ben-hu-267209137/',
  // Empty string means "URL not yet set"; the contact section renders
  // "/in/..." as a graceful placeholder until a real handle lands here.
  linkedinHandle: 'ben-hu',
  twitter: null,
  responseTime: 'typical response within 24h',
};

export const seo: Seo = {
  // Derived so a name/title rename in `personal` flows through automatically.
  title: `${personal.name} | ${personal.title}`,
  description: `A Full-Stack Engineer in California. Designs and builds web products with React, Next.js, and TypeScript, with a specialty in AI integrations.`,
  url: personal.siteUrl,
  twitterHandle: null,
};
