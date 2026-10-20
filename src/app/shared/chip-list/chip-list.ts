import { Component, input } from '@angular/core';

/** Címkék (technológiák) sora; a kiválasztott címke kiemelve. */
@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.html',
  styleUrl: './chip-list.scss',
})
export class ChipList {
  readonly items = input.required<readonly string[]>();
  readonly active = input<string | null>(null);
}
