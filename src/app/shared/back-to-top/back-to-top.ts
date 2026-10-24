import { Component, HostListener, inject, signal } from '@angular/core';
import { ContentService } from '../../core/content.service';

const SHOW_AFTER_PX = 700;

/** Lebegő "vissza a tetejére" gomb, amely csak lejjebb görgetve jelenik meg. */
@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
})
export class BackToTop {
  protected readonly content = inject(ContentService).content;
  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  protected onScroll() {
    this.visible.set(window.scrollY > SHOW_AFTER_PX);
  }
}
