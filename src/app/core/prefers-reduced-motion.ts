/** Igaz, ha a felhasználó csökkentett mozgást kért (vagy a böngésző nem ismeri a lekérdezést). */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
