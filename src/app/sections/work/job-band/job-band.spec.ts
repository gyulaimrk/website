import { TestBed } from '@angular/core/testing';
import { Job } from '../../../data/models';
import { JobBand } from './job-band';

const job: Job = {
  company: 'Példa Kft.',
  role: 'Fejlesztő',
  period: '2024 – 2025',
  description: 'Leírás.',
  tech: ['Java', 'SQL'],
  art: 'flow',
  projects: [
    { name: 'Alfa', role: 'Tanácsadó', text: 'Szöveg.' },
    { name: 'Béta', url: 'https://example.com', text: 'Link.' },
  ],
};

describe('JobBand', () => {
  function render(overrides: Partial<Job> = {}) {
    const fixture = TestBed.createComponent(JobBand);
    fixture.componentRef.setInput('job', { ...job, ...overrides });
    fixture.componentRef.setInput('index', 5);
    fixture.detectChanges();
    return fixture;
  }

  it('kirajzolja a céget, a szerepet és a technológiákat', () => {
    const el = render().nativeElement as HTMLElement;
    expect(el.querySelector('.tab')?.textContent).toBe('Példa Kft.');
    expect(el.querySelector('.meta')?.textContent).toContain('Fejlesztő · 2024 – 2025');
    expect(el.querySelectorAll('app-chip-list li').length).toBe(2);
  });

  it('a projektek közül csak a linkeset teszi kattinthatóvá', () => {
    const el = render().nativeElement as HTMLElement;
    const links = el.querySelectorAll('.projects a');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://example.com');
  });

  it('projektek nélkül nincs projektlista', () => {
    expect(render({ projects: undefined }).nativeElement.querySelector('.projects')).toBeNull();
  });

  it('a színtónust az index alapján választja', () => {
    expect(render().nativeElement.classList).toContain('tone1');
  });

  it('elhalványul, ha nem felel meg a szűrőnek', () => {
    const fixture = render();
    fixture.componentRef.setInput('dimmed', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('dim');
  });
});
