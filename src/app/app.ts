import { Component, inject } from '@angular/core';
import { ContentService } from './core/content.service';
import { SeoService } from './core/seo.service';
import { BackToTop } from './shared/back-to-top/back-to-top';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Education } from './sections/education/education';
import { Experience } from './sections/experience/experience';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Nav } from './sections/nav/nav';
import { Skills } from './sections/skills/skills';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, About, Skills, Experience, Education, Contact, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly content = inject(ContentService).content;

  constructor() {
    inject(SeoService);
  }
}
