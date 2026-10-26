import { Component, input } from '@angular/core';

/** A row of chips (technologies). */
@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.html',
  styleUrl: './chip-list.scss',
})
export class ChipList {
  readonly items = input.required<readonly string[]>();
}
