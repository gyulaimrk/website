/** Safe read from browser storage; `undefined` if unavailable or the value is invalid. */
export function readStored<T extends string>(key: string, allowed: readonly T[]): T | undefined {
  try {
    const value = localStorage.getItem(key);
    return allowed.find((option) => option === value);
  } catch {
    return undefined;
  }
}

/** Safe write to browser storage; silently skipped on error. */
export function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage is unavailable */
  }
}
