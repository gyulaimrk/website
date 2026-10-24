import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/seo.service';

/** A 404-es oldal: kétnyelvű, mert nincs nyelvi előtagja; a keresők ne indexeljék. */
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
