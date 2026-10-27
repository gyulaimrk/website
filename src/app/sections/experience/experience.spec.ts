import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Experience } from './experience';

describe('Experience', () => {
  function render() {
    const fixture = TestBed.createComponent(Experience);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('builds one timeline item for every employer', () => {
    expect(render().querySelectorAll('ol > li').length).toBe(contentHu.jobs.length);
  });

  it('only the most recent card is featured', () => {
    const cards = [...render().querySelectorAll('app-job-card app-card')];
    expect(cards.map((c) => c.classList.contains('featured'))).toEqual(
      contentHu.jobs.map((_, i) => i === 0),
    );
  });

  it('the AI consulting and the car rental projects of the current employer appear', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('AI-konzultáció és szoftverfejlesztés');
    expect(text).toContain('Autóbérlési rendszer');
  });
});
