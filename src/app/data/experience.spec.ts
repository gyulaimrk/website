import { completedYears, withExperience } from './experience';

describe('completedYears', () => {
  it('before the start month the year has not yet passed', () => {
    expect(completedYears('2021-07', new Date(2026, 5, 30))).toBe(4);
  });

  it('in the start month it completes the year', () => {
    expect(completedYears('2021-07', new Date(2026, 6, 1))).toBe(5);
  });

  it('grows from year to year', () => {
    expect(completedYears('2023-07', new Date(2026, 9, 25))).toBe(3);
    expect(completedYears('2023-07', new Date(2027, 6, 1))).toBe(4);
  });
});

describe('withExperience', () => {
  const content = {
    text: 'More than {javaYears} years of Java, {aiYears} years of AI. {javaYears}+',
    nested: [{ value: '{aiYears}+' }, { value: 'unchanged' }],
    flag: true,
  };

  it('replaces the placeholders everywhere: in text, arrays and objects', () => {
    const result = withExperience(content, new Date(2026, 9, 25));
    expect(result.text).toBe('More than 5 years of Java, 3 years of AI. 5+');
    expect(result.nested).toEqual([{ value: '3+' }, { value: 'unchanged' }]);
    expect(result.flag).toBe(true);
  });

  it('later it writes more years from the same content', () => {
    expect(withExperience(content, new Date(2027, 9, 25)).text).toBe(
      'More than 6 years of Java, 4 years of AI. 6+',
    );
  });

  it('does not modify the original content', () => {
    withExperience(content, new Date(2026, 9, 25));
    expect(content.text).toContain('{javaYears}');
  });
});
