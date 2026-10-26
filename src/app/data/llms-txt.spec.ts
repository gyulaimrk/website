import { CONTENTS, contentEn, contentHu } from './content';
import { renderLlmsTxt } from './llms-txt';

describe('renderLlmsTxt', () => {
  const text = renderLlmsTxt(CONTENTS, 'https://example.com');

  it('starts with the name, then the summary of both languages follows', () => {
    expect(text.startsWith(`# ${contentHu.profile.name}\n`)).toBe(true);
    expect(text).toContain(`> ${contentHu.ui.meta.description}`);
    expect(text).toContain(`> ${contentEn.ui.meta.description}`);
  });

  it('links to both language pages and both résumés with an absolute address', () => {
    expect(text).toContain('(https://example.com/hu)');
    expect(text).toContain('(https://example.com/en)');
    expect(text).toContain(`(https://example.com/${contentHu.profile.cv})`);
    expect(text).toContain(`(https://example.com/${contentEn.profile.cv})`);
  });

  it('without a page address the links are relative to the web root', () => {
    const relative = renderLlmsTxt(CONTENTS);
    expect(relative).toContain('(/hu)');
    expect(relative).toContain(`(/${contentHu.profile.cv})`);
  });

  it('points to the profiles and nothing else as external links, and contains no personal data', () => {
    expect(text).toContain(contentHu.profile.linkedin);
    expect(text).not.toMatch(/\+36\s?\d/);
    expect(text).not.toContain('1997');
    expect(text).not.toContain(contentHu.profile.email);
  });
});
