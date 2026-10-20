import { Component } from '@angular/core';
import { Art } from '../art/art';
import { Scallop } from '../art/scallop';
import { profile } from '../data/content';

@Component({
  selector: 'app-footer',
  imports: [Art, Scallop],
  template: `
    <footer>
      <app-scallop [up]="true" />
      <div class="back">
        <div class="msg">
          <p class="sign">Köszönöm, hogy itt jártál.</p>
          <p>Ha jó csapatot és tiszta kódot keresel, írj nyugodtan. Szívesen beszélgetek új lehetőségekről és érdekes problémákról.</p>
        </div>
        <address>
          <app-art class="stamp" kind="cup" label="Bélyeg" />
          <a [href]="p.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a [href]="p.github" target="_blank" rel="noopener">GitHub</a>
          <span>{{ p.location }}</span>
        </address>
        <p class="imprint">© {{ year }} {{ p.name }} · Angularral készült</p>
      </div>
    </footer>
  `,
  styles: `
    footer { margin: var(--gap-section) var(--margin) var(--margin); }
    .back { position: relative; background: var(--paper); padding: 28px clamp(24px, 6vw, 96px) 24px; display: grid;
      grid-template-columns: 1fr 1fr; gap: 32px; min-height: 360px; }
    .sign { font-size: var(--step-head); letter-spacing: -0.05em; line-height: 0.95; margin-bottom: 20px; font-weight: 500; }
    .msg p:last-child { max-width: 36ch; }
    address { font-style: normal; display: grid; gap: 12px; justify-items: start; align-content: start; font-size: var(--step-lead); padding-top: 120px; }
    address a { text-decoration: none; } address a:hover { color: var(--accent); }
    .stamp { position: absolute; top: 28px; right: clamp(24px, 6vw, 96px); width: 88px; aspect-ratio: 3 / 4; border: 6px solid var(--paper); outline: 0; }
    .imprint { grid-column: 1 / -1; text-align: center; font-size: var(--step-small); color: var(--muted); align-self: end; }
    @media (max-width: 720px) {
      .back { grid-template-columns: 1fr; }
      address { padding-top: 0; }
      .stamp { width: 64px; }
    }
  `,
})
export class Footer {
  protected readonly p = profile;
  protected readonly year = new Date().getFullYear();
}
