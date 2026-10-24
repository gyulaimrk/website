import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { Card } from '../../shared/card/card';
import { CodeWindow } from '../../shared/code-window/code-window';
import { Reveal } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** „Hogyan dolgozom AI-val”: a gyakorlat négy pontban, mellette a valódi CLAUDE.md részlete. */
@Component({
  selector: 'app-ai-workflow',
  imports: [Card, CodeWindow, Reveal, SectionHeading],
  templateUrl: './ai-workflow.html',
  styleUrl: './ai-workflow.scss',
})
export class AiWorkflow {
  protected readonly content = inject(ContentService).content;
  protected readonly workflow = computed(() => this.content().aiWorkflow);
  protected readonly files = computed(() => [this.workflow().file]);
}
