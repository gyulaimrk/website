import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';
import { Reveal } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [Button, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly profile = profile;
}
