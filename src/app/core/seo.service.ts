import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CONTENTS, LANGS } from '../data/content';
import { Lang } from '../data/models';
import { SITE_ORIGIN_TOKEN } from './site.config';

const LOCALES: Record<Lang, string> = { hu: 'hu_HU', en: 'en_US' };
/** The share image is in the web root (`public/og-image.png`, 1200×630). */
const SHARE_IMAGE_PATH = '/og-image.png';

/**
 * Adjusts the browser tab title, the description, the share data and (if the site address is known)
 * the canonical and hreflang links to the given language.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly origin = inject(SITE_ORIGIN_TOKEN);

  /** The page URL per language, or empty until the site address is set. */
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

  /** For a page (for example the 404) that search engines should not index. */
  noindex(title: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }

  /** Data that needs an absolute address (canonical, hreflang, og:url, share image): only with a known site address. */
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
