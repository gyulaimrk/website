import { TestBed } from '@angular/core/testing';
import { ThemeService } from '../../core/theme.service';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  it('kattintásra vált, és a felirata a következő módot nevezi meg', () => {
    localStorage.clear();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    const fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Váltás világos módra');
    button.click();
    fixture.detectChanges();
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(button.getAttribute('aria-label')).toBe('Váltás sötét módra');
    vi.unstubAllGlobals();
  });
});
