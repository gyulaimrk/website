import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CONTENTS, LANGS } from '../data/content';
import { Lang } from '../data/models';
import { SITE_ORIGIN_TOKEN } from './site.config';

const LOCALES: Record<Lang, string> = { hu: 'hu_HU', en: 'en_US' };
/** A megosztási kép a webgyökérben van (`public/og-image.png`, 1200×630). */
const SHARE_IMAGE_PATH = '/og-image.png';

/**
 * A böngészőfül címét, a leírást, a megosztási adatokat és (ha ismert az oldal címe) a
 * canonical és hreflang kapcsolatokat az adott nyelvhez igazítja.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly origin = inject(SITE_ORIGIN_TOKEN);

  /** Az oldal URL-je nyelvenként, vagy üres, amíg nincs megadva az oldal címe. */
  urlFor(lang: Lang): string {
    return this.origin ? `${this.origin}/${lang}` : '';
  }

  update(lang: Lang): void {
    const { meta } = CONTENTS[lang].ui;
    this.title.setTitle(meta.title);
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'description', content: meta.description });
    this.meta.updateTag({ property: 'og:title', content: meta.title });
    this.meta.updateTag({ property: 'og:description', content: meta.description });
    this.meta.updateTag({ property: 'og:locale', content: LOCALES[lang] });
    const other = LANGS.find((candidate) => candidate !== lang) ?? lang;
    this.meta.updateTag({ property: 'og:locale:alternate', content: LOCALES[other] });
    this.meta.updateTag({ name: 'twitter:title', content: meta.title });
    this.meta.updateTag({ name: 'twitter:description', content: meta.description });
    this.updateSiteUrls(lang);
  }

  /** Olyan oldalnak (például 404), amelyet a keresők ne indexeljenek. */
  noindex(title: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }

  /** Az abszolút címet igénylő adatok (canonical, hreflang, og:url, megosztási kép): csak ismert oldalcímmel. */
  private updateSiteUrls(lang: Lang) {
    this.removeLinks('link[rel="canonical"], link[rel="alternate"][hreflang]');
    const url = this.urlFor(lang);
    if (!url) {
      this.meta.removeTag('property="og:url"');
      this.meta.removeTag('property="og:image"');
      this.meta.removeTag('name="twitter:image"');
      return;
    }
    const image = `${this.origin}${SHARE_IMAGE_PATH}`;
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.addLink({ rel: 'canonical', href: url });
    LANGS.forEach((other) =>
      this.addLink({ rel: 'alternate', hreflang: other, href: this.urlFor(other) }),
    );
    this.addLink({ rel: 'alternate', hreflang: 'x-default', href: this.urlFor('hu') });
  }

  private removeLinks(selector: string) {
    this.document.head.querySelectorAll(selector).forEach((link) => link.remove());
  }

  private addLink(attributes: Record<string, string>) {
    const link = this.document.createElement('link');
    Object.entries(attributes).forEach(([name, value]) => link.setAttribute(name, value));
    this.document.head.appendChild(link);
  }
}
