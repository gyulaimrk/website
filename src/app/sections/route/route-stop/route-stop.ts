import { Component, input } from '@angular/core';
import { Job } from '../../../data/models';
import { ChipList } from '../../../shared/chip-list/chip-list';
import { Island } from '../../../shared/island/island';

/** Egy munkahely a térképen: a szigeten a szerep, az időszak, a projektek és a technológiák. */
@Component({
  selector: 'app-route-stop',
  imports: [ChipList, Island],
  templateUrl: './route-stop.html',
  styleUrl: './route-stop.scss',
})
export class RouteStop {
  readonly job = input.required<Job>();
  readonly tone = input<'foam' | 'sun' | 'mint' | 'coral'>('foam');
  readonly shape = input<1 | 2 | 3 | 4>(1);
}
