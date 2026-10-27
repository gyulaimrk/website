import { Content, Lang, Study } from '../data/models';

export interface CvAssets {
  /** The photo as a data URL (embedded in the PDF). */
  photo: string;
  /** The `@font-face` rules of the fonts. */
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
  @page { size: A4; margin: 11mm 13mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #0f1d3d; font: 400 8.9pt/1.36 'Inter', sans-serif; }
  h1, h2, h3 { font-family: 'Space Grotesk', 'Inter', sans-serif; margin: 0; line-height: 1.15; }
  header { display: flex; gap: 16px; align-items: center; margin-bottom: 14px; }
  header img { width: 26mm; height: 26mm; border-radius: 6mm; object-fit: cover; }
  h1 { font-size: 24pt; }
  .role { margin-top: 2px; color: #1d3f9e; font-size: 12pt; font-weight: 600; }
  .contact { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 2px 14px; color: #46567f; font-size: 9pt; }
  h2 { margin: 10px 0 5px; padding-bottom: 3px; border-bottom: 1.5px solid #2563eb; color: #1d3f9e; font-size: 11.5pt; break-after: avoid; }
  p { margin: 0; }
  .job { margin-bottom: 6px; }
  .job li li { break-inside: avoid; }
  .job-head { display: flex; break-after: avoid; justify-content: space-between; gap: 12px; align-items: baseline; }
  h3 { font-size: 10.8pt; }
  .meta { color: #46567f; font-size: 9pt; white-space: nowrap; }
  .job-role { color: #1d3f9e; font-weight: 600; }
  ul { margin: 3px 0 0; padding-left: 15px; }
  li { margin: 0; }
  .tools { color: #46567f; font-size: 8.8pt; }
  .tags { margin-top: 3px; color: #46567f; font-size: 8.8pt; }
  .skills { display: flex; flex-wrap: wrap; gap: 4px 6px; margin: 0; padding: 0; list-style: none; }
  .skills li { padding: 1px 9px; border-radius: 99px; background: #e8f0ff; font-weight: 500; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; align-items: start; }
  .cols { columns: 3; column-gap: 14px; font-size: 8.6pt; }
  .cols .item { margin-bottom: 2px; }
  h3.sub { margin: 8px 0 3px; }
  .item { margin-bottom: 4px; break-inside: avoid; }
  .item span { color: #46567f; font-size: 8.8pt; }
  .langs { margin: 1px 0 0; color: #46567f; font-size: 8.8pt; }
`;

const studyLine = (study: Study, compact = false) => {
  const meta = (compact ? [study.period] : [study.where, study.period]).filter(Boolean).join(', ');
  const separator = compact ? ' · ' : '<br>';
  return `<div class="item"><strong>${esc(study.title)}</strong>${meta ? `<span>${separator}${esc(meta)}</span>` : ''}</div>`;
};

/** The whole résumé as HTML in one language; the downloadable PDF is built from it. */
export function renderCv(lang: Lang, content: Content, assets: CvAssets): string {
  const { profile, jobs, skills, studies, sideProjects, ui } = content;
  const education = studies.filter((s) => s.kind === 'education');
  const featured = studies.filter((s) => s.kind === 'certificate' && s.featured);
  const others = studies.filter((s) => s.kind === 'certificate' && !s.featured);
  // If all further certificates were issued by the same body, the issuer appears only once, in the heading.
  const issuers = [...new Set(others.map((s) => s.where).filter(Boolean))];
  const sharedIssuer = issuers.length === 1 ? issuers[0] : '';

  const jobHtml = jobs
    .map((job) => {
      const projects = (job.projects ?? [])
        .map((p) => {
          const label = [p.name, p.subtitle].filter(Boolean).join(' – ');
          const tools = p.tech?.length
            ? ` <span class="tools">(${esc(p.tech.join(', '))})</span>`
            : '';
          const points = p.points?.length
            ? `<ul>${p.points.map((point) => `<li>${esc(point)}</li>`).join('')}</ul>`
            : '';
          return `<li><strong>${esc(label)}</strong>${tools}${p.text ? `: ${esc(p.text)}` : ''}${points}</li>`;
        })
        .join('');
      return `<section class="job">
        <div class="job-head"><h3>${esc(job.company)} <span class="job-role">${esc(job.role)}</span></h3><span class="meta">${esc(job.period)}</span></div>
        <p>${esc(job.description)}</p>
        ${projects ? `<ul>${projects}</ul>` : ''}
        ${job.tech?.length ? `<p class="tags">${esc(job.tech.join(', '))}</p>` : ''}
      </section>`;
    })
    .join('');

  const sideHtml = sideProjects
    .map((p) => {
      const link = p.url;
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
      <p class="contact"><span>${esc(profile.email)}</span><span>${esc(shortUrl(profile.linkedin))}</span><span>${esc(profile.location)}</span></p>
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
    <div>${education.map((study) => studyLine(study)).join('')}<div class="item"><strong>${esc(ui.about.facts.languages)}</strong><ul class="langs">${profile.languages.map((language) => `<li>${esc(language)}</li>`).join('')}</ul></div><div class="item"><strong>${esc(ui.about.facts.license)}</strong><br><span>${esc(profile.license)}</span></div></div>
    <div><h3 class="sub" style="margin-top:0">${esc(ui.education.featured)}</h3>${featured.map((study) => studyLine(study)).join('')}</div>
  </div>
  <h3 class="sub">${esc(ui.education.certificates)}${sharedIssuer ? ` <span>(${esc(sharedIssuer)})</span>` : ''}</h3>
  <div class="cols">${others.map((study) => studyLine(study, !!sharedIssuer)).join('')}</div>
</body>
</html>`;
}
