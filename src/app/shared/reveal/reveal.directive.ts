import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

/** Entrance animation: once, when the element reaches the screen. With reduced motion it shows immediately. */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnInit, OnDestroy {
  /** Delay in steps (1 step = 80ms). */
  readonly appReveal = input(0, { transform: (value: unknown) => numberAttribute(value, 0) });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit() {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    this.el.style.setProperty('--rv-delay', `${this.appReveal() * 80}ms`);
    this.el.classList.add('rv');
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.el.classList.add('rv-in');
        this.observer?.disconnect();
      },
      { threshold: 0.12 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
