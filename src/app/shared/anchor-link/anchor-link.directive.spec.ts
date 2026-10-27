import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnchorLink } from './anchor-link.directive';

@Component({
  imports: [AnchorLink],
  template: `
    <a appAnchor="target">Jump</a>
    <a appAnchor="missing">Missing</a>
    <section id="target"></section>
    <main id="main" tabindex="-1"></main>
    <a appAnchor="main">Skip</a>
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
    const target = el.querySelector('#target') as HTMLElement;
    target.scrollIntoView = vi.fn();
    return { el, target, links: el.querySelectorAll('a') };
  }

  it('builds the href from the id', () => {
    expect(render().links[0].getAttribute('href')).toBe('/hu#target');
  });

  it('on click it scrolls to the element and prevents the default jump', () => {
    const { target, links } = render();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    links[0].dispatchEvent(event);
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(event.defaultPrevented).toBe(true);
  });

  it('with reduced motion it does not animate', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const { target, links } = render();
    links[0].click();
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  });

  it('also moves focus to a focusable target', () => {
    const { el } = render();
    const main = el.querySelector('#main') as HTMLElement;
    main.scrollIntoView = vi.fn();
    const focus = vi.spyOn(main, 'focus');
    (el.querySelectorAll('a')[2] as HTMLAnchorElement).click();
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('does nothing for a missing target', () => {
    const { links } = render();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    links[1].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});
