import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LANGS } from '../data/content';
import { Lang } from '../data/models';
import { readStored, writeStored } from './storage';

const KEY = 'lang';

/**
 * The language of the page. The language follows from the route (`/hu`, `/en`); the `lang` signal is set by the
 * route guard. The language the visitor chose deliberately is only needed for redirecting the root address,
 * so it is remembered separately.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly current = signal<Lang>('hu');
  /** The language set by the route; Hungarian until there is a route language. */
  readonly lang = this.current.asReadonly();
  constructor() {
    effect(() => {
      const lang = this.lang();
      this.document.documentElement.lang = lang;
    });
  }

  /** Sets the page language (called by the route guard). */
  use(lang: Lang): void {
    this.current.set(lang);
  }

  /** The visitor's language: the remembered choice, otherwise the browser language. */
  preferred(): Lang {
    return readStored(KEY, LANGS) ?? this.browserLang();
  }

  /** The other language, which the toggle switches to. */
  other(): Lang {
    return this.lang() === 'hu' ? 'en' : 'hu';
  }

  /** Navigates to the address of the given language. */
  navigateTo(lang: Lang, options: { replaceUrl?: boolean } = {}): Promise<boolean> {
    return this.router.navigateByUrl(`/${lang}`, {
      ...options,
      skipLocationChange: environment.inMemoryRouting,
    });
  }

  /** The visitor's deliberate switch: this is what we remember for redirecting the root address. */
  toggle(): Promise<boolean> {
    const next = this.other();
    writeStored(KEY, next);
    return this.navigateTo(next);
  }

  private browserLang(): Lang {
    return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('hu')
      ? 'hu'
      : 'en';
  }
}
