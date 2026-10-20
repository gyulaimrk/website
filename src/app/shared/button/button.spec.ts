import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Button } from './button';

@Component({
  imports: [Button],
  template: `<a appButton href="/x" [external]="true" variant="ink" size="small">Küldés</a>`,
})
class Host {}

describe('Button', () => {
  it('linkként jelenik meg a tartalommal, külső linknél új lapon', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(a.textContent).toContain('Küldés');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
    expect(a.classList).toContain('ink');
    expect(a.classList).toContain('small');
  });
});
