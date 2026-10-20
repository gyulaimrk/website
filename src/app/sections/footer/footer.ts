import { Component } from '@angular/core';
import { profile } from '../../data/content';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
}
