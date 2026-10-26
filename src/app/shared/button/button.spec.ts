import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Button } from './button';

@Component({
  imports: [Button],
  template: `<a appButton href="/x" [external]="true" variant="ghost" size="small">Send</a>`,
})
class Host {}

describe('Button', () => {
  it('renders as a link with the content, in a new tab for an external link', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(a.textContent).toContain('Send');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
    expect(a.classList).toContain('ghost');
    expect(a.classList).toContain('small');
  });
});
