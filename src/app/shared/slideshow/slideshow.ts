import { Component, effect, input, signal } from '@angular/core';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';
import { ArtKind } from '../../data/models';
import { Art } from '../art/art';

/** Lassan egymásba úszó grafikák; elrejtett lapnál és mozgáscsökkentésnél áll. */
@Component({
  selector: 'app-slideshow',
  imports: [Art],
  templateUrl: './slideshow.html',
  styleUrl: './slideshow.scss',
})
export class Slideshow {
  readonly kinds = input.required<readonly ArtKind[]>();
  /** Egy kép időtartama ezredmásodpercben. */
  readonly interval = input(6000);

  protected readonly active = signal(0);

  constructor() {
    if (prefersReducedMotion()) return;
    effect((onCleanup) => {
      const id = setInterval(() => {
        if (!document.hidden) this.active.update((i) => (i + 1) % this.kinds().length);
      }, this.interval());
      onCleanup(() => clearInterval(id));
    });
  }
}
