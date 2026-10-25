/** Mikortól számít az adott tapasztalat (`ÉÉÉÉ-HH`); az évek ebből számolódnak, ezért maguktól nőnek. */
export const EXPERIENCE_START = {
  /** Java 11 és 17 alatti munka: az EPAM-os junior kezdés. */
  java: '2021-07',
  /** Az AI használata a munkában. */
  ai: '2023-07',
} as const;

/** A tartalomban használható helyettesítők: `{javaYears}` és `{aiYears}`. */
const PLACEHOLDERS: Record<string, keyof typeof EXPERIENCE_START> = {
  '{javaYears}': 'java',
  '{aiYears}': 'ai',
};

/** Hány teljes év telt el `since` (`ÉÉÉÉ-HH`) óta. */
export function completedYears(since: string, now: Date): number {
  const [year, month] = since.split('-').map(Number);
  const years = now.getFullYear() - year;
  return now.getMonth() + 1 < month ? years - 1 : years;
}

/**
 * A tartalom szövegeiben a `{javaYears}` és az `{aiYears}` helyére a betöltés pillanatában
 * érvényes, teljes évek számát írja. Az eredeti objektumot nem módosítja.
 */
export function withExperience<T>(content: T, now: Date = new Date()): T {
  const replacements = Object.entries(PLACEHOLDERS).map(
    ([token, key]) => [token, String(completedYears(EXPERIENCE_START[key], now))] as const,
  );
  const resolve = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return replacements.reduce((text, [token, years]) => text.replaceAll(token, years), value);
    }
    if (Array.isArray(value)) return value.map(resolve);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolve(item)]));
    }
    return value;
  };
  return resolve(content) as T;
}
