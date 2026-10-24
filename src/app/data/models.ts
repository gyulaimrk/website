export interface Profile {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  /** Portréfotó a `public/` mappából. */
  photo: { src: string; alt: string };
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
  text: string;
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
  url: string;
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
}

export interface Stat {
  value: string;
  label: string;
}

export type Lang = 'hu' | 'en';

export interface NavLink {
  href: string;
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
  hero: { greeting: string; nameSuffix: string; projects: string; linkedin: string };
  about: {
    title: string;
    lead: string;
    facts: { location: string; role: string; languages: string; license: string; email: string };
  };
  skills: { title: string; lead: string };
  experience: { title: string; lead: string };
  sideProjects: { title: string; lead: string; visit: string };
  education: {
    title: string;
    lead: string;
    studies: string;
    anthropic: string;
    certificates: string;
  };
  contact: { title: string; text: string; linkedin: string };
  footer: { built: string; label: string };
  backToTop: string;
}

/** Egy nyelv teljes tartalma. */
export interface Content {
  profile: Profile;
  jobs: Job[];
  skills: Skill[];
  sideProjects: SideProject[];
  studies: Study[];
  stats: Stat[];
  ui: Ui;
}
