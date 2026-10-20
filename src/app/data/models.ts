export type ArtKind = 'cup' | 'bridge' | 'split' | 'flow' | 'gate' | 'saw';

export interface Profile {
  name: string;
  role: string;
  /** Az oldal h1 címe. */
  headline: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  intro: string;
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
  art: ArtKind;
}

export interface Skill {
  highlight?: boolean;
  title: string;
  tag: string;
  text: string;
}

export interface Study {
  title: string;
  where: string;
  period: string;
}
