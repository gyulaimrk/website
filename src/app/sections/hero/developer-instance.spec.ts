import { contentEn, contentHu } from '../../data/content';
import { developerInstance } from './developer-instance';

describe('developerInstance', () => {
  it('Kotlin fájlt ad Main.kt néven', () => {
    const file = developerInstance(contentHu.profile);
    expect(file.name).toBe('Main.kt');
    expect(file.language).toBe('kotlin');
  });

  it('a profil nevét, szerepét (enum-értékként) és minden stack-elemét kiírja', () => {
    const { code } = developerInstance(contentHu.profile);
    expect(code).toContain(`name = "${contentHu.profile.name}"`);
    expect(code).toContain(`role = Role.${contentHu.profile.roleConstant}`);
    contentHu.profile.stack.forEach((item) => expect(code).toContain(`"${item}"`));
  });

  it('a helyszínből csak a várost írja ki', () => {
    const { code } = developerInstance(contentHu.profile);
    expect(code).toContain('location = "Nyíregyháza"');
    expect(code).not.toContain('Magyarország');
  });

  it('a nyelv szerinti profilból épül', () => {
    expect(developerInstance(contentEn.profile).code).toContain(contentEn.profile.name);
  });

  it('a szerep olyan enum-érték, amely a Developer.kt mintában is szerepel', () => {
    const { code } = developerInstance(contentHu.profile);
    const sample = contentHu.codeSamples[0].code;
    expect(sample).toContain('enum class Role {');
    expect(sample).toMatch(new RegExp(`\\b${contentHu.profile.roleConstant},`));
    expect(code).toContain(`Role.${contentHu.profile.roleConstant}`);
  });

  it('a mezői megegyeznek a Developer data class mezőivel', () => {
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
