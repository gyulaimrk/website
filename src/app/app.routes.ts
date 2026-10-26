import { Routes } from '@angular/router';
import { languageActivate, languageMatch } from './core/language.guard';
import { PortfolioPage } from './pages/portfolio/portfolio-page';

/**
 * The language is a route parameter (`:lang`), not a separate entry: this way both languages use the same
 * component instance, the page is not rebuilt when the language changes, and the scroll position
 * stays where it is.
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
  // The 404 page has its own address: a static file is built from it, which postbuild copies over 404.html
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  // Unknown address: a real 404 page, not a redirect
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
