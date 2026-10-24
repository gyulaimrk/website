import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { contentEn, contentHu } from '../data/content';
import { SeoService } from './seo.service';
import { SITE_ORIGIN_TOKEN } from './site.config';

describe('SeoService', () => {
  const service = () => TestBed.inject(SeoService);

  afterEach(() => {
    document.head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"]')
      .forEach((l) => l.remove());
  });

  it('a cím és a leírás az adott nyelvet követi', () => {
    service().update('hu');
    expect(TestBed.inject(Title).getTitle()).toBe(contentHu.ui.meta.title);
    const meta = TestBed.inject(Meta);
    expect(meta.getTag('name="description"')?.content).toBe(contentHu.ui.meta.description);

    service().update('en');
    expect(TestBed.inject(Title).getTitle()).toBe(contentEn.ui.meta.title);
    expect(meta.getTag('property="og:title"')?.content).toBe(contentEn.ui.meta.title);
    expect(meta.getTag('property="og:locale"')?.content).toBe('en_US');
  });

  it('az oldal címének ismerete nélkül nem tesz fel canonical és hreflang címkét', () => {
    service().update('hu');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('link[hreflang]')).toBeNull();
    expect(service().urlFor('hu')).toBe('');
  });

  it('a 404-es oldalt indexelés ellen jelöli, az oldal vissza engedi', () => {
    service().noindex('Nincs ilyen oldal');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex');
    service().update('hu');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('index, follow');
  });

  it('megadott oldalcímmel canonical, hreflang és og:url készül, x-default-tal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_ORIGIN_TOKEN, useValue: 'https://pelda.hu' }],
    });
    service().update('en');
    const href = (selector: string) => document.head.querySelector(selector)?.getAttribute('href');
    expect(href('link[rel="canonical"]')).toBe('https://pelda.hu/en');
    expect(href('link[hreflang="hu"]')).toBe('https://pelda.hu/hu');
    expect(href('link[hreflang="en"]')).toBe('https://pelda.hu/en');
    expect(href('link[hreflang="x-default"]')).toBe('https://pelda.hu/hu');
    expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toBe('https://pelda.hu/en');
  });

  it('nyelvváltáskor nem halmozódnak a címkék', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_ORIGIN_TOKEN, useValue: 'https://pelda.hu' }],
    });
    service().update('hu');
    service().update('en');
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.head.querySelectorAll('link[hreflang]').length).toBe(3);
  });
});
