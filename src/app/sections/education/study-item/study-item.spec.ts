import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Study } from '../../../data/models';
import { StudyItem } from './study-item';

describe('StudyItem', () => {
  const study: Study = {
    kind: 'certificate',
    title: 'Docker',
    where: 'LinkedIn Learning',
    period: '2024. január',
  };

  function render(value: Study) {
    const fixture = TestBed.createComponent(StudyItem);
    (fixture.componentRef as ComponentRef<StudyItem>).setInput('study', value);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('a címet, a kiállítót és a dátumot mutatja', () => {
    const el = render(study);
    expect(el.querySelector('strong')?.textContent).toBe('Docker');
    expect(el.querySelector('span')?.textContent).toBe('LinkedIn Learning, 2024. január');
  });

  it('link nélkül a cím sima szöveg', () => {
    expect(render(study).querySelector('a')).toBeNull();
  });

  it('ha van címe, a cím új lapon nyíló link', () => {
    const link = render({ ...study, url: 'https://example.com/cert' }).querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://example.com/cert');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener');
    expect(link?.textContent).toBe('Docker');
  });

  it('kiállító és dátum nélkül nem ír üres sort', () => {
    expect(render({ ...study, where: '', period: '' }).querySelector('span')).toBeNull();
  });

  it('a leírást csak akkor mutatja, ha van', () => {
    expect(render(study).querySelector('p')).toBeNull();
    expect(render({ ...study, description: 'Szöveg.' }).querySelector('p')?.textContent).toBe(
      'Szöveg.',
    );
  });
});
