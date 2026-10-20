import { Component } from '@angular/core';
import { skills } from '../../data/content';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { SkillCard } from './skill-card/skill-card';

@Component({
  selector: 'app-stack',
  imports: [Reveal, SectionHeading, SkillCard],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack {
  protected readonly skills = skills;
}
