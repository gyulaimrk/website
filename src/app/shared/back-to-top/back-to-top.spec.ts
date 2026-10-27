import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  function scrollTo(y: number) {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    window.dispatchEvent(new Event('scroll'));
  }

  it('appears only when scrolled further down, and points to the top of the page', () => {
    const fixture = TestBed.createComponent(BackToTop);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.classList).not.toContain('visible');
    expect(link.getAttribute('aria-hidden')).toBe('true');
    expect(link.getAttribute('href')).toBe('/hu#top');
    expect(link.getAttribute('aria-label')).toBe(contentHu.ui.backToTop);

    scrollTo(1200);
    fixture.detectChanges();
    expect(link.classList).toContain('visible');
    expect(link.hasAttribute('aria-hidden')).toBe(false);
    scrollTo(0);
    fixture.detectChanges();
    expect(link.classList).not.toContain('visible');
  });
});
