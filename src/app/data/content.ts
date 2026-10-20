// A weboldal teljes tartalma itt szerkeszthető (forrás: önéletrajz és LinkedIn-profil).
export const profile = {
  name: 'Gyulai Márk',
  role: 'Senior Java fejlesztő',
  email: 'gyulai.mrk2@live.com',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Debrecen, Magyarország',
  intro:
    'Java 11 és 17 alapú alkalmazásokat tervezek, tesztelek és tartok karban: tiszta kóddal, alapos tesztelés mellett.',
  letter: [
    'Senior Java fejlesztőként több mint négy éve dolgozom Java 11 és Java 17 alatt, Spring és Spring Boot alkalmazásokon. Összetett rendszerek tervezésében, kódolásában, tesztelésében és karbantartásában vagyok otthon.',
    'A bevált fejlesztési gyakorlatokat, az objektumorientált elveket és a tervezési mintákat követem, hogy a kód tiszta, karbantartható és hatékony legyen. Fontos számomra a tesztlefedettség: unit-, rendszer- és UI-tesztek.',
    'Szívesen dolgozom csapatban és önállóan is, az ügyfelekkel és más funkciók képviselőivel pedig nyíltan kommunikálok. A tanulás nálam folyamatos: mellékprojektekben próbálom ki az új technológiákat.',
    'Ez az oldal Angularral készült, mert érdekel a másik oldal is.',
  ],
};

export type ArtKind = 'cup' | 'bridge' | 'split' | 'flow' | 'gate' | 'saw';

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  art: ArtKind;
}
export const jobs: Job[] = [
  {
    company: 'Adroit Group',
    role: 'Senior Software Engineer',
    period: '2025. október – jelenleg',
    description:
      'Senior szoftvermérnökként dolgozom Debrecenben: Java-alapú rendszerek tervezése, fejlesztése és minőségbiztosítása.',
    tech: ['Java', 'Tervezés', 'Tesztelés'],
    art: 'gate',
  },
  {
    company: 'RDI Software Hungary',
    role: 'Software Engineer',
    period: '2024. augusztus – 2025. október',
    description:
      'Egy nagy gyorsétterem-hálózat alkalmazásának fejlesztése és karbantartása: új API-k megvalósítása, hozzájuk unit- és integrációs tesztek, code review, SQL-lekérdezések és külső API-k hívása.',
    tech: ['Java', 'REST API', 'SQL', 'Unit tesztek'],
    art: 'flow',
  },
  {
    company: 'EPAM Systems',
    role: 'Software Engineer',
    period: '2022. január – 2024. augusztus',
    description:
      'Egy amerikai cég (Broadridge) pénzügyi alkalmazásának fejlesztése. Többszálú végrehajtás, domain-driven szemlélet és funkcionális programozás; unit-, rendszer- és elfogadási tesztek, Selenium UI tesztek. Megoldottam párhuzamossági problémákat és javítottam a tesztlefedettséget.',
    tech: ['Java', 'Többszálúság', 'DDD', 'Selenium', 'SQL'],
    art: 'split',
  },
  {
    company: 'EPAM Systems',
    role: 'Junior Software Engineer',
    period: '2021. július – 2022. január',
    description:
      'Egy nyelvvizsgázást támogató webalkalmazás backendjét fejlesztettem. Új funkciók tervezése és megvalósítása, unit tesztek, code review és közben a tudásom folyamatos bővítése.',
    tech: ['Java', 'Backend', 'Unit tesztek'],
    art: 'saw',
  },
];
export const filterTech = ['Java', 'SQL', 'Selenium', 'Többszálúság', 'Unit tesztek'];

export interface Skill {
  title: string;
  tag: string;
  text: string;
}
export const skills: Skill[] = [
  {
    title: 'Java 11 és 17',
    tag: 'Nyelv',
    text: 'Több mint négy év gyakorlat Java 11 és Java 17 alatt; tanúsítvány Java 8-ból, Java 10/11-ből, tanulmányok Java 17-ről.',
  },
  {
    title: 'Spring és Spring Boot',
    tag: 'Keretrendszer',
    text: 'REST API-k tervezése és megvalósítása Spring Boot alkalmazásokban, mikroszolgáltatás-architektúrában.',
  },
  {
    title: 'Tesztelés',
    tag: 'Minőség',
    text: 'JUnit, Mockito, Selenium és Cucumber: unit-, integrációs-, rendszer- és UI-tesztek, magas lefedettséggel.',
  },
  {
    title: 'Build és eszközök',
    tag: 'Munkafolyamat',
    text: 'Gradle, Maven, Git, Lombok, SQL, valamint Jira és Confluence a csapatmunkához.',
  },
  {
    title: 'Tervezés',
    tag: 'Elvek',
    text: 'SOLID, clean code, tervezési minták, domain-driven szemlélet és mikroszolgáltatások.',
  },
];

export interface Study {
  title: string;
  where: string;
  period: string;
}
export const studies: Study[] = [
  { title: 'Matematika és informatika, BSc', where: 'Miskolci Egyetem', period: '2017 – 2021' },
  { title: 'Java Mentored Education Program', where: 'EPAM Systems', period: '2020 – 2021' },
  { title: 'Microservices Foundations', where: 'Tanúsítvány', period: '' },
  { title: 'Introduction to Model Context Protocol', where: 'Tanúsítvány', period: '' },
  { title: 'Java 8 for Professionals', where: 'Tanúsítvány', period: '' },
  { title: 'First Look: Java 10 and Java 11', where: 'Tanúsítvány', period: '' },
];
