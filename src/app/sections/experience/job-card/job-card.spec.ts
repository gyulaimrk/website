import { TestBed } from '@angular/core/testing';
import { Job } from '../../../data/models';
import { JobCard } from './job-card';

const job: Job = {
  company: 'Example Ltd.',
  role: 'Developer',
  period: '2024 – 2025',
  description: 'Description.',
  tech: ['Java', 'SQL'],
  projects: [
    { name: 'Alpha', subtitle: 'Consulting', text: 'Text.' },
    { name: 'Beta', url: 'https://example.com', text: 'Link.' },
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

  it('renders the company, the role, the period and the technologies', () => {
    const el = render();
    expect(el.querySelector('h3')?.textContent).toBe('Example Ltd.');
    expect(el.querySelector('.role')?.textContent).toBe('Developer');
    expect(el.querySelector('.period')?.textContent).toBe('2024 – 2025');
    expect(el.querySelectorAll('app-chip-list li').length).toBe(2);
  });

  it('without employer-level chips it draws no chip row at the bottom of the card', () => {
    const el = render({ tech: undefined, projects: undefined });
    expect(el.querySelector('app-card > app-chip-list')).toBeNull();
  });

  it('the project subtitle stands next to its name, if there is one', () => {
    const items = [...render().querySelectorAll('.projects > li')];
    expect(items[0].querySelector('h4 span')?.textContent).toBe('Consulting');
    expect(items[1].querySelector('h4 span')).toBeNull();
  });

  it('only the project with a link is clickable', () => {
    const links = render().querySelectorAll('.projects a');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://example.com');
  });

  it('shows the task list under the project, if there is one', () => {
    const el = render({
      projects: [{ name: 'Alpha', points: ['First task', 'Second task'] }, { name: 'Beta' }],
    });
    const items = [...el.querySelectorAll('.projects > li')];
    expect([...items[0].querySelectorAll('.points li')].map((li) => li.textContent)).toEqual([
      'First task',
      'Second task',
    ]);
    expect(items[1].querySelector('.points')).toBeNull();
  });

  it('shows the project’s tools as chips, if there are any', () => {
    const el = render({
      projects: [{ name: 'Alpha', tech: ['Jenkins', 'GitLab'] }, { name: 'Beta' }],
    });
    const items = [...el.querySelectorAll('.projects > li')];
    expect([...items[0].querySelectorAll('.tools li')].map((li) => li.textContent)).toEqual([
      'Jenkins',
      'GitLab',
    ]);
    expect(items[1].querySelector('.tools')).toBeNull();
  });

  it('without projects there is no project list', () => {
    expect(render({ projects: undefined }).querySelector('.projects')).toBeNull();
  });

  it('the current employer gets a featured card', () => {
    expect(render({}, true).querySelector('app-card')?.classList).toContain('featured');
  });

  it('a project without a description also appears, without an empty paragraph', () => {
    const el = render({ projects: [{ name: 'Name only' }] });
    expect(el.querySelector('.projects h4')?.textContent).toContain('Name only');
    expect(el.querySelector('.projects p')).toBeNull();
  });

  it('the projects are in a collapsible list, with the count in the label', () => {
    const el = render();
    expect(el.querySelector('details > summary')?.textContent).toContain('Projektek (2)');
  });

  it('collapsed by default, open for the current employer', () => {
    expect((render({}, false).querySelector('details') as HTMLDetailsElement).open).toBe(false);
    expect((render({}, true).querySelector('details') as HTMLDetailsElement).open).toBe(true);
  });
});
