import { Component, input } from '@angular/core';
import { Skill } from '../../../data/models';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.scss',
  host: { '[class.highlight]': 'skill().highlight' },
})
export class SkillCard {
  readonly skill = input.required<Skill>();
}
