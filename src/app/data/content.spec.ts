import { jobs, profile, skills, stats, studies } from './content';

describe('content', () => {
  it('a profil kötelező mezői ki vannak töltve', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toContain('@');
    expect(profile.linkedin).toMatch(/^https:\/\//);
    expect(profile.headline).toContain(profile.name);
  });

  it('nem tartalmaz személyes adatot (telefon, születési dátum)', () => {
    const all = JSON.stringify({ profile, jobs, skills, studies });
    expect(all).not.toMatch(/\+36\s?\d/);
    expect(all).not.toMatch(/1997/);
  });

  it('a munkahelyek és képességek egyedi azonosítójúak', () => {
    const keys = jobs.map((j) => j.company + j.period);
    expect(new Set(keys).size).toBe(keys.length);
    const titles = skills.map((s) => s.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('a statisztikák és a hero szerepei ki vannak töltve', () => {
    expect(stats.length).toBeGreaterThan(0);
    stats.forEach((s) => {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
    expect(profile.roles.length).toBeGreaterThan(0);
  });
});
