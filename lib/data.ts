import type { About, Contact, ExperienceEntry, Personal, Project, Seo, Skills } from './types';

export const personal: Personal = {
  name: 'Ben Hu',
  title: 'Full-Stack Engineer',
  tagline: 'building things end-to-end',
  description:
    '[REPLACE: 3-4 line description, e.g., I design and ship product end-to-end — from the database schema up to the last pixel of the UI. I care about systems that hold up under real load and interfaces that respect the people using them.]',
  status: 'Open to work — Senior Full-Stack Engineer roles',
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

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '[REPLACE: project name]',
    tagline: '[REPLACE: one-line description of what it does and why it matters]',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    stats: [
      { icon: '📊', text: '600+ daily active rooms' },
      { icon: '⚡', text: '<30ms cursor latency' },
    ],
    image: '/images/projects/project-1.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/benhu-dev/project-1',
  },
  {
    id: 'project-2',
    title: '[REPLACE: project name]',
    tagline: '[REPLACE: one-line description]',
    stack: ['React Native', 'Node.js', 'Redis'],
    stats: [
      { icon: '👥', text: '10k+ users' },
      { icon: '⭐', text: '4.7 App Store rating' },
    ],
    image: '/images/projects/project-2.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/benhu-dev/project-2',
  },
  {
    id: 'project-3',
    title: '[REPLACE: project name]',
    tagline: '[REPLACE: one-line description]',
    stack: ['Go', 'Kubernetes', 'gRPC'],
    stats: [
      { icon: '🚀', text: '99.99% uptime' },
      { icon: '📈', text: '10x throughput' },
    ],
    image: '/images/projects/project-3.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/benhu-dev/project-3',
  },
  {
    id: 'project-4',
    title: '[REPLACE: project name]',
    tagline: '[REPLACE: one-line description]',
    stack: ['Next.js', 'tRPC', 'Prisma'],
    stats: [
      { icon: '💸', text: '$120k ARR in 6 months' },
      { icon: '🌎', text: '40+ countries' },
    ],
    image: '/images/projects/project-4.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/benhu-dev/project-4',
  },
  {
    id: 'project-5',
    title: '[REPLACE: project name]',
    tagline: '[REPLACE: one-line description]',
    stack: ['Rust', 'WebAssembly', 'WebGL'],
    stats: [
      { icon: '🎮', text: '60fps on mid-range hardware' },
      { icon: '📦', text: '<200kb bundle' },
    ],
    image: '/images/projects/project-5.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/benhu-dev/project-5',
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
