import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Art } from '../../shared/art/art';
import { Scallop } from '../../shared/scallop/scallop';

@Component({
  selector: 'app-footer',
  imports: [Art, Scallop],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
}
