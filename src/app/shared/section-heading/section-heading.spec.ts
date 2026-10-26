import { TestBed } from '@angular/core/testing';
import { SectionHeading } from './section-heading';

describe('SectionHeading', () => {
  function render(lead?: string) {
    const fixture = TestBed.createComponent(SectionHeading);
    fixture.componentRef.setInput('title', 'Title');
    if (lead) fixture.componentRef.setInput('lead', lead);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the title in an h2', () => {
    expect(render().querySelector('h2')?.textContent).toBe('Title');
  });

  it('the lead appears only if there is one', () => {
    expect(render().querySelector('p')).toBeNull();
    expect(render('Lead').querySelector('p')?.textContent).toBe('Lead');
  });
});
