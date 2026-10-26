import { Injectable, computed, inject } from '@angular/core';
import { CONTENTS } from '../data/content';
import { LanguageService } from './language.service';

/** The content of the current language; components read from here, not from the raw data files. */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly language = inject(LanguageService);
  readonly content = computed(() => CONTENTS[this.language.lang()]);
}
