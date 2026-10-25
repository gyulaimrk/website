import { InjectionToken } from '@angular/core';
import { SITE_ORIGIN } from './site-origin';

/** Az oldal címe injektálhatóan, hogy a tesztek más értéket adhassanak neki. */
export const SITE_ORIGIN_TOKEN = new InjectionToken<string>('SITE_ORIGIN', {
  providedIn: 'root',
  factory: () => SITE_ORIGIN,
});
