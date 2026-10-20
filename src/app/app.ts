import { Component } from '@angular/core';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Nav } from './sections/nav/nav';
import { Stack } from './sections/stack/stack';
import { Studies } from './sections/studies/studies';
import { Work } from './sections/work/work';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, About, Work, Stack, Studies, Contact, Footer],
  templateUrl: './app.html',
})
export class App {}
