import { Component, afterNextRender, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { LANGS } from '../../data/content';
import { Lang } from '../../data/models';

/**
 * A gyökércím (`/`): a böngészőben a látogató nyelvére visz, a kiszolgált HTML-ben
 * pedig mindkét nyelvre mutató linkek vannak, hogy a keresők és a szkript nélküli
 * látogatók se rekedjenek itt.
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
