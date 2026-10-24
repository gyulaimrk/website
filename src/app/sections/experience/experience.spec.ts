import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Experience } from './experience';

describe('Experience', () => {
  function render() {
    const fixture = TestBed.createComponent(Experience);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('minden munkahelyhez egy idővonal-elemet készít', () => {
    expect(render().querySelectorAll('ol > li').length).toBe(contentHu.jobs.length);
  });

  it('csak a legfrissebb kártya kiemelt', () => {
    const cards = [...render().querySelectorAll('app-job-card app-card')];
    expect(cards.map((c) => c.classList.contains('featured'))).toEqual(
      contentHu.jobs.map((_, i) => i === 0),
    );
  });

  it('a GLI Solutions és a MOL Limo projekt megjelenik', () => {
    const text = render().textContent ?? '';
    expect(text).toContain('GLI Solutions');
    expect(text).toContain('MOL Limo');
  });
});
