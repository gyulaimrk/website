import { Component } from '@angular/core';
import { Reveal } from '../reveal';
import { Scallop } from '../art/scallop';
import { profile } from '../data/content';

@Component({
  selector: 'app-about',
  imports: [Reveal, Scallop],
  template: `
    <section id="rolam">
      <div class="sheet" appReveal>
        <h2>Rólam</h2>
        @for (para of p.letter; track $index) {
          <p class="para">{{ para }}</p>
        }
        <p class="sign">{{ p.name }}<span>{{ p.role }}</span></p>
      </div>
      <app-scallop />
      <div class="stub">
        <p>Dolgozzunk együtt: <a [href]="p.linkedin" target="_blank" rel="noopener">LinkedIn</a></p>
        <a class="btn" [href]="p.linkedin" target="_blank" rel="noopener">Üzenek</a>
      </div>
    </section>
  `,
  styles: `
    section { width: min(100% - 2 * var(--margin), 720px); margin: var(--gap-section) auto; }
    .sheet { background: var(--paper); padding: clamp(28px, 5vw, 64px); display: grid; gap: 22px; }
    .sheet h2 { margin-bottom: 8px; }
    .para { max-width: 56ch; }
    .sign { font-size: var(--step-lead); font-weight: 500; letter-spacing: -0.03em; margin-top: 12px; }
    .sign span { display: block; font-size: var(--step-small); font-weight: 400; color: var(--muted); letter-spacing: 0; }
    .stub { margin-top: 28px; background: var(--ink); color: var(--paper); min-height: 72px; padding: 16px clamp(20px, 4vw, 40px);
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .stub a:not(.btn) { color: var(--paper); }
  `,
})
export class About {
  protected readonly p = profile;
}
