import { contentEn, contentHu } from './content';
import { externalLinks } from './external-links';

describe('externalLinks', () => {
  const links = externalLinks(contentHu);

  it('gives only https addresses, without repetition', () => {
    links.forEach((url) => expect(url).toMatch(/^https:\/\//));
    expect(new Set(links).size).toBe(links.length);
  });

  it('includes the profile, the project and the certificate links', () => {
    expect(links).toContain(contentHu.profile.linkedin);
    expect(links).toContain(`${contentHu.profile.linkedin}/details/certifications/`);
    expect(links).toContain('https://rentacar.mollimo.hu/rent/start');
    contentHu.studies
      .filter((study) => study.url)
      .forEach((study) => expect(links).toContain(study.url));
  });

  it('the two languages use the same external addresses', () => {
    expect(externalLinks(contentEn).sort()).toEqual([...links].sort());
  });
});
