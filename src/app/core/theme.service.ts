import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, effect, inject, signal } from '@angular/core';
import { readStored, writeStored } from './storage';

export type Theme = 'dark' | 'light';
const KEY = 'theme';
const THEMES: readonly Theme[] = ['dark', 'light'];

/**
 * Light and dark theme. The first render is always dark, so the server and the
 * browser build the same HTML (hydration); the saved or system theme is applied
 * afterwards. A small script in `index.html` sets the `data-theme` attribute before
 * the first paint, so the visitor sees no flash.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<Theme>('dark');
  private readonly ready = signal(false);
  /** The visitor already chose before the first render ran: their decision stays. */
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
    });
  }

  /** The visitor's deliberate switch: only this is remembered, not the system theme. */
  toggle() {
    this.chosen = true;
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    writeStored(KEY, next);
  }

  private systemTheme(): Theme {
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
