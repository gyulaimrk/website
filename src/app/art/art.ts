import { Component, input } from '@angular/core';
import { ArtKind } from '../data/content';

/** Kódból rajzolt, lapos grafikák: egy színvilág, vastag vonalak, nincs színátmenet. */
@Component({
  selector: 'app-art',
  template: `
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="img" [attr.aria-label]="label()">
      @switch (kind()) {
        @case ('cup') {
          <rect width="1600" height="1000" class="ink" />
          <path d="M680 260c-50 70 50 110 0 190M800 230c-60 80 60 130 0 220M920 260c-50 70 50 110 0 190" class="steam" />
          <ellipse cx="800" cy="760" rx="420" ry="70" class="paper" />
          <path d="M520 480h560v160c0 120-100 200-280 200s-280-80-280-200z" class="paper" />
          <path d="M1080 520h70c70 0 70 150-10 150h-70v-50h50c30 0 30-50 0-50h-40z" class="paper" />
          <ellipse cx="800" cy="480" rx="280" ry="46" class="teal" />
        }
        @case ('bridge') {
          <rect width="1600" height="1000" class="teal" />
          <rect y="700" width="1600" height="300" class="ink" />
          <rect x="360" y="260" width="70" height="440" class="paper" />
          <rect x="1170" y="260" width="70" height="440" class="paper" />
          <rect x="0" y="640" width="1600" height="50" class="paper" />
          <path d="M0 600Q200 640 395 270Q800 760 1205 270Q1400 640 1600 600" class="cable" />
          <path d="M395 270 330 340M1205 270 1270 340" class="cable" />
          <path d="M200 760h220M600 800h300M1050 770h260" class="wave" />
        }
        @case ('split') {
          <rect width="1600" height="1000" class="paper" />
          <rect x="90" y="250" width="420" height="500" class="ink" />
          <path d="M560 500h200" class="arrow" />
          <rect x="820" y="200" width="300" height="220" class="teal" />
          <rect x="1170" y="200" width="300" height="220" class="sand" />
          <rect x="820" y="470" width="300" height="220" class="sand" />
          <rect x="1170" y="470" width="300" height="220" class="ink" />
        }
        @case ('flow') {
          <rect width="1600" height="1000" class="ink" />
          <path d="M360 500H600M1000 360 1240 260M1000 640 1240 740M360 500" class="arrow-p" />
          <circle cx="260" cy="500" r="110" class="paper" />
          <rect x="600" y="340" width="400" height="320" class="teal" />
          <circle cx="1340" cy="240" r="90" class="paper" />
          <circle cx="1340" cy="760" r="90" class="sand" />
          <circle cx="1340" cy="500" r="90" class="paper" />
          <path d="M1000 500h250" class="arrow-p" />
        }
        @case ('gate') {
          <rect width="1600" height="1000" class="sand" />
          <rect x="260" y="240" width="130" height="520" class="ink" />
          <rect x="1210" y="240" width="130" height="520" class="ink" />
          <rect x="260" y="200" width="1080" height="110" class="teal" />
          <path d="M0 500H260M1340 500H1600M0 600H260M1340 600H1600M0 400H260M1340 400H1600" class="arrow" />
          <rect x="700" y="400" width="200" height="360" class="paper" />
        }
        @case ('saw') {
          <rect width="1600" height="1000" class="paper" />
          <path d="M100 800 300 400 300 640 520 300 520 600 740 340 740 620 960 280 960 580 1180 320 1180 600 1400 260 1500 400" class="line-t" />
          <rect x="100" y="860" width="1400" height="40" class="ink" />
          <rect x="100" y="120" width="40" height="780" class="ink" />
        }
      }
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { display: block; width: 100%; height: 100%; }
    .ink { fill: var(--ink); } .paper { fill: var(--paper); } .teal { fill: var(--accent); } .sand { fill: var(--surface); }
    .steam { fill: none; stroke: var(--accent); stroke-width: 26; stroke-linecap: round; }
    .cable { fill: none; stroke: var(--paper); stroke-width: 16; stroke-linecap: round; }
    .wave { fill: none; stroke: var(--accent); stroke-width: 18; stroke-linecap: round; }
    .arrow { fill: none; stroke: var(--ink); stroke-width: 28; stroke-linecap: round; }
    .arrow-p { fill: none; stroke: var(--paper); stroke-width: 26; stroke-linecap: round; }
    .line-t { fill: none; stroke: var(--accent); stroke-width: 28; stroke-linejoin: round; stroke-linecap: round; }
  `,
})
export class Art {
  readonly kind = input.required<ArtKind>();
  readonly label = input('Illusztráció');
}
