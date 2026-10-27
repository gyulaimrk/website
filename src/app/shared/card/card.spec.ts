import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Card } from './card';

@Component({ imports: [Card], template: `<app-card [featured]="true"><p>Content</p></app-card>` })
class Host {}

describe('Card', () => {
  it('renders the content and gets the featured class', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('app-card') as HTMLElement;
    expect(card.textContent).toContain('Content');
    expect(card.classList).toContain('featured');
  });
});
