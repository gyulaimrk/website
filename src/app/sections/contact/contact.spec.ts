import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Contact } from './contact';

describe('Contact', () => {
  it('LinkedIn, önéletrajz-letöltés és e-mail gombot ad', () => {
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

  it('az önéletrajz gomb letöltésre van jelölve', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const cv = fixture.nativeElement.querySelector(`a[href="${contentHu.profile.cv}"]`);
    expect(cv.hasAttribute('download')).toBe(true);
    expect(cv.textContent).toContain(contentHu.ui.contact.cv);
  });
});
