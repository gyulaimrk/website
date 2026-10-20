import { Component } from '@angular/core';
import { Reveal } from '../reveal';
import { studies } from '../data/content';

@Component({
  selector: 'app-studies',
  imports: [Reveal],
  template: `
    <section id="tanulmanyok">
      <h2 appReveal>Tanulmányok és tanúsítványok</h2>
      <ul>
        @for (s of studies; track s.title; let i = $index) {
          <li [appReveal]="i % 3">
            <h3>{{ s.title }}</h3>
            <p>{{ s.where }}@if (s.period) { · {{ s.period }} }</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    section { margin: var(--gap-section) var(--margin) 0; display: grid; grid-template-columns: 5fr 7fr; gap: var(--margin); align-items: start; }
    h2 { font-size: var(--step-head); }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    li { background: var(--paper); padding: 24px 28px; display: flex; justify-content: space-between; gap: 24px; flex-wrap: wrap; align-items: baseline; }
    li:nth-child(odd) { background: var(--surface); }
    h3 { font-size: var(--step-lead); letter-spacing: -0.03em; }
    p { color: var(--muted); }
    @media (max-width: 860px) { section { grid-template-columns: 1fr; } }
  `,
})
export class Studies {
  protected readonly studies = studies;
}
