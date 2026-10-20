// A weboldal teljes tartalma itt szerkeszthető. A "minta" jelölésű részeket cseréld a saját adataidra.
export const profile = {
  name: 'Gyulai Márk',
  role: 'Senior Java fejlesztő',
  linkedin: 'https://www.linkedin.com/in/mark-gyulai-6aa690264',
  github: 'https://github.com/gyulaimrk',
  location: 'Budapest, Magyarország',
  intro:
    'Nagy terhelésű, hosszú életű backend rendszereket tervezek és építek Java-ban: Spring, Kafka, Kubernetes.',
  letter: [
    'Senior Java fejlesztőként olyan rendszereken dolgozom, amelyeknek évekig üzemelniük kell, és közben változniuk is kell. Ezért a tiszta határokat, a tesztelhető kódot és a mérhető működést tartom a legfontosabbnak.',
    'Szeretem, ha egy csapat közösen érti a rendszert: a tervezési döntéseket leírom, a kódot átnézetem, a tudást megosztom. A legjobb kód az, amit más is magabiztosan továbbvisz.',
    'A backend mellett kényelmesen mozgok a teljes úton az ötlettől az üzemeltetésig: API-tervezés, adatmodellezés, CI/CD, megfigyelhetőség.',
    'Ez az oldal Angularral készült, mert érdekel a másik oldal is.',
  ],
};

export type ArtKind = 'cup' | 'bridge' | 'split' | 'flow' | 'gate' | 'saw';

export interface Project {
  name: string;
  category: string;
  description: string;
  tech: string[];
  art: ArtKind;
}
// Minta projektek.
export const projects: Project[] = [
  {
    name: 'Fizetési platform',
    category: 'Monolitból mikroszolgáltatások',
    description:
      'Egy monolit fizetési rendszer fokozatos szétbontása önálló szolgáltatásokra, üzemszünet nélkül. Tiszta modulhatárok, kompatibilis API-k és adatmigráció lépésről lépésre.',
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Kafka'],
    art: 'split',
  },
  {
    name: 'Rendeléskezelő',
    category: 'Eseményvezérelt architektúra',
    description:
      'Aszinkron, eseményalapú rendeléskezelés idempotens fogyasztókkal és újrapróbálkozási stratégiával, hogy egy kiesés ne veszítsen el egyetlen üzenetet sem.',
    tech: ['Java 21', 'Kafka', 'Spring Boot', 'Docker'],
    art: 'flow',
  },
  {
    name: 'API kapu és hitelesítés',
    category: 'Biztonság és integráció',
    description:
      'Központi belépési pont: hitelesítés, jogosultságkezelés és forgalomkorlátozás egy helyen, a mögötte álló szolgáltatások egyszerűsítésére.',
    tech: ['Spring Cloud Gateway', 'Keycloak', 'OAuth 2', 'Kubernetes'],
    art: 'gate',
  },
  {
    name: 'Teljesítmény és megfigyelhetőség',
    category: 'JVM hangolás',
    description:
      'Mérés előbb, optimalizálás utána: memóriahasználat, szemétgyűjtés és válaszidők követése, hogy a lassulás okát adatok mutassák meg, ne találgatás.',
    tech: ['JVM', 'OpenTelemetry', 'Grafana', 'JMH'],
    art: 'saw',
  },
];

export interface Release {
  title: string;
  tag: string;
  text: string;
}
export const releases: Release[] = [
  {
    title: 'Java 21',
    tag: 'LTS',
    text: 'Record típusok, mintaillesztés és virtuális szálak: kevesebb szószaporítás, egyszerűbb párhuzamosság.',
  },
  {
    title: 'Spring Boot 3',
    tag: 'Keretrendszer',
    text: 'Gyors indulás, tiszta konfiguráció, kiforrott biztonsági és adatelérési réteg.',
  },
  {
    title: 'Kafka',
    tag: 'Üzenetkezelés',
    text: 'Lazán csatolt szolgáltatások, visszajátszható eseménynapló, kezelhető terhelés.',
  },
  {
    title: 'Kubernetes',
    tag: 'Üzemeltetés',
    text: 'Reprodukálható telepítés, automatikus skálázás, egységes környezet fejlesztéstől élesig.',
  },
  {
    title: 'PostgreSQL',
    tag: 'Adat',
    text: 'Gondos adatmodell, indexek és tranzakciókezelés, amely terhelés alatt is megbízható.',
  },
];
