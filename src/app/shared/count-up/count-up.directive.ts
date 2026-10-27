import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, effect, inject, input } from '@angular/core';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

const DURATION_MS = 1100;

/** Shows the whole numbers in the text in proportion to `progress` (0–1): at half of “8–25” it shows “4–13”. */
export function scaleNumbers(text: string, progress: number): string {
  return text.replace(/\d+/g, (digits) => String(Math.round(Number(digits) * progress)));
}

/**
 * The numbers in the text grow from 0 to their final value when the element first reaches the screen:
 * `<strong [appCountUp]="'5+'">5+</strong>`.
 *
 * The served HTML, a visitor without scripting, a visitor who asked for reduced motion and printing
 * all see the final value; the animation only starts in the browser, on reaching the visible area.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  /** The final value as text, for example `5+` or `8–25`. */
  readonly appCountUp = input.required<string>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect((onCleanup) => {
      const target = this.appCountUp();
      if (!this.browser || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
        return;
      }

      // We write Angular's own text node instead of replacing it, so the binding keeps working.
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
