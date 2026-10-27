import { Component, input } from '@angular/core';

/** A button as a link: `<a appButton href="...">Label</a>`. Primary (gradient) or ghost variant. */
@Component({
  selector: 'a[appButton]',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class.ghost]': 'variant() === "ghost"',
    '[class.small]': 'size() === "small"',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': 'external() ? "noopener" : null',
  },
})
export class Button {
  readonly variant = input<'primary' | 'ghost'>('primary');
  readonly size = input<'normal' | 'small'>('normal');
  /** Opens in a new tab. */
  readonly external = input(false);
}
