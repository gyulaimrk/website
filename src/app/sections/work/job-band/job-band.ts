import { Component, input } from '@angular/core';
import { Job } from '../../../data/models';
import { Art } from '../../../shared/art/art';
import { ChipList } from '../../../shared/chip-list/chip-list';

/** Egy munkahely "mappája": füles sáv, grafika, leírás, projektek és technológiák. */
@Component({
  selector: 'app-job-band',
  imports: [Art, ChipList],
  templateUrl: './job-band.html',
  styleUrl: './job-band.scss',
  host: {
    '[class]': '"tone" + (index() % 4)',
    '[class.dim]': 'dimmed()',
    '[style.--i]': 'index()',
  },
})
export class JobBand {
  readonly job = input.required<Job>();
  readonly index = input(0);
  readonly dimmed = input(false);
  readonly activeTech = input<string | null>(null);
}
