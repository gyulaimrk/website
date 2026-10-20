import { Component, input } from '@angular/core';

export type IslandTone = 'foam' | 'sun' | 'mint' | 'coral';
export type IslandShape = 1 | 2 | 3 | 4;

/** Kitöltött, szerves formájú "sziget": a tartalom hordozója a tengeren. */
@Component({
  selector: 'app-island',
  templateUrl: './island.html',
  styleUrl: './island.scss',
  host: {
    '[class]': '"tone-" + tone() + " shape-" + shape()',
  },
})
export class Island {
  readonly tone = input<IslandTone>('foam');
  readonly shape = input<IslandShape>(1);
}
