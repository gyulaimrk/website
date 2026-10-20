import { Component, computed, signal } from '@angular/core';
import { Art } from '../art/art';
import { Reveal } from '../reveal';
import { projects } from '../data/content';

@Component({
  selector: 'app-work',
  imports: [Art, Reveal],
  template: `
    <section id="munkak">
      <div class="head" appReveal>
        <h2>Munkáim</h2>
        <div class="filter" role="group" aria-label="Szűrés technológia szerint">
          <button type="button" [class.on]="!tech()" (click)="tech.set(null)">Mind</button>
          @for (t of allTech; track t) {
            <button type="button" [class.on]="tech() === t" [attr.aria-pressed]="tech() === t" (click)="toggle(t)">{{ t }}</button>
          }
        </div>
      </div>

      <div class="stack">
        @for (p of projects; track p.name; let i = $index) {
          <article class="band" [class]="'band c' + i" [class.dim]="!matches(p.tech)" [style.--i]="i">
            <div class="tabs"><h3 class="tab">{{ p.name }}</h3></div>
            <p class="cat">{{ p.category }}</p>
            <div class="open">
              <app-art class="art" [kind]="p.art" [label]="p.name" />
              <div class="text">
                <p>{{ p.description }}</p>
                <ul>
                  @for (t of p.tech; track t) {
                    <li [class.hit]="t === tech()">{{ t }}</li>
                  }
                </ul>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    section { margin-top: var(--gap-section); }
    .head { padding: 0 var(--margin); display: grid; gap: 28px; margin-bottom: clamp(32px, 5vw, 64px); }
    .filter { display: flex; flex-wrap: wrap; gap: 8px; }
    .filter button { min-height: 44px; padding: 0 20px; border: 0; border-radius: 0; background: var(--surface); color: var(--ink);
      font: 500 var(--step-small) / 1 'Hanken Grotesk', system-ui, sans-serif; cursor: pointer; transition: background-color 0.18s, color 0.18s, transform 0.18s; }
    .filter button:hover { transform: translateY(-2px); }
    .filter button.on { background: var(--ink); color: var(--paper); }

    .band { position: sticky; top: calc(64px + var(--i) * 64px); min-height: 80svh; padding: 0 var(--margin) 48px;
      transition: opacity 0.4s; }
    .tabs { display: flex; height: 56px; align-items: flex-end; gap: 6px; transform: translateY(-1px); }
    .tab { height: 44px; display: flex; align-items: center; padding: 0 56px 0 28px; font-size: var(--step-lead); letter-spacing: -0.03em;
      clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 100%, 0 100%); }
    .cat { position: absolute; right: var(--margin); top: 20px; font-size: var(--step-small); }
    .open { display: grid; grid-template-columns: 7fr 1fr 4fr; margin-top: 32px; }
    .art { grid-column: 1; aspect-ratio: 16 / 10; }
    .text { grid-column: 3; display: grid; gap: 24px; align-content: start; }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    li { padding: 6px 14px; font-size: var(--step-small); transition: background-color 0.2s, color 0.2s; }

    .c0 { background: var(--ink); color: var(--paper); } .c0 .tab { background: var(--accent); color: var(--accent-ink); } .c0 li { background: var(--paper); color: var(--ink); }
    .c1 { background: var(--accent); color: var(--accent-ink); } .c1 .tab { background: var(--paper); color: var(--ink); } .c1 li { background: var(--ink); color: var(--paper); }
    .c2 { background: var(--surface); } .c2 .tab { background: var(--ink); color: var(--paper); } .c2 li { background: var(--paper); }
    .c3 { background: var(--paper); } .c3 .tab { background: var(--accent); color: var(--accent-ink); } .c3 li { background: var(--surface); }
    li.hit { background: var(--accent) !important; color: var(--accent-ink) !important; }
    .band.dim { opacity: 0.5; }

    @media (max-width: 860px) {
      .band { position: static; min-height: 0; margin-top: 12px; }
      .tabs { height: 40px; }
      .tab { height: 40px; font-size: var(--step-body); padding-right: 44px; }
      .cat { position: static; padding-top: 12px; }
      .open { grid-template-columns: 1fr; gap: 20px; margin-top: 16px; }
      .art, .text { grid-column: 1; }
      .art { aspect-ratio: 4 / 3; }
    }
  `,
})
export class Work {
  protected readonly projects = projects;
  protected readonly allTech = [...new Set(projects.flatMap((p) => p.tech))].filter((t) =>
    ['Java 21', 'Kafka', 'Spring Boot', 'Kubernetes', 'PostgreSQL'].includes(t),
  );
  protected readonly tech = signal<string | null>(null);
  protected readonly matches = (t: string[]) => !this.tech() || t.includes(this.tech()!);
  protected toggle(t: string) {
    this.tech.update((c) => (c === t ? null : t));
  }
}
