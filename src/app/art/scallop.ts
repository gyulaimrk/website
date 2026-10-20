import { Component, input } from '@angular/core';

/** Fogazott él: kitöltött félkörök sora, a lap színében. */
@Component({
  selector: 'app-scallop',
  template: `
    <svg width="100%" height="16" aria-hidden="true" [class.up]="up()">
      <defs>
        <pattern id="sc" width="32" height="16" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="0" r="16" />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill="url(#sc)" />
    </svg>
  `,
  styles: `
    :host { display: block; line-height: 0; }
    svg { fill: var(--paper); }
    svg.up { transform: scaleY(-1); }
  `,
})
export class Scallop {
  readonly up = input(false);
}
