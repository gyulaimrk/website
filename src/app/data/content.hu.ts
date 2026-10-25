// A weboldal magyar tartalma (forrás: önéletrajz és LinkedIn-profil). Az angol párja: content.en.ts.
import { Content } from './models';

const profile: Content['profile'] = {
  name: 'Gyulai Márk',
  role: 'Senior Java fejlesztő',
  roleConstants: ['SENIOR_JAVA_DEVELOPER', 'KOTLIN_DEVELOPER', 'AI_CONSULTANT'],
  email: 'gyulai.mrk2@live.com',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Nyíregyháza, Magyarország',
  photo: { src: 'mark-gyulai.jpg', alt: 'Gyulai Márk portréfotója' },
  cv: 'cv/gyulai-mark-oneletrajz.pdf',
  languages: 'magyar, angol (B2 nyelvvizsga)',
  license: 'B kategória',
  stack: ['Java 8–25', 'Kotlin', 'Spring Boot'],
  roles: ['Java fejlesztő', 'Kotlin fejlesztő', 'AI-konzultáns'],
  intro:
    'Java és Kotlin nyelven fejlesztek backendet. Olyan rendszereket építek, amelyek évek múlva is jól működnek, és amelyeket a csapat könnyen tovább tud fejleszteni. AI-konzultánsként abban segítek a cégeknek, hogy ott használják a mesterséges intelligenciát, ahol tényleg hasznos.',
  letter: [
    'Senior Java fejlesztő vagyok. Több mint {javaYears} éve dolgozom Java 11 és Java 17 alatt, és a Java 8-tól a 25-ös verzióig ismerem a nyelvet. Spring és Spring Boot alkalmazásokat fejlesztek, a tervezéstől a kódoláson és a teszteken át a karbantartásig.',
    'A kódnak érthetőnek és karbantarthatónak kell lennie. Ezért a clean code, a SOLID, a DRY és a KISS elveit követem, bevált tervezési mintákat használok, és egységteszteket, rendszerteszteket és felületi teszteket is írok. Ahol javítani kellett a tesztlefedettséget, ott ezt is vállaltam.',
    'Csapatban és önállóan is jól dolgozom, agilis szemlélettel. A Broadridge, a McDonald’s és a Helvo projekten nemzetközi csapatokkal dolgoztam, és a különböző országokból érkező kollégákkal való együttműködés számomra magától értetődő. Az ügyfelekkel és a más területen dolgozó kollégákkal rendszeresen és nyíltan egyeztetek. Az EPAM-nál és az RDI-nál junior kollégát is mentoráltam. Új technológiákat mellékprojektekben próbálok ki. Az AI-t tudatosan használom a munkámban: pontos promptokat írok, saját skilleket készítek, és CLAUDE.md fájlokban rögzítem a projekt szabályait az asszisztens számára.',
    'Szabadidőmben szívesen vezetek, filmeket nézek, és a barátaimmal játszom.',
    'A frontend is érdekel, bár a fő területem a backend.',
  ],
};

const jobs: Content['jobs'] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: '2025. október – jelenleg',
    description:
      'Három projekten vettem részt, kettő közülük Kotlinban készült. Backendet fejlesztek, részt veszek a tervezésben, és figyelek a minőségre. Az egyik projekt AI-konzultáció.',
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
        text: 'A MOL Limo autóbérlő rendszerének backendjét fejlesztem Kotlinban.',
        points: [
          'Üzleti logika és számítások a backendben, az adatok összesítése mellett',
          'Aszinkron szinkronizálás egy alrendszerrel',
          'PostgreSQL adatbázis kezelése, tranzakciókezelés',
          'Saját OAuth-folyamat és tokenkezelés megvalósítása Spring Security-vel',
          'Ütemezett feladatok a Spring @Scheduled annotációjával',
          'Dokumentáció-első (design-first) megközelítés',
          'Egység- és integrációs tesztek írása, valamint manuális tesztelés',
          'Kommunikáció az ügyféllel',
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
        text: 'A nemzetközi csapatommal egy svájci pénzügyi startup backend for frontend alkalmazását építettük Kotlinban, Spring Boot 4-gyel.',
        points: [
          'Dokumentáció-első (design-first) megközelítés: az API tervezése OpenAPI-ban',
          'A backend összekötése más alrendszerekkel és a frontenddel az OpenAPI-leírásból generált artifactokkal',
        ],
      },
      {
        name: 'GLI Solutions',
        role: 'AI Consultant és fejlesztő',
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
        text: 'AI-konzultánsként azt vizsgáljuk, hol hasznos a mesterséges intelligencia, megvalósítható-e, és hogyan illeszthető a meglévő rendszerekbe. Emellett a csapatommal fejlesztőként is dolgozunk a projekten.',
        points: [
          'Manuális tesztelést segítő platform fejlesztése C# és .NET backenddel, PostgreSQL adatbázissal, Node.js-sel és Angularral',
          'A platform MCP szerverként összekapcsolható AI-ügynökökkel (agentekkel)',
          'Tranzakciókezelés a PostgreSQL adatbázisban',
          'Code-first megközelítés',
          'Hibák kezelése',
          'A csapat és a kód terelése a clean code irányába',
          'Repó szintű AI skillek megvalósítása',
          'Dokumentáció készítése',
        ],
      },
    ],
    tech: ['Plane'],
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: '2024. augusztus – 2025. október',
    description:
      'A McDonald’s alkalmazásán dolgoztam, a felhasználói fiókokkal, az authentikációval és az autorizációval foglalkozó csapatban. A csapatommal microservice-eket fejlesztettünk és tartottunk karban, a hozzájuk tartozó egység- és integrációs tesztekkel együtt. SQL-lekérdezéseket írtam, és más rendszerek API-jait kötöttem be. Nem hivatalosan, de itt is mentoráltam egy junior munkatársat.',
    projects: [
      {
        name: 'McDonald’s',
        tech: [
          'Java',
          'Microservice',
          'REST API',
          'OpenAPI',
          'SQL',
          'NoSQL',
          'Python',
          'Authentikáció',
          'Autorizáció',
          'Unit tesztek',
          'GitHub',
          'ArgoCD',
          'Jira',
          'Confluence',
          'Copilot',
        ],
        text: 'Felhasználói fiókok, authentikáció és autorizáció; nemzetközi csapatban dolgoztam.',
        points: [
          'Meglévő microservice-ek karbantartása',
          'Új microservice-ek tervezése és fejlesztése',
          'API-végpontok tervezése, az OpenAPI-leírófájl rendbetétele újrahasznosítható objektumokkal',
          'Hibák felderítése és javítása metrikák, trace-ek és logok alapján',
          'A tesztlefedettség 90% fölé emelése',
          'A migrációk által elrontott adatok javítása NoSQL adatbázisban, Python szkripttel',
          'Adatbázis-tranzakciók kezelése',
          'Code review-k',
          'Google-bejelentkezés a Google SDK-val, a sima API-végpontok helyett',
        ],
      },
    ],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: '2022. január – 2024. augusztus',
    description:
      'Egy nemzetközi csapat tagjaként a Broadridge, egy amerikai cég pénzügyi alkalmazását fejlesztettük. Itt ismertem meg alaposan a többszálú programozást, a domain-driven tervezést és a funkcionális megközelítést. Egység-, rendszer- és elfogadási teszteket írtam, valamint Seleniummal felületi teszteket. Más rendszerek API-jait kötöttem be, időnként aszinkron módon. Párhuzamossági hibákat javítottam, adatbázis-tranzakciókat kezeltem, és javítottam a tesztlefedettséget. Junior fejlesztőt is mentoráltam.',
    projects: [
      {
        name: 'Broadridge pénzügyi alkalmazás',
        tech: [
          'Java',
          'Többszálúság',
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
        name: 'Multitenant keretrendszer',
        tech: ['Java', 'Multitenancy', 'Jenkins', 'GitLab', 'Jira', 'Confluence', 'Copilot'],
        text: 'A Broadridge-projekt többbérlős (multitenant) keretrendszere, amelyen külön projektként dolgoztam.',
      },
    ],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: '2021. július – 2022. január',
    description:
      'Junior fejlesztőként backendet fejlesztettem az EPAM belső vizsgarendszerén, később a Broadridge-projekten is.',
    projects: [
      {
        name: 'Belső vizsgarendszer',
        tech: [
          'Java',
          'Spring Boot 3',
          'MySQL',
          'JUnit',
          'Unit tesztek',
          'Jenkins',
          'GitLab',
          'Jira',
          'Confluence',
        ],
        text: 'Az EPAM belső vizsgarendszere: webalkalmazás, amelyben biztonságosan lehetett vizsgázni. A csapatommal a backendjét építettük Spring Boot 3-mal és MySQL adatbázissal.',
        points: [
          'Új funkciók tervezése és fejlesztése',
          'Tranzakciókezelés a MySQL adatbázisban',
          'Code review-k',
          'Egységtesztek írása JUnittal',
          'Manuális tesztelés',
          'Új technológiák elsajátítása, a szaktudásom fejlesztése',
        ],
      },
      {
        name: 'Broadridge pénzügyi alkalmazás',
        tech: ['Java', 'Jenkins', 'GitLab', 'Jira', 'Confluence'],
        text: 'Ugyanezen a projekten később Software Engineerként is dolgoztam.',
      },
    ],
  },
];

const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI és MCP',
    tag: 'Mesterséges intelligencia',
    text: 'Több mint {aiYears} éve használok AI-t a munkámban. Pontos promptokat írok, saját skilleket készítek, és CLAUDE.md fájlokban rögzítem a projekt szabályait, hogy az asszisztens minden munkamenetben ugyanazt tudja. Az Adroit Group GLI Solutions projektjén AI-konzultánsként azt vizsgáljuk, hol hasznos a mesterséges intelligencia, és hogyan illeszthető a meglévő rendszerekbe. 2026 márciusában négy Anthropic-tanúsítványt szereztem: Claude API, Model Context Protocol (MCP), agent skills és Claude Code.',
  },
  {
    title: 'Java 8–25',
    tag: 'Nyelv',
    text: 'A Java 8-tól a 25-ös verzióig ismerem a nyelvet. A legtöbb gyakorlatom, több mint {javaYears} év, Java 11 és Java 17 alatt van. Java 8-ból, 10-ből, 11-ből és 17-ből tanúsítványom is van.',
  },
  {
    title: 'Kotlin',
    tag: 'Nyelv',
    text: 'Az Adroit Groupnál két Kotlin projekten dolgoztam: a MOL Limo autóbérlőn és a Helvón. Az adatbázist az Exposed keretrendszerrel érem el.',
  },
  {
    title: 'Spring Boot',
    tag: 'Keretrendszer',
    text: 'Spring Boot alkalmazásokban tervezek és építek REST API-kat, és dolgoztam mikroszolgáltatás-architektúrában is.',
  },
  {
    title: 'Tesztelés',
    tag: 'Minőség',
    text: 'A tesztelés a fejlesztés része, nem utólagos lépés. Az egységteszteket JUnittal és Mockitóval írom, a FIRST elvek szerint (gyors, független, ismételhető, önellenőrző, időben megírt). A felületet Seleniummal és Cucumberrel tesztelem, a rendszer egészét integrációs és rendszertesztekkel fedem le. API-tesztelésből REST Assured tanfolyamot végeztem, egy korábbi projektben pedig a tesztlefedettséget is javítottam.',
  },
  {
    title: 'Eszközök',
    tag: 'Munkafolyamat',
    text: 'Buildhez Gradle-t és Mavent használok, verziókezelésre Gitet. CI/CD-ben dolgoztam Jenkinsszel, GitLabbal, GitHubbal és GitHub Actionsszel, a kiadásokhoz ArgoCD-t is használtam. Dockerből tanúsítványom van. Rendszeresen használom az SQL-t és a Lombokot. Agilis szemlélettel dolgozom, a csapatmunkához a Jirát, a Confluence-t, a Plane-t és az Azure DevOpsot használom.',
  },
  {
    title: 'Tervezés',
    tag: 'Elvek',
    text: 'A clean code szemléletet, a SOLID, a DRY és a KISS elveket, valamint a tervezési mintákat követem. Adatbázisnál az ACID tulajdonságokra és a gondos tranzakciókezelésre figyelek. Domain-driven tervezéssel és mikroszolgáltatás-architektúrában is dolgoztam.',
  },
  {
    title: 'Angular',
    tag: 'Frontend',
    text: 'Ezt az oldalt Angular 22-vel építettem, standalone komponensekkel, signalokkal és Vitest tesztekkel. Angularral készült a lizacover.hu és a GLI Solutions tesztelési platformja is, de a fő területem a backend.',
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
  title: 'Hogyan dolgozom AI-val',
  lead: 'Több mint {aiYears} éve használok AI-t a munkámban. Ezt a négy szokást követem.',
  points: [
    {
      title: 'Pontos promptok',
      text: 'A feladathoz megadom a kontextust: mi a cél, mire kell figyelni, és mikor tekintem késznek. Így az asszisztens már az első próbálkozásra közelebb kerül a megoldáshoz.',
    },
    {
      title: 'CLAUDE.md minden projektben',
      text: 'A projekt szabályait, parancsait és szerkezetét egy CLAUDE.md fájlban rögzítem, így az asszisztens minden munkamenetben ugyanabból indul ki. Ennek az oldalnak is van ilyen fájlja, a forráskódban megtekinthető.',
    },
    {
      title: 'Saját skillek és hookok',
      text: 'Az ismétlődő feladatokra skilleket írok, például tartalomszerkesztésre és dokumentálásra. A lizacover.hu projektben hat skill és egy push előtti ellenőrző hook működik.',
    },
    {
      title: 'Az eredményt ellenőrzöm',
      text: 'Az AI által írt kódot is tesztek és build ellenőrzik, a CI pedig minden változtatásnál lefuttatja őket. Ennél az oldalnál hozzáférhetőségi és teljesítménymérést is végeztem.',
    },
  ],
  file: {
    name: 'CLAUDE.md',
    language: 'markdown',
    code: [
      '# Gyulai Márk – portfólió',
      '',
      'Angular 22, standalone komponensek, signalok. Kétnyelvű: magyar és angol.',
      '',
      '## Parancsok',
      '- `npm start`: fejlesztői szerver',
      '- `npm test -- --watch=false`: egységtesztek',
      '- `npm run e2e`: E2E tesztek',
      '- `npm run build`: éles build',
      '',
      '## Konvenciók',
      '- Szöveg csak a `content.hu.ts` és a `content.en.ts` fájlokban van.',
      '- A tartalom csak valós adat lehet. Ha hiányzik adat, kérdezz.',
      '- Minden komponens külön `.ts`, `.html`, `.scss` és `.spec.ts` fájl.',
      '- SOLID, DRY, KISS; egy komponens egy felelősség.',
      '',
      '## Hol találod mit',
      '- Skillek: `.claude/skills/`',
      '- Ágens: `.claude/agents/`',
      '- Dokumentáció: `docs/`',
    ].join('\n'),
  },
  note: 'A részlet ennek az oldalnak a CLAUDE.md fájljából származik, rövidítve.',
};

const sideProjects: Content['sideProjects'] = [
  {
    name: 'lizacover.hu',
    url: 'https://lizacover.hu',
    description:
      'Ivanovszki Elizabet grafikus és illusztrátor portfóliója, amelyet én fejlesztettem; élesben is elérhető. Egyoldalas, kétnyelvű oldal: a magyar és az angol változatnak külön címe van, hogy a keresők mindkettőt indexelni tudják. Angular 21-gyel készült, a build előrenderelt statikus oldalakat állít elő, és Cloudflare-en fut. A betűtípusokat az oldal maga szolgálja ki, az analitika pedig csak hozzájárulás után töltődik be.',
    tech: [
      'Angular 21',
      'TypeScript',
      'Előrenderelés',
      'Kétnyelvűség',
      'SEO',
      'Cloudflare',
      'GitHub',
      'GitHub Actions',
      'Claude',
    ],
  },
  {
    name: 'Ez a portfólió',
    sourceUrl: 'https://github.com/gyulaimrk/website',
    description:
      'Ez a portfólió is mellékprojekt. Angular 22-vel készült, standalone komponensekkel és signalokkal. Magyarul és angolul érhető el, van sötét és világos témája, és a hozzáférhetőséget, valamint a keresőoptimalizálást is figyelembe vettem. Minden komponens külön HTML-, SCSS-, TypeScript- és tesztfájlból áll, a tartalom nyelvenként egy helyen szerkeszthető. A GitHub Actions lefuttatja a teszteket és a buildet, a telepítés Cloudflare-re van előkészítve. A fejlesztéshez AI-asszisztenst (Claude Code) is használtam.',
    tech: [
      'Angular 22',
      'TypeScript',
      'Vitest',
      'Kétnyelvűség',
      'Hozzáférhetőség',
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
    title: 'Matematika és informatika, BSc',
    where: 'Miskolci Egyetem',
    period: '2017 – 2021',
  },
  {
    kind: 'education',
    title: 'Java Mentored Education Program',
    where: 'EPAM Systems',
    period: '2020. szeptember – 2021. július',
    description:
      'Elvégeztem az EPAM Java Mentored Education Program képzését. A program a Java nyelv mellett a verziókezelő rendszerekkel, az agilis módszertanokkal, a teszteléssel, a clean code elveivel, a tervezési mintákkal és a Spring keretrendszerrel foglalkozott. Rövid betekintést kaptunk a frontend fejlesztésbe is.',
  },
  { kind: 'education', title: 'Angol nyelvvizsga, B2', where: '', period: '' },
  {
    kind: 'certificate',
    featured: true,
    title: 'Building with the Claude API',
    url: 'https://verify.skilljar.com/c/7jo35z6dpp7k',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to Model Context Protocol',
    url: 'https://verify.skilljar.com/c/tozc5cusdj7m',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to agent skills',
    url: 'https://verify.skilljar.com/c/b8b55d8oorax',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Claude Code in Action',
    url: 'https://verify.skilljar.com/c/akb2h6ejg29z',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    title: 'Microservices Foundations',
    where: 'LinkedIn Learning',
    period: '2021. június',
  },
  {
    kind: 'certificate',
    title: 'Docker for Developers',
    where: 'LinkedIn Learning',
    period: '2024. január',
  },
  {
    kind: 'certificate',
    title: 'Introduction to Docker for Java Developers',
    where: 'LinkedIn Learning',
    period: '2024. január',
  },
  {
    kind: 'certificate',
    title: 'Java 17: First Look',
    where: 'LinkedIn Learning',
    period: '2024. január',
  },
  {
    kind: 'certificate',
    title: 'Java: Automated API Testing with REST Assured',
    where: 'LinkedIn Learning',
    period: '2024. január',
  },
  {
    kind: 'certificate',
    title: 'Learning Java 17',
    where: 'LinkedIn Learning',
    period: '2023. október',
  },
  {
    kind: 'certificate',
    title: 'Java 8 for Professionals',
    where: 'LinkedIn Learning',
    period: '2023. október',
  },
  {
    kind: 'certificate',
    title: 'First Look: Java 10 and Java 11',
    where: 'LinkedIn Learning',
    period: '2020. október',
  },
];

const stats: Content['stats'] = [
  { value: '{javaYears}+', label: 'éve dolgozom Java 11 és 17 alatt' },
  { value: '{aiYears}+', label: 'éve használok AI-t a munkámban' },
  { value: '8–25', label: 'Java verziót ismerek' },
  { value: '7', label: 'projekten dolgoztam 3 munkahelyen: EPAM, RDI és Adroit' },
];

const ui: Content['ui'] = {
  meta: {
    title: 'Gyulai Márk – Senior Java fejlesztő',
    description:
      'Gyulai Márk senior Java és Kotlin fejlesztő, AI-konzultáns portfóliója: backend rendszerek, tesztelés és mesterséges intelligencia.',
  },
  skipLink: 'Ugrás a tartalomhoz',
  nav: {
    label: 'Fő navigáció',
    home: 'Ugrás az oldal tetejére',
    links: [
      { fragment: 'rolam', label: 'Rólam' },
      { fragment: 'eszkoztar', label: 'Eszköztár' },
      { fragment: 'ai', label: 'AI' },
      { fragment: 'tapasztalat', label: 'Tapasztalat' },
      { fragment: 'mellekprojektek', label: 'Mellékprojektek' },
      { fragment: 'tanulmanyok', label: 'Tanulmányok' },
    ],
    contact: 'Kapcsolat',
    openMenu: 'Menü megnyitása',
    closeMenu: 'Menü bezárása',
  },
  toggles: {
    toLight: 'Váltás világos módra',
    toDark: 'Váltás sötét módra',
    toOtherLanguage: 'Váltás angol nyelvre',
    otherLanguageCode: 'EN',
  },
  hero: {
    greeting: 'Szia, én',
    nameSuffix: 'vagyok',
    projects: 'Munkáim',
    cv: 'Önéletrajz (PDF)',
    linkedin: 'LinkedIn',
  },
  about: {
    title: 'Rólam',
    lead: 'Olyan rendszereket építek, amelyeket évek múlva is könnyű megérteni és továbbfejleszteni.',
    facts: {
      location: 'Helyszín',
      role: 'Szerep',
      languages: 'Nyelvek',
      license: 'Jogosítvány',
      email: 'E-mail',
    },
  },
  skills: {
    title: 'Eszköztár',
    lead: 'A leggyakrabban használt nyelveim, keretrendszereim és eszközeim.',
  },
  sideProjects: {
    title: 'Mellékprojektek',
    lead: 'A munkán kívül készült projektjeim.',
    visit: 'Az oldal megtekintése',
    source: 'Forráskód a GitHubon',
  },
  experience: {
    title: 'Tapasztalat',
    projects: 'Projektek',
    lead: 'Három cég, négy szerep, hét projekt. Junior fejlesztőként kezdtem, ma senior vagyok.',
  },
  education: {
    title: 'Tanulmányok és tanúsítványok',
    lead: 'Az egyetem után tanfolyamokkal és tanúsítványokkal bővítem a tudásomat.',
    studies: 'Tanulmányok',
    featured: 'Anthropic-tanúsítványok',
    certificates: 'További tanúsítványok',
    allCertificates: 'Összes tanúsítvány a LinkedInen',
  },
  contact: {
    title: 'Dolgozzunk együtt',
    text: 'Van egy projekted, backend feladatod vagy AI-val kapcsolatos ötleted? Írj nekem, és átbeszéljük.',
    availability: 'Projektmunkára és másodállásra nyitott vagyok.',
    cv: 'Önéletrajz letöltése',
    linkedin: 'Írj a LinkedInen',
  },
  footer: {
    built: 'Angularral készült.',
    label: 'Elérhetőségek',
    linkedin: 'LinkedIn',
    email: 'E-mail',
  },
  backToTop: 'Vissza a tetejére',
};

export const contentHu: Content = {
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
