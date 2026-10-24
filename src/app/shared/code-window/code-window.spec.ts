import { TestBed } from '@angular/core/testing';
import { CodeFile } from '../../data/models';
import { CodeWindow } from './code-window';

const files: CodeFile[] = [
  { name: 'A.kt', language: 'kotlin', code: 'val a = "x"\n\nfun b()' },
  { name: 'B.md', language: 'markdown', code: '# Cím\n- elem' },
];

describe('CodeWindow', () => {
  function render(list: CodeFile[] = files) {
    const fixture = TestBed.createComponent(CodeWindow);
    fixture.componentRef.setInput('files', list);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      el,
      tabs: () => [...el.querySelectorAll('[role="tab"]')] as HTMLButtonElement[],
      code: () => el.querySelector('code')?.textContent,
    };
  }

  it('az első fájlt mutatja színezve, soronként', () => {
    const { el } = render();
    expect(el.querySelectorAll('.line').length).toBe(3);
    expect(el.querySelector('.keyword')?.textContent).toBe('val');
    expect(el.querySelector('.string')?.textContent).toBe('"x"');
  });

  it('minden fájlhoz fület készít, az elsőt jelöli kiválasztottnak', () => {
    const { tabs } = render();
    expect(tabs().map((t) => t.textContent?.trim())).toEqual(['A.kt', 'B.md']);
    expect(tabs().map((t) => t.getAttribute('aria-selected'))).toEqual(['true', 'false']);
  });

  it('a fülre kattintva másik fájlt mutat, a nyelvének megfelelő színezéssel', () => {
    const { fixture, el, tabs, code } = render();
    tabs()[1].click();
    fixture.detectChanges();
    expect(code()).toContain('# Cím');
    expect(el.querySelector('.heading')?.textContent).toBe('# Cím');
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
  });

  it('nyílbillentyűkkel lehet fülek között lépni, a szélen megáll', () => {
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

  it('új fájllistánál visszaáll az első fülre', () => {
    const { fixture, tabs } = render();
    tabs()[1].click();
    fixture.detectChanges();
    fixture.componentRef.setInput('files', [...files]);
    fixture.detectChanges();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
  });
});
