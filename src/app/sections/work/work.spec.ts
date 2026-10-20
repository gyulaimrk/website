import { TestBed } from '@angular/core/testing';
import { jobs } from '../../data/content';
import { Work } from './work';

describe('Work', () => {
  function setup() {
    const fixture = TestBed.createComponent(Work);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const bands = () => [...el.querySelectorAll('app-job-band')] as HTMLElement[];
    return { fixture, el, bands };
  }

  it('minden munkahelyhez készít egy sávot', () => {
    expect(setup().bands().length).toBe(jobs.length);
  });

  it('szűréskor elhalványítja a nem egyező munkahelyeket', () => {
    const { fixture, el, bands } = setup();
    const aiButton = [...el.querySelectorAll('app-filter-bar button')].find(
      (b) => b.textContent?.trim() === 'AI',
    ) as HTMLButtonElement;
    aiButton.click();
    fixture.detectChanges();
    const dimmed = bands().map((b) => b.classList.contains('dim'));
    expect(dimmed).toEqual(jobs.map((j) => !j.tech.includes('AI')));
    expect(dimmed.some(Boolean)).toBe(true);
    expect(dimmed.every(Boolean)).toBe(false);
  });
});
