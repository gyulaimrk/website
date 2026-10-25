import { Content, Lang, Study } from '../data/models';

export interface CvAssets {
  /** A fotó data URL-ként (a PDF-be beágyazva). */
  photo: string;
  /** A betűtípusok `@font-face` szabályai. */
  fontCss: string;
}

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const esc = (text: string) => text.replace(/[&<>"']/g, (char) => ESCAPES[char]);
const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const STYLE = `
  @page { size: A4; margin: 12mm 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #141a38; font: 400 9pt/1.38 'Inter', sans-serif; }
  h1, h2, h3 { font-family: 'Space Grotesk', 'Inter', sans-serif; margin: 0; line-height: 1.15; }
  header { display: flex; gap: 16px; align-items: center; margin-bottom: 14px; }
  header img { width: 26mm; height: 26mm; border-radius: 6mm; object-fit: cover; }
  h1 { font-size: 24pt; }
  .role { margin-top: 2px; color: #3a45a8; font-size: 12pt; font-weight: 600; }
  .contact { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 2px 14px; color: #4b5686; font-size: 9pt; }
  h2 { margin: 10px 0 5px; padding-bottom: 3px; border-bottom: 1.5px solid #7c8cff; color: #3a45a8; font-size: 11.5pt; break-after: avoid; }
  p { margin: 0; }
  .job { margin-bottom: 6px; break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  h3 { font-size: 10.8pt; }
  .meta { color: #4b5686; font-size: 9pt; white-space: nowrap; }
  .job-role { color: #3a45a8; font-weight: 600; }
  ul { margin: 3px 0 0; padding-left: 15px; }
  li { margin: 0; }
  .tags { margin-top: 3px; color: #4b5686; font-size: 8.8pt; }
  .skills { display: flex; flex-wrap: wrap; gap: 4px 6px; margin: 0; padding: 0; list-style: none; }
  .skills li { padding: 1px 9px; border-radius: 99px; background: #e9ecff; font-weight: 500; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; align-items: start; }
  .cols { columns: 2; column-gap: 18px; }
  .cols .item { margin-bottom: 2px; }
  h3.sub { margin: 8px 0 3px; }
  .item { margin-bottom: 4px; break-inside: avoid; }
  .item span { color: #4b5686; font-size: 8.8pt; }
`;

const studyLine = (study: Study, compact = false) => {
  const meta = (compact ? [study.period] : [study.where, study.period]).filter(Boolean).join(', ');
  const separator = compact ? ' · ' : '<br>';
  return `<div class="item"><strong>${esc(study.title)}</strong>${meta ? `<span>${separator}${esc(meta)}</span>` : ''}</div>`;
};

/** A teljes önéletrajz HTML-je egy nyelven; ebből készül a letölthető PDF. */
export function renderCv(lang: Lang, content: Content, assets: CvAssets): string {
  const { profile, jobs, skills, studies, sideProjects, ui } = content;
  const education = studies.filter((s) => s.kind === 'education');
  const anthropic = studies.filter((s) => s.kind === 'certificate' && s.featured);
  const others = studies.filter((s) => s.kind === 'certificate' && !s.featured);
  // Ha minden további tanúsítványt ugyanaz adott ki, a kiállító csak egyszer, a címben szerepel.
  const issuers = [...new Set(others.map((s) => s.where).filter(Boolean))];
  const sharedIssuer = issuers.length === 1 ? issuers[0] : '';

  const jobHtml = jobs
    .map((job) => {
      const projects = (job.projects ?? [])
        .map((p) => {
          const label = [p.name, p.role].filter(Boolean).join(' – ');
          const points = p.points?.length
            ? `<ul>${p.points.map((point) => `<li>${esc(point)}</li>`).join('')}</ul>`
            : '';
          return `<li><strong>${esc(label)}</strong>${p.text ? `: ${esc(p.text)}` : ''}${points}</li>`;
        })
        .join('');
      return `<section class="job">
        <div class="job-head"><h3>${esc(job.company)} <span class="job-role">${esc(job.role)}</span></h3><span class="meta">${esc(job.period)}</span></div>
        <p>${esc(job.description)}</p>
        ${projects ? `<ul>${projects}</ul>` : ''}
        <p class="tags">${esc(job.tech.join(', '))}</p>
      </section>`;
    })
    .join('');

  const sideHtml = sideProjects
    .map((p) => {
      const link = p.url ?? p.sourceUrl;
      return `<div class="item"><strong>${esc(p.name)}</strong>${link && shortUrl(link) !== p.name ? ` <span>${esc(shortUrl(link))}</span>` : ''}</div>`;
    })
    .join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(ui.meta.title)}</title>
<style>${assets.fontCss}${STYLE}</style>
</head>
<body>
  <header>
    <img src="${assets.photo}" alt="${esc(profile.photo.alt)}">
    <div>
      <h1>${esc(profile.name)}</h1>
      <p class="role">${esc(profile.role)}</p>
      <p class="contact"><span>${esc(profile.email)}</span><span>${esc(shortUrl(profile.linkedin))}</span><span>${esc(shortUrl(profile.github))}</span><span>${esc(profile.location)}</span></p>
    </div>
  </header>

  <h2>${esc(ui.about.title)}</h2>
  <p>${esc(profile.intro)}</p>

  <h2>${esc(ui.experience.title)}</h2>
  ${jobHtml}

  <h2>${esc(ui.skills.title)}</h2>
  <ul class="skills">${skills.map((s) => `<li>${esc(s.title)}</li>`).join('')}</ul>

  <h2>${esc(ui.sideProjects.title)}</h2>
  ${sideHtml}

  <h2>${esc(ui.education.title)}</h2>
  <div class="two">
    <div>${education.map((study) => studyLine(study)).join('')}<div class="item"><strong>${esc(ui.about.facts.languages)}</strong><br><span>${esc(profile.languages)}</span></div><div class="item"><strong>${esc(ui.about.facts.license)}</strong><br><span>${esc(profile.license)}</span></div></div>
    <div><h3 class="sub" style="margin-top:0">${esc(ui.education.anthropic)}</h3>${anthropic.map((study) => studyLine(study)).join('')}</div>
  </div>
  <h3 class="sub">${esc(ui.education.certificates)}${sharedIssuer ? ` <span>(${esc(sharedIssuer)})</span>` : ''}</h3>
  <div class="cols">${others.map((study) => studyLine(study, !!sharedIssuer)).join('')}</div>
</body>
</html>`;
}
