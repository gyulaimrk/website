import { Content } from './models';

/** Az oldalon szereplő összes külső (https) cím, egyszer, a tartalomból összegyűjtve. */
export function externalLinks(content: Content): string[] {
  const { profile, jobs, sideProjects, studies } = content;
  const candidates = [
    profile.linkedin,
    `${profile.linkedin}/details/certifications/`,
    profile.github,
    ...jobs.flatMap((job) => (job.projects ?? []).map((project) => project.url)),
    ...sideProjects.flatMap((project) => [project.url, project.sourceUrl]),
    ...studies.map((study) => study.url),
  ];
  const urls = candidates.filter((url): url is string => !!url && url.startsWith('https://'));
  return [...new Set(urls)];
}
