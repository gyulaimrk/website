import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-nav',
  imports: [Button, ThemeToggle],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly profile = profile;
  protected readonly initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('');
  protected readonly links = [
    { href: '#rolam', label: 'Rólam' },
    { href: '#eszkoztar', label: 'Eszköztár' },
    { href: '#tapasztalat', label: 'Tapasztalat' },
    { href: '#tanulmanyok', label: 'Tanulmányok' },
  ];
}
