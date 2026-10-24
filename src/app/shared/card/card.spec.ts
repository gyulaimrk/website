import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Card } from './card';

@Component({ imports: [Card], template: `<app-card [featured]="true"><p>Tartalom</p></app-card>` })
class Host {}

describe('Card', () => {
  it('megjeleníti a tartalmat, és kiemelt osztályt kap', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('app-card') as HTMLElement;
    expect(card.textContent).toContain('Tartalom');
    expect(card.classList).toContain('featured');
  });
});
