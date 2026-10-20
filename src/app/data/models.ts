export interface Profile {
  name: string;
  role: string;
  /** Az oldal h1 címe. */
  headline: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  /** Rövid mondat a nyitóképernyőre. */
  tagline: string;
  intro: string;
  languages: string;
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
  /** Rövid évszám-tartomány a listához. */
  years: string;
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

export interface Study {
  kind: 'education' | 'certificate';
  title: string;
  where: string;
  period: string;
}
