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

  it('the title and the description follow the given language', () => {
    service().update('hu');
    expect(TestBed.inject(Title).getTitle()).toBe(contentHu.ui.meta.title);
    const meta = TestBed.inject(Meta);
    expect(meta.getTag('name="description"')?.content).toBe(contentHu.ui.meta.description);

    service().update('en');
    expect(TestBed.inject(Title).getTitle()).toBe(contentEn.ui.meta.title);
    expect(meta.getTag('property="og:title"')?.content).toBe(contentEn.ui.meta.title);
    expect(meta.getTag('property="og:locale"')?.content).toBe('en_US');
  });

  it('without knowing the page address it does not add canonical and hreflang tags', () => {
    service().update('hu');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('link[hreflang]')).toBeNull();
    expect(service().urlFor('hu')).toBe('');
  });

  it('marks the 404 page against indexing and lets the other page back in', () => {
    service().noindex('No such page');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex');
    service().update('hu');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('index, follow');
  });

  it('with a given page address it builds canonical, hreflang and og:url, with x-default', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_ORIGIN_TOKEN, useValue: 'https://example.com' }],
    });
    service().update('en');
    const href = (selector: string) => document.head.querySelector(selector)?.getAttribute('href');
    expect(href('link[rel="canonical"]')).toBe('https://example.com/en');
    expect(href('link[hreflang="hu"]')).toBe('https://example.com/hu');
    expect(href('link[hreflang="en"]')).toBe('https://example.com/en');
    expect(href('link[hreflang="x-default"]')).toBe('https://example.com/hu');
    expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toBe(
      'https://example.com/en',
    );
  });

  it('with a given page address the share image is added to the tags too, without it it is not', () => {
    const meta = TestBed.inject(Meta);
    service().update('hu');
    expect(meta.getTag('property="og:image"')).toBeNull();
    expect(meta.getTag('name="twitter:image"')).toBeNull();
  });

  it('knowing the page address, og:image and twitter:image are absolute addresses', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_ORIGIN_TOKEN, useValue: 'https://example.com' }],
    });
    service().update('hu');
    const meta = TestBed.inject(Meta);
    expect(meta.getTag('property="og:image"')?.content).toBe('https://example.com/og-image.png');
    expect(meta.getTag('name="twitter:image"')?.content).toBe('https://example.com/og-image.png');
  });

  it('og:locale:alternate is always the other language', () => {
    const meta = TestBed.inject(Meta);
    service().update('hu');
    expect(meta.getTag('property="og:locale:alternate"')?.content).toBe('en_US');
    service().update('en');
    expect(meta.getTag('property="og:locale:alternate"')?.content).toBe('hu_HU');
  });

  it('the tags do not pile up on language switches', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_ORIGIN_TOKEN, useValue: 'https://example.com' }],
    });
    service().update('hu');
    service().update('en');
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.head.querySelectorAll('link[hreflang]').length).toBe(3);
  });
});
