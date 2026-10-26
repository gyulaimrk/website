import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Card } from '../../shared/card/card';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [Card, Reveal, SectionHeading],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly content = inject(ContentService).content;
  protected readonly facts = computed(() => {
    const { profile, ui } = this.content();
    return [
      { label: ui.about.facts.location, values: [profile.location] },
      { label: ui.about.facts.role, values: [profile.role] },
      { label: ui.about.facts.languages, values: profile.languages },
      { label: ui.about.facts.license, values: [profile.license] },
      { label: ui.about.facts.email, values: [profile.email] },
    ];
  });
}
