import { CONTENTS, LANGS, contentEn, contentHu } from './content';

/** The “shape” of the content: keys and list lengths, without the texts. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]));
  }
  return typeof value;
}

describe('content', () => {
  it('the Hungarian and the English content have the same structure', () => {
    expect(shape(contentEn)).toEqual(shape(contentHu));
  });

  it('the links, technologies and numbers do not depend on the language', () => {
    expect(contentEn.profile.linkedin).toBe(contentHu.profile.linkedin);
    expect(contentEn.profile.email).toBe(contentHu.profile.email);
    expect(contentEn.jobs.map((j) => j.projects?.map((p) => p.url))).toEqual(
      contentHu.jobs.map((j) => j.projects?.map((p) => p.url)),
    );
    expect(contentEn.studies.map((s) => s.url)).toEqual(contentHu.studies.map((s) => s.url));
    expect(contentEn.jobs.map((j) => j.projects?.map((p) => p.points?.length))).toEqual(
      contentHu.jobs.map((j) => j.projects?.map((p) => p.points?.length)),
    );
    expect(contentEn.profile.roleConstants).toEqual(contentHu.profile.roleConstants);
    expect(contentEn.stats.map((s) => s.value)).toEqual(contentHu.stats.map((s) => s.value));
    expect(contentEn.ui.nav.links.map((l) => l.fragment)).toEqual(
      contentHu.ui.nav.links.map((l) => l.fragment),
    );
  });

  describe.each(LANGS)('%s', (lang) => {
    const content = CONTENTS[lang];

    it('there is no unresolved placeholder, and in the statistics the years of experience are numbers', () => {
      expect(JSON.stringify(content)).not.toMatch(/\{(java|ai)Years\}/);
      expect(content.stats.slice(0, 2).map((stat) => stat.value)).toEqual([
        expect.stringMatching(/^\d+\+$/),
        expect.stringMatching(/^\d+\+$/),
      ]);
    });

    it('each of the four Anthropic certificates has a unique verification link', () => {
      const urls = content.studies.filter((s) => s.where === 'Anthropic').map((s) => s.url);
      expect(urls).toHaveLength(4);
      expect(new Set(urls).size).toBe(4);
      urls.forEach((url) => expect(url).toMatch(/^https:\/\/verify\.skilljar\.com\/c\/[a-z0-9]+$/));
    });

    it('the required profile fields are filled in', () => {
      expect(content.profile.name).toBeTruthy();
      expect(content.profile.email).toContain('@');
      expect(content.profile.linkedin).toMatch(/^https:\/\//);
      expect(content.profile.roles.length).toBeGreaterThan(0);
      expect(content.profile.photo.alt).toBeTruthy();
    });

    it('contains no personal data (phone, date of birth)', () => {
      const all = JSON.stringify(content);
      expect(all).not.toMatch(/\+36\s?\d/);
      expect(all).not.toMatch(/1997/);
    });

    it('employers and skills have unique identifiers', () => {
      const keys = content.jobs.map((j) => j.company + j.period);
      expect(new Set(keys).size).toBe(keys.length);
      const titles = content.skills.map((s) => s.title);
      expect(new Set(titles).size).toBe(titles.length);
    });

    it('the side projects are filled in and have at least one link', () => {
      expect(content.sideProjects.length).toBeGreaterThan(0);
      content.sideProjects.forEach((p) => {
        const links = [p.url, p.sourceUrl].filter(Boolean);
        expect(links.length).toBeGreaterThan(0);
        links.forEach((link) => expect(link).toMatch(/^https:\/\//));
        expect(p.tech.length).toBeGreaterThan(0);
      });
    });

    it('the number of distinct projects (a project listed under two roles counts once) matches the one in the statistics', () => {
      const names = content.jobs
        .flatMap((job) => job.projects ?? [])
        .map((project) => `${project.name} – ${project.subtitle ?? ''}`);
      const total = new Set(names).size;
      expect(content.stats.map((s) => s.value)).toContain(String(total));
    });

    it('the statistics and the UI texts are not empty', () => {
      content.stats.forEach((s) => {
        expect(s.value).toBeTruthy();
        expect(s.label).toBeTruthy();
      });
      expect(content.ui.meta.title).toBeTruthy();
      expect(content.ui.meta.description.length).toBeGreaterThan(50);
    });
  });
});
