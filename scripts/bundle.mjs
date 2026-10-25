// TypeScript-forrás használata a szkriptekből: esbuild lefordítja, majd betöltjük.
// Így a szkriptek ugyanazt az adatot használják, mint az oldal, és nem szövegkeresés (regex) kell hozzá.
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const root = resolve(import.meta.dirname, '..');

/**
 * Lefordítja és betölti a megadott TypeScript-modult.
 * `entry`: a `root`-hoz viszonyított fájl, vagy `{ contents }` egy kis, kódban megadott belépési pont.
 */
export async function importTs(entry) {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-script-'));
  const outfile = join(dir, 'module.mjs');
  try {
    await build({
      ...(typeof entry === 'string'
        ? { entryPoints: [join(root, entry)] }
        : { stdin: { contents: entry.contents, resolveDir: root, loader: 'ts' } }),
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'silent',
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
