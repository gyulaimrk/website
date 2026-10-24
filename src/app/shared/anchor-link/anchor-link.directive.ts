import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, inject, input } from '@angular/core';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

/**
 * Oldalon belüli ugrás egy elemre: `<a appAnchor="rolam">`.
 *
 * A sima `href="#id"` a `<base href="/">` miatt a gyökércímre vinne, ezért a kattintást
 * itt kezeljük: a böngésző az útvonal érintése nélkül az elemhez görget.
 */
@Directive({
  selector: 'a[appAnchor]',
  host: { '[attr.href]': '"#" + appAnchor()' },
})
export class AnchorLink {
  /** A cél elem azonosítója, `#` nélkül. */
  readonly appAnchor = input.required<string>();
  private readonly document = inject(DOCUMENT);

  @HostListener('click', ['$event'])
  protected onClick(event: Event) {
    const target = this.document.getElementById(this.appAnchor());
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    // A fókuszálható cél (például a tartalom, amelyre a kihagyó link ugrik) fókuszt is kap
    if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
  }
}
