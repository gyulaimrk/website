import { Injectable, OnDestroy, signal } from '@angular/core';

/** Megfigyeli, melyik szekció van éppen a képernyő felső részén. */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService implements OnDestroy {
  /** A látható szekció azonosítója (hash nélkül), vagy üres. */
  readonly active = signal('');
  private observer?: IntersectionObserver;

  observe(sections: readonly Element[]): void {
    this.observer?.disconnect();
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) this.active.set(visible[visible.length - 1].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach((section) => this.observer?.observe(section));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
