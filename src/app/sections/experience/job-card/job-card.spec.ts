import { TestBed } from '@angular/core/testing';
import { Job } from '../../../data/models';
import { JobCard } from './job-card';

const job: Job = {
  company: 'Példa Kft.',
  role: 'Fejlesztő',
  period: '2024 – 2025',
  description: 'Leírás.',
  tech: ['Java', 'SQL'],
  projects: [
    { name: 'Alfa', role: 'Tanácsadó', text: 'Szöveg.' },
    { name: 'Béta', url: 'https://example.com', text: 'Link.' },
  ],
};

describe('JobCard', () => {
  function render(overrides: Partial<Job> = {}, current = false) {
    const fixture = TestBed.createComponent(JobCard);
    fixture.componentRef.setInput('job', { ...job, ...overrides });
    fixture.componentRef.setInput('current', current);
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

  it('a jelenlegi munkahely kiemelt kártyát kap', () => {
    expect(render({}, true).querySelector('app-card')?.classList).toContain('featured');
  });

  it('a leírás nélküli projekt is megjelenik, üres bekezdés nélkül', () => {
    const el = render({ projects: [{ name: 'Csak név' }] });
    expect(el.querySelector('.projects h4')?.textContent).toContain('Csak név');
    expect(el.querySelector('.projects p')).toBeNull();
  });
});
