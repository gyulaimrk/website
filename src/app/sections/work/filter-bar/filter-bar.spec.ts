import { TestBed } from '@angular/core/testing';
import { FilterBar } from './filter-bar';

describe('FilterBar', () => {
  function setup() {
    const fixture = TestBed.createComponent(FilterBar);
    fixture.componentRef.setInput('options', ['Java', 'SQL']);
    fixture.detectChanges();
    const buttons = () =>
      [...fixture.nativeElement.querySelectorAll('button')] as HTMLButtonElement[];
    return { fixture, buttons };
  }

  it('Mind + a megadott opciók gombjai', () => {
    expect(
      setup()
        .buttons()
        .map((b) => b.textContent?.trim()),
    ).toEqual(['Mind', 'Java', 'SQL']);
  });

  it('kattintásra kiválaszt, újabb kattintásra töröl', () => {
    const { fixture, buttons } = setup();
    buttons()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected()).toBe('Java');
    expect(buttons()[1].getAttribute('aria-pressed')).toBe('true');
    buttons()[1].click();
    expect(fixture.componentInstance.selected()).toBeNull();
  });

  it('a Mind gomb törli a szűrést', () => {
    const { fixture, buttons } = setup();
    buttons()[2].click();
    buttons()[0].click();
    expect(fixture.componentInstance.selected()).toBeNull();
  });
});
