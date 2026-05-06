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
  label: string;
}

export interface ProjectStackTag {
  name: string;
  color: string;
}

export type ProjectMockupType = 'dashboard' | 'editor' | 'marketing' | 'mobile' | 'data';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  stats: ProjectStat[];
  stack: ProjectStackTag[];
  palette: [string, string, string];
  type: ProjectMockupType;
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
