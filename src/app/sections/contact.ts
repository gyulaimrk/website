import { Component } from '@angular/core';
import { Art } from '../art/art';
import { profile } from '../data/content';

@Component({
  selector: 'app-contact',
  imports: [Art],
  template: `
    <section id="kapcsolat">
      <app-art class="bg" kind="bridge" label="A Lánchíd sziluettje" />
      <div class="visit">
        <h2>Dolgozzunk együtt</h2>
        <p>{{ p.location }}<br />Senior Java fejlesztő, magyar és angol nyelven.</p>
        <p>A legegyszerűbb a LinkedIn vagy az e-mail: <a [href]="'mailto:' + p.email">{{ p.email }}</a></p>
        <a class="btn" [href]="p.linkedin" target="_blank" rel="noopener">Írj a LinkedInen</a>
      </div>
    </section>
  `,
  styles: `
    section { position: relative; margin-top: var(--gap-section); height: 100svh; min-height: 640px; }
    .bg { position: absolute; inset: 0; }
    .visit { position: absolute; top: 60px; right: var(--margin); width: min(420px, calc(100% - 2 * var(--margin)));
      background: var(--paper); padding: 32px 32px 0; display: grid; gap: 20px; }
    p a { color: inherit; }
    h2 { font-size: clamp(2rem, 1.5rem + 1.5vw, 2.75rem); }
    .visit .btn { margin: 12px -32px 0; min-height: 56px; background: var(--ink); }
    .visit .btn:hover { background: var(--accent); }
    @media (max-width: 860px) {
      section { height: auto; min-height: 0; padding-bottom: 0; }
      .bg { position: static; height: 70svh; }
      .visit { position: relative; top: auto; right: auto; width: auto; margin: -80px var(--margin) 0; padding: 24px 24px 0; }
      .visit .btn { margin-inline: -24px; }
    }
  `,
})
export class Contact {
  protected readonly p = profile;
}
