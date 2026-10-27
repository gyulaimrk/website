export interface Profile {
  name: string;
  role: string;
  /** The roles in the hero code window: the values of the `Role` enum in the `Developer.kt` sample. */
  roleConstants: string[];
  email: string;
  linkedin: string;
  location: string;
  /** Portrait photo from the `public/` folder. */
  photo: { src: string; alt: string };
  /** Path of the downloadable résumé (PDF) from the web root; built by `npm run cv`. */
  cv: string;
  intro: string;
  /** Spoken languages, one item per language. */
  languages: string[];
  /** Driving licence category. */
  license: string;
  /** The technologies shown in the hero code window. */
  stack: string[];
  /** The roles of the hero typewriter text. */
  roles: string[];
  letter: string[];
}

export interface JobProject {
  name: string;
  /** A short name for the project next to its name (for example “Car rental system”). */
  subtitle?: string;
  url?: string;
  text?: string;
  /** The CI/CD and version control tools used on the project. */
  tech?: string[];
  /** Concrete tasks as a list under the project. */
  points?: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  projects?: JobProject[];
  /** Tools that characterise the employer and belong to no single project. */
  tech?: string[];
}

export interface Skill {
  highlight?: boolean;
  title: string;
  tag: string;
  paragraphs: string[];
  /** Technologies as chips below the text, if the card has any. */
  chips?: string[];
}

export interface SideProject {
  name: string;
  /** The address of the live site, if any. */
  url?: string;
  /** The address of the source code, if public. */
  sourceUrl?: string;
  paragraphs: string[];
  tech: string[];
}

export interface Study {
  kind: 'education' | 'certificate';
  /** A featured certificate (Anthropic's), shown on a separate card. */
  featured?: boolean;
  title: string;
  where: string;
  period: string;
  /** A short description in sentences (only where there is something to say). */
  description?: string;
  /** The public page of the certificate, if any; the title becomes a link. */
  url?: string;
}

export type CodeLanguage = 'kotlin' | 'markdown';

/** A file in the code window: its name, language and content. */
export interface CodeFile {
  name: string;
  language: CodeLanguage;
  code: string;
}

export interface AiPoint {
  title: string;
  paragraphs: string[];
}

/** The content of the “How I work with AI” section. */
export interface AiWorkflowContent {
  title: string;
  lead: string;
  points: AiPoint[];
  /** A shortened excerpt of the project's real CLAUDE.md. */
  file: CodeFile;
  note: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type Lang = 'hu' | 'en';

export interface NavLink {
  /** The id of the target section without `#`. */
  fragment: string;
  label: string;
}

/** All the (non-content) UI texts in one language. */
export interface Ui {
  meta: { title: string; description: string };
  skipLink: string;
  nav: {
    label: string;
    home: string;
    links: NavLink[];
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  toggles: { toLight: string; toDark: string; toOtherLanguage: string; otherLanguageCode: string };
  hero: {
    greeting: string;
    nameSuffix: string;
    projects: string;
    cv: string;
    linkedin: string;
  };
  about: {
    title: string;
    lead: string;
    facts: { location: string; role: string; languages: string; license: string; email: string };
  };
  skills: { title: string; lead: string };
  experience: { title: string; lead: string; projects: string };
  sideProjects: { title: string; lead: string; visit: string; source: string };
  education: {
    title: string;
    lead: string;
    studies: string;
    featured: string;
    certificates: string;
    allCertificates: string;
  };
  contact: { title: string; text: string; availability: string; cv: string; linkedin: string };
  footer: { label: string; linkedin: string; email: string };
  backToTop: string;
}

/** The whole content of one language. */
export interface Content {
  profile: Profile;
  jobs: Job[];
  skills: Skill[];
  aiWorkflow: AiWorkflowContent;
  /** The fixed files of the landing code window (the Developer data class); the instance is built from the profile. */
  codeSamples: CodeFile[];
  sideProjects: SideProject[];
  studies: Study[];
  stats: Stat[];
  ui: Ui;
}
