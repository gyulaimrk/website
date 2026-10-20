import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Art } from '../art/art';
import { ArtKind, profile } from '../data/content';

@Component({
  selector: 'app-hero',
  imports: [Art],
  template: `
    <section id="top" class="hero">
      <div class="card">
        <svg class="stripe" width="100%" height="56" aria-hidden="true">
          <defs>
            <pattern id="bars" width="56" height="56" patternUnits="userSpaceOnUse">
              <rect width="28" height="56" />
            </pattern>
          </defs>
          <rect width="100%" height="56" fill="url(#bars)" />
        </svg>
        <div class="body">
          <h1>{{ p.name }}, senior Java fejlesztő</h1>
          <p class="lead">{{ p.intro }}</p>
          <a class="btn" [href]="p.linkedin" target="_blank" rel="noopener">Beszéljünk a LinkedInen</a>
        </div>
        <nav aria-label="Ugrás">
          <a href="#rolam">Rólam</a>
          <a href="#tapasztalat">Tapasztalat</a>
          <a href="#eszkoztar">Eszköztár</a>
        </nav>
      </div>
      <div class="room" aria-hidden="true">
        @for (k of kinds; track k; let i = $index) {
          <app-art class="still" [class.on]="active() === i" [kind]="k" />
        }
      </div>
    </section>
  `,
  styles: `
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: var(--margin);
      padding: 0 var(--margin); height: calc(100svh - 64px); min-height: 640px; }
    .card { background: var(--paper); display: flex; flex-direction: column; }
    .stripe { fill: var(--ink); flex: none; }
    .body { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;
      text-align: center; gap: 24px; padding: 24px clamp(24px, 4vw, 72px); }
    h1 { font-size: clamp(2.25rem, 1rem + 3.6vw, 4.25rem); max-width: 20ch; }
    .lead { max-width: 36ch; color: var(--muted); }
    nav { display: flex; justify-content: center; gap: 28px; padding: 0 24px 28px; font-size: var(--step-small); }
    nav a:hover { color: var(--accent); }
    .room { position: relative; overflow: hidden; }
    .still { position: absolute; inset: 0; opacity: 0; transition: opacity 1.6s ease; }
    .still.on { opacity: 1; }
    @media (max-width: 860px) {
      .hero { grid-template-columns: 1fr; height: auto; min-height: 0; }
      .room { order: -1; height: 48svh; }
      .card { margin-top: -24px; position: relative; }
      .body { padding-block: 40px; }
      h1 { font-size: clamp(2.25rem, 10vw, 3.25rem); }
    }
  `,
})
export class Hero {
  protected readonly p = profile;
  protected readonly kinds: ArtKind[] = ['cup', 'bridge', 'saw'];
  protected readonly active = signal(0);

  constructor() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!document.hidden) this.active.update((i) => (i + 1) % this.kinds.length);
    }, 6000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
