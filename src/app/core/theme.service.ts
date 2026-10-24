import { Injectable, effect, signal } from '@angular/core';
import { readStored, writeStored } from './storage';

export type Theme = 'dark' | 'light';
const KEY = 'theme';
const THEMES: readonly Theme[] = ['dark', 'light'];

/** Világos és sötét téma; a választást megjegyzi, alapból a rendszerbeállítást követi. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(readStored(KEY, THEMES) ?? this.systemTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.dataset['theme'] = theme;
      writeStored(KEY, theme);
    });
  }

  toggle() {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private systemTheme(): Theme {
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
