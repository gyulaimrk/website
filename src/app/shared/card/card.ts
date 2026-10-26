import { Component, input } from '@angular/core';

/** A glass-effect card; the featured variant has a gradient border. */
@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  host: { '[class.featured]': 'featured()' },
})
export class Card {
  readonly featured = input(false);
}
