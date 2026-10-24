import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Button } from '../../shared/button/button';
import { CodeEntry, CodeWindow } from '../../shared/code-window/code-window';
import { Typewriter } from '../../shared/typewriter/typewriter';

@Component({
  selector: 'app-hero',
  imports: [Button, CodeWindow, Typewriter],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = inject(ContentService).content;
  protected readonly code = computed<CodeEntry[]>(() => {
    const { profile } = this.content();
    return [
      { key: 'name', value: profile.name },
      { key: 'role', value: profile.role },
      { key: 'stack', value: profile.stack },
      { key: 'ai', value: true },
      { key: 'location', value: profile.location.split(',')[0] },
    ];
  });
}
