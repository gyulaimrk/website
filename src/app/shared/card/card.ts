import { Component, input } from '@angular/core';

/** Üveghatású kártya; kiemelt változatnak színátmenetes kerete van. */
@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  host: { '[class.featured]': 'featured()' },
})
export class Card {
  readonly featured = input(false);
}
