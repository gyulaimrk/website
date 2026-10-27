import { TestBed } from '@angular/core/testing';
import { contentEn, contentHu } from '../data/content';
import { ContentService } from './content.service';
import { LanguageService } from './language.service';

describe('ContentService', () => {
  it('swaps the content together with the language', () => {
    const language = TestBed.inject(LanguageService);
    const service = TestBed.inject(ContentService);
    language.use('hu');
    expect(service.content()).toBe(contentHu);
    language.use('en');
    expect(service.content()).toBe(contentEn);
  });
});
