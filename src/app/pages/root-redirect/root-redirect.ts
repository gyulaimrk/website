import { Component, afterNextRender, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { LANGS } from '../../data/content';
import { Lang } from '../../data/models';

/**
 * The root address (`/`): in the browser it takes the visitor to their language, while the served HTML
 * contains links to both languages, so search engines and visitors without scripting
 * are not stuck here.
 */
@Component({
  selector: 'app-root-redirect',
  templateUrl: './root-redirect.html',
  styleUrl: './root-redirect.scss',
})
export class RootRedirect {
  private readonly language = inject(LanguageService);
  protected readonly langs: readonly Lang[] = LANGS;

  constructor() {
    afterNextRender(() =>
      this.language.navigateTo(this.language.preferred(), { replaceUrl: true }),
    );
  }
}
