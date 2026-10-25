import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, effect, inject, signal } from '@angular/core';
import { readStored, writeStored } from './storage';

export type Theme = 'dark' | 'light';
const KEY = 'theme';
const THEMES: readonly Theme[] = ['dark', 'light'];

/**
 * Világos és sötét téma. Az első megjelenítés mindig sötét, hogy a kiszolgáló és a
 * böngésző ugyanazt a HTML-t építse (hidratálás); a mentett vagy rendszer szerinti téma
 * ezután kerül rá. Az `index.html` kis szkriptje már a festés előtt beállítja a
 * `data-theme` attribútumot, így a látogató nem lát villanást.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<Theme>('dark');
  private readonly ready = signal(false);
  /** A látogató már választott, mielőtt az első megjelenítés lefutott: az ő döntése marad. */
  private chosen = false;

  constructor() {
    afterNextRender(() => {
      if (!this.chosen) this.theme.set(readStored(KEY, THEMES) ?? this.systemTheme());
      this.ready.set(true);
    });
    effect(() => {
      if (!this.ready()) return;
      const theme = this.theme();
      this.document.documentElement.dataset['theme'] = theme;
      writeStored(KEY, theme);
    });
  }

  toggle() {
    this.chosen = true;
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private systemTheme(): Theme {
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
