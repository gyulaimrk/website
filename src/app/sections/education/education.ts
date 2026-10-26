import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Button } from '../../shared/button/button';
import { Card } from '../../shared/card/card';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { StudyItem } from './study-item/study-item';

@Component({
  selector: 'app-education',
  imports: [Button, Card, Reveal, SectionHeading, StudyItem],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  protected readonly content = inject(ContentService).content;
  private readonly studies = computed(() => this.content().studies);
  protected readonly education = computed(() =>
    this.studies().filter((s) => s.kind === 'education'),
  );
  protected readonly featuredCertificates = computed(() =>
    this.studies().filter((s) => s.kind === 'certificate' && s.featured),
  );
  protected readonly certificates = computed(() =>
    this.studies().filter((s) => s.kind === 'certificate' && !s.featured),
  );

  /** All certificates on the LinkedIn profile (the link of each certificate is `Study.url`). */
  protected readonly allCertificatesUrl = computed(
    () => `${this.content().profile.linkedin}/details/certifications/`,
  );
}
