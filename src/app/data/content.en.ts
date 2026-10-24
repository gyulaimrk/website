// The English content of the site. Its Hungarian counterpart is content.hu.ts; keep the two in sync.
import { Content } from './models';

const profile: Content['profile'] = {
  name: 'Márk Gyulai',
  role: 'Senior Java Developer',
  email: 'gyulai.mrk2@live.com',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Nyíregyháza, Hungary',
  languages: 'Hungarian, English',
  stack: ['Java 8–25', 'Kotlin', 'Spring Boot'],
  roles: ['Java developer', 'Kotlin developer', 'AI consultant'],
  intro:
    'I build backend systems in Java and Kotlin. I like working on software that stays in use for years and that a team can keep developing with confidence. I also work as an AI consultant, helping companies make artificial intelligence genuinely useful.',
  letter: [
    'I am a senior Java developer. I have spent more than four years on Java 11 and Java 17, but I feel at home anywhere from Java 8 up to Java 25. I work on Spring and Spring Boot applications, and I like to see the work through from design and coding to tests and maintenance.',
    'I care about code that is easy to understand and maintain. That is why I follow proven design principles and patterns, and why I test a lot: unit tests, system tests and UI tests. Whenever a project needed better test coverage, I was glad to take it on.',
    'I am comfortable working in a team and on my own. I talk openly with clients and with colleagues from other areas, because I believe good software starts with good conversations. I try out new technologies in side projects, so my knowledge keeps getting refreshed. I also use AI deliberately in my work: I write good prompts, build skills, and record in CLAUDE.md files how the assistant should work on a project.',
    'This site is built with Angular, because I am curious about the other side of development too.',
  ],
};

const jobs: Content['jobs'] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: 'October 2025 – present',
    description:
      'I work as a senior software engineer on several Kotlin projects. I develop backends, take part in design and care about quality. One of my projects is about AI consulting.',
    projects: [
      {
        name: 'GLI Solutions',
        role: 'AI Consultant',
        text: 'As an AI consultant I help artificial intelligence answer real problems. We find where it is useful, check whether it is feasible, and fit it into the systems that already exist.',
      },
      {
        name: 'MOL Limo rent a car',
        url: 'https://rentacar.mollimo.hu/rent/start',
        text: 'I develop the backend of the MOL Limo car rental system in Kotlin.',
      },
    ],
    tech: ['Kotlin', 'Java', 'Exposed', 'AI', 'MCP', 'Prompting'],
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: 'August 2024 – October 2025',
    description:
      'I worked on the application of a major fast food franchise. I built new APIs for it and wrote their unit and integration tests. I reviewed my colleagues’ code, wrote SQL queries, connected other systems’ APIs and maintained the existing code base.',
    tech: ['Java', 'REST API', 'SQL', 'Unit tests'],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: 'January 2022 – August 2024',
    description:
      'As part of a team, we developed the financial application of an American company, Broadridge. This is where I really learned multi-threaded programming, domain-driven design and the functional approach. I wrote unit, system and acceptance tests, including UI tests with Selenium. I solved concurrency bugs and improved test coverage.',
    tech: ['Java', 'Multithreading', 'DDD', 'Selenium', 'SQL'],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: 'July 2021 – January 2022',
    description:
      'As a junior developer I built the backend of a web application that helps people prepare for language exams. I designed and implemented new features, wrote unit tests, took part in code reviews and learned a lot along the way.',
    tech: ['Java', 'Backend', 'Unit tests'],
  },
];

const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI and MCP',
    tag: 'Artificial intelligence',
    text: 'AI is a natural part of my daily work. I write well-formed prompts, use my own skills, and write CLAUDE.md files so the AI assistant knows a project’s rules and helps consistently. On the GLI Solutions project at Adroit Group I work as an AI consultant: we look for where artificial intelligence helps and how to fit it into existing systems. I also hold a certificate in the Model Context Protocol (MCP).',
  },
  {
    title: 'Java 8–25',
    tag: 'Language',
    text: 'I write code confidently from Java 8 up to Java 25. Most of my practice, more than four years, is on Java 11 and Java 17. I also hold certificates in Java 8 and in Java 10 and 11.',
  },
  {
    title: 'Kotlin',
    tag: 'Language',
    text: 'At Adroit Group I work on several Kotlin projects, including the MOL Limo car rental system. I access the database with the Exposed framework.',
  },
  {
    title: 'Spring Boot',
    tag: 'Framework',
    text: 'I design and build REST APIs in Spring Boot applications, and I have worked in a microservice architecture too.',
  },
  {
    title: 'Testing',
    tag: 'Quality',
    text: 'For me testing is not an afterthought but a natural part of the work. I write unit tests with JUnit and Mockito, walk through the UI with Selenium and Cucumber, and cover the whole system with integration and system tests. On an earlier project I also managed to improve test coverage.',
  },
  {
    title: 'Tools',
    tag: 'Workflow',
    text: 'I manage builds with Gradle and Maven and keep my code in Git. I use SQL and Lombok regularly, and Jira and Confluence for teamwork.',
  },
  {
    title: 'Design',
    tag: 'Principles',
    text: 'I follow the SOLID principles, clean code thinking and design patterns. Domain-driven design and the world of microservices are close to my heart.',
  },
];

const studies: Content['studies'] = [
  {
    kind: 'education',
    title: 'Mathematics and Computer Science, BSc',
    where: 'University of Miskolc',
    period: '2017 – 2021',
  },
  {
    kind: 'education',
    title: 'Java Mentored Education Program',
    where: 'EPAM Systems',
    period: '2020 – 2021',
  },
  { kind: 'certificate', title: 'Microservices Foundations', where: 'Certificate', period: '' },
  {
    kind: 'certificate',
    title: 'Introduction to Model Context Protocol',
    where: 'Certificate',
    period: '',
  },
  { kind: 'certificate', title: 'Java 8 for Professionals', where: 'Certificate', period: '' },
  {
    kind: 'certificate',
    title: 'First Look: Java 10 and Java 11',
    where: 'Certificate',
    period: '',
  },
];

const stats: Content['stats'] = [
  { value: '4+', label: 'years working with Java 11 and 17' },
  { value: '8–25', label: 'Java versions I write code in confidently' },
  { value: '3', label: 'companies so far: EPAM, RDI and Adroit' },
];

const ui: Content['ui'] = {
  meta: {
    title: 'Márk Gyulai – Senior Java Developer',
    description:
      'Portfolio of Márk Gyulai, a senior Java and Kotlin developer and AI consultant: backend systems, testing and practical artificial intelligence.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    home: 'Back to the top of the page',
    links: [
      { href: '#rolam', label: 'About' },
      { href: '#eszkoztar', label: 'Skills' },
      { href: '#tapasztalat', label: 'Experience' },
      { href: '#tanulmanyok', label: 'Education' },
    ],
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  toggles: {
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    toOtherLanguage: 'Switch to Hungarian',
    otherLanguageCode: 'HU',
  },
  hero: { greeting: 'Hi, I am', nameSuffix: '', projects: 'My work', linkedin: 'LinkedIn' },
  about: {
    title: 'About me',
    lead: 'A developer who likes to build systems that are still easy to understand years later.',
    facts: { location: 'Location', role: 'Role', languages: 'Languages', email: 'Email' },
  },
  skills: {
    title: 'Skills',
    lead: 'What I use most often, from programming languages to testing.',
  },
  experience: {
    title: 'Experience',
    lead: 'Three companies, four roles: I started as a junior developer and today I am a senior.',
  },
  education: {
    title: 'Education and certificates',
    lead: 'I started at university and have kept my knowledge fresh with courses and certificates since.',
    studies: 'Education',
    certificates: 'Certificates',
  },
  contact: {
    title: 'Let’s work together',
    text: 'Do you have a project, an AI idea or a backend task? Write to me, I would be glad to talk it through.',
    linkedin: 'Message me on LinkedIn',
  },
  footer: { built: 'Built with Angular.', label: 'Contact links' },
  backToTop: 'Back to top',
};

export const contentEn: Content = { profile, jobs, skills, studies, stats, ui };
