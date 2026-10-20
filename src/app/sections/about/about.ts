import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { Scallop } from '../../shared/scallop/scallop';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [Button, Reveal, Scallop, SectionHeading],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly profile = profile;
}
