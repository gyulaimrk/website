import { Component } from '@angular/core';
import { About } from './sections/about/about';
import { Archipelago } from './sections/archipelago/archipelago';
import { Contact } from './sections/contact/contact';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Nav } from './sections/nav/nav';
import { Route } from './sections/route/route';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, About, Route, Archipelago, Contact, Footer],
  templateUrl: './app.html',
})
export class App {}
