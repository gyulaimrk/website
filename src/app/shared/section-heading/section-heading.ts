import { Component, input } from '@angular/core';
import { Reveal } from '../reveal/reveal.directive';

/** Szekciócím egy rövid, magyarázó bevezetővel. */
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
