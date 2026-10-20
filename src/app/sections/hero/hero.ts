import { Component } from '@angular/core';
import { ArtKind } from '../../data/models';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';
import { Slideshow } from '../../shared/slideshow/slideshow';

@Component({
  selector: 'app-hero',
  imports: [Button, Slideshow],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = profile;
  protected readonly kinds: ArtKind[] = ['cup', 'bridge', 'saw'];
}
