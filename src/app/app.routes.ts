import { Routes } from '@angular/router';
import { languageActivate, languageMatch } from './core/language.guard';
import { PortfolioPage } from './pages/portfolio/portfolio-page';

/**
 * A nyelv útvonal-paraméter (`:lang`), nem külön bejegyzés: így a két nyelv ugyanazt a
 * komponenspéldányt használja, nyelvváltáskor nem épül újra az oldal, és a görgetés
 * a helyén marad.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/root-redirect/root-redirect').then((m) => m.RootRedirect),
  },
  {
    path: ':lang',
    component: PortfolioPage,
    canMatch: [languageMatch],
    canActivate: [languageActivate],
  },
  // A 404-oldal saját címe: ebből készül statikus fájl, amelyet a postbuild a 404.html helyére másol
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  // Ismeretlen cím: valódi 404-oldal, nem átirányítás
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
