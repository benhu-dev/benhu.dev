export interface Personal {
  name: string;
  // Kebab-case rendering of `name`, used for nav wordmark / file-name styled
  // chrome (e.g. "ben-hu.tsx"). Stored explicitly rather than slugified at
  // runtime so capitalization edge cases in real names stay deterministic.
  nameSlug: string;
  // Bare hostname, no protocol — used in email subject/footer copy and as a
  // building block for `siteUrl`. Single source of truth so a future rename
  // (`benhu.dev` → `something-else.dev`) is one edit.
  domain: string;
  // Canonical site URL with protocol — used for metadata and as the default
  // for `seo.url`. Mirrors `seo.url` value-wise; kept on Personal because
  // it's brand identity, while `seo.url` is the SEO surface that consumes it.
  siteUrl: string;
  title: string;
  tagline: string;
  status: string;
}

export interface About {
  headline: string;
  paragraphs: string[];
}

export interface Skills {
  frontend: string[];
  backend: string[];
  ai: string[];
}

export interface ProjectStat {
  icon: string;
  label: string;
}

export interface ProjectStackTag {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  stats: ProjectStat[];
  stack: ProjectStackTag[];
  // Screenshot path under /public, e.g. "/projects/orbit.png".
  image: string;
  // Optional accessible description; falls back to "{title} screenshot".
  imageAlt?: string;
  liveUrl?: string;
  codeUrl?: string;
  // Renders a non-interactive "internal" indicator in place of (or alongside)
  // the live/code buttons — for client work or company-internal tools that
  // can't be publicly demoed or open-sourced. Value is the visible label
  // (e.g. "internal app", "client project").
  internalLabel?: string;
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
  // Bare GitHub handle (no leading "@"). Components prepend the "@" for
  // display so the data stays canonical. Source of truth for the visible
  // link label in the contact section.
  githubHandle: string;
  linkedin: string;
  // Bare LinkedIn slug (no leading "/in/"). Components prepend "/in/" for
  // display, or fall back to a "/in/..." placeholder when this is empty —
  // mirrors the same handling used while `linkedin` URL is the [REPLACE]
  // placeholder.
  linkedinHandle: string;
  twitter: string | null;
  responseTime: string;
}

export interface Seo {
  title: string;
  description: string;
  url: string;
  twitterHandle: string | null;
}

export type SectionId = 'about' | 'projects' | 'experience' | 'contact';
