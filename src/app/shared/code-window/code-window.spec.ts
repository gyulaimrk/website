import { TestBed } from '@angular/core/testing';
import { CodeWindow } from './code-window';

describe('CodeWindow', () => {
  function render() {
    const fixture = TestBed.createComponent(CodeWindow);
    fixture.componentRef.setInput('entries', [
      { key: 'name', value: 'Márk' },
      { key: 'stack', value: ['Java', 'Kotlin'] },
      { key: 'ai', value: true },
    ]);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('szöveget, listát és logikai értéket is a megfelelő formában ír ki', () => {
    const code = render().querySelector('code')?.textContent ?? '';
    expect(code).toContain('name = "Márk"');
    expect(code).toContain('listOf("Java", "Kotlin")');
    expect(code).toContain('ai = true');
  });

  it('a kódot a képernyőolvasók számára egyetlen felirattal írja le', () => {
    const win = render().querySelector('.window');
    expect(win?.getAttribute('aria-label')).toContain('Developer.kt');
  });
});
