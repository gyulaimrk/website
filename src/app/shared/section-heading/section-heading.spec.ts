import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SectionHeading } from './section-heading';

@Component({
  imports: [SectionHeading],
  template: `<app-section-heading>Cím</app-section-heading>`,
})
class Host {}

describe('SectionHeading', () => {
  it('h2-ben jeleníti meg a tartalmat', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toBe('Cím');
  });
});
