import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../core/language.service';
import { contentEn, contentHu } from '../../data/content';
import { LanguageToggle } from './language-toggle';

describe('LanguageToggle', () => {
  it('a másik nyelv kódját mutatja, és kattintásra vált', () => {
    const fixture = TestBed.createComponent(LanguageToggle);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe(contentHu.ui.toggles.otherLanguageCode);
    expect(button.getAttribute('aria-label')).toBe(
      `${contentHu.ui.toggles.otherLanguageCode}: ${contentHu.ui.toggles.toOtherLanguage}`,
    );

    button.click();
    fixture.detectChanges();
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
    expect(button.textContent?.trim()).toBe(contentEn.ui.toggles.otherLanguageCode);
  });
});
