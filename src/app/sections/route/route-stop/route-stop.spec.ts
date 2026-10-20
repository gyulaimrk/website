import { TestBed } from '@angular/core/testing';
import { Job } from '../../../data/models';
import { RouteStop } from './route-stop';

const job: Job = {
  company: 'Példa Kft.',
  role: 'Fejlesztő',
  period: '2024 – 2025',
  years: '2024 – 2025',
  description: 'Leírás.',
  tech: ['Java', 'SQL'],
  projects: [
    { name: 'Alfa', role: 'Tanácsadó', text: 'Szöveg.' },
    { name: 'Béta', url: 'https://example.com', text: 'Link.' },
  ],
};

describe('RouteStop', () => {
  function render(overrides: Partial<Job> = {}) {
    const fixture = TestBed.createComponent(RouteStop);
    fixture.componentRef.setInput('job', { ...job, ...overrides });
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('kirajzolja a céget, a szerepet, az időszakot és a technológiákat', () => {
    const el = render();
    expect(el.querySelector('h3')?.textContent).toBe('Példa Kft.');
    expect(el.querySelector('.role')?.textContent).toBe('Fejlesztő');
    expect(el.querySelector('.period')?.textContent).toBe('2024 – 2025');
    expect(el.querySelectorAll('app-chip-list li').length).toBe(2);
  });

  it('csak a linkes projekt kattintható', () => {
    const links = render().querySelectorAll('.projects a');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://example.com');
  });

  it('projektek nélkül nincs projektlista', () => {
    expect(render({ projects: undefined }).querySelector('.projects')).toBeNull();
  });
});
