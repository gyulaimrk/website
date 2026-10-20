// A weboldal teljes tartalma itt szerkeszthető (forrás: önéletrajz és LinkedIn-profil).
import { Job, Profile, Skill, Study } from './models';

export const profile: Profile = {
  name: 'Gyulai Márk',
  role: 'Senior Java fejlesztő',
  headline: 'Gyulai Márk, senior Java fejlesztő',
  email: 'gyulai.mrk2@live.com',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Nyíregyháza, Magyarország',
  tagline: 'Backend rendszerek Javában és Kotlinban, mellette AI-konzultáció.',
  languages: 'magyar, angol',
  intro:
    'Java (8-tól 25-ig) és Kotlin alapú backend rendszereket tervezek, tesztelek és tartok karban, mellette AI-konzultánsként segítek a mesterséges intelligencia gyakorlati bevezetésében.',
  letter: [
    'Senior Java fejlesztőként több mint négy éve dolgozom Java 11 és Java 17 alatt, de a Java 8-tól a 25-ös verzióig magabiztosan írok kódot. Spring és Spring Boot alkalmazásokon dolgozom. Összetett rendszerek tervezésében, kódolásában, tesztelésében és karbantartásában vagyok otthon.',
    'A bevált fejlesztési gyakorlatokat, az objektumorientált elveket és a tervezési mintákat követem, hogy a kód tiszta, karbantartható és hatékony legyen. Fontos számomra a tesztlefedettség: unit-, rendszer- és UI-tesztek.',
    'Szívesen dolgozom csapatban és önállóan is, az ügyfelekkel és más funkciók képviselőivel pedig nyíltan kommunikálok. A tanulás nálam folyamatos: mellékprojektekben próbálom ki az új technológiákat.',
    'Ez az oldal Angularral készült, mert érdekel a másik oldal is.',
  ],
};

export const jobs: Job[] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: '2025. október – jelenleg',
    years: '2025 –',
    description:
      'Senior szoftvermérnökként több Kotlin projekten dolgozom: backend fejlesztés, tervezés és minőségbiztosítás, valamint AI-konzultáció.',
    projects: [
      {
        name: 'GLI Solutions',
        role: 'AI Consultant',
        text: 'AI-konzultánsként segítek, hogy a mesterséges intelligencia valódi problémákra adjon megoldást: használati esetek feltárása, megvalósíthatóság és beillesztés a meglévő rendszerekbe.',
      },
      {
        name: 'MOL Limo rent a car',
        url: 'https://rentacar.mollimo.hu/rent/start',
        text: 'A MOL Limo autóbérlő (rent a car) rendszerének Kotlin backend fejlesztése.',
      },
    ],
    tech: ['Kotlin', 'Java', 'Exposed', 'AI', 'MCP'],
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: '2024. augusztus – 2025. október',
    years: '2024 – 2025',
    description:
      'Egy nagy gyorsétterem-hálózat alkalmazásának fejlesztése és karbantartása: új API-k megvalósítása, hozzájuk unit- és integrációs tesztek, code review, SQL-lekérdezések és külső API-k hívása.',
    tech: ['Java', 'REST API', 'SQL', 'Unit tesztek'],
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: '2022. január – 2024. augusztus',
    years: '2022 – 2024',
    description:
      'Egy amerikai cég (Broadridge) pénzügyi alkalmazásának fejlesztése. Többszálú végrehajtás, domain-driven szemlélet és funkcionális programozás; unit-, rendszer- és elfogadási tesztek, Selenium UI tesztek. Megoldottam párhuzamossági problémákat és javítottam a tesztlefedettséget.',
    tech: ['Java', 'Többszálúság', 'DDD', 'Selenium', 'SQL'],
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: '2021. július – 2022. január',
    years: '2021 – 2022',
    description:
      'Egy nyelvvizsgázást támogató webalkalmazás backendjét fejlesztettem. Új funkciók tervezése és megvalósítása, unit tesztek, code review és közben a tudásom folyamatos bővítése.',
    tech: ['Java', 'Backend', 'Unit tesztek'],
  },
];
export const filterTech = ['AI', 'Kotlin', 'Java', 'SQL', 'Selenium', 'Többszálúság'];

export const skills: Skill[] = [
  {
    highlight: true,
    title: 'AI és MCP',
    tag: 'Mesterséges intelligencia',
    text: 'AI-konzultánsként dolgozom az Adroit Group GLI Solutions projektjén: használati esetek keresése, megvalósíthatóság és beillesztés a meglévő rendszerekbe. Model Context Protocol (MCP) tanúsítvánnyal.',
  },
  {
    title: 'Java 8–25',
    tag: 'Nyelv',
    text: 'A Java 8-tól a 25-ös verzióig magabiztosan írok kódot; több mint négy év gyakorlat Java 11 és Java 17 alatt. Tanúsítvány Java 8-ból és Java 10/11-ből.',
  },
  {
    title: 'Kotlin',
    tag: 'Nyelv',
    text: 'Több Kotlin projekt az Adroit Group-nál, köztük a MOL Limo autóbérlő; adatelérés az Exposed SQL keretrendszerrel.',
  },
  {
    title: 'Spring Boot',
    tag: 'Keretrendszer',
    text: 'REST API-k tervezése és megvalósítása Spring Boot alkalmazásokban, mikroszolgáltatás-architektúrában.',
  },
  {
    title: 'Tesztelés',
    tag: 'Minőség',
    text: 'JUnit, Mockito, Selenium és Cucumber: unit-, integrációs-, rendszer- és UI-tesztek, magas lefedettséggel.',
  },
  {
    title: 'Eszközök',
    tag: 'Munkafolyamat',
    text: 'Gradle, Maven, Git, Lombok, SQL, valamint Jira és Confluence a csapatmunkához.',
  },
  {
    title: 'Tervezés',
    tag: 'Elvek',
    text: 'SOLID, clean code, tervezési minták, domain-driven szemlélet és mikroszolgáltatások.',
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
