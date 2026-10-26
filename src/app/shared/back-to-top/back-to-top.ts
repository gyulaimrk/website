import { Component, HostListener, inject, signal } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { AnchorLink } from '../anchor-link/anchor-link.directive';

const SHOW_AFTER_PX = 700;

/** Floating "back to top" button that only appears after scrolling down. */
@Component({
  selector: 'app-back-to-top',
  imports: [AnchorLink],
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
