import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { SideProjects } from './side-projects';

describe('SideProjects', () => {
  it('minden mellékprojekthez kártyát rajzol, köztük a lizacover.hu-hoz', () => {
    const fixture = TestBed.createComponent(SideProjects);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-project-card').length).toBe(contentHu.sideProjects.length);
    expect(el.textContent).toContain('lizacover.hu');
    expect(el.querySelector('h2')?.textContent).toBe(contentHu.ui.sideProjects.title);
  });
});
