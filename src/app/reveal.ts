import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Belépő animáció: egyszer, amikor az elem a képernyőre ér. Mozgáscsökkentésnél azonnal látszik. */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnInit, OnDestroy {
  readonly appReveal = input<number | ''>(0);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  ngOnInit() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const delay = Number(this.appReveal()) || 0;
    this.el.style.setProperty('--rv-delay', `${delay * 80}ms`);
    this.el.classList.add('rv');
    this.io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          this.el.classList.add('rv-in');
          this.io?.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    this.io.observe(this.el);
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
