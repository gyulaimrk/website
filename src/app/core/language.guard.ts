import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { LANGS } from '../data/content';
import { Lang } from '../data/models';
import { LanguageService } from './language.service';

/** Csak a `/hu` és az `/en` illeszkedik a nyelvi útvonalra; minden más 404. */
export const languageMatch: CanMatchFn = (_route, segments) =>
  segments.length === 1 && (LANGS as readonly string[]).includes(segments[0].path);

/** Az útvonal nyelvét beállítja az oldal nyelveként. Paraméterváltáskor is lefut. */
export const languageActivate: CanActivateFn = (route) => {
  inject(LanguageService).use(route.paramMap.get('lang') as Lang);
  return true;
};
