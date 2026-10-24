import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  function scrollTo(y: number) {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    window.dispatchEvent(new Event('scroll'));
  }

  it('csak lejjebb görgetve jelenik meg, és az oldal tetejére mutat', () => {
    const fixture = TestBed.createComponent(BackToTop);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.classList).not.toContain('visible');
    expect(link.getAttribute('href')).toBe('#top');
    expect(link.getAttribute('aria-label')).toBe(contentHu.ui.backToTop);

    scrollTo(1200);
    fixture.detectChanges();
    expect(link.classList).toContain('visible');
    scrollTo(0);
    fixture.detectChanges();
    expect(link.classList).not.toContain('visible');
  });
});
