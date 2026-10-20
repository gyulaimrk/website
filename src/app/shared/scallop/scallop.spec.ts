import { TestBed } from '@angular/core/testing';
import { Scallop } from './scallop';

describe('Scallop', () => {
  it('alapból lefelé, kérésre felfelé néz', () => {
    const fixture = TestBed.createComponent(Scallop);
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.classList).not.toContain('up');
    fixture.componentRef.setInput('up', true);
    fixture.detectChanges();
    expect(svg.classList).toContain('up');
  });
});
