import { AfterViewInit, Component, HostListener, inject, signal } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { ScrollSpyService } from '../../core/scroll-spy.service';
import { Button } from '../../shared/button/button';
import { LanguageToggle } from '../../shared/language-toggle/language-toggle';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-nav',
  imports: [Button, LanguageToggle, ThemeToggle],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements AfterViewInit {
  private readonly spy = inject(ScrollSpyService);
  protected readonly content = inject(ContentService).content;
  protected readonly active = this.spy.active;
  protected readonly menuOpen = signal(false);

  ngAfterViewInit() {
    this.spy.observe([...document.querySelectorAll('main section[id]')]);
  }

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  }

  protected isActive(href: string): boolean {
    return href === `#${this.active()}`;
  }

  protected toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu() {
    this.menuOpen.set(false);
  }
}
