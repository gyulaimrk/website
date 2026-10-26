import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { contentEn, contentHu } from '../../data/content';
import { LanguageToggle } from './language-toggle';

describe('LanguageToggle', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  function render() {
    const fixture = TestBed.createComponent(LanguageToggle);
    fixture.detectChanges();
    return { fixture, button: fixture.nativeElement.querySelector('button') as HTMLButtonElement };
  }

  it('shows the code of the other language, and its label names the switch', () => {
    const { button } = render();
    expect(button.textContent?.trim()).toBe(contentHu.ui.toggles.otherLanguageCode);
    expect(button.getAttribute('aria-label')).toBe(
      `${contentHu.ui.toggles.otherLanguageCode}: ${contentHu.ui.toggles.toOtherLanguage}`,
    );
  });

  it('on click it navigates to the address of the other language', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    render().button.click();
    expect(navigate).toHaveBeenCalledWith('/en', expect.anything());
  });

  it('on the English page it shows the Hungarian toggle', () => {
    TestBed.inject(LanguageService).use('en');
    const { fixture, button } = render();
    fixture.detectChanges();
    expect(button.textContent?.trim()).toBe(contentEn.ui.toggles.otherLanguageCode);
  });
});
