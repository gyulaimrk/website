import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, effect, inject, input, linkedSignal } from '@angular/core';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

/**
 * Types and deletes words. The server and a visitor who asked for reduced motion see the first
 * word without typing; so the served HTML is complete too.
 */
@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.html',
  styleUrl: './typewriter.scss',
})
export class Typewriter {
  readonly words = input.required<readonly string[]>();
  protected readonly text = linkedSignal(() => this.words()[0] ?? '');
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect((onCleanup) => {
      const words = this.words();
      if (!this.browser || prefersReducedMotion() || words.length === 0) return;
      let index = 0;
      let length = 0;
      let deleting = false;
      let timer: ReturnType<typeof setTimeout>;

      const tick = () => {
        const word = words[index];
        length += deleting ? -1 : 1;
        this.text.set(word.slice(0, length));
        let delay = deleting ? DELETE_MS : TYPE_MS;
        if (!deleting && length === word.length) {
          deleting = true;
          delay = HOLD_MS;
        } else if (deleting && length === 0) {
          deleting = false;
          index = (index + 1) % words.length;
        }
        timer = setTimeout(tick, delay);
      };

      timer = setTimeout(tick, TYPE_MS);
      onCleanup(() => clearTimeout(timer));
    });
  }
}
