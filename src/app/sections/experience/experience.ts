import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { JobCard } from './job-card/job-card';

/** Timeline: the most recent employer first, because chronological order is a real order. */
@Component({
  selector: 'app-experience',
  imports: [JobCard, Reveal, SectionHeading],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly content = inject(ContentService).content;
}
