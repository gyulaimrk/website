import { Component } from '@angular/core';
import { profile } from '../data/content';

@Component({
  selector: 'app-nav',
  template: `
    <header>
      <a class="mark" href="#top">{{ p.name }}</a>
      <nav aria-label="Fő navigáció">
        <a href="#rolam">Rólam</a>
        <a href="#tapasztalat">Tapasztalat</a>
        <a href="#eszkoztar">Eszköztár</a>
      </nav>
      <a class="btn" [href]="p.linkedin" target="_blank" rel="noopener">LinkedIn</a>
    </header>
  `,
  styles: `
    header { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 28px;
      height: 64px; padding-inline: var(--margin); background: var(--bg); }
    .mark { font-weight: 500; text-decoration: none; margin-right: auto; font-size: var(--step-lead); letter-spacing: -0.04em; }
    nav { display: flex; gap: 28px; }
    nav a { text-decoration: none; }
    nav a:hover { color: var(--accent); }
    .btn { min-height: 42px; padding-inline: 20px; font-size: var(--step-small); }
    @media (max-width: 720px) { nav { display: none; } }
  `,
})
export class Nav {
  protected readonly p = profile;
}
