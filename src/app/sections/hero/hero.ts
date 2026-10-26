import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { AnchorLink } from '../../shared/anchor-link/anchor-link.directive';
import { Button } from '../../shared/button/button';
import { CodeFile } from '../../data/models';
import { CodeWindow } from '../../shared/code-window/code-window';
import { CountUp } from '../../shared/count-up/count-up.directive';
import { Typewriter } from '../../shared/typewriter/typewriter';
import { developerInstance } from './developer-instance';

@Component({
  selector: 'app-hero',
  imports: [AnchorLink, Button, CodeWindow, CountUp, Typewriter],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = inject(ContentService).content;
  /** The two files of the code window: the instance built from the profile (the default), then the Developer data class. */
  protected readonly files = computed<CodeFile[]>(() => {
    const { profile, codeSamples } = this.content();
    return [developerInstance(profile), ...codeSamples];
  });
}
