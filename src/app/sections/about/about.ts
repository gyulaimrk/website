import { Component } from '@angular/core';
import { profile, studies } from '../../data/content';
import { Island } from '../../shared/island/island';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [Island, SectionHeading],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly profile = profile;
  protected readonly studies = studies;
}
