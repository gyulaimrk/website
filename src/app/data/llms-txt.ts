import { Content, Lang } from './models';

const LABELS: Record<Lang, { page: string; cv: string }> = {
  hu: { page: 'Magyar', cv: 'Önéletrajz (PDF, magyar)' },
  en: { page: 'English', cv: 'Résumé (PDF, English)' },
};

/**
 * The content of `llms.txt`: a short, machine-readable summary for AI search engines and assistants.
 * All data comes from the content files; without `origin` the links are relative to the web root.
 */
export function renderLlmsTxt(contents: Record<Lang, Content>, origin = ''): string {
  const langs = Object.keys(contents) as Lang[];
  const { profile } = contents[langs[0]];
  const summaries = langs.map((lang) => `> ${contents[lang].ui.meta.description}`);
  const pages = langs.map(
    (lang) => `- [${LABELS[lang].page}](${origin}/${lang}): ${contents[lang].profile.intro}`,
  );
  const resumes = langs.map(
    (lang) => `- [${LABELS[lang].cv}](${origin}/${contents[lang].profile.cv})`,
  );
  const links = [`- [LinkedIn](${profile.linkedin})`];

  return [
    `# ${profile.name}`,
    summaries.join('\n'),
    '## Pages',
    pages.join('\n'),
    '## Resume',
    resumes.join('\n'),
    '## Profiles',
    links.join('\n'),
    '',
  ].join('\n\n');
}
