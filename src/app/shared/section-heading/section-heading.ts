import { Component, input } from '@angular/core';
import { Reveal } from '../reveal/reveal.directive';

/** A section heading with a short explanatory lead. */
@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly lead = input('');
}
