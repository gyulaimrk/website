import { TestBed } from '@angular/core/testing';
import { Typewriter } from './typewriter';

describe('Typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  function setup() {
    const fixture = TestBed.createComponent(Typewriter);
    fixture.componentRef.setInput('words', ['Java', 'Kotlin']);
    fixture.detectChanges();
    const text = () => (fixture.nativeElement.querySelector('.text') as HTMLElement).textContent;
    return { fixture, text };
  }

  it('betűnként gépeli be a szót', async () => {
    const { fixture, text } = setup();
    await fixture.whenStable();
    vi.advanceTimersByTime(70);
    fixture.detectChanges();
    expect(text()).toBe('J');
    vi.advanceTimersByTime(70 * 3);
    fixture.detectChanges();
    expect(text()).toBe('Java');
  });

  it('a szó végén törli, majd a következő szóra vált', async () => {
    const { fixture, text } = setup();
    await fixture.whenStable();
    vi.advanceTimersByTime(70 * 4 + 1600 + 35 * 4);
    fixture.detectChanges();
    expect(text()).toBe('K');
  });

  it('mozgáscsökkentésnél az első szót mutatja gépelés nélkül', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const { fixture, text } = setup();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(text()).toBe('Java');
  });
});
