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
  languages: 'Hungarian, English (B2 language exam)',
  license: 'Category B',
  stack: ['Java 8–25', 'Kotlin', 'Spring Boot'],
  roles: ['Java developer', 'Kotlin developer', 'AI consultant'],
  intro:
    'I build backend systems in Java and Kotlin. I like working on software that stays in use for years and that a team can keep developing with confidence. I also work as an AI consultant, helping companies make artificial intelligence genuinely useful.',
  letter: [
    'I am a senior Java developer. I have spent more than five years on Java 11 and Java 17, but I feel at home anywhere from Java 8 up to Java 25. I work on Spring and Spring Boot applications, and I like to see the work through from design and coding to tests and maintenance.',
    'I care about code that is easy to understand and maintain. That is why I follow proven design principles and patterns, and why I test a lot: unit tests, system tests and UI tests. Whenever a project needed better test coverage, I was glad to take it on.',
    'I am comfortable working in a team and on my own. I talk openly with clients and with colleagues from other areas, because I believe good software starts with good conversations. I try out new technologies in side projects, so my knowledge keeps getting refreshed. I also use AI deliberately in my work: I write good prompts, build skills, and record in CLAUDE.md files how the assistant should work on a project.',
    'In my free time I like watching movies, playing games with friends and driving, and I try out new technologies in side projects.',
    'This site is built with Angular, because I am curious about the other side of development too.',
  ],
};

const jobs: Content['jobs'] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: 'October 2025 – present',
    description:
      'I work as a senior software engineer on four projects, several of them in Kotlin. I develop backends, take part in design and care about quality. One of my projects is about AI consulting.',
    projects: [
      {
        name: 'MOL Limo rent a car',
        url: 'https://rentacar.mollimo.hu/rent/start',
        text: 'I develop the backend of the MOL Limo car rental system in Kotlin.',
      },
      { name: 'Railnet' },
      { name: 'Helvo', text: 'A project for a Swiss startup.' },
      {
        name: 'GLI Solutions',
        role: 'AI Consultant',
        text: 'As an AI consultant I help artificial intelligence answer real problems. We find where it is useful, check whether it is feasible, and fit it into the systems that already exist.',
      },
    ],
    tech: ['Kotlin', 'Java', 'Exposed', 'AI', 'MCP', 'Prompting'],
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: 'August 2024 – October 2025',
    description:
      'I worked on the McDonald’s application, in the team that handles user accounts, authentication and authorization. I built new APIs and wrote their unit and integration tests. I reviewed my colleagues’ code, wrote SQL queries, connected other systems’ APIs and maintained the existing code base.',
    projects: [
      {
        name: 'McDonald’s',
        text: 'User accounts, authentication and authorization: I was a member of the team that handles them.',
      },
    ],
    tech: ['Java', 'REST API', 'SQL', 'Authentication', 'Authorization', 'Unit tests'],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: 'January 2022 – August 2024',
    description:
      'As part of a team, we developed the financial application of Broadridge, an American company. This is where I really learned multi-threaded programming, domain-driven design and the functional approach. I wrote unit, system and acceptance tests, including UI tests with Selenium. I also connected other systems’ APIs, sometimes asynchronously. I solved concurrency bugs and improved test coverage.',
    projects: [
      { name: 'Broadridge financial application' },
      {
        name: 'Multitenant framework',
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
      'As a junior developer I developed backends: I designed and implemented new features, wrote unit tests, took part in code reviews, tested manually, and learned a lot along the way.',
    projects: [
      {
        name: 'Internal exam system',
        text: 'EPAM’s internal exam system: a web application in which exams could be taken safely. I built its backend.',
      },
      {
        name: 'Broadridge financial application',
        text: 'The same project I later worked on as a Software Engineer.',
      },
    ],
    tech: ['Java', 'Backend', 'Unit tests'],
  },
];

const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI and MCP',
    tag: 'Artificial intelligence',
    text: 'I have used AI in my work for more than three years, and today it is a natural part of my daily work. I write well-formed prompts, use my own skills, and write CLAUDE.md files so the AI assistant knows a project’s rules and helps consistently. On the GLI Solutions project at Adroit Group I work as an AI consultant: we look for where artificial intelligence helps and how to fit it into existing systems. In March 2026 I earned four Anthropic certificates: Claude API, Model Context Protocol (MCP), agent skills and Claude Code.',
  },
  {
    title: 'Java 8–25',
    tag: 'Language',
    text: 'I write code confidently from Java 8 up to Java 25. Most of my practice, more than five years, is on Java 11 and Java 17. I also hold certificates in Java 8, Java 10 and 11, and Java 17.',
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
    text: 'For me testing is not an afterthought but a natural part of the work. I write unit tests with JUnit and Mockito, walk through the UI with Selenium and Cucumber, and cover the whole system with integration and system tests. I also took a REST Assured course on API testing. On an earlier project I also managed to improve test coverage.',
  },
  {
    title: 'Tools',
    tag: 'Workflow',
    text: 'I manage builds with Gradle and Maven and keep my code in Git. I hold Docker certificates. I use SQL and Lombok regularly, and Jira and Confluence for teamwork.',
  },
  {
    title: 'Design',
    tag: 'Principles',
    text: 'I follow the SOLID principles, clean code thinking and design patterns. Domain-driven design and the world of microservices are close to my heart.',
  },
  {
    title: 'Angular',
    tag: 'Frontend',
    text: 'I built this site with Angular 22 as well, using standalone components, signals and Vitest tests. I work with it on the frontend side in side projects, such as lizacover.hu, while my main field at work is the backend.',
  },
];

const codeSamples: Content['codeSamples'] = [
  {
    name: 'OrderRepository.kt',
    language: 'kotlin',
    code: [
      '// Exposed: the most recent orders, newest first',
      'class OrderRepository(private val database: Database) {',
      '    fun recent(limit: Int = 10): List<Order> = transaction(database) {',
      '        Orders',
      '            .selectAll()',
      '            .orderBy(Orders.createdAt, SortOrder.DESC)',
      '            .limit(limit)',
      '            .map { it.toOrder() }',
      '    }',
      '}',
    ].join('\n'),
  },
  {
    name: 'OrderRepositoryTest.kt',
    language: 'kotlin',
    code: [
      'class OrderRepositoryTest {',
      '    @Test',
      '    fun `the newest order comes first`() {',
      '        val orders = repository.recent(limit = 2)',
      '',
      '        assertEquals(listOf("C-3", "B-2"), orders.map { it.number })',
      '    }',
      '}',
    ].join('\n'),
  },
];

const aiWorkflow: Content['aiWorkflow'] = {
  title: 'How I work with AI',
  lead: 'I have used AI in my work for more than three years. This is what it looks like in practice.',
  points: [
    {
      title: 'Precise prompts',
      text: 'I describe a task together with its context: what the goal is, what to watch out for, and when it is done. That way the assistant gets closer to the right solution on the first try.',
    },
    {
      title: 'CLAUDE.md in every project',
      text: 'I record a project’s rules, commands and structure in a CLAUDE.md file, so the assistant knows the same things in every session. I built this site that way, and the file is visible in the source code.',
    },
    {
      title: 'My own skills and hooks',
      text: 'I write skills for repeated tasks, for example editing the content. The lizacover.hu project has six skills and a hook that checks everything before a push.',
    },
    {
      title: 'I check the result',
      text: 'The AI’s code is protected by tests and the build, and CI runs them on every change. For this site, accessibility and performance were measured as well.',
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
      '## Rules',
      '- Text may only live in `content.hu.ts` and `content.en.ts`.',
      '- Content must be real data only. If data is missing, ask.',
      '- Every component is its own `.ts`, `.html`, `.scss` and `.spec.ts` file.',
      '- After a change, `npm test` and `npm run build` must pass.',
    ].join('\n'),
  },
  note: 'The file is taken from the real CLAUDE.md of this site, shortened.',
};

const sideProjects: Content['sideProjects'] = [
  {
    name: 'lizacover.hu',
    url: 'https://lizacover.hu',
    description:
      'A live site: the portfolio of Elizabet Ivanovszki, a graphic designer and illustrator, which I developed. It is a one-page, bilingual site: the Hungarian and English versions have their own addresses so search engines can see both. It is built with Angular 21, the build produces prerendered static pages, and it runs on Cloudflare. The fonts are self-hosted, and analytics loads only after consent.',
    tech: ['Angular 21', 'TypeScript', 'Prerendering', 'Bilingual', 'SEO', 'Cloudflare'],
  },
  {
    name: 'This portfolio',
    sourceUrl: 'https://github.com/gyulaimrk/website',
    description:
      'This site is a side project too. I built it with Angular 22, using standalone components and signals. It is available in Hungarian and English, has a dark and a light theme, and I paid attention to accessibility and search engine optimization. Every component is split into its own HTML, SCSS, TypeScript and test file, and the content can be edited in one place per language. GitHub Actions runs the tests and the build, and it is prepared for Cloudflare. I also used an AI assistant (Claude Code) while developing it.',
    tech: [
      'Angular 22',
      'TypeScript',
      'Vitest',
      'Bilingual',
      'Accessibility',
      'SEO',
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
      'I successfully completed EPAM’s Java Mentored Education Program. We were taught the Java language and covered version control systems, agile development methodologies, testing, clean code, design patterns and the Spring framework in depth, and we got a taste of front end development too.',
  },
  { kind: 'education', title: 'English language exam, B2', where: '', period: '' },
  {
    kind: 'certificate',
    featured: true,
    title: 'Building with the Claude API',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to Model Context Protocol',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to agent skills',
    where: 'Anthropic',
    period: 'March 2026',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Claude Code in Action',
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
  { value: '8–25', label: 'Java versions I write code in confidently' },
  { value: '8', label: 'projects across 3 workplaces: EPAM, RDI and Adroit' },
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
    linkedin: 'LinkedIn',
    codeNote: 'An illustrative example, not code from work.',
  },
  about: {
    title: 'About me',
    lead: 'A developer who likes to build systems that are still easy to understand years later.',
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
    lead: 'What I use most often, from programming languages to testing.',
  },
  sideProjects: {
    title: 'Side projects',
    lead: 'I like to build outside of work too: these are my side projects.',
    visit: 'Visit the site',
    source: 'Source code on GitHub',
  },
  experience: {
    title: 'Experience',
    projects: 'Projects',
    lead: 'Three companies, four roles, eight projects: I started as a junior developer and today I am a senior.',
  },
  education: {
    title: 'Education and certificates',
    lead: 'I started at university and have kept my knowledge fresh with courses and certificates since.',
    studies: 'Education',
    anthropic: 'Anthropic certificates',
    certificates: 'More certificates',
  },
  contact: {
    title: 'Let’s work together',
    text: 'Do you have a project, an AI idea or a backend task? Write to me, I would be glad to talk it through.',
    linkedin: 'Message me on LinkedIn',
  },
  footer: { built: 'Built with Angular.', label: 'Contact links' },
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
