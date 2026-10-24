import { TestBed } from '@angular/core/testing';
import { SectionHeading } from './section-heading';

describe('SectionHeading', () => {
  function render(lead?: string) {
    const fixture = TestBed.createComponent(SectionHeading);
    fixture.componentRef.setInput('title', 'Cím');
    if (lead) fixture.componentRef.setInput('lead', lead);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('h2-ben mutatja a címet', () => {
    expect(render().querySelector('h2')?.textContent).toBe('Cím');
  });

  it('a bevezető csak akkor jelenik meg, ha van', () => {
    expect(render().querySelector('p')).toBeNull();
    expect(render('Bevezető').querySelector('p')?.textContent).toBe('Bevezető');
  });
});
