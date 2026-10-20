import { Component } from '@angular/core';
import { jobs } from '../../data/content';
import { IslandShape, IslandTone } from '../../shared/island/island';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { RouteStop } from './route-stop/route-stop';

/** A pályafutás útvonala: az időrend (legfrissebb elöl) szigetről szigetre vezet. */
@Component({
  selector: 'app-route',
  imports: [RouteStop, SectionHeading],
  templateUrl: './route.html',
  styleUrl: './route.scss',
})
export class Route {
  protected readonly jobs = jobs;
  protected readonly tones: IslandTone[] = ['sun', 'foam', 'mint', 'foam'];

  protected shapeFor(index: number): IslandShape {
    return ((index % 4) + 1) as IslandShape;
  }
}
