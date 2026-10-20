import { TestBed } from '@angular/core/testing';
import { ChipList } from './chip-list';

describe('ChipList', () => {
  it('kirajzolja a címkéket és kiemeli az aktívat', () => {
    const fixture = TestBed.createComponent(ChipList);
    fixture.componentRef.setInput('items', ['Java', 'SQL']);
    fixture.componentRef.setInput('active', 'SQL');
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li') as NodeListOf<HTMLElement>;
    expect(items.length).toBe(2);
    expect(items[0].classList).not.toContain('active');
    expect(items[1].classList).toContain('active');
  });
});
