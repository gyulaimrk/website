import { contentEn, contentHu } from '../data/content';
import { Content } from '../data/models';
import { renderCv } from './render-cv';

const assets = { photo: 'data:image/jpeg;base64,AAAA', fontCss: '' };

describe('renderCv', () => {
  it('the Hungarian résumé includes every employer, project and certificate', () => {
    const html = renderCv('hu', contentHu, assets);
    contentHu.jobs.forEach((job) => expect(html).toContain(job.company));
    contentHu.jobs
      .flatMap((job) => job.projects ?? [])
      .forEach((p) => expect(html).toContain(p.name));
    contentHu.studies.forEach((study) => expect(html).toContain(study.title));
    expect(html).toContain('<html lang="hu">');
  });

  it('the English résumé uses English text and English language markup', () => {
    const html = renderCv('en', contentEn, assets);
    expect(html).toContain('<html lang="en">');
    expect(html).toContain(contentEn.ui.experience.title);
    expect(html).toContain(contentEn.profile.role);
    expect(html).not.toContain(contentHu.ui.experience.title);
  });

  it('contains no personal data: phone number or date of birth', () => {
    (['hu', 'en'] as const).forEach((lang) => {
      const html = renderCv(lang, lang === 'hu' ? contentHu : contentEn, assets);
      expect(html).not.toMatch(/\+36\s?\d/);
      expect(html).not.toContain('1997');
    });
  });

  it('the contact line has the email and LinkedIn, shortened', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).toContain('linkedin.com/in/mark-gyulai-6aa690264');
    expect(html).toContain(contentHu.profile.email);
  });

  it('lists the languages as a list', () => {
    const html = renderCv('hu', contentHu, assets);
    contentHu.profile.languages.forEach((language) =>
      expect(html).toContain(`<li>${language}</li>`),
    );
  });

  it('has no GitHub link (neither the profile nor the side projects’ source code)', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).not.toContain('github.com');
  });

  it('handles text in HTML safely (lets no tags in)', () => {
    const evil: Content = structuredClone(contentHu);
    evil.profile.intro = '<script>alert(1)</script> & "quote"';
    const html = renderCv('hu', evil, assets);
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;quote&quot;');
  });

  it('also lists a project without a description, without a colon', () => {
    const bare: Content = structuredClone(contentHu);
    bare.jobs[0].projects = [{ name: 'Name only' }];
    const html = renderCv('hu', bare, assets);
    expect(html).toContain('<strong>Name only</strong></li>');
  });

  it('writes the project’s tools in brackets after the name', () => {
    const html = renderCv('hu', contentHu, assets);
    const project = contentHu.jobs.flatMap((job) => job.projects ?? []).find((p) => p.tech?.length);
    expect(html).toContain(`<span class="tools">(${project?.tech?.join(', ')})</span>`);
  });

  it('also lists the project’s tasks', () => {
    const html = renderCv('hu', contentHu, assets);
    const point = contentHu.jobs[0].projects![0].points![0];
    expect(html).toContain(`<li>${point}</li>`);
  });

  it('the language exam and the driving licence also appear', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).toContain('Angol nyelvvizsga, B2');
    expect(html).toContain(contentHu.profile.license);
  });

  it('the shared issuer of the further certificates is written once, in the heading', () => {
    const html = renderCv('hu', contentHu, assets);
    expect(html).toContain('(LinkedIn Learning)');
    expect(html.match(/LinkedIn Learning/g)).toHaveLength(1);
  });

  it('with different issuers every certificate shows its own', () => {
    const mixed: Content = structuredClone(contentHu);
    const other = mixed.studies.find((s) => s.kind === 'certificate' && !s.featured)!;
    other.where = 'Other Ltd.';
    const html = renderCv('hu', mixed, assets);
    expect(html).toContain('Other Ltd.');
    expect(html).not.toContain('(LinkedIn Learning)');
    expect(html).toContain('LinkedIn Learning');
  });
});
