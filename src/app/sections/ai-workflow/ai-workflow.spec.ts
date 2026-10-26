import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../core/language.service';
import { contentEn, contentHu } from '../../data/content';
import { AiWorkflow } from './ai-workflow';

describe('AiWorkflow', () => {
  function render() {
    const fixture = TestBed.createComponent(AiWorkflow);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('renders all five practice points, paragraph by paragraph', () => {
    const { el } = render();
    expect(el.querySelectorAll('app-card h3').length).toBe(5);
    const texts = [...el.querySelectorAll('app-card p')].map((p) => p.textContent);
    expect(texts).toEqual(contentHu.aiWorkflow.points.flatMap((point) => point.paragraphs));
    expect(el.querySelector('h2')?.textContent).toBe(contentHu.aiWorkflow.title);
  });

  it('next to it shows the excerpt of CLAUDE.md highlighted, with the explanatory note', () => {
    const { el } = render();
    expect(el.querySelector('[role="tab"]')?.textContent?.trim()).toBe('CLAUDE.md');
    expect(el.querySelector('.heading')?.textContent).toContain('Gyulai Márk');
    expect(el.querySelector('.note')?.textContent).toBe(contentHu.aiWorkflow.note);
  });

  it('switches to English with the language switch', () => {
    const { fixture, el } = render();
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(el.querySelector('h2')?.textContent).toBe(contentEn.aiWorkflow.title);
    expect(el.querySelector('.heading')?.textContent).toContain('Márk Gyulai');
    expect(el.querySelector('code')?.textContent).toContain('Commands');
  });
});
