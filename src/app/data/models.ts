export interface Profile {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  /** Portréfotó a `public/` mappából. */
  photo: { src: string; alt: string };
  /** A letölthető önéletrajz (PDF) elérési útja a webgyökértől; az `npm run cv` készíti. */
  cv: string;
  intro: string;
  languages: string;
  /** Jogosítvány kategóriája. */
  license: string;
  /** A hero kódablakában megjelenő technológiák. */
  stack: string[];
  /** A hero gépelő szövegének szerepei. */
  roles: string[];
  letter: string[];
}

export interface JobProject {
  name: string;
  role?: string;
  url?: string;
  text?: string;
  /** A projekten használt CI/CD és verziókezelő eszközök. */
  tech?: string[];
  /** Konkrét feladatok felsorolásként a projekt alatt. */
  points?: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  projects?: JobProject[];
  tech: string[];
}

export interface Skill {
  highlight?: boolean;
  title: string;
  tag: string;
  text: string;
}

export interface SideProject {
  name: string;
  /** Az élő oldal címe, ha van. */
  url?: string;
  /** A forráskód címe, ha nyilvános. */
  sourceUrl?: string;
  description: string;
  tech: string[];
}

export interface Study {
  kind: 'education' | 'certificate';
  /** Kiemelt tanúsítvány (az Anthropic-é), külön kártyán jelenik meg. */
  featured?: boolean;
  title: string;
  where: string;
  period: string;
  /** Rövid, mondatokban megfogalmazott leírás (csak ahol van mit elmondani). */
  description?: string;
  /** A tanúsítvány nyilvános oldala, ha van; ezzel a cím linkké válik. */
  url?: string;
}

export type CodeLanguage = 'kotlin' | 'markdown';

/** Egy fájl a kódablakban: neve, nyelve és tartalma. */
export interface CodeFile {
  name: string;
  language: CodeLanguage;
  code: string;
}

export interface AiPoint {
  title: string;
  text: string;
}

/** A „Hogyan dolgozom AI-val” szekció tartalma. */
export interface AiWorkflowContent {
  title: string;
  lead: string;
  points: AiPoint[];
  /** A projekt valódi CLAUDE.md-jének rövidített részlete. */
  file: CodeFile;
  note: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type Lang = 'hu' | 'en';

export interface NavLink {
  /** A cél szekció azonosítója `#` nélkül. */
  fragment: string;
  label: string;
}

/** A felület összes (nem tartalmi) szövege egy nyelven. */
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
  contact: { title: string; text: string; cv: string; linkedin: string };
  footer: { built: string; label: string; linkedin: string; email: string };
  backToTop: string;
}

/** Egy nyelv teljes tartalma. */
export interface Content {
  profile: Profile;
  jobs: Job[];
  skills: Skill[];
  aiWorkflow: AiWorkflowContent;
  /** A nyitóoldal kódablakának rögzített fájljai (a Developer data class); a példányt a profilból építjük. */
  codeSamples: CodeFile[];
  sideProjects: SideProject[];
  studies: Study[];
  stats: Stat[];
  ui: Ui;
}
