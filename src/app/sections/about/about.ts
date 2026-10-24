import { Component } from '@angular/core';
import { profile } from '../../data/content';
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
  protected readonly profile = profile;
  protected readonly facts = [
    { label: 'Helyszín', value: profile.location },
    { label: 'Szerep', value: profile.role },
    { label: 'Nyelvek', value: profile.languages },
    { label: 'E-mail', value: profile.email },
  ];
}
