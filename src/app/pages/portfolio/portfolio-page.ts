import { Component, effect, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { LanguageService } from '../../core/language.service';
import { SeoService } from '../../core/seo.service';
import { About } from '../../sections/about/about';
import { AiWorkflow } from '../../sections/ai-workflow/ai-workflow';
import { Contact } from '../../sections/contact/contact';
import { Education } from '../../sections/education/education';
import { Experience } from '../../sections/experience/experience';
import { Footer } from '../../sections/footer/footer';
import { Hero } from '../../sections/hero/hero';
import { Nav } from '../../sections/nav/nav';
import { SideProjects } from '../../sections/side-projects/side-projects';
import { Skills } from '../../sections/skills/skills';
import { AnchorLink } from '../../shared/anchor-link/anchor-link.directive';
import { BackToTop } from '../../shared/back-to-top/back-to-top';

/** The whole portfolio on one page; the language comes from the route (`/hu`, `/en`). */
@Component({
  selector: 'app-portfolio-page',
  imports: [
    AnchorLink,
    Nav,
    Hero,
    About,
    Skills,
    AiWorkflow,
    Experience,
    SideProjects,
    Education,
    Contact,
    Footer,
    BackToTop,
  ],
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.scss',
})
export class PortfolioPage {
  protected readonly content = inject(ContentService).content;

  constructor() {
    const seo = inject(SeoService);
    const language = inject(LanguageService);
    effect(() => seo.update(language.lang()));
  }
}
