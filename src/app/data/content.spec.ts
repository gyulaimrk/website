import { CONTENTS, LANGS, contentEn, contentHu } from './content';

/** A tartalom "alakja": kulcsok és listahosszak, a szövegek nélkül. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]));
  }
  return typeof value;
}

describe('content', () => {
  it('a magyar és az angol tartalom azonos szerkezetű', () => {
    expect(shape(contentEn)).toEqual(shape(contentHu));
  });

  it('a linkek, a technológiák és a számok nyelvtől függetlenek', () => {
    expect(contentEn.profile.linkedin).toBe(contentHu.profile.linkedin);
    expect(contentEn.profile.email).toBe(contentHu.profile.email);
    expect(contentEn.jobs.map((j) => j.projects?.map((p) => p.url))).toEqual(
      contentHu.jobs.map((j) => j.projects?.map((p) => p.url)),
    );
    expect(contentEn.studies.map((s) => s.url)).toEqual(contentHu.studies.map((s) => s.url));
    expect(contentEn.jobs.map((j) => j.projects?.map((p) => p.points?.length))).toEqual(
      contentHu.jobs.map((j) => j.projects?.map((p) => p.points?.length)),
    );
    expect(contentEn.stats.map((s) => s.value)).toEqual(contentHu.stats.map((s) => s.value));
    expect(contentEn.ui.nav.links.map((l) => l.fragment)).toEqual(
      contentHu.ui.nav.links.map((l) => l.fragment),
    );
  });

  describe.each(LANGS)('%s', (lang) => {
    const content = CONTENTS[lang];

    it('mind a négy Anthropic-tanúsítványnak egyedi, hitelesítő linkje van', () => {
      const urls = content.studies.filter((s) => s.where === 'Anthropic').map((s) => s.url);
      expect(urls).toHaveLength(4);
      expect(new Set(urls).size).toBe(4);
      urls.forEach((url) => expect(url).toMatch(/^https:\/\/verify\.skilljar\.com\/c\/[a-z0-9]+$/));
    });

    it('a profil kötelező mezői ki vannak töltve', () => {
      expect(content.profile.name).toBeTruthy();
      expect(content.profile.email).toContain('@');
      expect(content.profile.linkedin).toMatch(/^https:\/\//);
      expect(content.profile.roles.length).toBeGreaterThan(0);
      expect(content.profile.photo.alt).toBeTruthy();
    });

    it('nem tartalmaz személyes adatot (telefon, születési dátum)', () => {
      const all = JSON.stringify(content);
      expect(all).not.toMatch(/\+36\s?\d/);
      expect(all).not.toMatch(/1997/);
    });

    it('a munkahelyek és képességek egyedi azonosítójúak', () => {
      const keys = content.jobs.map((j) => j.company + j.period);
      expect(new Set(keys).size).toBe(keys.length);
      const titles = content.skills.map((s) => s.title);
      expect(new Set(titles).size).toBe(titles.length);
    });

    it('a mellékprojektek ki vannak töltve, és van legalább egy linkjük', () => {
      expect(content.sideProjects.length).toBeGreaterThan(0);
      content.sideProjects.forEach((p) => {
        const links = [p.url, p.sourceUrl].filter(Boolean);
        expect(links.length).toBeGreaterThan(0);
        links.forEach((link) => expect(link).toMatch(/^https:\/\//));
        expect(p.tech.length).toBeGreaterThan(0);
      });
    });

    it('a különböző projektek száma (az ismétlődő Broadridge-projekt egyszer számít) megegyezik a statisztikában szereplővel', () => {
      const names = content.jobs
        .flatMap((job) => job.projects ?? [])
        .map((project) => project.name);
      const total = new Set(names).size;
      expect(content.stats.map((s) => s.value)).toContain(String(total));
    });

    it('a statisztikák és a felület szövegei nem üresek', () => {
      content.stats.forEach((s) => {
        expect(s.value).toBeTruthy();
        expect(s.label).toBeTruthy();
      });
      expect(content.ui.meta.title).toBeTruthy();
      expect(content.ui.meta.description.length).toBeGreaterThan(50);
    });
  });
});
