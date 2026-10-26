import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { SideProjects } from './side-projects';

describe('SideProjects', () => {
  it('renders a card for every side project, including lizacover.hu', () => {
    const fixture = TestBed.createComponent(SideProjects);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-project-card').length).toBe(contentHu.sideProjects.length);
    contentHu.sideProjects.forEach((project) => expect(el.textContent).toContain(project.name));
    expect(el.querySelector('h2')?.textContent).toBe(contentHu.ui.sideProjects.title);
  });
});
