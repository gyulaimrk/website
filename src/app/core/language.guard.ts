import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { LANGS } from '../data/content';
import { Lang } from '../data/models';
import { LanguageService } from './language.service';

/** Only `/hu` and `/en` match the language route; everything else is a 404. */
export const languageMatch: CanMatchFn = (_route, segments) =>
  segments.length === 1 && (LANGS as readonly string[]).includes(segments[0].path);

/** Sets the route's language as the page language. Also runs when the parameter changes. */
export const languageActivate: CanActivateFn = (route) => {
  inject(LanguageService).use(route.paramMap.get('lang') as Lang);
  return true;
};
