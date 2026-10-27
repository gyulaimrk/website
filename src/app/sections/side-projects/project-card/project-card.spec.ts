import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../../core/language.service';
import { contentEn, contentHu } from '../../../data/content';
import { SideProject } from '../../../data/models';
import { ProjectCard } from './project-card';

const project: SideProject = {
  name: 'Example',
  url: 'https://example.com',
  paragraphs: ['First paragraph.', 'Second paragraph.'],
  tech: ['Angular', 'SEO'],
};

describe('ProjectCard', () => {
  function render() {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('renders the name, the paragraphs of the description and the technologies', () => {
    const { el } = render();
    expect(el.querySelector('h3')?.textContent).toBe('Example');
    expect([...el.querySelectorAll('.description')].map((p) => p.textContent)).toEqual([
      'First paragraph.',
      'Second paragraph.',
    ]);
    expect(el.querySelectorAll('app-chip-list li').length).toBe(2);
  });

  it('gives a link opening in a new tab to the live site, the label follows the language', () => {
    const { fixture, el } = render();
    const link = el.querySelector('a[appButton]') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(project.url);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.textContent?.trim()).toBe(contentHu.ui.sideProjects.visit);
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(link.textContent?.trim()).toBe(contentEn.ui.sideProjects.visit);
  });

  it('shows only the existing links: a source link without a live site', () => {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', {
      name: 'Code only',
      sourceUrl: 'https://github.com/example/repo',
      paragraphs: ['Description.'],
      tech: ['Angular'],
    });
    fixture.detectChanges();
    const links = [
      ...fixture.nativeElement.querySelectorAll('a[appButton]'),
    ] as HTMLAnchorElement[];
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['https://github.com/example/repo']);
    expect(links[0].textContent?.trim()).toBe(contentHu.ui.sideProjects.source);
  });
});
