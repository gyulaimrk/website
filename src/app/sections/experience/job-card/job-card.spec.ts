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
    { name: 'Alfa', subtitle: 'Tanácsadás', text: 'Szöveg.' },
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

  it('munkahely-szintű címkék nélkül nem rajzol címkesort a kártya aljára', () => {
    const el = render({ tech: undefined, projects: undefined });
    expect(el.querySelector('app-card > app-chip-list')).toBeNull();
  });

  it('a projekt alcíme a neve mellett áll, ha van', () => {
    const items = [...render().querySelectorAll('.projects > li')];
    expect(items[0].querySelector('h4 span')?.textContent).toBe('Tanácsadás');
    expect(items[1].querySelector('h4 span')).toBeNull();
  });

  it('csak a linkes projekt kattintható', () => {
    const links = render().querySelectorAll('.projects a');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://example.com');
  });

  it('a feladatlistát a projekt alatt mutatja, ha van', () => {
    const el = render({
      projects: [{ name: 'Alfa', points: ['Első feladat', 'Második feladat'] }, { name: 'Béta' }],
    });
    const items = [...el.querySelectorAll('.projects > li')];
    expect([...items[0].querySelectorAll('.points li')].map((li) => li.textContent)).toEqual([
      'Első feladat',
      'Második feladat',
    ]);
    expect(items[1].querySelector('.points')).toBeNull();
  });

  it('a projekt eszközeit címkékként mutatja, ha vannak', () => {
    const el = render({
      projects: [{ name: 'Alfa', tech: ['Jenkins', 'GitLab'] }, { name: 'Béta' }],
    });
    const items = [...el.querySelectorAll('.projects > li')];
    expect([...items[0].querySelectorAll('.tools li')].map((li) => li.textContent)).toEqual([
      'Jenkins',
      'GitLab',
    ]);
    expect(items[1].querySelector('.tools')).toBeNull();
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

  it('a projektek összecsukható listában vannak, a darabszámmal a feliratban', () => {
    const el = render();
    expect(el.querySelector('details > summary')?.textContent).toContain('Projektek (2)');
  });

  it('alapból összecsukott, a jelenlegi munkahelynél nyitott', () => {
    expect((render({}, false).querySelector('details') as HTMLDetailsElement).open).toBe(false);
    expect((render({}, true).querySelector('details') as HTMLDetailsElement).open).toBe(true);
  });
});
