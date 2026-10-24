import { Injectable, effect, signal } from '@angular/core';
import { LANGS } from '../data/content';
import { Lang } from '../data/models';
import { readStored, writeStored } from './storage';

const KEY = 'lang';

/** Az oldal nyelve; a választást megjegyzi, alapból a böngésző nyelvét követi. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(readStored(KEY, LANGS) ?? this.browserLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      writeStored(KEY, lang);
    });
  }

  toggle() {
    this.lang.update((lang) => (lang === 'hu' ? 'en' : 'hu'));
  }

  private browserLang(): Lang {
    return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('hu')
      ? 'hu'
      : 'en';
  }
}
