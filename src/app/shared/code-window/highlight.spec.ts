import { highlight } from './highlight';

const kinds = (line: string, language: 'kotlin' | 'markdown' = 'kotlin') =>
  highlight(line, language)[0].map((t) => [t.text, t.kind]);

describe('highlight', () => {
  it('tells apart the Kotlin keyword, the type, the function call and the string', () => {
    expect(kinds('val order = Order("A-1")')).toEqual([
      ['val', 'keyword'],
      [' ', 'plain'],
      ['order', 'plain'],
      [' ', 'plain'],
      ['=', 'plain'],
      [' ', 'plain'],
      ['Order', 'type'],
      ['(', 'plain'],
      ['"A-1"', 'string'],
      [')', 'plain'],
    ]);
  });

  it('enum is a keyword, the name of the enum is a type', () => {
    expect(kinds('enum class Role {').slice(0, 5)).toEqual([
      ['enum', 'keyword'],
      [' ', 'plain'],
      ['class', 'keyword'],
      [' ', 'plain'],
      ['Role', 'type'],
    ]);
  });

  it('a comment is a comment to the end of the line, even a keyword inside it is not coloured', () => {
    expect(kinds('// val this is a comment')).toEqual([['// val this is a comment', 'comment']]);
  });

  it('a lowercase function call is a function, a variable is plain text', () => {
    const tokens = highlight('    items.map(::build)', 'kotlin')[0];
    expect(tokens.find((t) => t.text === 'map')?.kind).toBe('function');
    expect(tokens.find((t) => t.text === 'items')?.kind).toBe('plain');
  });

  it('recognises a number and an annotation', () => {
    const tokens = highlight('@Test fun a(limit: Int = 10)', 'kotlin')[0];
    expect(tokens.find((t) => t.text === '@Test')?.kind).toBe('type');
    expect(tokens.find((t) => t.text === '10')?.kind).toBe('number');
  });

  it('keeps spaces and indentation, so the line gives back the original text', () => {
    const line = '        .limit(limit)';
    expect(
      highlight(line, 'kotlin')[0]
        .map((t) => t.text)
        .join(''),
    ).toBe(line);
  });

  it('an empty line stays empty, and the number of lines matches', () => {
    const lines = highlight('a\n\nb', 'kotlin');
    expect(lines.length).toBe(3);
    expect(lines[1]).toEqual([]);
  });

  it('recognises a Markdown heading, a bullet and a code snippet', () => {
    expect(kinds('## Rules', 'markdown')).toEqual([['## Rules', 'heading']]);
    expect(kinds('- Futtasd: `npm test`', 'markdown')).toEqual([
      ['- ', 'bullet'],
      ['Futtasd: ', 'plain'],
      ['`npm test`', 'code'],
    ]);
  });
});
