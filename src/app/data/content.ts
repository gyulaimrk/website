// A weboldal teljes tartalma itt szerkeszthető (forrás: önéletrajz és LinkedIn-profil).
import { Job, Profile, Skill, Stat, Study } from './models';

export const profile: Profile = {
  name: 'Gyulai Márk',
  role: 'Senior Java fejlesztő',
  headline: 'Gyulai Márk, senior Java fejlesztő',
  email: 'gyulai.mrk2@live.com',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Nyíregyháza, Magyarország',
  tagline: 'Backend fejlesztő vagyok, és AI-konzultánsként is dolgozom.',
  languages: 'magyar, angol',
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

export const jobs: Job[] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: '2025. október – jelenleg',
    years: '2025 –',
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
    years: '2024 – 2025',
    description:
      'Egy nagy gyorsétterem-hálózat alkalmazásán dolgoztam. Új API-kat készítettem hozzá, és megírtam a hozzájuk tartozó egység- és integrációs teszteket. Átnéztem a kollégák kódját, SQL-lekérdezéseket írtam, más rendszerek API-jait kötöttem be, és karbantartottam a meglévő kódot.',
    tech: ['Java', 'REST API', 'SQL', 'Unit tesztek'],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: '2022. január – 2024. augusztus',
    years: '2022 – 2024',
    description:
      'Egy csapat tagjaként egy amerikai cég, a Broadridge pénzügyi alkalmazását fejlesztettük. Itt tanultam meg igazán a többszálú programozást, a domain-driven tervezést és a funkcionális megközelítést. Egység-, rendszer- és elfogadási teszteket írtam, Seleniummal felületi teszteket is. Megoldottam párhuzamossági hibákat, és javítottam a tesztlefedettséget.',
    tech: ['Java', 'Többszálúság', 'DDD', 'Selenium', 'SQL'],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: '2021. július – 2022. január',
    years: '2021 – 2022',
    description:
      'Junior fejlesztőként egy nyelvvizsgára készítő webalkalmazás backendjét építettem. Új funkciókat terveztem és valósítottam meg, egységteszteket írtam, részt vettem a kód átnézésében, és közben sokat tanultam.',
    tech: ['Java', 'Backend', 'Unit tesztek'],
  },
];
export const skills: Skill[] = [
  {
    highlight: true,
    title: 'AI és MCP',
    tag: 'Mesterséges intelligencia',
    text: 'Az AI a napi munkám természetes része. Jól megfogalmazott promptokkal dolgozom, saját skilleket használok, és CLAUDE.md fájlokat írok, hogy az AI-asszisztens ismerje a projekt szabályait, és következetesen segítsen. Az Adroit Group GLI Solutions projektjén AI-konzultánsként azt keressük, hol hasznos a mesterséges intelligencia, és hogyan illeszthető be a meglévő rendszerekbe. A Model Context Protocolból (MCP) tanúsítványt is szereztem.',
  },
  {
    title: 'Java 8–25',
    tag: 'Nyelv',
    text: 'A Java 8-tól a 25-ös verzióig magabiztosan írok kódot. A legtöbb gyakorlatom, több mint négy év, Java 11 és Java 17 alatt van. Java 8-ból és a 10-es, 11-es verzióból tanúsítványom is van.',
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
    text: 'Nálam a tesztelés nem utólagos teendő, hanem a munka természetes része. Az egységteszteket JUnittal és Mockitóval írom, a felületet Seleniummal és Cucumberrel járom végig, a rendszer egészét pedig integrációs és rendszertesztekkel fedem le. Egy korábbi projektben a tesztlefedettséget is sikerült javítanom.',
  },
  {
    title: 'Eszközök',
    tag: 'Munkafolyamat',
    text: 'A build-eket Gradle-lel és Mavennel kezelem, a kódot Gitben tartom. Az SQL-t és a Lombokot rendszeresen használom, a csapatmunkához pedig Jirát és Confluence-t.',
  },
  {
    title: 'Tervezés',
    tag: 'Elvek',
    text: 'A SOLID elveket, a clean code szemléletet és a tervezési mintákat követem. Közel áll hozzám a domain-driven tervezés és a mikroszolgáltatások világa.',
  },
];

export const studies: Study[] = [
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
  { kind: 'certificate', title: 'Microservices Foundations', where: 'Tanúsítvány', period: '' },
  {
    kind: 'certificate',
    title: 'Introduction to Model Context Protocol',
    where: 'Tanúsítvány',
    period: '',
  },
  { kind: 'certificate', title: 'Java 8 for Professionals', where: 'Tanúsítvány', period: '' },
  {
    kind: 'certificate',
    title: 'First Look: Java 10 and Java 11',
    where: 'Tanúsítvány',
    period: '',
  },
];

export const stats: Stat[] = [
  { value: '4+', label: 'éve dolgozom Java 11 és 17 alatt' },
  { value: '8–25', label: 'Java verziókon írok magabiztosan kódot' },
  { value: '3', label: 'cégnél dolgoztam: EPAM, RDI és Adroit' },
];
