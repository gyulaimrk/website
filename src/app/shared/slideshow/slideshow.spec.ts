import { TestBed } from '@angular/core/testing';
import { Slideshow } from './slideshow';

describe('Slideshow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  function active(root: HTMLElement) {
    return [...root.querySelectorAll('.still')].findIndex((el) => el.classList.contains('on'));
  }

  it('az intervallum után a következő képre vált, körbeér', async () => {
    const fixture = TestBed.createComponent(Slideshow);
    fixture.componentRef.setInput('kinds', ['cup', 'bridge']);
    fixture.componentRef.setInput('interval', 1000);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(active(fixture.nativeElement)).toBe(0);
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(active(fixture.nativeElement)).toBe(1);
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(active(fixture.nativeElement)).toBe(0);
  });

  it('mozgáscsökkentésnél az első képen marad', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const fixture = TestBed.createComponent(Slideshow);
    fixture.componentRef.setInput('kinds', ['cup', 'bridge']);
    fixture.componentRef.setInput('interval', 1000);
    fixture.detectChanges();
    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(active(fixture.nativeElement)).toBe(0);
  });
});
