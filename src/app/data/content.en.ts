// The English content of the site. Its Hungarian counterpart is content.hu.ts; keep the two in sync.
import { Content } from './models';

const profile: Content['profile'] = {
  name: 'Márk Gyulai',
  role: 'Senior Java Developer',
  roleConstants: ['SENIOR_JAVA_DEVELOPER', 'KOTLIN_DEVELOPER', 'AI_CONSULTANT'],
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
    'I develop backend systems based on Java and Kotlin, with a particular focus on sustainable architecture, maintainability and long-term evolvability. As an AI consultant, I help companies identify the areas where artificial intelligence can create real business value, and I support its practical, goal-oriented adoption.',
  letter: [
    'As a senior Java developer, I have more than {javaYears} years of professional experience building Java-based backend systems. Besides working in Java 11 and Java 17 environments, I know the language features of every version from Java 8 up to Java 25. I work mainly with Spring and Spring Boot, from system design and implementation through testing to the long-term maintenance of applications.',
    'In development, I pay particular attention to code quality, clear architecture and sustainability. I rely on the principles of Clean Code, SOLID, DRY and KISS, and apply design patterns that fit the problem at hand. I regard testing as an integral part of the development process: I support reliable operation with unit, system and UI tests, and I have also taken part in improving the test coverage of existing systems.',
    'I work effectively both on my own and in a team, including in agile environments. On the Broadridge, McDonald’s and Helvo projects I gained experience as a member of international teams, so working with colleagues from different professional and cultural backgrounds is a natural part of my everyday work. I value open communication, regular meetings with clients and effective cooperation with neighbouring teams. At EPAM and at RDI I also took part in mentoring junior developers.',
    'I keep developing my professional knowledge and get to know new technologies through hands-on side projects. I build artificial intelligence into my development process deliberately: I write structured prompts, create my own AI skills, and use CLAUDE.md files to record a project’s technical guidelines and development rules, so that AI assistants fit the project’s expectations consistently.',
    'Although my main field is backend development, I am also interested in frontend technologies, and I enjoy working on solutions that cover the whole application.',
    'Outside work, I like driving, watching movies and playing games with friends.',
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
        tech: [
          'Kotlin',
          'Spring Boot',
          'Spring Security',
          'PostgreSQL',
          'Exposed',
          'Jenkins',
          'GitLab',
          'Jira',
          'Confluence',
          'Claude',
        ],
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
        tech: [
          'Kotlin',
          'Spring Boot 4',
          'OpenAPI',
          'GitLab',
          'ArgoCD',
          'Jira',
          'Confluence',
          'Claude',
        ],
        text: 'My international team and I built a backend for frontend application for a Swiss fintech startup in Kotlin with Spring Boot 4.',
        points: [
          'Documentation-first (design-first) approach: designing the API in OpenAPI',
          'Connecting the backend to other subsystems and the frontend with artifacts generated from the OpenAPI description',
        ],
      },
      {
        name: 'GLI Solutions',
        role: 'AI Consultant and Developer',
        tech: [
          'C#',
          '.NET',
          'Node.js',
          'Angular',
          'PostgreSQL',
          'AI',
          'MCP',
          'Prompting',
          'Azure DevOps',
          'Jira',
          'Confluence',
          'Claude',
        ],
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
    tech: ['Plane'],
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
          'GitHub',
          'ArgoCD',
          'Jira',
          'Confluence',
          'Copilot',
        ],
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
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: 'January 2022 – August 2024',
    description:
      'As part of an international team, we developed the financial application of Broadridge, an American company. This is where I got to know multithreaded programming, domain-driven design and the functional approach in depth. I wrote unit, system and acceptance tests, as well as UI tests with Selenium. I connected other systems’ APIs, sometimes asynchronously. I fixed concurrency bugs, handled database transactions and improved test coverage. I also mentored a junior developer.',
    projects: [
      {
        name: 'Broadridge financial application',
        tech: [
          'Java',
          'Multithreading',
          'DDD',
          'Selenium',
          'SQL',
          'Jenkins',
          'GitLab',
          'Jira',
          'Confluence',
        ],
      },
      {
        name: 'Multitenant framework',
        tech: ['Java', 'Multitenancy', 'Jenkins', 'GitLab', 'Jira', 'Confluence', 'Copilot'],
        text: 'The multitenant framework of the Broadridge project, which I worked on as a separate project.',
      },
    ],
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
        tech: [
          'Java',
          'Spring Boot 3',
          'MySQL',
          'JUnit',
          'Unit tests',
          'Jenkins',
          'GitLab',
          'Jira',
          'Confluence',
        ],
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
        tech: ['Java', 'Jenkins', 'GitLab', 'Jira', 'Confluence'],
        text: 'I later worked on the same project as a Software Engineer.',
      },
    ],
  },
];

const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI and Model Context Protocol (MCP)',
    tag: 'Artificial intelligence',
    paragraphs: [
      'For more than {aiYears} years I have used tools built on artificial intelligence to support my development work. I write structured prompts, build my own AI skills, and use CLAUDE.md files to record a project’s technical guidelines and development rules, so that work with AI assistants stays consistent.',
      'On the GLI Solutions project at Adroit Group, as an AI consultant, I examine the practical uses of artificial intelligence, with particular attention to integrating it into business processes and existing systems.',
      'In March 2026 I earned four Anthropic certificates, covering the Claude API, the Model Context Protocol (MCP), Agent Skills and Claude Code.',
    ],
  },
  {
    title: 'Java 8–25',
    tag: 'Programming languages',
    paragraphs: [
      'I have more than {javaYears} years of professional experience developing Java-based applications. My deepest hands-on experience is with Java 11 and Java 17, and I also know the language features of the versions from Java 8 to 25. I hold separate certificates in Java 8, 10, 11 and 17.',
    ],
  },
  {
    title: 'Kotlin',
    tag: 'Programming languages',
    paragraphs: [
      'At Adroit Group I took part in two Kotlin-based projects: the MOL Limo car-sharing service and Helvo. I use the Exposed framework for database access.',
    ],
  },
  {
    title: 'Spring Boot',
    tag: 'Frameworks and architecture',
    paragraphs: [
      'I design and develop backend applications based on Spring and Spring Boot, mainly implementing REST APIs. I have also worked on microservice-based systems, keeping clear separation of responsibilities and long-term maintainability in mind.',
    ],
  },
  {
    title: 'Software design and development principles',
    tag: 'Frameworks and architecture',
    paragraphs: [
      'I build my work on Clean Code thinking, the SOLID, DRY and KISS principles, and the appropriate use of design patterns. When designing and using databases, I pay particular attention to the ACID properties, correct transaction handling and data consistency.',
      'I have also worked with a Domain-Driven Design (DDD) approach and in a microservice architecture.',
    ],
  },
  {
    title: 'Testing',
    tag: 'Testing and software quality',
    paragraphs: [
      'I regard testing as an integral part of the development process. I write unit tests following the FIRST principles: fast, independent, repeatable, self-validating and timely.',
      'I also verify applications with UI, integration and system-level tests. I attended an API testing course on REST Assured, and on earlier projects I also took a role in improving test coverage.',
    ],
    chips: ['JUnit', 'Mockito', 'Selenium', 'Cucumber', 'FIRST'],
  },
  {
    title: 'Tools',
    tag: 'Development tools and workflows',
    paragraphs: [
      'I use Gradle and Maven to set up and manage build processes and Git for version control. I have worked with Jenkins, GitLab CI/CD, GitHub and GitHub Actions in CI/CD pipelines, and I have also used ArgoCD to automate releases.',
      'I hold a Docker certificate. SQL and Lombok are part of my everyday work. In agile teams I use Jira, Confluence, Plane and Azure DevOps to support task management, documentation and collaboration.',
    ],
  },
  {
    title: 'Angular',
    tag: 'Frontend development',
    paragraphs: [
      'Although my main field is backend development, I also have hands-on experience building frontend applications. I built this site with Angular 22, using standalone components, signals and Vitest-based tests.',
      'The lizacover.hu website and the GLI Solutions testing platform are built with Angular too. I treat frontend development as part of an approach that covers the whole application.',
    ],
  },
];

const codeSamples: Content['codeSamples'] = [
  {
    name: 'Developer.kt',
    language: 'kotlin',
    code: [
      'enum class Role {',
      '    SENIOR_JAVA_DEVELOPER,',
      '    KOTLIN_DEVELOPER,',
      '    AI_CONSULTANT,',
      '}',
      '',
      'data class Developer(',
      '    val name: String,',
      '    val roles: List<Role>,',
      '    val stack: List<String>,',
      '    val ai: Boolean,',
      '    val location: String,',
      ')',
    ].join('\n'),
  },
];

const aiWorkflow: Content['aiWorkflow'] = {
  title: 'How I work with AI',
  lead: 'I have used AI in my work for more than {aiYears} years. These are the four habits I follow.',
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
      'Claude',
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
      'Claude',
    ],
  },
];

const studies: Content['studies'] = [
  {
    kind: 'education',
    title: 'Mathematics and Computer Science, BSc',
    where: 'University of Miskolc',
    period: '2017–2021',
    description:
      'During my university studies I gained a foundation in mathematics and computer science, on which I build the analytical, problem-solving approach I apply in software development.',
  },
  {
    kind: 'education',
    title: 'Java Mentored Education Program',
    where: 'EPAM Systems',
    period: 'September 2020 – July 2021',
    description:
      'Through EPAM’s Java Mentored Education Program I received a comprehensive introduction to Java-based software development and professional development workflows. Besides the Java language, the training covered version control, agile methodologies, software testing, the principles of Clean Code, design patterns and the Spring framework. As part of the program I also got to know the basics of frontend development.',
  },
  {
    kind: 'education',
    title: 'English language exam, B2',
    where: '',
    period: '',
    description: 'An intermediate-level, B2 English language exam.',
  },
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
  { value: '{javaYears}+', label: 'years working with Java 11 and 17' },
  { value: '{aiYears}+', label: 'years using AI in my work' },
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
    lead: 'I aim to build software systems that keep running reliably in the long term, are easy to follow, and that the team can maintain and extend with ease.',
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
    lead: 'The programming languages, frameworks, tools and engineering principles I work with in my day-to-day development.',
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
    lead: 'I keep developing my professional knowledge, building on my university studies with targeted training and technology certifications.',
    studies: 'Education',
    featured: 'Anthropic certificates',
    certificates: 'More certificates',
    allCertificates: 'All certificates on LinkedIn',
  },
  contact: {
    title: 'Let’s work together!',
    text: 'Do you have a backend development project, are you building a new system, or are you looking for practical ways to apply artificial intelligence? I’m happy to talk through your ideas and help you find the right technical solution.',
    availability:
      'I’m open to project-based collaboration, part-time engagements and AI consulting. Get in touch, and let’s talk about how I could contribute to the success of your project.',
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
