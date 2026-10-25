import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, effect, inject, input } from '@angular/core';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

const DURATION_MS = 1100;

/** A szövegben lévő egész számokat a `progress` (0–1) arányában mutatja: „8–25” felénél „4–13”. */
export function scaleNumbers(text: string, progress: number): string {
  return text.replace(/\d+/g, (digits) => String(Math.round(Number(digits) * progress)));
}

/**
 * A szövegben lévő számok 0-ról a végértékig nőnek, amikor az elem először a képernyőre ér:
 * `<strong [appCountUp]="'5+'">5+</strong>`.
 *
 * A kiszolgált HTML, a szkript nélküli látogató, a mozgáscsökkentést kérő látogató és a nyomtatás
 * a végértéket látja; az animáció csak a böngészőben, a látható területre érve indul.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  /** A végérték szövegként, például `5+` vagy `8–25`. */
  readonly appCountUp = input.required<string>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect((onCleanup) => {
      const target = this.appCountUp();
      if (!this.browser || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
        return;
      }

      // Az Angular saját szövegcsomópontját írjuk, nem cseréljük le, hogy a kötés tovább működjön.
      const node = this.el.firstChild;
      if (node?.nodeType !== Node.TEXT_NODE) return;

      let frame = 0;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - started) / DURATION_MS, 1);
          const eased = 1 - (1 - t) ** 3;
          node.nodeValue = t < 1 ? scaleNumbers(target, eased) : target;
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      });
      observer.observe(this.el);

      onCleanup(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
