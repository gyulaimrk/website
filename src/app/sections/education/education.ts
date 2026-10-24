import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
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
  protected readonly content = inject(ContentService).content;
  private readonly studies = computed(() => this.content().studies);
  protected readonly education = computed(() =>
    this.studies().filter((s) => s.kind === 'education'),
  );
  protected readonly anthropic = computed(() =>
    this.studies().filter((s) => s.kind === 'certificate' && s.featured),
  );
  protected readonly certificates = computed(() =>
    this.studies().filter((s) => s.kind === 'certificate' && !s.featured),
  );
}
