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

  it('mind a négy gyakorlati pontot kirajzolja', () => {
    const { el } = render();
    expect(el.querySelectorAll('app-card h3').length).toBe(4);
    expect(el.querySelector('h2')?.textContent).toBe(contentHu.aiWorkflow.title);
  });

  it('mellette a CLAUDE.md részletét mutatja színezve, a magyarázó megjegyzéssel', () => {
    const { el } = render();
    expect(el.querySelector('[role="tab"]')?.textContent?.trim()).toBe('CLAUDE.md');
    expect(el.querySelector('.heading')?.textContent).toContain('Gyulai Márk');
    expect(el.querySelector('.note')?.textContent).toBe(contentHu.aiWorkflow.note);
  });

  it('a nyelvváltással angolra vált', () => {
    const { fixture, el } = render();
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(el.querySelector('h2')?.textContent).toBe(contentEn.aiWorkflow.title);
    expect(el.querySelector('code')?.textContent).toContain('Rules');
  });
});
