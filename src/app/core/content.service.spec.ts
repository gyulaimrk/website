import { TestBed } from '@angular/core/testing';
import { contentEn, contentHu } from '../data/content';
import { ContentService } from './content.service';
import { LanguageService } from './language.service';

describe('ContentService', () => {
  it('a nyelvváltással együtt cseréli a tartalmat', () => {
    const language = TestBed.inject(LanguageService);
    const service = TestBed.inject(ContentService);
    language.lang.set('hu');
    expect(service.content()).toBe(contentHu);
    language.lang.set('en');
    expect(service.content()).toBe(contentEn);
  });
});
