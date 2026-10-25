import { completedYears, withExperience } from './experience';

describe('completedYears', () => {
  it('a kezdő hónap előtt még nem telt le az év', () => {
    expect(completedYears('2021-07', new Date(2026, 5, 30))).toBe(4);
  });

  it('a kezdő hónapban betölti az évet', () => {
    expect(completedYears('2021-07', new Date(2026, 6, 1))).toBe(5);
  });

  it('évről évre nő', () => {
    expect(completedYears('2023-07', new Date(2026, 9, 25))).toBe(3);
    expect(completedYears('2023-07', new Date(2027, 6, 1))).toBe(4);
  });
});

describe('withExperience', () => {
  const content = {
    text: 'Több mint {javaYears} éve Java, {aiYears} éve AI. {javaYears}+',
    nested: [{ value: '{aiYears}+' }, { value: 'változatlan' }],
    flag: true,
  };

  it('a helyettesítőket mindenhol kicseréli, szövegben, tömbben és objektumban is', () => {
    const result = withExperience(content, new Date(2026, 9, 25));
    expect(result.text).toBe('Több mint 5 éve Java, 3 éve AI. 5+');
    expect(result.nested).toEqual([{ value: '3+' }, { value: 'változatlan' }]);
    expect(result.flag).toBe(true);
  });

  it('később több évet ír ugyanabból a tartalomból', () => {
    expect(withExperience(content, new Date(2027, 9, 25)).text).toBe(
      'Több mint 6 éve Java, 4 éve AI. 6+',
    );
  });

  it('az eredeti tartalmat nem módosítja', () => {
    withExperience(content, new Date(2026, 9, 25));
    expect(content.text).toContain('{javaYears}');
  });
});
