/** When the given experience starts (`YYYY-MM`); the years are calculated from it, so they grow on their own. */
export const EXPERIENCE_START = {
  /** Work on Java 11 and 17: the start as an EPAM junior. */
  java: '2021-07',
  /** Using AI at work. */
  ai: '2023-07',
} as const;

/** The placeholders usable in the content: `{javaYears}` and `{aiYears}`. */
const PLACEHOLDERS: Record<string, keyof typeof EXPERIENCE_START> = {
  '{javaYears}': 'java',
  '{aiYears}': 'ai',
};

/** How many full years have passed since `since` (`YYYY-MM`). */
export function completedYears(since: string, now: Date): number {
  const [year, month] = since.split('-').map(Number);
  const years = now.getFullYear() - year;
  return now.getMonth() + 1 < month ? years - 1 : years;
}

/**
 * Replaces `{javaYears}` and `{aiYears}` in the content texts with the number of full years
 * valid at load time. Does not modify the original object.
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
