import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);
  protected readonly content = inject(ContentService).content;
}
