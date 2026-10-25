// A weboldal magyar tartalma (forrás: önéletrajz és LinkedIn-profil). Az angol párja: content.en.ts.
import { Content } from './models';

const profile: Content['profile'] = {
  name: 'Gyulai Márk',
  role: 'Senior Java fejlesztő',
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
    'Backend rendszereket építek Javában és Kotlinban. Olyan szoftvereken dolgozom szívesen, amelyeket évekig használnak, és amelyeket egy csapat magabiztosan tovább tud fejleszteni. Emellett AI-konzultánsként segítek abban, hogy a mesterséges intelligencia tényleg hasznos legyen egy cégnél.',
  letter: [
    'Senior Java fejlesztő vagyok. Több mint öt éve dolgozom Java 11 és Java 17 alatt, de a Java 8-tól a 25-ös verzióig mindenhol otthon érzem magam. Spring és Spring Boot alkalmazásokon dolgozom, és szeretem végigvinni a munkát: a tervezéstől a kódoláson és a teszteken át a karbantartásig.',
    'Fontos számomra, hogy a kód érthető és karbantartható legyen. Ezért követem a clean code, a SOLID, a DRY és a KISS elveit, valamint a bevált tervezési mintákat, és sokat tesztelek: egységtesztekkel, rendszertesztekkel és felületi tesztekkel is. Ha egy projektben javítani kellett a tesztlefedettséget, azt mindig szívesen vállaltam.',
    'Jól érzem magam csapatban és önállóan is. A Broadridge, a McDonald’s és a Helvo projekten nemzetközi csapatokkal dolgoztam, és számomra természetes, hogy különböző országokból érkező emberekkel működöm együtt. Az ügyfelekkel és a más területen dolgozó kollégákkal nyíltan egyeztetek, mert szerintem a jó szoftver jó beszélgetésekkel kezdődik. Új technológiákat mellékprojektekben szoktam kipróbálni, így a tudásom folyamatosan frissül. Az AI-t is tudatosan használom a munkámban: jól promptolok, skilleket építek, és CLAUDE.md fájlokban rögzítem, hogyan dolgozzon az asszisztens a projekten.',
    'Szabadidőmben szívesen nézek filmeket, játszom a barátaimmal, vezetek, és új technológiákat próbálok ki mellékprojektekben.',
    'Ez az oldal Angularral készült, mert a fejlesztés másik oldala is érdekel.',
  ],
};

const jobs: Content['jobs'] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: '2025. október – jelenleg',
    description:
      'Senior szoftvermérnökként három projekten vettem részt, közülük kettő Kotlinban készült. Backendet fejlesztek, részt veszek a tervezésben, és figyelek a minőségre. Az egyik projektem AI-konzultációról szól.',
    projects: [
      {
        name: 'MOL Limo rent a car',
        url: 'https://rentacar.mollimo.hu/rent/start',
        text: 'A MOL Limo autóbérlő rendszerének backendjét fejlesztem Kotlinban. A backend nem csak összesíti az adatokat, hanem számol is, és aszinkron módon szinkronizál egy alrendszerrel.',
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
        text: 'A nemzetközi csapatommal egy svájci pénzügyi startup backend for frontend alkalmazását építettük Kotlinban, Spring Boot 4-gyel.',
        points: [
          'Dokumentáció-első (design-first) megközelítés: az API tervezése OpenAPI-ban',
          'A backend összekötése más alrendszerekkel és a frontenddel az OpenAPI-leírásból generált artifactokkal',
        ],
      },
      {
        name: 'GLI Solutions',
        role: 'AI Consultant és fejlesztő',
        text: 'AI-konzultánsként abban segítek, hogy a mesterséges intelligencia valódi problémákra adjon választ. Megkeressük, hol hasznos, megnézzük, megvalósítható-e, és beillesztjük a már meglévő rendszerekbe. Emellett a csapatommal fejlesztőként is dolgozunk a projekten.',
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
    period: '2024. augusztus – 2025. október',
    description:
      'A McDonald’s alkalmazásán dolgoztam, azon belül a felhasználói fiókokkal, az authentikációval és az autorizációval foglalkozó csapatban. A csapatommal microservice-eket fejlesztettünk és tartottunk karban, és a hozzájuk tartozó egység- és integrációs teszteket is megírtuk. Emellett SQL-lekérdezéseket írtam, és más rendszerek API-jait kötöttem be.',
    projects: [
      {
        name: 'McDonald’s',
        text: 'Felhasználói fiókok, authentikáció és autorizáció: ezzel foglalkozó nemzetközi csapat tagja voltam.',
        points: [
          'Meglévő microservice-ek karbantartása',
          'Új microservice-ek tervezése és fejlesztése',
          'API-végpontok tervezése, az OpenAPI-leírófájl rendbetétele újrahasznosítható objektumokkal',
          'Hibák felderítése és javítása metrikák, trace-ek és logok alapján',
          'A tesztlefedettség 90% fölé emelése',
          'A migrációk által elrontott adatok javítása NoSQL adatbázisban, Python szkripttel',
          'Adatbázis-tranzakciók kezelése',
          'Code review-k',
          'Google-bejelentkezés megvalósítása a Google SDK-val, a sima API-végpontok helyett',
        ],
      },
    ],
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
    ],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: '2022. január – 2024. augusztus',
    description:
      'Egy nemzetközi csapat tagjaként a Broadridge, egy amerikai cég pénzügyi alkalmazását fejlesztettük. Itt tanultam meg igazán a többszálú programozást, a domain-driven tervezést és a funkcionális megközelítést. Egység-, rendszer- és elfogadási teszteket írtam, Seleniummal felületi teszteket is. Más rendszerek API-jait is bekötöttem, időnként aszinkron módon. Megoldottam párhuzamossági hibákat, kezeltem az adatbázis-tranzakciókat, és javítottam a tesztlefedettséget.',
    projects: [
      { name: 'Broadridge pénzügyi alkalmazás' },
      {
        name: 'Multitenant keretrendszer',
        text: 'A Broadridge-projekt többbérlős (multitenant) keretrendszere, amelyen külön projektként dolgoztam.',
      },
    ],
    tech: ['Java', 'Többszálúság', 'DDD', 'Multitenancy', 'Selenium', 'SQL'],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: '2021. július – 2022. január',
    description:
      'Junior fejlesztőként backendet fejlesztettem, és közben sokat tanultam. Az EPAM belső vizsgarendszerén dolgoztam, később ugyanezen a Broadridge-projekten is.',
    projects: [
      {
        name: 'Belső vizsgarendszer',
        text: 'Az EPAM belső vizsgarendszere: webalkalmazás, amelyben biztonságosan lehetett vizsgázni. A csapatommal a backendjét építettük Spring Boot 3-mal és MySQL adatbázissal.',
        points: [
          'Új funkciók tervezése és fejlesztése',
          'Tranzakciókezelés a MySQL adatbázisban',
          'Code review-k',
          'Egységtesztek írása JUnittal',
          'Manuális tesztelés',
          'A tudásom fejlesztése, új technológiák megtanulása',
        ],
      },
      {
        name: 'Broadridge pénzügyi alkalmazás',
        text: 'Ugyanezen a projekten dolgoztam később Software Engineerként is.',
      },
    ],
    tech: ['Java', 'Spring Boot 3', 'MySQL', 'JUnit', 'Unit tesztek'],
  },
];

const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI és MCP',
    tag: 'Mesterséges intelligencia',
    text: 'Több mint három éve használok AI-t a munkámban, ma már a napi munkám természetes része. Jól megfogalmazott promptokkal dolgozom, saját skilleket használok, és CLAUDE.md fájlokat írok, hogy az AI-asszisztens ismerje a projekt szabályait, és következetesen segítsen. Az Adroit Group GLI Solutions projektjén AI-konzultánsként azt keressük, hol hasznos a mesterséges intelligencia, és hogyan illeszthető be a meglévő rendszerekbe. 2026 márciusában négy Anthropic-tanúsítványt szereztem: Claude API, Model Context Protocol (MCP), agent skills és Claude Code.',
  },
  {
    title: 'Java 8–25',
    tag: 'Nyelv',
    text: 'A Java 8-tól a 25-ös verzióig magabiztosan írok kódot. A legtöbb gyakorlatom, több mint öt év, Java 11 és Java 17 alatt van. Java 8-ból, a 10-es és 11-es, valamint a 17-es verzióból tanúsítványom is van.',
  },
  {
    title: 'Kotlin',
    tag: 'Nyelv',
    text: 'Az Adroit Group-nál több Kotlin projekten dolgoztam, köztük a MOL Limo autóbérlőn és a Helvón. Az adatbázist az Exposed keretrendszerrel érem el.',
  },
  {
    title: 'Spring Boot',
    tag: 'Keretrendszer',
    text: 'Spring Boot alkalmazásokban tervezek és építek REST API-kat, és dolgoztam mikroszolgáltatás-architektúrában is.',
  },
  {
    title: 'Tesztelés',
    tag: 'Minőség',
    text: 'Nálam a tesztelés nem utólagos teendő, hanem a munka természetes része. Az egységteszteket JUnittal és Mockitóval írom, a FIRST elvek (gyors, független, ismételhető, önellenőrző, időben megírt) szerint, a felületet Seleniummal és Cucumberrel járom végig, a rendszer egészét pedig integrációs és rendszertesztekkel fedem le. API-tesztelésből REST Assured tanfolyamot is végeztem. Egy korábbi projektben a tesztlefedettséget is sikerült javítanom.',
  },
  {
    title: 'Eszközök',
    tag: 'Munkafolyamat',
    text: 'A build-eket Gradle-lel és Mavennel kezelem, a kódot Gitben tartom. Dockerből tanúsítványom van. Az SQL-t és a Lombokot rendszeresen használom, a csapatmunkához pedig Jirát és Confluence-t.',
  },
  {
    title: 'Tervezés',
    tag: 'Elvek',
    text: 'A clean code szemléletet, a SOLID, a DRY és a KISS elveket és a tervezési mintákat követem. Adatbázisnál fontosnak tartom az ACID tulajdonságokat és a gondos tranzakciókezelést. Közel áll hozzám a domain-driven tervezés és a mikroszolgáltatások világa.',
  },
  {
    title: 'Angular',
    tag: 'Frontend',
    text: 'Ezt az oldalt is Angular 22-vel építettem: standalone komponensekkel, signalokkal és Vitest tesztekkel. Frontendben mellékprojektekben dolgozom vele, például a lizacover.hu-n, a munkám fő területe viszont a backend.',
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
  title: 'Hogyan dolgozom AI-val',
  lead: 'Több mint három éve használok AI-t a munkámban. Így néz ez ki a gyakorlatban.',
  points: [
    {
      title: 'Pontos promptok',
      text: 'A feladatot a kontextusával együtt írom le: mi a cél, mire kell figyelni, és mikor kész. Így az asszisztens elsőre közelebb kerül a jó megoldáshoz.',
    },
    {
      title: 'CLAUDE.md minden projektben',
      text: 'A projekt szabályait, parancsait és szerkezetét egy CLAUDE.md fájlban rögzítem, így az asszisztens minden munkamenetben ugyanazt tudja. Ezt az oldalt is így építettem, a fájl a forráskódban látható.',
    },
    {
      title: 'Saját skillek és hookok',
      text: 'Az ismétlődő feladatokra skilleket írok, például a tartalom szerkesztésére. A lizacover.hu projektben hat skill és egy push előtti ellenőrző hook is segít.',
    },
    {
      title: 'Az eredményt ellenőrzöm',
      text: 'Az AI kódját tesztek és build védik, a CI pedig minden változtatásnál lefuttatja őket. Ennél az oldalnál hozzáférhetőségi és teljesítménymérés is volt.',
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
      '## Szabályok',
      '- Szöveg csak a `content.hu.ts` és a `content.en.ts` fájlokban lehet.',
      '- A tartalom csak valós adat lehet. Ha hiányzik adat, kérdezz.',
      '- Minden komponens külön `.ts`, `.html`, `.scss` és `.spec.ts` fájl.',
      '- Módosítás után az `npm test` és az `npm run build` hibátlan legyen.',
    ].join('\n'),
  },
  note: 'A fájl ennek az oldalnak a valódi CLAUDE.md-jéből készült, rövidítve.',
};

const sideProjects: Content['sideProjects'] = [
  {
    name: 'lizacover.hu',
    url: 'https://lizacover.hu',
    description:
      'Élesben is elérhető oldal: Ivanovszki Elizabet grafikus és illusztrátor portfóliója, amelyet én fejlesztettem. Egyoldalas, kétnyelvű oldal: a magyar és az angol változatnak saját címe van, hogy a keresők mindkettőt lássák. Angular 21-gyel készült, a build előre legenerált statikus oldalakat ad, és Cloudflare-en fut. A betűk saját kiszolgálásból jönnek, az analitika pedig csak hozzájárulás után tölt be.',
    tech: ['Angular 21', 'TypeScript', 'Előrenderelés', 'Kétnyelvűség', 'SEO', 'Cloudflare'],
  },
  {
    name: 'Ez a portfólió',
    sourceUrl: 'https://github.com/gyulaimrk/website',
    description:
      'Ez az oldal is mellékprojekt. Angular 22-vel építettem, standalone komponensekkel és signalokkal. Magyarul és angolul is elérhető, van sötét és világos témája, és a hozzáférhetőségre és a keresőoptimalizálásra is figyeltem. Minden komponens külön HTML-, SCSS-, TypeScript- és tesztfájlból áll, a tartalom pedig egy helyen, nyelvenként szerkeszthető. A GitHub Actions futtatja a teszteket és a buildet, és Cloudflare-re van előkészítve. A fejlesztésben AI-asszisztenst (Claude Code) is használtam.',
    tech: [
      'Angular 22',
      'TypeScript',
      'Vitest',
      'Kétnyelvűség',
      'Hozzáférhetőség',
      'SEO',
      'GitHub Actions',
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
      'Sikeresen elvégeztem az EPAM Java Mentored Education Program képzését. A programban megtanultuk a Java nyelvet, és átfogóan foglalkoztunk a verziókezelő rendszerekkel, az agilis fejlesztési módszertanokkal, a tesztelléssel, a clean code elveivel, a tervezési mintákkal és a Spring keretrendszerrel. A frontend fejlesztésből is kaptunk egy kis ízelítőt.',
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
  { value: '5+', label: 'éve dolgozom Java 11 és 17 alatt' },
  { value: '3+', label: 'éve használok AI-t a munkámban' },
  { value: '8–25', label: 'Java verziókon írok magabiztosan kódot' },
  { value: '7', label: 'projekten dolgoztam 3 munkahelyen: EPAM, RDI és Adroit' },
];

const ui: Content['ui'] = {
  meta: {
    title: 'Gyulai Márk – Senior Java fejlesztő',
    description:
      'Gyulai Márk senior Java és Kotlin fejlesztő, AI-konzultáns portfóliója: backend rendszerek, tesztelés és mesterséges intelligencia a gyakorlatban.',
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
    lead: 'Egy fejlesztő, aki szívesen épít olyan rendszert, amelyet évek múlva is könnyű megérteni.',
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
    lead: 'Ezekkel dolgozom a leggyakrabban, a programozási nyelvektől a tesztelésig.',
  },
  sideProjects: {
    title: 'Mellékprojektek',
    lead: 'Munkán kívül is szívesen építek: ezek a mellékprojektjeim.',
    visit: 'Megnézem az oldalt',
    source: 'Forráskód a GitHubon',
  },
  experience: {
    title: 'Tapasztalat',
    projects: 'Projektek',
    lead: 'Három cég, négy szerep, hét projekt: junior fejlesztőként kezdtem, ma senior vagyok.',
  },
  education: {
    title: 'Tanulmányok és tanúsítványok',
    lead: 'Egyetemen kezdtem, azóta tanfolyamokkal és tanúsítványokkal tartom frissen a tudásomat.',
    studies: 'Tanulmányok',
    anthropic: 'Anthropic-tanúsítványok',
    certificates: 'További tanúsítványok',
    allCertificates: 'Összes tanúsítvány a LinkedInen',
  },
  contact: {
    title: 'Dolgozzunk együtt',
    text: 'Van egy projekted, AI-ötleted vagy backend feladatod? Írj nekem, szívesen átbeszélem veled.',
    cv: 'Önéletrajz letöltése',
    linkedin: 'Írj a LinkedInen',
  },
  footer: { built: 'Angularral készült.', label: 'Elérhetőségek' },
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
