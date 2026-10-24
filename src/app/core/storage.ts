/** Biztonságos olvasás a böngészőtárból; ha nem elérhető vagy érvénytelen az érték, `undefined`. */
export function readStored<T extends string>(key: string, allowed: readonly T[]): T | undefined {
  try {
    const value = localStorage.getItem(key);
    return allowed.find((option) => option === value);
  } catch {
    return undefined;
  }
}

/** Biztonságos mentés a böngészőtárba; hiba esetén csendben kihagyja. */
export function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* a tárolás nem elérhető */
  }
}
