import { Component } from '@angular/core';
import { skills } from '../../data/content';
import { Skill } from '../../data/models';
import { Island, IslandShape, IslandTone } from '../../shared/island/island';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Az eszköztár szigetcsoportként: a kiemelt képesség a legnagyobb sziget. */
@Component({
  selector: 'app-archipelago',
  imports: [Island, SectionHeading],
  templateUrl: './archipelago.html',
  styleUrl: './archipelago.scss',
})
export class Archipelago {
  protected readonly skills = skills;
  private readonly tones: IslandTone[] = ['mint', 'foam', 'sun'];

  protected toneFor(skill: Skill, index: number): IslandTone {
    return skill.highlight ? 'coral' : this.tones[index % this.tones.length];
  }

  protected shapeFor(index: number): IslandShape {
    return ((index % 4) + 1) as IslandShape;
  }
}
