import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';
import { Island } from '../../shared/island/island';

@Component({
  selector: 'app-contact',
  imports: [Button, Island],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly profile = profile;
}
