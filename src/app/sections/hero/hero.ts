import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';
import { Island } from '../../shared/island/island';

@Component({
  selector: 'app-hero',
  imports: [Button, Island],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = profile;
}
