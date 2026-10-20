import { Component } from '@angular/core';
import { Nav } from './sections/nav';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Work } from './sections/work';
import { Stack } from './sections/stack';
import { Studies } from './sections/studies';
import { Contact } from './sections/contact';
import { Footer } from './sections/footer';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, About, Work, Stack, Studies, Contact, Footer],
  template: `
    <app-nav />
    <main>
      <app-hero />
      <app-about />
      <app-work />
      <app-stack />
      <app-studies />
      <app-contact />
    </main>
    <app-footer />
  `,
})
export class App {}
