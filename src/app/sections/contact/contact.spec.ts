import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Contact } from './contact';

describe('Contact', () => {
  it('gives LinkedIn, résumé download and email buttons', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const hrefs = [...fixture.nativeElement.querySelectorAll('a[appButton]')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual([
      contentHu.profile.linkedin,
      contentHu.profile.cv,
      `mailto:${contentHu.profile.email}`,
    ]);
  });

  it('the résumé button is marked for download', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const cv = fixture.nativeElement.querySelector(`a[href="${contentHu.profile.cv}"]`);
    expect(cv.hasAttribute('download')).toBe(true);
    expect(cv.textContent).toContain(contentHu.ui.contact.cv);
  });

  it('states what kind of enquiries it is open to', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.availability').textContent).toBe(
      contentHu.ui.contact.availability,
    );
  });
});
