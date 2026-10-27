import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Study } from '../../../data/models';
import { StudyItem } from './study-item';

describe('StudyItem', () => {
  const study: Study = {
    kind: 'certificate',
    title: 'Docker',
    where: 'LinkedIn Learning',
    period: 'January 2024',
  };

  function render(value: Study) {
    const fixture = TestBed.createComponent(StudyItem);
    (fixture.componentRef as ComponentRef<StudyItem>).setInput('study', value);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the title, the issuer and the date', () => {
    const el = render(study);
    expect(el.querySelector('strong')?.textContent).toBe('Docker');
    expect(el.querySelector('span')?.textContent).toBe('LinkedIn Learning, January 2024');
  });

  it('without a link the title is plain text', () => {
    expect(render(study).querySelector('a')).toBeNull();
  });

  it('if it has an address, the title is a link opening in a new tab', () => {
    const link = render({ ...study, url: 'https://example.com/cert' }).querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://example.com/cert');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener');
    expect(link?.textContent).toBe('Docker');
  });

  it('without issuer and date it does not write an empty line', () => {
    expect(render({ ...study, where: '', period: '' }).querySelector('span')).toBeNull();
  });

  it('shows the description only if there is one', () => {
    expect(render(study).querySelector('p')).toBeNull();
    expect(render({ ...study, description: 'Text.' }).querySelector('p')?.textContent).toBe(
      'Text.',
    );
  });
});
