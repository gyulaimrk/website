import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, inject, input } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

/**
 * Oldalon belüli ugrás egy elemre: `<a appAnchor="rolam">`.
 *
 * A sima `href="#id"` a `<base href="/">` miatt a gyökércímre vinne. Ezért a `href` a nyelv valódi
 * címe (`/hu#id`), így szkript nélkül is a jó oldalra visz; a kattintást itt kezeljük, és a
 * böngésző az útvonal érintése nélkül az elemhez görget.
 */
@Directive({
  selector: 'a[appAnchor]',
  host: { '[attr.href]': '"/" + language.lang() + "#" + appAnchor()' },
})
export class AnchorLink {
  /** A cél elem azonosítója, `#` nélkül. */
  readonly appAnchor = input.required<string>();
  private readonly document = inject(DOCUMENT);
  protected readonly language = inject(LanguageService);

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
