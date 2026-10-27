import { APP_BASE_HREF } from '@angular/common';
import {
  ApplicationConfig,
  provideAppInitializer,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Router, provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { environment } from '../environments/environment';
import { LanguageService } from './core/language.service';
import { routes } from './app.routes';

/**
 * In an embedded preview (`inMemoryRouting`) the browser address bar cannot be changed, so
 * the router only navigates in memory and does not use hydration.
 */
const standard: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(withEventReplay())],
};

const inMemory: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    provideRouter(routes, withDisabledInitialNavigation()),
    provideAppInitializer(() => {
      const language = inject(LanguageService);
      return inject(Router).navigateByUrl(`/${language.preferred()}`, { skipLocationChange: true });
    }),
  ],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    ...(environment.inMemoryRouting ? inMemory : standard).providers,
  ],
};
