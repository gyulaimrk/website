import { Content } from './models';

/** All external (https) addresses on the site, once, collected from the content. */
export function externalLinks(content: Content): string[] {
  const { profile, jobs, sideProjects, studies } = content;
  const candidates = [
    profile.linkedin,
    `${profile.linkedin}/details/certifications/`,
    ...jobs.flatMap((job) => (job.projects ?? []).map((project) => project.url)),
    ...sideProjects.flatMap((project) => [project.url, project.sourceUrl]),
    ...studies.map((study) => study.url),
  ];
  const urls = candidates.filter((url): url is string => !!url && url.startsWith('https://'));
  return [...new Set(urls)];
}
