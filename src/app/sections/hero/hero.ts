import { Component } from '@angular/core';
import { profile, stats } from '../../data/content';
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
  protected readonly profile = profile;
  protected readonly stats = stats;
  protected readonly code: CodeEntry[] = [
    { key: 'name', value: profile.name },
    { key: 'role', value: profile.role },
    { key: 'stack', value: ['Java 8–25', 'Kotlin', 'Spring Boot'] },
    { key: 'ai', value: true },
    { key: 'location', value: profile.location.split(',')[0] },
  ];
}
