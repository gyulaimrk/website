import { Component } from '@angular/core';
import { Reveal } from '../reveal/reveal.directive';

/** Szekciócím belépő animációval. */
@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
})
export class SectionHeading {}
