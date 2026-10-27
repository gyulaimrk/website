import { TestBed } from '@angular/core/testing';
import { ChipList } from './chip-list';

describe('ChipList', () => {
  it('renders the chips', () => {
    const fixture = TestBed.createComponent(ChipList);
    fixture.componentRef.setInput('items', ['Java', 'SQL']);
    fixture.detectChanges();
    const items = [...fixture.nativeElement.querySelectorAll('li')].map((li) => li.textContent);
    expect(items).toEqual(['Java', 'SQL']);
  });
});
