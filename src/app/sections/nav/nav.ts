import { Component } from '@angular/core';
import { profile } from '../../data/content';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-nav',
  imports: [Button],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly profile = profile;
  protected readonly links = [
    { href: '#rolam', label: 'Rólam' },
    { href: '#tapasztalat', label: 'Tapasztalat' },
    { href: '#eszkoztar', label: 'Eszköztár' },
  ];
}
