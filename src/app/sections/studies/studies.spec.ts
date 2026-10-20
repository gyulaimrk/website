import { TestBed } from '@angular/core/testing';
import { studies } from '../../data/content';
import { Studies } from './studies';

describe('Studies', () => {
  it('minden tanulmányt kilistáz, az évszámot csak ha van', () => {
    const fixture = TestBed.createComponent(Studies);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li') as NodeListOf<HTMLElement>;
    expect(items.length).toBe(studies.length);
    studies.forEach((study, i) => {
      const text = items[i].querySelector('p')?.textContent ?? '';
      expect(text.includes('·')).toBe(Boolean(study.period));
    });
  });
});
