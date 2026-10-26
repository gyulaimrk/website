import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { NotFound } from './not-found';

describe('NotFound', () => {
  it('informs in both languages and leads to both home pages', () => {
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

  it('marks the page against indexing and also sets the title', () => {
    TestBed.createComponent(NotFound).detectChanges();
    expect(TestBed.inject(Title).getTitle()).toContain('404');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex');
  });
});
