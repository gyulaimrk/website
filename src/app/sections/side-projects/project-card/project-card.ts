import { Component, inject, input } from '@angular/core';
import { ContentService } from '../../../core/content.service';
import { SideProject } from '../../../data/models';
import { Button } from '../../../shared/button/button';
import { Card } from '../../../shared/card/card';
import { ChipList } from '../../../shared/chip-list/chip-list';

/** Egy mellékprojekt kártyája: név, leírás, technológiák és link az élő oldalra. */
@Component({
  selector: 'app-project-card',
  imports: [Button, Card, ChipList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<SideProject>();
  protected readonly content = inject(ContentService).content;
}
