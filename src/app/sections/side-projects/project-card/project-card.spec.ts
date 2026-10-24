import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../../core/language.service';
import { contentEn, contentHu } from '../../../data/content';
import { SideProject } from '../../../data/models';
import { ProjectCard } from './project-card';

const project: SideProject = {
  name: 'Példa',
  url: 'https://example.com',
  description: 'Leírás.',
  tech: ['Angular', 'SEO'],
};

describe('ProjectCard', () => {
  function render() {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('kirajzolja a nevet, a leírást és a technológiákat', () => {
    const { el } = render();
    expect(el.querySelector('h3')?.textContent).toBe('Példa');
    expect(el.querySelector('.description')?.textContent).toBe('Leírás.');
    expect(el.querySelectorAll('app-chip-list li').length).toBe(2);
  });

  it('új lapon nyíló linket ad az élő oldalra, a felirat a nyelvet követi', () => {
    const { fixture, el } = render();
    const link = el.querySelector('a[appButton]') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(project.url);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.textContent?.trim()).toBe(contentHu.ui.sideProjects.visit);
    TestBed.inject(LanguageService).lang.set('en');
    fixture.detectChanges();
    expect(link.textContent?.trim()).toBe(contentEn.ui.sideProjects.visit);
  });
});
