import { Component, input } from '@angular/core';

/** Lapos gomb linkként: `<a appButton href="...">Felirat</a>`. */
@Component({
  selector: 'a[appButton]',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class.ink]': 'variant() === "ink"',
    '[class.small]': 'size() === "small"',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': 'external() ? "noopener" : null',
  },
})
export class Button {
  readonly variant = input<'accent' | 'ink'>('accent');
  readonly size = input<'normal' | 'small'>('normal');
  /** Új lapon nyílik meg. */
  readonly external = input(false);
}
