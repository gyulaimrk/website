import { Component } from '@angular/core';
import { jobs } from '../../data/content';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { JobCard } from './job-card/job-card';

/** Idővonal: a legfrissebb munkahely elöl, mert az időrend valódi sorrend. */
@Component({
  selector: 'app-experience',
  imports: [JobCard, Reveal, SectionHeading],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly jobs = jobs;
}
