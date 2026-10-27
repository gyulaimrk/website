import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, inject, input } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { prefersReducedMotion } from '../../core/prefers-reduced-motion';

/**
 * In-page jump to an element: `<a appAnchor="rolam">`.
 *
 * A plain `href="#id"` would lead to the root address because of `<base href="/">`. So the `href` is the real
 * address of the language (`/hu#id`), which leads to the right page even without scripting; the click is handled here, and the
 * browser scrolls to the element without touching the route.
 */
@Directive({
  selector: 'a[appAnchor]',
  host: { '[attr.href]': '"/" + language.lang() + "#" + appAnchor()' },
})
export class AnchorLink {
  /** The id of the target element, without `#`. */
  readonly appAnchor = input.required<string>();
  private readonly document = inject(DOCUMENT);
  protected readonly language = inject(LanguageService);

  @HostListener('click', ['$event'])
  protected onClick(event: Event) {
    const target = this.document.getElementById(this.appAnchor());
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    // A focusable target (for example the content that the skip link jumps to) also receives focus
    if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
  }
}
