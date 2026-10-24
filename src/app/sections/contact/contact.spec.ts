import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Contact } from './contact';

describe('Contact', () => {
  it('LinkedIn és e-mail gombot ad', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const hrefs = [...fixture.nativeElement.querySelectorAll('a[appButton]')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual([contentHu.profile.linkedin, `mailto:${contentHu.profile.email}`]);
  });
});
