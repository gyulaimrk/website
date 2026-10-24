import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnchorLink } from './anchor-link.directive';

@Component({
  imports: [AnchorLink],
  template: `
    <a appAnchor="cel">Ugrás</a>
    <a appAnchor="nincs">Hiányzó</a>
    <section id="cel"></section>
    <main id="fo" tabindex="-1"></main>
    <a appAnchor="fo">Kihagyás</a>
  `,
})
class Host {}

describe('AnchorLink', () => {
  beforeEach(() => vi.stubGlobal('matchMedia', () => ({ matches: false })));
  afterEach(() => vi.unstubAllGlobals());

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const target = el.querySelector('#cel') as HTMLElement;
    target.scrollIntoView = vi.fn();
    return { el, target, links: el.querySelectorAll('a') };
  }

  it('az azonosítóból készíti a href-et', () => {
    expect(render().links[0].getAttribute('href')).toBe('#cel');
  });

  it('kattintásra az elemhez görget, és megakadályozza az alapértelmezett ugrást', () => {
    const { target, links } = render();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    links[0].dispatchEvent(event);
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(event.defaultPrevented).toBe(true);
  });

  it('mozgáscsökkentésnél nem animál', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const { target, links } = render();
    links[0].click();
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  });

  it('a fókuszálható célt fókuszba is hozza', () => {
    const { el } = render();
    const main = el.querySelector('#fo') as HTMLElement;
    main.scrollIntoView = vi.fn();
    const focus = vi.spyOn(main, 'focus');
    (el.querySelectorAll('a')[2] as HTMLAnchorElement).click();
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('hiányzó célnál nem csinál semmit', () => {
    const { links } = render();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    links[1].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});
