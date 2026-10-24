import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ContentService } from './content.service';

/** A böngészőfül címét és a megosztási metaadatokat az aktuális nyelvhez igazítja. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly content = inject(ContentService).content;

  constructor() {
    effect(() => {
      const { meta } = this.content().ui;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({ property: 'og:title', content: meta.title });
      this.meta.updateTag({ property: 'og:description', content: meta.description });
      this.meta.updateTag({ name: 'twitter:title', content: meta.title });
      this.meta.updateTag({ name: 'twitter:description', content: meta.description });
      this.meta.updateTag({
        property: 'og:locale',
        content: this.document.documentElement.lang === 'hu' ? 'hu_HU' : 'en_US',
      });
    });
  }
}
