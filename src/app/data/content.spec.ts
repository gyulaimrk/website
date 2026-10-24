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
    expect(contentEn.stats.map((s) => s.value)).toEqual(contentHu.stats.map((s) => s.value));
    expect(contentEn.ui.nav.links.map((l) => l.href)).toEqual(
      contentHu.ui.nav.links.map((l) => l.href),
    );
  });

  describe.each(LANGS)('%s', (lang) => {
    const content = CONTENTS[lang];

    it('a profil kötelező mezői ki vannak töltve', () => {
      expect(content.profile.name).toBeTruthy();
      expect(content.profile.email).toContain('@');
      expect(content.profile.linkedin).toMatch(/^https:\/\//);
      expect(content.profile.roles.length).toBeGreaterThan(0);
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
