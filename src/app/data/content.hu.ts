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
  languages: 'magyar, angol',
  stack: ['Java 8–25', 'Kotlin', 'Spring Boot'],
  roles: ['Java fejlesztő', 'Kotlin fejlesztő', 'AI-konzultáns'],
  intro:
    'Backend rendszereket építek Javában és Kotlinban. Olyan szoftvereken dolgozom szívesen, amelyeket évekig használnak, és amelyeket egy csapat magabiztosan tovább tud fejleszteni. Emellett AI-konzultánsként segítek abban, hogy a mesterséges intelligencia tényleg hasznos legyen egy cégnél.',
  letter: [
    'Senior Java fejlesztő vagyok. Több mint négy éve dolgozom Java 11 és Java 17 alatt, de a Java 8-tól a 25-ös verzióig mindenhol otthon érzem magam. Spring és Spring Boot alkalmazásokon dolgozom, és szeretem végigvinni a munkát: a tervezéstől a kódoláson és a teszteken át a karbantartásig.',
    'Fontos számomra, hogy a kód érthető és karbantartható legyen. Ezért követem a bevált tervezési elveket és mintákat, és sokat tesztelek: egységtesztekkel, rendszertesztekkel és felületi tesztekkel is. Ha egy projektben javítani kellett a tesztlefedettséget, azt mindig szívesen vállaltam.',
    'Jól érzem magam csapatban és önállóan is. Az ügyfelekkel és a más területen dolgozó kollégákkal nyíltan egyeztetek, mert szerintem a jó szoftver jó beszélgetésekkel kezdődik. Új technológiákat mellékprojektekben szoktam kipróbálni, így a tudásom folyamatosan frissül. Az AI-t is tudatosan használom a munkámban: jól promptolok, skilleket építek, és CLAUDE.md fájlokban rögzítem, hogyan dolgozzon az asszisztens a projekten.',
    'Ez az oldal Angularral készült, mert a fejlesztés másik oldala is érdekel.',
  ],
};

const jobs: Content['jobs'] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: '2025. október – jelenleg',
    description:
      'Senior szoftvermérnökként dolgozom, és több Kotlin projekten vagyok benne. Backendet fejlesztek, részt veszek a tervezésben, és figyelek a minőségre. Az egyik projektem emellett AI-konzultációról szól.',
    projects: [
      {
        name: 'GLI Solutions',
        role: 'AI Consultant',
        text: 'AI-konzultánsként abban segítek, hogy a mesterséges intelligencia valódi problémákra adjon választ. Megkeressük, hol hasznos, megnézzük, megvalósítható-e, és beillesztjük a már meglévő rendszerekbe.',
      },
      {
        name: 'MOL Limo rent a car',
        url: 'https://rentacar.mollimo.hu/rent/start',
        text: 'A MOL Limo autóbérlő rendszerének backendjét fejlesztem Kotlinban.',
      },
    ],
    tech: ['Kotlin', 'Java', 'Exposed', 'AI', 'MCP', 'Prompting'],
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: '2024. augusztus – 2025. október',
    description:
      'Egy nagy gyorsétterem-hálózat alkalmazásán dolgoztam. Új API-kat készítettem hozzá, és megírtam a hozzájuk tartozó egység- és integrációs teszteket. Átnéztem a kollégák kódját, SQL-lekérdezéseket írtam, más rendszerek API-jait kötöttem be, és karbantartottam a meglévő kódot.',
    tech: ['Java', 'REST API', 'SQL', 'Unit tesztek'],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: '2022. január – 2024. augusztus',
    description:
      'Egy csapat tagjaként egy amerikai cég, a Broadridge pénzügyi alkalmazását fejlesztettük. Itt tanultam meg igazán a többszálú programozást, a domain-driven tervezést és a funkcionális megközelítést. Egység-, rendszer- és elfogadási teszteket írtam, Seleniummal felületi teszteket is. Megoldottam párhuzamossági hibákat, és javítottam a tesztlefedettséget.',
    tech: ['Java', 'Többszálúság', 'DDD', 'Selenium', 'SQL'],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: '2021. július – 2022. január',
    description:
      'Junior fejlesztőként egy nyelvvizsgára készítő webalkalmazás backendjét építettem. Új funkciókat terveztem és valósítottam meg, egységteszteket írtam, részt vettem a kód átnézésében, és közben sokat tanultam.',
    tech: ['Java', 'Backend', 'Unit tesztek'],
  },
];
const skills: Content['skills'] = [
  {
    highlight: true,
    title: 'AI és MCP',
    tag: 'Mesterséges intelligencia',
    text: 'Az AI a napi munkám természetes része. Jól megfogalmazott promptokkal dolgozom, saját skilleket használok, és CLAUDE.md fájlokat írok, hogy az AI-asszisztens ismerje a projekt szabályait, és következetesen segítsen. Az Adroit Group GLI Solutions projektjén AI-konzultánsként azt keressük, hol hasznos a mesterséges intelligencia, és hogyan illeszthető be a meglévő rendszerekbe. 2026 márciusában négy Anthropic-tanúsítványt szereztem: Claude API, Model Context Protocol (MCP), agent skills és Claude Code.',
  },
  {
    title: 'Java 8–25',
    tag: 'Nyelv',
    text: 'A Java 8-tól a 25-ös verzióig magabiztosan írok kódot. A legtöbb gyakorlatom, több mint négy év, Java 11 és Java 17 alatt van. Java 8-ból, a 10-es és 11-es, valamint a 17-es verzióból tanúsítványom is van.',
  },
  {
    title: 'Kotlin',
    tag: 'Nyelv',
    text: 'Az Adroit Group-nál több Kotlin projekten dolgozom, köztük a MOL Limo autóbérlőn. Az adatbázist az Exposed keretrendszerrel érem el.',
  },
  {
    title: 'Spring Boot',
    tag: 'Keretrendszer',
    text: 'Spring Boot alkalmazásokban tervezek és építek REST API-kat, és dolgoztam mikroszolgáltatás-architektúrában is.',
  },
  {
    title: 'Tesztelés',
    tag: 'Minőség',
    text: 'Nálam a tesztelés nem utólagos teendő, hanem a munka természetes része. Az egységteszteket JUnittal és Mockitóval írom, a felületet Seleniummal és Cucumberrel járom végig, a rendszer egészét pedig integrációs és rendszertesztekkel fedem le. API-tesztelésből REST Assured tanfolyamot is végeztem. Egy korábbi projektben a tesztlefedettséget is sikerült javítanom.',
  },
  {
    title: 'Eszközök',
    tag: 'Munkafolyamat',
    text: 'A build-eket Gradle-lel és Mavennel kezelem, a kódot Gitben tartom. Dockerből tanúsítványom van. Az SQL-t és a Lombokot rendszeresen használom, a csapatmunkához pedig Jirát és Confluence-t.',
  },
  {
    title: 'Tervezés',
    tag: 'Elvek',
    text: 'A SOLID elveket, a clean code szemléletet és a tervezési mintákat követem. Közel áll hozzám a domain-driven tervezés és a mikroszolgáltatások világa.',
  },
  {
    title: 'Angular',
    tag: 'Frontend',
    text: 'Ezt az oldalt is Angular 22-vel építettem: standalone komponensekkel, signalokkal és Vitest tesztekkel. Frontendben mellékprojektekben dolgozom vele, például a lizacover.hu-n, a munkám fő területe viszont a backend.',
  },
];

const sideProjects: Content['sideProjects'] = [
  {
    name: 'lizacover.hu',
    url: 'https://lizacover.hu',
    description:
      'Ivanovszki Elizabet grafikus és illusztrátor portfólió-oldala, amelyet én fejlesztettem. Egyoldalas, kétnyelvű oldal: a magyar és az angol változatnak saját címe van, hogy a keresők mindkettőt lássák. Angular 21-gyel készült, a build előre legenerált statikus oldalakat ad, és Cloudflare-en fut. A betűk saját kiszolgálásból jönnek, az analitika pedig csak hozzájárulás után tölt be.',
    tech: ['Angular 21', 'TypeScript', 'Előrenderelés', 'Kétnyelvűség', 'SEO', 'Cloudflare'],
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
    period: '2020 – 2021',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Building with the Claude API',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to Model Context Protocol',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Introduction to agent skills',
    where: 'Anthropic',
    period: '2026. március',
  },
  {
    kind: 'certificate',
    featured: true,
    title: 'Claude Code in Action',
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
  { value: '4+', label: 'éve dolgozom Java 11 és 17 alatt' },
  { value: '8–25', label: 'Java verziókon írok magabiztosan kódot' },
  { value: '3', label: 'cégnél dolgoztam: EPAM, RDI és Adroit' },
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
      { href: '#rolam', label: 'Rólam' },
      { href: '#eszkoztar', label: 'Eszköztár' },
      { href: '#tapasztalat', label: 'Tapasztalat' },
      { href: '#mellekprojektek', label: 'Mellékprojektek' },
      { href: '#tanulmanyok', label: 'Tanulmányok' },
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
  hero: { greeting: 'Szia, én', nameSuffix: 'vagyok', projects: 'Munkáim', linkedin: 'LinkedIn' },
  about: {
    title: 'Rólam',
    lead: 'Egy fejlesztő, aki szívesen épít olyan rendszert, amelyet évek múlva is könnyű megérteni.',
    facts: { location: 'Helyszín', role: 'Szerep', languages: 'Nyelvek', email: 'E-mail' },
  },
  skills: {
    title: 'Eszköztár',
    lead: 'Ezekkel dolgozom a leggyakrabban, a programozási nyelvektől a tesztelésig.',
  },
  sideProjects: {
    title: 'Mellékprojektek',
    lead: 'Munkán kívül is szívesen építek, itt egy projekt, amelyet másoknak készítettem.',
    visit: 'Megnézem az oldalt',
  },
  experience: {
    title: 'Tapasztalat',
    lead: 'Három cég, négy szerep: junior fejlesztőként kezdtem, ma senior vagyok.',
  },
  education: {
    title: 'Tanulmányok és tanúsítványok',
    lead: 'Egyetemen kezdtem, azóta tanfolyamokkal és tanúsítványokkal tartom frissen a tudásomat.',
    studies: 'Tanulmányok',
    anthropic: 'Anthropic-tanúsítványok',
    certificates: 'További tanúsítványok',
  },
  contact: {
    title: 'Dolgozzunk együtt',
    text: 'Van egy projekted, AI-ötleted vagy backend feladatod? Írj nekem, szívesen átbeszélem veled.',
    linkedin: 'Írj a LinkedInen',
  },
  footer: { built: 'Angularral készült.', label: 'Elérhetőségek' },
  backToTop: 'Vissza a tetejére',
};

export const contentHu: Content = { profile, jobs, skills, sideProjects, studies, stats, ui };
