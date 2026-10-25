import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { AnchorLink } from '../../shared/anchor-link/anchor-link.directive';
import { Button } from '../../shared/button/button';
import { CodeFile } from '../../data/models';
import { CodeWindow } from '../../shared/code-window/code-window';
import { Typewriter } from '../../shared/typewriter/typewriter';

@Component({
  selector: 'app-hero',
  imports: [AnchorLink, Button, CodeWindow, Typewriter],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = inject(ContentService).content;
  /** A kódablak két fájlja: a Developer data class, majd az ebből a profilból épített példány. */
  protected readonly files = computed<CodeFile[]>(() => {
    const { profile, codeSamples } = this.content();
    const stack = profile.stack.map((item) => `        "${item}",`);
    const developer = [
      'val developer = Developer(',
      `    name = "${profile.name}",`,
      `    role = "${profile.role}",`,
      '    stack = listOf(',
      ...stack,
      '    ),',
      '    ai = true,',
      `    location = "${profile.location.split(',')[0]}",`,
      ')',
    ].join('\n');
    return [...codeSamples, { name: 'Main.kt', language: 'kotlin', code: developer }];
  });
}
