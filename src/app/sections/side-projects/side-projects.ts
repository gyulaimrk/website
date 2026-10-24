import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-side-projects',
  imports: [ProjectCard, Reveal, SectionHeading],
  templateUrl: './side-projects.html',
  styleUrl: './side-projects.scss',
})
export class SideProjects {
  protected readonly content = inject(ContentService).content;
}
