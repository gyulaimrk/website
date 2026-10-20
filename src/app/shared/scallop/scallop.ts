import { Component, input } from '@angular/core';

/** Fogazott él: kitöltött félkörök sora a lap színében. */
@Component({
  selector: 'app-scallop',
  templateUrl: './scallop.html',
  styleUrl: './scallop.scss',
})
export class Scallop {
  /** Felfelé néző fogak (lábléc teteje). */
  readonly up = input(false);
}
