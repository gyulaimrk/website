import { InjectionToken } from '@angular/core';
import { SITE_ORIGIN } from './site-origin';

/** The site address as an injectable, so tests can give it another value. */
export const SITE_ORIGIN_TOKEN = new InjectionToken<string>('SITE_ORIGIN', {
  providedIn: 'root',
  factory: () => SITE_ORIGIN,
});
