import { highlight } from './highlight';

const kinds = (line: string, language: 'kotlin' | 'markdown' = 'kotlin') =>
  highlight(line, language)[0].map((t) => [t.text, t.kind]);

describe('highlight', () => {
  it('a Kotlin-kulcsszót, a típust, a függvényhívást és a karakterláncot megkülönbözteti', () => {
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

  it('az enum kulcsszó, az enum neve típus', () => {
    expect(kinds('enum class Role {').slice(0, 5)).toEqual([
      ['enum', 'keyword'],
      [' ', 'plain'],
      ['class', 'keyword'],
      [' ', 'plain'],
      ['Role', 'type'],
    ]);
  });

  it('a megjegyzés a sor végéig megjegyzés, benne a kulcsszó sem színeződik', () => {
    expect(kinds('// val ez megjegyzés')).toEqual([['// val ez megjegyzés', 'comment']]);
  });

  it('a kisbetűs függvényhívás függvény, a változó sima szöveg', () => {
    const tokens = highlight('    items.map(::build)', 'kotlin')[0];
    expect(tokens.find((t) => t.text === 'map')?.kind).toBe('function');
    expect(tokens.find((t) => t.text === 'items')?.kind).toBe('plain');
  });

  it('a számot és az annotációt felismeri', () => {
    const tokens = highlight('@Test fun a(limit: Int = 10)', 'kotlin')[0];
    expect(tokens.find((t) => t.text === '@Test')?.kind).toBe('type');
    expect(tokens.find((t) => t.text === '10')?.kind).toBe('number');
  });

  it('a szóközöket és a behúzást megőrzi, így a sor visszaadja az eredeti szöveget', () => {
    const line = '        .limit(limit)';
    expect(
      highlight(line, 'kotlin')[0]
        .map((t) => t.text)
        .join(''),
    ).toBe(line);
  });

  it('az üres sor üres marad, a sorok száma megegyezik', () => {
    const lines = highlight('a\n\nb', 'kotlin');
    expect(lines.length).toBe(3);
    expect(lines[1]).toEqual([]);
  });

  it('a Markdown címet, felsorolásjelet és kódrészletet felismeri', () => {
    expect(kinds('## Szabályok', 'markdown')).toEqual([['## Szabályok', 'heading']]);
    expect(kinds('- Futtasd: `npm test`', 'markdown')).toEqual([
      ['- ', 'bullet'],
      ['Futtasd: ', 'plain'],
      ['`npm test`', 'code'],
    ]);
  });
});
