import { TestBed } from '@angular/core/testing';
import { ArtKind } from '../../data/models';
import { Art } from './art';

describe('Art', () => {
  const kinds: ArtKind[] = ['cup', 'bridge', 'split', 'flow', 'gate', 'saw'];

  it.each(kinds)('%s grafikát rajzol, felirattal', (kind) => {
    const fixture = TestBed.createComponent(Art);
    fixture.componentRef.setInput('kind', kind);
    fixture.componentRef.setInput('label', 'Teszt');
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('aria-label')).toBe('Teszt');
    expect(svg.children.length).toBeGreaterThan(0);
  });
});
