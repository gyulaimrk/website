import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Footer } from './footer';

describe('Footer', () => {
  it('az elérhetőségeket és az aktuális évet mutatja', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hrefs = [...el.querySelectorAll('nav a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([contentHu.profile.linkedin, `mailto:${contentHu.profile.email}`]);
    expect(el.querySelector('nav')?.textContent).not.toContain('GitHub');
    expect(el.textContent).toContain(String(new Date().getFullYear()));
  });
});
