import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { AnchorLink } from '../../shared/anchor-link/anchor-link.directive';
import { Button } from '../../shared/button/button';
import { CodeFile } from '../../data/models';
import { CodeWindow } from '../../shared/code-window/code-window';
import { Typewriter } from '../../shared/typewriter/typewriter';
import { developerInstance } from './developer-instance';

@Component({
  selector: 'app-hero',
  imports: [AnchorLink, Button, CodeWindow, Typewriter],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = inject(ContentService).content;
  /** A kódablak két fájlja: a profilból épített példány (ez az alapértelmezett), majd a Developer data class. */
  protected readonly files = computed<CodeFile[]>(() => {
    const { profile, codeSamples } = this.content();
    return [developerInstance(profile), ...codeSamples];
  });
}
