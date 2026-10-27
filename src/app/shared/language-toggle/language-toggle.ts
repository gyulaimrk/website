import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { LanguageService } from '../../core/language.service';

/** Language toggle: the button shows the code of the other language. */
@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  protected readonly language = inject(LanguageService);
  protected readonly content = inject(ContentService).content;
}
