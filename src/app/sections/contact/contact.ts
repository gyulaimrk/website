import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Art } from '../../shared/art/art';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-contact',
  imports: [Art, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly profile = profile;
}
