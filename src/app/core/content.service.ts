import { Injectable, computed, inject } from '@angular/core';
import { CONTENTS } from '../data/content';
import { LanguageService } from './language.service';

/** Az aktuális nyelv tartalma; a komponensek innen olvasnak, nem a nyers adatfájlokból. */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly language = inject(LanguageService);
  readonly content = computed(() => CONTENTS[this.language.lang()]);
}
