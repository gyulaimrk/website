import { contentEn, contentHu } from './content';
import { externalLinks } from './external-links';

describe('externalLinks', () => {
  const links = externalLinks(contentHu);

  it('csak https címeket ad, ismétlés nélkül', () => {
    links.forEach((url) => expect(url).toMatch(/^https:\/\//));
    expect(new Set(links).size).toBe(links.length);
  });

  it('tartalmazza a profilt, a projektek és a tanúsítványok linkjeit', () => {
    expect(links).toContain(contentHu.profile.linkedin);
    expect(links).toContain(`${contentHu.profile.linkedin}/details/certifications/`);
    expect(links).toContain('https://rentacar.mollimo.hu/rent/start');
    contentHu.studies
      .filter((study) => study.url)
      .forEach((study) => expect(links).toContain(study.url));
  });

  it('a két nyelv ugyanazokat a külső címeket használja', () => {
    expect(externalLinks(contentEn).sort()).toEqual([...links].sort());
  });
});
