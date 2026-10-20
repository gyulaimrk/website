import { Component } from '@angular/core';
import { studies } from '../../data/content';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-studies',
  imports: [Reveal, SectionHeading],
  templateUrl: './studies.html',
  styleUrl: './studies.scss',
})
export class Studies {
  protected readonly studies = studies;
}
