import { Component } from '@angular/core';
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
  imports: [Nav, Hero, About, Skills, Experience, Education, Contact, Footer],
  templateUrl: './app.html',
})
export class App {}
