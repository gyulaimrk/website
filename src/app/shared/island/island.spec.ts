import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Island } from './island';

@Component({
  imports: [Island],
  template: `<app-island tone="coral" [shape]="3"><p>Tartalom</p></app-island>`,
})
class Host {}

describe('Island', () => {
  it('tónus- és formaosztályt kap, és megjeleníti a tartalmat', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const island = fixture.nativeElement.querySelector('app-island') as HTMLElement;
    expect(island.classList).toContain('tone-coral');
    expect(island.classList).toContain('shape-3');
    expect(island.textContent).toContain('Tartalom');
  });
});
