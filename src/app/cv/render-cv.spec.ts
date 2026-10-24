import { contentEn, contentHu } from '../data/content';
import { Content } from '../data/models';
import { renderCv } from './render-cv';

const assets = { photo: 'data:image/jpeg;base64,AAAA', fontCss: '' };

describe('renderCv', () => {
  it('a magyar önéletrajzban minden munkahely, projekt és tanúsítvány szerepel', () => {
    const html = renderCv('hu', contentHu, assets);
    contentHu.jobs.forEach((job) => expect(html).toContain(job.company));
    contentHu.jobs
      .flatMap((job) => job.projects ?? [])
      .forEach((p) => expect(html).toContain(p.name));
    contentHu.studies.forEach((study) => expect(html).toContain(study.title));
    expect(html).toContain('<html lang="hu">');
  });

  it('az angol önéletrajz angol szöveget és angol nyelvi jelölést használ', () => {
    const html = renderCv('en', contentEn, assets);
    expect(html).toContain('<html lang="en">');
    expect(html).toContain(contentEn.ui.experience.title);
    expect(html).toContain(contentEn.profile.role);
    expect(html).not.toContain(contentHu.ui.experience.title);
  });

  it('nem tartalmaz személyes adatot: telefonszámot és születési dátumot', () => {
    (['hu', 'en'] as const).forEach((lang) => {
      const html = renderCv(lang, lang === 'hu' ? contentHu : contentEn, assets);
      expect(html).not.toMatch(/\+36\s?\d/);
      expect(html).not.toContain('1997');
    });
  });

  it('a kapcsolati sorban az e-mail, a LinkedIn és a GitHub szerepel, rövidítve', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).toContain('linkedin.com/in/mark-gyulai-6aa690264');
    expect(html).toContain('github.com/gyulaimrk');
    expect(html).toContain(contentHu.profile.email);
  });

  it('a szöveget HTML-ben biztonságosan kezeli (nem enged be címkéket)', () => {
    const evil: Content = structuredClone(contentHu);
    evil.profile.intro = '<script>alert(1)</script> & "idézet"';
    const html = renderCv('hu', evil, assets);
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;idézet&quot;');
  });

  it('a leírás nélküli projektet is felsorolja, kettőspont nélkül', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).toMatch(/<strong>Railnet<\/strong><\/li>/);
  });

  it('a nyelvvizsga és a jogosítvány is megjelenik', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).toContain('Angol nyelvvizsga, B2');
    expect(html).toContain(contentHu.profile.license);
  });
});
