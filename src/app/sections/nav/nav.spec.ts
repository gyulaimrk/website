import { TestBed } from '@angular/core/testing';
import { ScrollSpyService } from '../../core/scroll-spy.service';
import { contentHu } from '../../data/content';
import { Nav } from './nav';

describe('Nav', () => {
  beforeEach(() => vi.stubGlobal('matchMedia', () => ({ matches: false })));
  afterEach(() => vi.unstubAllGlobals());

  function render() {
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('shows the monogram, the name, the menu items and the contact button', () => {
    const { el } = render();
    expect(el.querySelector('.logo')?.textContent).toBe('GM');
    expect(el.querySelector('.name')?.textContent).toBe(contentHu.profile.name);
    expect(el.querySelectorAll('nav a').length).toBe(contentHu.ui.nav.links.length);
    expect(el.querySelector('a[appButton]')?.getAttribute('href')).toBe('/hu#kapcsolat');
  });

  it('the brand link’s name contains the visible name and its purpose, without aria-label', () => {
    const brand = render().el.querySelector('.brand') as HTMLElement;
    expect(brand.hasAttribute('aria-label')).toBe(false);
    expect(brand.querySelector('.name')?.textContent).toBe(contentHu.profile.name);
    expect(brand.querySelector('.logo')?.getAttribute('aria-hidden')).toBe('true');
    expect(brand.querySelector('.name')?.getAttribute('aria-hidden')).toBe('true');
    expect(brand.querySelector('.sr-only')?.textContent).toBe(
      `${contentHu.profile.name}: ${contentHu.ui.nav.home}`,
    );
  });

  it('the Escape key closes the mobile menu', () => {
    const { fixture, el } = render();
    (el.querySelector('.burger') as HTMLButtonElement).click();
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('nav')?.classList).not.toContain('open');
  });

  it('marks the menu item of the active section', () => {
    const { fixture, el } = render();
    TestBed.inject(ScrollSpyService).active.set('tapasztalat');
    fixture.detectChanges();
    const current = [...el.querySelectorAll('nav a')].filter(
      (a) => a.getAttribute('aria-current') === 'true',
    );
    expect(current.map((a) => a.getAttribute('href'))).toEqual(['/hu#tapasztalat']);
  });

  it('the mobile menu opens with its button and closes on clicking a link', () => {
    const { fixture, el } = render();
    const burger = el.querySelector('.burger') as HTMLButtonElement;
    expect(burger.getAttribute('aria-expanded')).toBe('false');
    burger.click();
    fixture.detectChanges();
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('nav')?.classList).toContain('open');
    (el.querySelector('nav a') as HTMLAnchorElement).click();
    fixture.detectChanges();
    expect(el.querySelector('nav')?.classList).not.toContain('open');
  });
});
