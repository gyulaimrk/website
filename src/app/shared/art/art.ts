import { Component, input } from '@angular/core';
import { ArtKind } from '../../data/models';

/** Kódból rajzolt, lapos grafikák: egy színvilág, vastag vonalak, nincs színátmenet. */
@Component({
  selector: 'app-art',
  templateUrl: './art.html',
  styleUrl: './art.scss',
})
export class Art {
  readonly kind = input.required<ArtKind>();
  readonly label = input('Illusztráció');
}
