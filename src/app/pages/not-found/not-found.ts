import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/seo.service';

/** The 404 page: bilingual, because it has no language prefix; search engines should not index it. */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit() {
    this.seo.noindex('404 – Gyulai Márk');
  }
}
