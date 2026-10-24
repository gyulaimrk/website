import { DOCUMENT } from '@angular/common';
import { Component, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { ScrollSpyService } from '../../core/scroll-spy.service';
import { AnchorLink } from '../../shared/anchor-link/anchor-link.directive';
import { Button } from '../../shared/button/button';
import { LanguageToggle } from '../../shared/language-toggle/language-toggle';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-nav',
  imports: [AnchorLink, Button, LanguageToggle, ThemeToggle],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly document = inject(DOCUMENT);
  private readonly spy = inject(ScrollSpyService);
  protected readonly content = inject(ContentService).content;
  protected readonly active = this.spy.active;
  protected readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() =>
      this.spy.observe([...this.document.querySelectorAll('main section[id]')]),
    );
  }

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  }

  protected isActive(fragment: string): boolean {
    return fragment === this.active();
  }

  protected toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu() {
    this.menuOpen.set(false);
  }
}
