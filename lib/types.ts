export interface Personal {
  name: string;
  title: string;
  tagline: string;
  description: string;
  status: string;
  location: string;
}

export interface About {
  headline: string;
  paragraphs: string[];
}

export interface Skills {
  frontend: string[];
  backend: string[];
  infraAndTools: string[];
}

export interface ProjectStat {
  icon: string;
  text: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  stack: string[];
  stats: ProjectStat[];
  image: string;
  liveUrl?: string;
  codeUrl?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  stack: string[];
  description: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string | null;
  responseTime: string;
}

export interface Seo {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle: string | null;
}

export type SectionId = 'about' | 'projects' | 'experience' | 'contact';
