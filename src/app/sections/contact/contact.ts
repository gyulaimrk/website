import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Button } from '../../shared/button/button';
import { Reveal } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [Button, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly content = inject(ContentService).content;
}
