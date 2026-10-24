import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { NotFound } from './not-found';

describe('NotFound', () => {
  it('mindkét nyelven tájékoztat, és mindkét főoldalra visz', () => {
    const fixture = TestBed.createComponent(NotFound);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('nem található');
    expect(el.textContent).toContain('could not be found');
    expect([...el.querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual([
      '/hu',
      '/en',
    ]);
  });

  it('indexelés ellen jelöli az oldalt, és a címet is beállítja', () => {
    TestBed.createComponent(NotFound).detectChanges();
    expect(TestBed.inject(Title).getTitle()).toContain('404');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex');
  });
});
