import { Component } from '@angular/core';
import { studies } from '../../data/content';
import { Card } from '../../shared/card/card';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-education',
  imports: [Card, Reveal, SectionHeading],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  protected readonly education = studies.filter((s) => s.kind === 'education');
  protected readonly certificates = studies.filter((s) => s.kind === 'certificate');
}
