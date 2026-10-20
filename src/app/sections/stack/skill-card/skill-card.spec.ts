import { TestBed } from '@angular/core/testing';
import { SkillCard } from './skill-card';

describe('SkillCard', () => {
  function render(highlight?: boolean) {
    const fixture = TestBed.createComponent(SkillCard);
    fixture.componentRef.setInput('skill', {
      title: 'Java',
      tag: 'Nyelv',
      text: 'Leírás',
      highlight,
    });
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('kirajzolja a címet, a címkét és a szöveget', () => {
    const el = render();
    expect(el.querySelector('h3')?.textContent).toBe('Java');
    expect(el.querySelector('span')?.textContent).toBe('Nyelv');
    expect(el.querySelector('p')?.textContent).toBe('Leírás');
  });

  it('kiemelt kártya kap highlight osztályt', () => {
    expect(render(true).classList).toContain('highlight');
    expect(render().classList).not.toContain('highlight');
  });
});
