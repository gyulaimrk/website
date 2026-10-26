import { contentEn, contentHu } from '../../data/content';
import { developerInstance } from './developer-instance';

describe('developerInstance', () => {
  it('gives a Kotlin file named Main.kt', () => {
    const file = developerInstance(contentHu.profile);
    expect(file.name).toBe('Main.kt');
    expect(file.language).toBe('kotlin');
  });

  it('writes out the profile’s name, all its roles (as enum values) and all its stack items', () => {
    const { code } = developerInstance(contentHu.profile);
    expect(code).toContain(`name = "${contentHu.profile.name}"`);
    contentHu.profile.roleConstants.forEach((constant) =>
      expect(code).toContain(`Role.${constant},`),
    );
    contentHu.profile.stack.forEach((item) => expect(code).toContain(`"${item}"`));
  });

  it('from the location it writes only the city', () => {
    const { code } = developerInstance(contentHu.profile);
    expect(code).toContain('location = "Nyíregyháza"');
    expect(code).not.toContain('Magyarország');
  });

  it('is built from the profile of the language', () => {
    expect(developerInstance(contentEn.profile).code).toContain(contentEn.profile.name);
  });

  it('every role is an enum value that also appears in the Developer.kt sample', () => {
    const sample = contentHu.codeSamples[0].code;
    expect(sample).toContain('enum class Role {');
    expect(contentHu.profile.roleConstants.length).toBeGreaterThan(1);
    contentHu.profile.roleConstants.forEach((constant) =>
      expect(sample).toMatch(new RegExp(`\\b${constant},`)),
    );
  });

  it('its fields match the fields of the Developer data class', () => {
    const fields = (source: string) =>
      [...source.matchAll(/(?:val )?(\w+)\s*[:=]/g)].map((m) => m[1]);
    const sample = contentHu.codeSamples[0].code;
    const dataClass = sample.slice(sample.indexOf('data class Developer('));
    const declared = fields(dataClass.replace('data class Developer(', ''));
    const used = fields(
      developerInstance(contentHu.profile).code.replace('val developer = Developer(', ''),
    );
    expect(used.filter((name) => declared.includes(name)).sort()).toEqual(declared.sort());
  });
});
