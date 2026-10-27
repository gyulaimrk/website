import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Card } from '../../shared/card/card';
import { ChipList } from '../../shared/chip-list/chip-list';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-skills',
  imports: [Card, ChipList, Reveal, SectionHeading],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly content = inject(ContentService).content;
}
