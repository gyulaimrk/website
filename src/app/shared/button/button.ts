import { Component, input } from '@angular/core';

/** Gomb linkként: `<a appButton href="...">Felirat</a>`. Elsődleges (színátmenetes) vagy szellem változat. */
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
  /** Új lapon nyílik meg. */
  readonly external = input(false);
}
