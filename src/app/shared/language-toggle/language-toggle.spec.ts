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

  it('a másik nyelv kódját mutatja, és a felirata megnevezi a váltást', () => {
    const { button } = render();
    expect(button.textContent?.trim()).toBe(contentHu.ui.toggles.otherLanguageCode);
    expect(button.getAttribute('aria-label')).toBe(
      `${contentHu.ui.toggles.otherLanguageCode}: ${contentHu.ui.toggles.toOtherLanguage}`,
    );
  });

  it('kattintásra a másik nyelv címére navigál', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    render().button.click();
    expect(navigate).toHaveBeenCalledWith('/en', expect.anything());
  });

  it('angol oldalon a magyar váltót mutatja', () => {
    TestBed.inject(LanguageService).use('en');
    const { fixture, button } = render();
    fixture.detectChanges();
    expect(button.textContent?.trim()).toBe(contentEn.ui.toggles.otherLanguageCode);
  });
});
