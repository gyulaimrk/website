import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS } from './data/content';

/** Every page is built as static HTML during the build. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LANGS.map((lang) => ({ lang })),
  },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
