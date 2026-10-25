import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LANGS } from '../data/content';
import { Lang } from '../data/models';
import { readStored, writeStored } from './storage';

const KEY = 'lang';

/**
 * Az oldal nyelve. A nyelv az útvonalból következik (`/hu`, `/en`), a `lang` jelet az
 * útvonal őre állítja be. A látogató tudatosan választott nyelve csak a gyökércím átirányításához
 * kell, ezért külön megjegyezzük.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly current = signal<Lang>('hu');
  /** Az útvonal által beállított nyelv; amíg nincs útvonal-nyelv, magyar. */
  readonly lang = this.current.asReadonly();
  constructor() {
    effect(() => {
      const lang = this.lang();
      this.document.documentElement.lang = lang;
    });
  }

  /** Beállítja az oldal nyelvét (az útvonal őre hívja). */
  use(lang: Lang): void {
    this.current.set(lang);
  }

  /** A látogató nyelve: a megjegyzett választás, különben a böngésző nyelve. */
  preferred(): Lang {
    return readStored(KEY, LANGS) ?? this.browserLang();
  }

  /** A másik nyelv, amelyre a váltó átvisz. */
  other(): Lang {
    return this.lang() === 'hu' ? 'en' : 'hu';
  }

  /** Átvisz a megadott nyelv címére. */
  navigateTo(lang: Lang, options: { replaceUrl?: boolean } = {}): Promise<boolean> {
    return this.router.navigateByUrl(`/${lang}`, {
      ...options,
      skipLocationChange: environment.inMemoryRouting,
    });
  }

  /** A látogató tudatos váltása: ezt jegyezzük meg a gyökércím átirányításához. */
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
