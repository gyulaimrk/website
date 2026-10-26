import { TestBed } from '@angular/core/testing';
import { ThemeService } from '../../core/theme.service';
import { contentHu } from '../../data/content';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => vi.unstubAllGlobals());

  it('switches on click, and its label names the next mode', () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe(contentHu.ui.toggles.toLight);
    button.click();
    fixture.detectChanges();
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(button.getAttribute('aria-label')).toBe(contentHu.ui.toggles.toDark);
  });
});
