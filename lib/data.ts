import type { About, Contact, ExperienceEntry, Personal, Project, Seo, Skills } from './types';

export const personal: Personal = {
  name: 'Ben Hu',
  title: 'Full-Stack Engineer',
  tagline: 'building things end-to-end',
  description:
    '[REPLACE: 3-4 line description, e.g., I design and ship product end-to-end — from the database schema up to the last pixel of the UI. I care about systems that hold up under real load and interfaces that respect the people using them.]',
  status: 'Open to work — remote-friendly',
  location: 'Taipei · UTC+8 · remote-friendly',
};

export const about: About = {
  headline: 'engineer who actually ships.',
  paragraphs: [
    '[REPLACE: First paragraph of personal story — origin, what got you into engineering, your approach to building software.]',
    '[REPLACE: Second paragraph — what you focus on now, what kinds of problems you reach for, the kind of teams you do your best work on.]',
    '[REPLACE: Third paragraph — life outside the editor: hobbies, side projects, where you spend your time when you are not shipping code.]',
  ],
};

export const skills: Skills = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'React Native'],
  backend: ['Node.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Prisma'],
  infraAndTools: ['AWS', 'Docker', 'Terraform', 'GitHub Actions', 'Vercel'],
};

// Stack-tag colour tokens. Map to the project's Tailwind theme variables so
// switching the palette in one place updates every project tag.
const BLUE = 'var(--syntax-function)';
const PURPLE = 'var(--syntax-keyword)';
const ORANGE = 'var(--syntax-number)';

export const projects: Project[] = [
  {
    id: 'commerce',
    title: 'orbit/commerce',
    tagline: 'Headless storefront platform with sub-100ms TTFB',
    stats: [
      { icon: '🏬', label: '1.2k+ stores' },
      { icon: '💰', label: '$4.8M GMV processed' },
    ],
    stack: [
      { name: 'Next.js', color: BLUE },
      { name: 'Node.js', color: PURPLE },
      { name: 'PostgreSQL', color: PURPLE },
      { name: 'Redis', color: PURPLE },
      { name: 'AWS', color: ORANGE },
    ],
    palette: ['#0d2840', '#1a3a5c', '#7aa2f7'],
    type: 'dashboard',
  },
  {
    id: 'lattice',
    title: 'lattice',
    tagline: 'Realtime collaborative whiteboard for distributed teams',
    stats: [
      { icon: '📊', label: '600+ daily active rooms' },
      { icon: '⚡', label: '<30ms cursor latency' },
    ],
    stack: [
      { name: 'React', color: BLUE },
      { name: 'TypeScript', color: BLUE },
      { name: 'Yjs', color: PURPLE },
      { name: 'WebRTC', color: PURPLE },
    ],
    palette: ['#1f1530', '#2d2148', '#bb9af7'],
    type: 'editor',
  },
  {
    id: 'sift',
    title: 'sift.dev',
    tagline: 'CLI + dashboard for log search across heterogeneous services',
    stats: [
      { icon: '🟢', label: '99.9% uptime' },
      { icon: '📦', label: '18B events indexed' },
    ],
    stack: [
      { name: 'Go', color: BLUE },
      { name: 'ClickHouse', color: PURPLE },
      { name: 'gRPC', color: PURPLE },
      { name: 'Terraform', color: ORANGE },
    ],
    palette: ['#102a22', '#194036', '#9ece6a'],
    type: 'data',
  },
  {
    id: 'pace',
    title: 'pace',
    tagline: 'iOS-first habit tracker with offline-first CRDT sync',
    stats: [
      { icon: '⬇️', label: '24k downloads' },
      { icon: '⭐', label: '4.8 App Store rating' },
    ],
    stack: [
      { name: 'React Native', color: BLUE },
      { name: 'TypeScript', color: BLUE },
      { name: 'SQLite', color: PURPLE },
      { name: 'Swift', color: ORANGE },
    ],
    palette: ['#3a1f1a', '#522d28', '#ff9e64'],
    type: 'mobile',
  },
  {
    id: 'kindle-club',
    title: 'kindle.club',
    tagline: 'A book-club companion that turns highlights into discussion prompts',
    stats: [
      { icon: '🧪', label: 'Side project' },
      { icon: '🚀', label: '3k+ signups in 6 weeks' },
    ],
    stack: [
      { name: 'Astro', color: BLUE },
      { name: 'SvelteKit', color: BLUE },
      { name: 'SQLite', color: PURPLE },
      { name: 'OpenAI', color: ORANGE },
    ],
    palette: ['#3b1d2a', '#552a3d', '#f7768e'],
    type: 'marketing',
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: '[REPLACE: Current company]',
    role: 'Senior Full-Stack Engineer',
    period: '2023 — present',
    isCurrent: true,
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    description:
      '[REPLACE: 2-3 sentences about your impact. Lead initiatives, systems built, problems solved, scale.]',
  },
  {
    company: '[REPLACE: Previous company]',
    role: 'Full-Stack Engineer',
    period: '2021 — 2023',
    stack: ['Next.js', 'GraphQL', 'Redis'],
    description:
      '[REPLACE: 2-3 sentences. Focus on outcomes, not just tasks. What did you ship and what changed because of it?]',
  },
  {
    company: '[REPLACE: Earlier company]',
    role: 'Software Engineer',
    period: '2019 — 2021',
    stack: ['React', 'Python', 'Django'],
    description: '[REPLACE: 2-3 sentences. Your first significant role — what did you grow into?]',
  },
];

export const contact: Contact = {
  email: 'waynehu.dev@gmail.com',
  github: 'https://github.com/benhu-dev',
  linkedin: '[REPLACE: your LinkedIn URL]',
  twitter: null,
  responseTime: 'typical response within 24h',
};

export const seo: Seo = {
  title: 'Ben Hu — Full-Stack Engineer',
  description:
    '[REPLACE: ~155 char SEO description. Full-stack engineer based in Taipei, building web and mobile products end-to-end. Open to senior engineering roles.]',
  url: 'https://benhu.dev',
  ogImage: '/images/og-image.svg',
  twitterHandle: null,
};
