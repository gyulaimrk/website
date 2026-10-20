import { TestBed } from '@angular/core/testing';
import { jobs } from '../../data/content';
import { Route } from './route';

describe('Route', () => {
  it('minden munkahelyhez egy megállót rajzol, váltakozó oldalakon', () => {
    const fixture = TestBed.createComponent(Route);
    fixture.detectChanges();
    const stops = [...fixture.nativeElement.querySelectorAll('app-route-stop')] as HTMLElement[];
    expect(stops.length).toBe(jobs.length);
    expect(stops.map((s) => s.classList.contains('right'))).toEqual(
      jobs.map((_, i) => i % 2 === 1),
    );
  });

  it('a GLI Solutions és a MOL Limo projekt is megjelenik', () => {
    const fixture = TestBed.createComponent(Route);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('GLI Solutions');
    expect(text).toContain('MOL Limo');
  });
});
