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
 * Beágyazott előnézetben (`inMemoryRouting`) a böngésző címsora nem módosítható, ezért
 * az útválasztó csak memóriában navigál, és nem használ hidratálást.
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
