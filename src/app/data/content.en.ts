// The English content of the site. Its Hungarian counterpart is content.hu.ts; keep the two in sync.
import { Content } from './models';

const profile: Content['profile'] = {
  name: 'Márk Gyulai',
  role: 'Senior Java Developer',
  email: 'gyulai.mrk2@live.com',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Nyíregyháza, Hungary',
  photo: { src: 'mark-gyulai.jpg', alt: 'Portrait of Márk Gyulai' },
  cv: 'cv/mark-gyulai-cv.pdf',
  languages: 'Hungarian, English (B2 language exam)',
  license: 'Category B',
  stack: ['Java 8–25', 'Kotlin', 'Spring Boot'],
  roles: ['Java developer', 'Kotlin developer', 'AI consultant'],
  intro:
    'I develop backend systems in Java and Kotlin. I build software that stays in use for years and that a team can keep developing safely. As an AI consultant, I help companies use artificial intelligence where it fits.',
  letter: [
    'I am a senior Java developer. I have spent more than five years on Java 11 and Java 17, and I know the language from Java 8 up to Java 25. I develop Spring and Spring Boot applications, from design and coding through testing to maintenance.',
    'Code has to be easy to understand and maintain. I follow the clean code, SOLID, DRY and KISS principles, use proven design patterns, and write unit, system and UI tests. Where test coverage needed improving, I took that on as well.',
    'I work well in a team and on my own, with an agile mindset. On the Broadridge, McDonald’s and Helvo projects I worked with international teams, and working with colleagues from different countries is second nature to me. I stay in regular, open contact with clients and with colleagues from other areas. At EPAM and at RDI I also mentored a junior colleague. I try out new technologies in side projects. I use AI deliberately in my work: I write precise prompts, build my own skills, and record a project’s rules in CLAUDE.md files for the assistant.',
    'In my free time I like driving, watching movies and playing games with friends.',
    'I built this site with Angular. Frontend work interests me too, although my main field is the backend.',
  ],
};

const jobs: Content['jobs'] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: 'October 2025 – present',
    description:
      'I have taken part in three projects, two of them in Kotlin. I develop backends, take part in design and pay attention to quality. One of the projects is AI consulting.',
    projects: [
      {
        name: 'MOL Limo rent a car',
        tech: ['Jenkins', 'GitLab'],
        url: 'https://rentacar.mollimo.hu/rent/start',
        text: 'I develop the backend of the MOL Limo car rental system in Kotlin.',
        points: [
          'Business logic and calculations in the backend, beyond aggregating data',
          'Asynchronous synchronization with a subsystem',
          'Managing a PostgreSQL database, including transaction management',
          'Implementing a custom OAuth flow and token handling with Spring Security',
          'Scheduled jobs with Spring’s @Scheduled annotation',
          'Documentation-first (design-first) approach',
          'Writing unit and integration tests, and manual testing',
          'Communicating with the client',
        ],
      },
      {
        name: 'Helvo',
        tech: ['GitLab', 'ArgoCD'],
        text: 'My international team and I built a backend for frontend application for a Swiss fintech startup in Kotlin with Spring Boot 4.',
        points: [
          'Documentation-first (design-first) approach: designing the API in OpenAPI',
          'Connecting the backend to other subsystems and the frontend with artifacts generated from the OpenAPI description',
        ],
      },
      {
        name: 'GLI Solutions',
        role: 'AI Consultant and Developer',
        text: 'As an AI consultant, I look into where artificial intelligence is useful, whether it is feasible and how it fits into existing systems. My team and I also work on the project as developers.',
        points: [
          'Developing a platform that supports manual testing, with a C# and .NET backend, a PostgreSQL database, Node.js and Angular',
          'The platform can be connected to AI agents as an MCP server',
          'Transaction management in the PostgreSQL database',
          'Code-first approach',
          'Handling bugs',
          'Steering the team and the code towards clean code',
          'Implementing repository-level AI skills',
          'Writing documentation',
        ],
      },
    ],
    tech: [
      'Kotlin',
      'Java',
      '.NET',
      'C#',
      'Node.js',
      'Angular',
      'Spring Boot',
      'Spring Security',
      'PostgreSQL',
      'OpenAPI',
      'Exposed',
      'AI',
      'MCP',
      'Prompting',
    ],
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: 'August 2024 – October 2025',
    description:
      'I worked on the McDonald’s application, in the team responsible for user accounts, authentication and authorization. My team and I developed and maintained microservices, together with their unit and integration tests. I wrote SQL queries and connected other systems’ APIs. Unofficially, I mentored a junior colleague here too.',
    projects: [
      {
        name: 'McDonald’s',
        tech: ['GitHub', 'ArgoCD'],
        text: 'User accounts, authentication and authorization; I worked in an international team.',
        points: [
          'Maintaining existing microservices',
          'Designing and developing new microservices',
          'Designing API endpoints and tidying up the OpenAPI description file with reusable objects',
          'Finding and fixing bugs based on metrics, traces and logs',
          'Raising test coverage above 90%',
          'Repairing data corrupted by migrations in a NoSQL database with a Python script',
          'Managing database transactions',
          'Code reviews',
          'Google login with the Google SDK instead of plain API endpoints',
        ],
      },
    ],
    tech: [
      'Java',
      'Microservices',
      'REST API',
      'OpenAPI',
      'SQL',
      'NoSQL',
      'Python',
      'Authentication',
      'Authorization',
      'Unit tests',
    ],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: 'January 2022 – August 2024',
    description:
      'As part of an international team, we developed the financial application of Broadridge, an American company. This is where I got to know multithreaded programming, domain-driven design and the functional approach in depth. I wrote unit, system and acceptance tests, as well as UI tests with Selenium. I connected other systems’ APIs, sometimes asynchronously. I fixed concurrency bugs, handled database transactions and improved test coverage. I also mentored a junior developer.',
    projects: [
      { name: 'Broadridge financial application', tech: ['Jenkins', 'GitLab'] },
      {
        name: 'Multitenant framework',
        tech: ['Jenkins', 'GitLab'],
        text: 'The multitenant framework of the Broadridge project, which I worked on as a separate project.',
      },
    ],
    tech: ['Java', 'Multithreading', 'DDD', 'Multitenancy', 'Selenium', 'SQL'],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: 'July 2021 – January 2022',
    description:
      'As a junior developer I built backend features for EPAM’s internal exam system, and later worked on the Broadridge project as well.',
    projects: [
      {
        name: 'Internal exam system',
        tech: ['Jenkins', 'GitLab'],
        text: 'EPAM’s internal exam system: a web application in which exams could be taken safely. My team and I built its backend with Spring Boot 3 and a MySQL database.',
        points: [
          'Designing and developing new features',
          'Transaction management in the MySQL database',
          'Code reviews',
          'Writing unit tests with JUnit',
          'Manual testing',
          'Learning new technologies and developing my skills',
        ],
      },
      {
        name: 'Broadridge financial application',
        tech: ['Jenkins', 'GitLab'],
        text: 'I later worked on the same project as a Software Engineer.',
      },
    ],
    tech: ['Java', 'Spring Boot 3', 'MySQL', 'JUnit', 'Unit tests'],
  },
];

const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI and MCP',
    tag: 'Artificial intelligence',
    text: 'I have used AI in my work for more than three years. I write precise prompts, build my own skills, and record a project’s rules in CLAUDE.md files so the assistant works from the same information in every session. On the GLI Solutions project at Adroit Group I work as an AI consultant: we examine where artificial intelligence helps and how it fits into existing systems. In March 2026 I earned four Anthropic certificates: Claude API, Model Context Protocol (MCP), agent skills and Claude Code.',
  },
  {
    title: 'Java 8–25',
    tag: 'Language',
    text: 'I know Java from version 8 up to 25. Most of my practice, more than five years, is on Java 11 and Java 17. I also hold certificates in Java 8, Java 10, Java 11 and Java 17.',
  },
  {
    title: 'Kotlin',
    tag: 'Language',
    text: 'At Adroit Group I worked on two Kotlin projects: the MOL Limo car rental system and Helvo. I access the database with the Exposed framework.',
  },
  {
    title: 'Spring Boot',
    tag: 'Framework',
    text: 'I design and build REST APIs in Spring Boot applications, and I have worked in a microservice architecture too.',
  },
  {
    title: 'Testing',
    tag: 'Quality',
    text: 'Testing is part of development, not an afterthought. I write unit tests with JUnit and Mockito, following the FIRST principles (fast, independent, repeatable, self-validating, timely). I test the UI with Selenium and Cucumber and cover the whole system with integration and system tests. I took a REST Assured course on API testing, and on an earlier project I also improved test coverage.',
  },
  {
    title: 'Tools',
    tag: 'Workflow',
    text: 'I use Gradle and Maven for builds and Git for version control. I have worked with Jenkins, GitLab, GitHub and GitHub Actions for CI/CD, and used ArgoCD for deployments. I hold Docker certificates. I use SQL and Lombok regularly. I work with an agile mindset and use Jira and Confluence for teamwork.',
  },
  {
    title: 'Design',
    tag: 'Principles',
    text: 'I follow clean code thinking, the SOLID, DRY and KISS principles and design patterns. With databases I pay attention to the ACID properties and careful transaction management. I have worked with domain-driven design and in a microservice architecture.',
  },
  {
    title: 'Angular',
    tag: 'Frontend',
    text: 'I built this site with Angular 22, using standalone components, signals and Vitest tests. lizacover.hu and the GLI Solutions testing platform are built with Angular too, but my main field is the backend.',
  },
];

const codeSamples: Content['codeSamples'] = [
  {
    name: 'Developer.kt',
    language: 'kotlin',
    code: [
      'data class Developer(',
      '    val name: String,',
      '    val role: String,',
      '    val stack: List<String>,',
      '    val ai: Boolean,',
      '    val location: String,',
      ')',
    ].join('\n'),
  },
];

const aiWorkflow: Content['aiWorkflow'] = {
  title: 'How I work with AI',
  lead: 'I have used AI in my work for more than three years. These are the four habits I follow.',
  points: [
    {
      title: 'Precise prompts',
      text: 'I describe a task together with its context: what the goal is, what to watch out for, and when it counts as done. That way the assistant gets closer to a solution on the first attempt.',
    },
    {
      title: 'CLAUDE.md in every project',
      text: 'I record a project’s rules, commands and structure in a CLAUDE.md file, so the assistant starts every session from the same information. This site has one too, and it can be viewed in the source code.',
    },
    {
      title: 'My own skills and hooks',
      text: 'I write skills for repeated tasks, for example editing content and writing documentation. The lizacover.hu project has six skills and a hook that runs checks before every push.',
    },
    {
      title: 'I check the result',
      text: 'Code written by AI is checked by tests and the build too, and CI runs them on every change. For this site I also measured accessibility and performance.',
    },
  ],
  file: {
    name: 'CLAUDE.md',
    language: 'markdown',
    code: [
      '# Márk Gyulai – portfolio',
      '',
      'Angular 22, standalone components, signals. Bilingual: Hungarian and English.',
      '',
      '## Commands',
      '- `npm start`: development server',
      '- `npm test -- --watch=false`: unit tests',
      '- `npm run e2e`: end-to-end tests',
      '- `npm run build`: production build',
      '',
      '## Conventions',
      '- Text only lives in `content.hu.ts` and `content.en.ts`.',
      '- Content must be real data only. If data is missing, ask.',
      '- Every component is its own `.ts`, `.html`, `.scss` and `.spec.ts` file.',
      '- SOLID, DRY, KISS; one responsibility per component.',
      '',
      '## Where to find things',
      '- Skills: `.claude/skills/`',
      '- Agent: `.claude/agents/`',
      '- Documentation: `docs/`',
    ].join('\n'),
  },
  note: 'The excerpt comes from this site’s CLAUDE.md, shortened.',
};

const sideProjects: Content['sideProjects'] = [
  {
    name: 'lizacover.hu',
    url: 'https://lizacover.hu',
    description:
      'The portfolio of Elizabet Ivanovszki, a graphic designer and illustrator, which I developed; it is live. It is a one-page, bilingual site: the Hungarian and English versions have separate addresses so search engines can index both. It is built with Angular 21, the build produces prerendered static pages, and it runs on Cloudflare. The site serves its own fonts, and analytics loads only after consent.',
    tech: [
      'Angular 21',
      'TypeScript',
      'Prerendering',
      'Bilingual',
      'SEO',
      'Cloudflare',
      'GitHub',
      'GitHub Actions',
    ],
  },
  {
    name: 'This portfolio',
    sourceUrl: 'https://github.com/gyulaimrk/website',
    description:
      'This portfolio is a side project too. It is built with Angular 22, using standalone components and signals. It is available in Hungarian and English, has a dark and a light theme, and takes accessibility and search engine optimization into account. Every component is split into its own HTML, SCSS, TypeScript and test file, and the content can be edited in one place per language. GitHub Actions runs the tests and the build, and deployment to Cloudflare is prepared. I also used an AI assistant (Claude Code) during development.',
    tech: [
      'Angular 22',
      'TypeScript',
      'Vitest',
      'Bilingual',
      'Accessibility',
      'SEO',
      'GitHub',
      'GitHub Actions',
    ],
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
    period: 'September 2020 – July 2021',
    description:
      'I completed EPAM’s Java Mentored Education Program. Besides the Java language, the program covered version control systems, agile methodologies, testing, clean code, design patterns and the Spring framework, and gave a short introduction to front end development.',
  },
  { kind: 'education', title: 'English language exam, B2', where: '', period: '' },
  {
    kind: 'certificate',
    featured: true,
    title: 'Building with the Claude API',
    url: 'https://verify.skilljar.com/c/7jo35z6dpp7k',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to Model Context Protocol',
    url: 'https://verify.skilljar.com/c/tozc5cusdj7m',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to agent skills',
    url: 'https://verify.skilljar.com/c/b8b55d8oorax',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Claude Code in Action',
    url: 'https://verify.skilljar.com/c/akb2h6ejg29z',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    title: 'Microservices Foundations',
    where: 'LinkedIn Learning',
    period: 'June 2021',
  },
  {
    kind: 'certificate',
    title: 'Docker for Developers',
    where: 'LinkedIn Learning',
    period: 'January 2024',
  },
  {
    kind: 'certificate',
    title: 'Introduction to Docker for Java Developers',
    where: 'LinkedIn Learning',
    period: 'January 2024',
  },
  {
    kind: 'certificate',
    title: 'Java 17: First Look',
    where: 'LinkedIn Learning',
    period: 'January 2024',
  },
  {
    kind: 'certificate',
    title: 'Java: Automated API Testing with REST Assured',
    where: 'LinkedIn Learning',
    period: 'January 2024',
  },
  {
    kind: 'certificate',
    title: 'Learning Java 17',
    where: 'LinkedIn Learning',
    period: 'October 2023',
  },
  {
    kind: 'certificate',
    title: 'Java 8 for Professionals',
    where: 'LinkedIn Learning',
    period: 'October 2023',
  },
  {
    kind: 'certificate',
    title: 'First Look: Java 10 and Java 11',
    where: 'LinkedIn Learning',
    period: 'October 2020',
  },
];

const stats: Content['stats'] = [
  { value: '5+', label: 'years working with Java 11 and 17' },
  { value: '3+', label: 'years using AI in my work' },
  { value: '8–25', label: 'Java versions I know' },
  { value: '7', label: 'projects across 3 workplaces: EPAM, RDI and Adroit' },
];

const ui: Content['ui'] = {
  meta: {
    title: 'Márk Gyulai – Senior Java Developer',
    description:
      'Portfolio of Márk Gyulai, a senior Java and Kotlin developer and AI consultant: backend systems, testing and artificial intelligence.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    home: 'Back to the top of the page',
    links: [
      { fragment: 'rolam', label: 'About' },
      { fragment: 'eszkoztar', label: 'Skills' },
      { fragment: 'ai', label: 'AI' },
      { fragment: 'tapasztalat', label: 'Experience' },
      { fragment: 'mellekprojektek', label: 'Side projects' },
      { fragment: 'tanulmanyok', label: 'Education' },
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
  hero: {
    greeting: 'Hi, I am',
    nameSuffix: '',
    projects: 'My work',
    cv: 'Résumé (PDF)',
    linkedin: 'LinkedIn',
  },
  about: {
    title: 'About me',
    lead: 'I build systems that are still easy to understand and extend years later.',
    facts: {
      location: 'Location',
      role: 'Role',
      languages: 'Languages',
      license: 'Driving licence',
      email: 'Email',
    },
  },
  skills: {
    title: 'Skills',
    lead: 'The languages, frameworks and tools I use most often.',
  },
  sideProjects: {
    title: 'Side projects',
    lead: 'Projects I built outside of work.',
    visit: 'Visit the site',
    source: 'Source code on GitHub',
  },
  experience: {
    title: 'Experience',
    projects: 'Projects',
    lead: 'Three companies, four roles, seven projects. I started as a junior developer and today I am a senior.',
  },
  education: {
    title: 'Education and certificates',
    lead: 'After university I have kept developing through courses and certificates.',
    studies: 'Education',
    featured: 'Anthropic certificates',
    certificates: 'More certificates',
    allCertificates: 'All certificates on LinkedIn',
  },
  contact: {
    title: 'Let’s work together',
    text: 'Do you have a backend task, an AI idea or a project? Get in touch and we can talk it through.',
    cv: 'Download my résumé',
    linkedin: 'Message me on LinkedIn',
  },
  footer: {
    built: 'Built with Angular.',
    label: 'Contact links',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
  backToTop: 'Back to top',
};

export const contentEn: Content = {
  profile,
  jobs,
  skills,
  aiWorkflow,
  codeSamples,
  sideProjects,
  studies,
  stats,
  ui,
};
