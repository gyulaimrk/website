import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Reveal } from './reveal.directive';

@Component({ imports: [Reveal], template: `<p [appReveal]="2">text</p>` })
class Host {}

describe('Reveal', () => {
  let trigger: (isIntersecting: boolean) => void;

  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: (e: { isIntersecting: boolean }[]) => void) {
          trigger = (isIntersecting) => cb([{ isIntersecting }]);
        }
        observe() {}
        disconnect() {}
      },
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('p') as HTMLElement;
  }

  it('hides the element and sets a delay', () => {
    const p = render();
    expect(p.classList.contains('rv')).toBe(true);
    expect(p.style.getPropertyValue('--rv-delay')).toBe('160ms');
  });

  it('makes it visible when it reaches the screen', () => {
    const p = render();
    trigger(true);
    expect(p.classList.contains('rv-in')).toBe(true);
  });

  it('with reduced motion it does not hide it', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(render().classList.contains('rv')).toBe(false);
  });
});
