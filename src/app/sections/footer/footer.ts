import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly content = inject(ContentService).content;
  protected readonly year = new Date().getFullYear();
}
