import { Component } from '@angular/core';
import { Reveal } from '../reveal';
import { skills } from '../data/content';

@Component({
  selector: 'app-stack',
  imports: [Reveal],
  template: `
    <section id="eszkoztar">
      <h2 appReveal>Eszköztár</h2>
      <ul class="deck" aria-label="Technológiák">
        @for (r of skills; track r.title; let i = $index) {
          <li [class]="'card t' + (i % 3)" [class.hl]="r.highlight" [appReveal]="i">
            <div class="top"><h3>{{ r.title }}</h3><span>{{ r.tag }}</span></div>
            <p>{{ r.text }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    section { margin-top: var(--gap-section); }
    h2 { padding: 0 var(--margin); margin-bottom: clamp(32px, 5vw, 56px); }
    .deck { list-style: none; margin: 0; padding: 0 var(--margin); display: grid; gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); }
    .card:first-child { grid-column: 1 / -1; }
    @media (max-width: 860px) { .card:first-child { grid-column: auto; } }
    .card { min-height: 320px; padding: 32px;
      display: flex; flex-direction: column; justify-content: space-between; gap: 32px; transition: transform 0.2s; }
    .card:hover { transform: translateY(-4px); }
    .top { display: grid; gap: 8px; }
    h3 { font-size: clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem); letter-spacing: -0.04em; line-height: 1.05; }
    .top span { font-size: var(--step-small); color: inherit; opacity: 0.85; }
    p { max-width: 38ch; }
    .card.hl { background: var(--accent); color: var(--accent-ink); }
    .t0 { background: var(--paper); } .t1 { background: var(--surface); } .t2 { background: var(--ink); color: var(--paper); }
  `,
})
export class Stack {
  protected readonly skills = skills;
}
