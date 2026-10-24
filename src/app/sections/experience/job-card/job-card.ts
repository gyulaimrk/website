import { Component, inject, input } from '@angular/core';
import { ContentService } from '../../../core/content.service';
import { Job } from '../../../data/models';
import { Card } from '../../../shared/card/card';
import { ChipList } from '../../../shared/chip-list/chip-list';

/** Egy munkahely kártyája: szerep, időszak, leírás, projektek és technológiák. */
@Component({
  selector: 'app-job-card',
  imports: [Card, ChipList],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  readonly job = input.required<Job>();
  readonly current = input(false);
  protected readonly content = inject(ContentService).content;
}
