import { Component, signal } from '@angular/core';
import { filterTech, jobs } from '../../data/content';
import { Job } from '../../data/models';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { FilterBar } from './filter-bar/filter-bar';
import { JobBand } from './job-band/job-band';

@Component({
  selector: 'app-work',
  imports: [SectionHeading, FilterBar, JobBand],
  templateUrl: './work.html',
  styleUrl: './work.scss',
})
export class Work {
  protected readonly jobs = jobs;
  protected readonly filterTech = filterTech;
  protected readonly selected = signal<string | null>(null);

  protected isDimmed(job: Job): boolean {
    const tech = this.selected();
    return tech !== null && !job.tech.includes(tech);
  }
}
