import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { contentEn, contentHu } from '../data/content';
import { LanguageService } from './language.service';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  it('a cím és a leírás az aktuális nyelvet követi', () => {
    const language = TestBed.inject(LanguageService);
    TestBed.inject(SeoService);
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    language.lang.set('hu');
    TestBed.tick();
    expect(title.getTitle()).toBe(contentHu.ui.meta.title);
    expect(meta.getTag('name="description"')?.content).toBe(contentHu.ui.meta.description);

    language.lang.set('en');
    TestBed.tick();
    expect(title.getTitle()).toBe(contentEn.ui.meta.title);
    expect(meta.getTag('property="og:title"')?.content).toBe(contentEn.ui.meta.title);
  });
});
