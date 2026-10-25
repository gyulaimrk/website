import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CountUp, scaleNumbers } from './count-up.directive';

@Component({ imports: [CountUp], template: `<strong [appCountUp]="'8–25'">8–25</strong>` })
class Host {}

describe('scaleNumbers', () => {
  it('minden egész számot a megadott arányban mutat, a többi szöveget változatlanul', () => {
    expect(scaleNumbers('8–25', 0)).toBe('0–0');
    expect(scaleNumbers('8–25', 0.5)).toBe('4–13');
    expect(scaleNumbers('5+', 1)).toBe('5+');
  });
});

describe('CountUp', () => {
  let trigger: (isIntersecting: boolean) => void;
  let observed: number;

  beforeEach(() => {
    vi.useFakeTimers();
    observed = 0;
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: (e: { isIntersecting: boolean }[]) => void) {
          trigger = (isIntersecting) => cb([{ isIntersecting }]);
        }
        observe() {
          observed++;
        }
        disconnect() {}
      },
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('strong') as HTMLElement;
  }

  it('a képernyőre érés előtt a végértéket mutatja', () => {
    expect(render().textContent).toBe('8–25');
    expect(observed).toBe(1);
  });

  it('látható területre érve 0-ról a végértékig számol, és pontosan a végértéken áll meg', () => {
    const el = render();
    trigger(true);
    vi.advanceTimersByTime(100);
    const early = el.textContent ?? '';
    expect(early).not.toBe('8–25');
    vi.advanceTimersByTime(2000);
    expect(el.textContent).toBe('8–25');
  });

  it('nem indul el, amíg az elem nem látszik', () => {
    const el = render();
    trigger(false);
    vi.advanceTimersByTime(500);
    expect(el.textContent).toBe('8–25');
  });

  it('mozgáscsökkentésnél nem animál, a végértéket hagyja', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const el = render();
    expect(observed).toBe(0);
    expect(el.textContent).toBe('8–25');
  });
});
