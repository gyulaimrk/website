import { CONTENTS, contentEn, contentHu } from './content';
import { renderLlmsTxt } from './llms-txt';

describe('renderLlmsTxt', () => {
  const text = renderLlmsTxt(CONTENTS, 'https://pelda.hu');

  it('a névvel kezdődik, majd mindkét nyelv összefoglalója következik', () => {
    expect(text.startsWith(`# ${contentHu.profile.name}\n`)).toBe(true);
    expect(text).toContain(`> ${contentHu.ui.meta.description}`);
    expect(text).toContain(`> ${contentEn.ui.meta.description}`);
  });

  it('mindkét nyelvi oldalra és mindkét önéletrajzra abszolút címmel hivatkozik', () => {
    expect(text).toContain('(https://pelda.hu/hu)');
    expect(text).toContain('(https://pelda.hu/en)');
    expect(text).toContain(`(https://pelda.hu/${contentHu.profile.cv})`);
    expect(text).toContain(`(https://pelda.hu/${contentEn.profile.cv})`);
  });

  it('oldalcím nélkül a hivatkozások a webgyökérhez viszonyítottak', () => {
    const relative = renderLlmsTxt(CONTENTS);
    expect(relative).toContain('(/hu)');
    expect(relative).toContain(`(/${contentHu.profile.cv})`);
  });

  it('a profilokra és nem másra mutat külső linkként, és nem tartalmaz személyes adatot', () => {
    expect(text).toContain(contentHu.profile.linkedin);
    expect(text).not.toMatch(/\+36\s?\d/);
    expect(text).not.toContain('1997');
    expect(text).not.toContain(contentHu.profile.email);
  });
});
