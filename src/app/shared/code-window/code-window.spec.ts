import { TestBed } from '@angular/core/testing';
import { CodeFile } from '../../data/models';
import { CodeWindow } from './code-window';

const files: CodeFile[] = [
  { name: 'A.kt', language: 'kotlin', code: 'val a = "x"\n\nfun b()' },
  { name: 'B.md', language: 'markdown', code: '# Title\n- item' },
];

describe('CodeWindow', () => {
  function render(list: CodeFile[] = files) {
    const fixture = TestBed.createComponent(CodeWindow);
    fixture.componentRef.setInput('files', list);
    fixture.componentRef.setInput('idPrefix', 'demo');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      el,
      tabs: () => [...el.querySelectorAll('[role="tab"]')] as HTMLButtonElement[],
      code: () => el.querySelector('code')?.textContent,
    };
  }

  it('shows the first file highlighted, line by line', () => {
    const { el } = render();
    expect(el.querySelectorAll('.line').length).toBe(3);
    expect(el.querySelector('.keyword')?.textContent).toBe('val');
    expect(el.querySelector('.string')?.textContent).toBe('"x"');
  });

  it('makes a tab for every file and marks the first as selected', () => {
    const { tabs } = render();
    expect(tabs().map((t) => t.textContent?.trim())).toEqual(['A.kt', 'B.md']);
    expect(tabs().map((t) => t.getAttribute('aria-selected'))).toEqual(['true', 'false']);
  });

  it('clicking a tab shows another file, with the highlighting of its language', () => {
    const { fixture, el, tabs, code } = render();
    tabs()[1].click();
    fixture.detectChanges();
    expect(code()).toContain('# Title');
    expect(el.querySelector('.heading')?.textContent).toBe('# Title');
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
  });

  it('arrow keys move between the tabs and stop at the edge', () => {
    const { fixture, el, tabs } = render();
    const list = el.querySelector('[role="tablist"]') as HTMLElement;
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('resets to the first tab for a new file list', () => {
    const { fixture, tabs } = render();
    tabs()[1].click();
    fixture.detectChanges();
    fixture.componentRef.setInput('files', [...files]);
    fixture.detectChanges();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('the ids use the prefix, so two code windows do not collide', () => {
    const { el, tabs } = render();
    expect(tabs()[0].id).toBe('demo-tab-0');
    expect(tabs()[0].getAttribute('aria-controls')).toBe('demo-panel');
    const panel = el.querySelector('[role="tabpanel"]');
    expect(panel?.id).toBe('demo-panel');
    expect(panel?.getAttribute('aria-labelledby')).toBe('demo-tab-0');
  });
});
